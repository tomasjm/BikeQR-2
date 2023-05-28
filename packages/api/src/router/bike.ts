import { z } from "zod";

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
  })
});
