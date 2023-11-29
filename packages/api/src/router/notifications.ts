import { Expo, ExpoPushMessage } from "expo-server-sdk";
import { z } from "zod";

import { createTRPCRouter, protectedProcedure } from "../trpc";

export const notificationsRouter = createTRPCRouter({
  saveExpoPushToken: protectedProcedure
    .input(z.object({ expoPushToken: z.string() }))
    .mutation(async ({ ctx, input }) => {
      const { userId } = ctx;
      const { expoPushToken } = input;
      if (!Expo.isExpoPushToken(expoPushToken)) {
        return {
          error: true,
          msg: "El token es inválido.",
        };
      }
      const user = await ctx.prisma.user.update({
        where: {
          id: userId,
        },
        data: {
          expoPushToken,
        },
        select: {
          id: true,
          expoPushToken: true,
        },
      });
      if (user.id) {
        return {
          error: false,
          data: user,
        };
      }
      return {
        error: true,
        msg: "Hubo un error al guardar el token, intente nuevamente.",
      };
    }),
  sendNotification: protectedProcedure
    .input(
      z.object({
        toUserId: z.string(),
        title: z.string(),
        body: z.string(),
        data: z.object({ type: z.string(), data: z.record(z.any()) }).partial(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const { userId: fromUserId } = ctx;
      const { toUserId, title, body, data } = input;
      const toUser = await ctx.prisma.user.findUnique({
        where: {
          id: toUserId,
        },
      });
      if (toUser?.expoPushToken) {
        const token = toUser.expoPushToken;
        let expo = new Expo();
        if (Expo.isExpoPushToken(token)) {
          const msg: ExpoPushMessage = {
            to: token,
            sound: "default",
            title,
            body,
            data: {
              fromUserId,
              ...data,
            },
          };
          await expo.sendPushNotificationsAsync([msg]);
        }
      }
    }),
});
