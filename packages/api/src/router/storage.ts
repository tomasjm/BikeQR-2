import Pusher from "pusher";
import { z } from "zod";

import { Status } from "@acme/db";
import { sign, verify } from "@acme/jwt";

import { appRouter } from "../root";
import {
  attendantProcedure,
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "../trpc";

const pusher = new Pusher({
  appId: "1624027",
  key: "68a92baa7c1b8cdaed4f",
  secret: "4a0936ce7115422a4bd6",
  cluster: "us2",
});

export const storageRouter = createTRPCRouter({
  // Retorna el registro de storage asociado al token
  getStorageByToken: publicProcedure
    .input(z.object({ token: z.string() }))
    .query(({ ctx, input }) => {
      const { token } = input;
      return ctx.prisma.token.findUnique({
        where: {
          token,
        },
        include: {
          storage: true,
        },
      });
    }),
  // Retorna el último registro ACTUALIZADO de storage asociada a la bicicleta.
  checkStorageStatusByBikeId: publicProcedure
    .input(z.object({ bikeId: z.string() }))
    .query(({ ctx, input }) => {
      const { bikeId } = input;
      return ctx.prisma.storage.findMany({
        where: {
          bikeId,
        },
        orderBy: {
          updatedat: "desc",
        },
        take: 1,
      });
    }),
  // Devuelve el registro asociado al storageId.
  checkStorageProcess: publicProcedure
    .input(z.object({ storageId: z.string() }))
    .query(({ ctx, input }) => {
      const { storageId } = input;
      return ctx.prisma.storage.findUnique({
        where: {
          id: storageId,
        },
      });
    }),
  startStorageProcess: attendantProcedure
    .input(z.object({ userId: z.string(), bikeId: z.string() }))
    .mutation(async ({ ctx, input }) => {
      const caller = appRouter.createCaller({ ...ctx });
      const { userId, bikeId } = input;
      const attendantId = ctx.userId;
      const payload = { userId, attendantId, bikeId };
      const token = sign(payload, "123");
      await ctx.prisma.storage.updateMany({
        where: { bikeId, status: Status.NOT_STORED },
        data: {
          status: Status.CANCELED,
        },
      });
      const records = await ctx.prisma.storage.findMany({
        where: { bikeId, status: Status.STORED },
      });
      if (records.length != 0) {
        return {
          error: true,
          msg: "Ya existe un proceso de almacenamiento en curso, por favor, guardar bicicleta o iniciar retiro.",
        };
      }
      const storage = await ctx.prisma.storage.create({
        data: {
          user: {
            connect: {
              id: userId,
            },
          },
          attendant: {
            connect: {
              id: attendantId,
            },
          },
          bike: {
            connect: {
              id: bikeId,
            },
          },
          token: {
            create: {
              token,
            },
          },
        },
        include: {
          token: true,
        },
      });
      if (storage) {
        caller.notifications.sendNotification({
          toUserId: userId,
          title: "Se ha iniciado proceso de almacenamiento",
          body: "Se ha iniciado el proceso de almacenamiento",
          data: { type: "START_STORAGE" },
        });
        return {
          error: false,
          storage,
        };
      } else {
        return {
          error: true,
          msg: "No se ha podido inicializar el proceso de almacenamiento",
        };
      }
    }),
  finishStorageProcess: protectedProcedure
    .input(z.object({ token: z.string(), bikeCode: z.string().length(10) }))
    .mutation(async ({ ctx, input }) => {
      const caller = appRouter.createCaller({ ...ctx });
      const { token, bikeCode } = input;
      let payload;
      try {
        const data = verify(token, "123");
        payload = data;
      } catch {
        return {
          error: true,
          msg: "El token ha expirado",
        };
      }
      const { userId, bikeId } = payload as { userId: string; bikeId: string };
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
                token,
              },
              user: {
                id: userId,
              },
            },
          },
        },
      });
      if (bike) {
        if (bike.code !== bikeCode) {
          return {
            msg: "El token no contiene la misma bicicleta asociada al registro de storage",
            error: true,
          };
        }
        const storage = bike.storage[0];
        if (storage) {
          if (storage.status === Status.COMPLETED) {
            return {
              error: true,
              msg: "El token está vinculado a un proceso completado",
            };
          }
          if (storage.status === Status.NOT_STORED) {
            return {
              error: true,
              msg: "El token está vinculado a un proceso de almacenamiento que no se ha confirmado",
            };
          }
          caller.notifications.sendNotification({
            toUserId: userId,
            title: "Se ha retirado la bicicleta",
            body: "Se ha retirado la bicicleta",
            data: { type: "FINISH_STORAGE", data: { bike, token } },
          });
          return {
            msg: "Se ha iniciado el proceso de retiro exitosamente",
            data: { storage },
            error: false,
          };
        }
      }
      return {
        error: true,
        msg: "El token no se encuentra asociada a esta bicicleta",
      };
    }),
  confirmFinishStorage: publicProcedure
    .input(z.object({ token: z.string() }))
    .mutation(async ({ ctx, input }) => {
      const { token } = input;

      const records = await ctx.prisma.storage.updateMany({
        where: {
          token: {
            token,
          },
        },
        data: {
          status: Status.COMPLETED,
        },
      });
      if (records.count == 1) {
        const records = await ctx.prisma.storage.findMany({
          where: {
            token: {
              token,
            },
          },
        });
        if (records.length == 1) {
          pusher.trigger(records[0]!.id, "FINISH_STORAGE", {
            message: true,
          });
          return {
            error: false,
          };
        } else {
          return {
            error: true,
            msg: "No se ha encontrado el registro actualizado",
          };
        }
      } else {
        return {
          error: true,
          msg: "Hubo un error interno en el servidor",
        };
      }
    }),
  confirmStorage: publicProcedure
    .input(z.object({ token: z.string() }))
    .mutation(async ({ ctx, input }) => {
      const { token } = input;

      const records = await ctx.prisma.storage.updateMany({
        where: {
          token: {
            token,
          },
        },
        data: {
          status: Status.STORED,
        },
      });
      if (records.count == 1) {
        const records = await ctx.prisma.storage.findMany({
          where: {
            token: {
              token,
            },
          },
          select: {
            bike: true,
            id: true,
          },
        });
        if (records.length == 1) {
          pusher.trigger(records[0]!.id, "START_STORAGE", {
            message: true,
          });
          return {
            data: records[0],
            error: false,
          };
        } else {
          return {
            error: true,
            msg: "No se ha encontrado el registro actualizado",
          };
        }
      } else {
        return {
          error: true,
          msg: "Hubo un error interno en el servidor",
        };
      }
    }),
});
