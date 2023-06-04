import { z } from "zod";
import { sign, verify } from "@acme/jwt"
import { createTRPCRouter, publicProcedure } from "../trpc";
import { Status } from "@acme/db";

export const storageRouter = createTRPCRouter({
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
