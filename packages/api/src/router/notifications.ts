import { z } from "zod";
import { Expo } from "expo-server-sdk"
import { createTRPCRouter, protectedProcedure } from "../trpc";


export const notificationsRouter = createTRPCRouter({
  saveExpoPushToken: protectedProcedure.input(z.object({ expoPushToken: z.string() })).mutation(async ({ ctx, input }) => {
    const { userId } = ctx;
    const { expoPushToken } = input;
    if (!Expo.isExpoPushToken(expoPushToken)) {
      return {
        error: true,
        msg: "Expo ha indicado que el token no es válido"
      }
    }
    const user = await ctx.prisma.user.update({
      where: {
        id: userId
      },
      data: {
        expoPushToken
      },
      select: {
        id: true,
        expoPushToken: true
      }
    })
    if (user.id) {
      return {
        error: false,
        data: user
      }
    }
    return {
      error: true,
      msg: "No se ha podido guardar el token, intenta nuevamente"
    }
  }),
});
