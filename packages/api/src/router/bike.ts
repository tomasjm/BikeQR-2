import { z } from "zod";
import { nanoid } from "nanoid";

import { createTRPCRouter, protectedProcedure, publicProcedure } from "../trpc";

export const bikeRouter = createTRPCRouter({
  listUserBikes: protectedProcedure.query(({ ctx }) => {
    const { userId } = ctx;
    return ctx.prisma.bike.findMany({ orderBy: { id: "desc" }, where: { userId } });
  }),
  createUserBike: protectedProcedure.input(z.object({ description: z.string() })).mutation(({ ctx, input }) => {
    const { userId } = ctx;
    const { description } = input;
    return ctx.prisma.bike.create({
      data: {
        code: nanoid(10),
        userId,
        description
      }
    })
  }),
  updateUserBikeById: protectedProcedure.input(z.object({ bikeId: z.string(), description: z.string() })).mutation(({ ctx, input }) => {
    const { userId } = ctx;
    const { bikeId: id, description } = input;
    return ctx.prisma.bike.updateMany({
      where: {
        id,
        userId
      },
      data: {
        description
      }
    })
  }),
  deleteUserBikeById: protectedProcedure.input(z.object({ bikeId: z.string() })).mutation(({ ctx, input }) => {
    const { userId } = ctx;
    const { bikeId: id } = input;
    return ctx.prisma.bike.deleteMany({
      where: {
        id,
        userId
      }
    })
  }),
  validateCode: publicProcedure.input(z.object({ code: z.string().length(10) })).mutation(async ({ ctx, input }) => {
    const { code } = input;
    const data = await ctx.prisma.bike.findMany({
      where: {
        code
      },
      include: {
        user: {
          select: {
            id: true,
          }
        }
      }
    })
    if (data.length == 1) {
      return {
        data,
        error: false
      }
    }
    return {
      msg: "No existe bicicleta asociada a este código",
      data: {},
      error: true
    }
  })
});
