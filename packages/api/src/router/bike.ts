import { z } from "zod";
import { nanoid } from "nanoid";

import { createTRPCRouter, publicProcedure } from "../trpc";

export const bikeRouter = createTRPCRouter({
  listByUserId: publicProcedure.input(z.object({ userId: z.string() })).query(({ ctx, input }) => {
    const { userId } = input;
    return ctx.prisma.bike.findMany({ orderBy: { id: "desc" }, where: { userId } });
  }),
  createByUserId: publicProcedure.input(z.object({ userId: z.string(), description: z.string() })).mutation(({ ctx, input }) => {
    const { userId, description } = input;
    return ctx.prisma.bike.create({
      data: {
        code: nanoid(10),
        userId,
        description
      }
    })
  }),
  updateByUserBikeId: publicProcedure.input(z.object({ userId: z.string(), bikeId: z.string(), description: z.string() })).mutation(({ ctx, input }) => {
    const { userId, bikeId: id, description } = input;
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
  deleteByUserBikeId: publicProcedure.input(z.object({ userId: z.string(), bikeId: z.string() })).mutation(({ ctx, input }) => {
    const { userId, bikeId: id } = input;
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
