import { z } from "zod";
import { sign, verify } from "@acme/jwt"
import { createTRPCRouter, publicProcedure } from "../trpc";
import { Status } from "@acme/db";

export const storageRouter = createTRPCRouter({
  // Retorna el registro de storage asociado al token
  getStorageByToken: publicProcedure.input(z.object({ token: z.string() })).query(({ ctx, input }) => {
    const { token } = input;
    return ctx.prisma.token.findUnique({
      where: {
        token
      },
      include: {
        storage: true
      }
    })
  }),
  // Retorna el último registro ACTUALIZADO de storage asociada a la bicicleta.
  checkStorageStatusByBikeId: publicProcedure.input(z.object({ bikeId: z.string() })).query(({ ctx, input }) => {
    const { bikeId } = input;
    return ctx.prisma.storage.findMany({
      where: {
        bikeId
      },
      orderBy: {
        updatedat: "desc"
      },
      take: 1
    })
  }),
  // Devuelve el registro asociado al storageId.
  checkStorageProcess: publicProcedure.input(z.object({ storageId: z.string() })).query(({ ctx, input }) => {
    const { storageId } = input;
    return ctx.prisma.storage.findUnique({
      where: {
        id: storageId
      }
    })
  }),
  startStorageProcess: publicProcedure.input(z.object({ attendantId: z.string(), userId: z.string(), bikeId: z.string() })).mutation(async ({ ctx, input }) => {
    const { userId, attendantId, bikeId } = input;
    const payload = { userId, attendantId, bikeId };
    const token = sign(payload, "123")
    await ctx.prisma.storage.updateMany({
      where: { bikeId, status: Status.NOT_STORED },
      data: {
        status: Status.CANCELED
      }
    })
    return ctx.prisma.storage.create({
      data: {
        user: {
          connect: {
            id: userId
          }
        },
        attendant: {
          connect: {
            id: attendantId
          }
        },
        bike: {
          connect: {
            id: bikeId
          }
        },
        token: {
          create: {
            token
          }
        }
      },
      include: {
        token: true
      }
    })
  }),
  finishStorageProcess: publicProcedure.input(z.object({ token: z.string(), bikeCode: z.string().length(10) })).mutation(async ({ ctx, input }) => {
    const { token, bikeCode } = input;
    let payload;
    try {
      const data = verify(token, "123");
      payload = data;

    } catch {
      return {
        error: true,
        msg: "El token ha expirado"
      }
    }
    const { userId, attendantId, bikeId } = payload as { userId: string; attendantId: string; bikeId: string; };
    // Busca si hay una bicicleta que contenga un registro de storage y además tenga Status.STORED
    // también que esté asociada a los datos que viene del token
    const bike = await ctx.prisma.bike.findUnique({
      where: {
        id: bikeId,
      },
      include: {
        storage: {
          where: {
            token: {
              token
            },
            user: {
              id: userId
            }
          }
        }
      }
    })
    if (bike) {
      if (bike.code !== bikeCode) {
        return {
          msg: "El token no contiene la misma bicicleta asociada al registro de storage",
          error: true
        }
      }
      const storage = bike.storage[0]
      if (storage) {
        if (storage.status === Status.COMPLETED) {
          return {
            error: true,
            msg: "El token está vinculado a un proceso completado"
          }
        }
        if (storage.status === Status.NOT_STORED) {
          return {
            error: true,
            msg: "El token está vinculado a un proceso de almacenamiento que no se ha confirmado"
          }
        }
        await ctx.prisma.storage.update({
          where: {
            id: storage.id
          },
          data: {
            status: Status.COMPLETED
          }
        })
        return {
          msg: "Se ha completado el proceso de retiro éxitosamente",
          error: false
        }
      }
    }
    return {
      error: true,
      msg: "El token no se encuentra asociada a esta bicicleta"
    }
  }),
  confirmStorage: publicProcedure.input(z.object({ storageId: z.string() })).mutation(({ ctx, input }) => {
    const { storageId } = input;
    return ctx.prisma.storage.update({
      where: {
        id: storageId
      },
      data: {
        status: Status.STORED
      }
    })
  }),
});
