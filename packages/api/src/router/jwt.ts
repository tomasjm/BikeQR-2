import { z } from "zod";

import { sign, verify } from "@acme/jwt";

import { createTRPCRouter, publicProcedure } from "../trpc";

export const jwtRouter = createTRPCRouter({
  sign: publicProcedure
    .input(
      z.object({
        payload: z.record(z.string(), z.string()),
        secret: z.string(),
      }),
    )
    .mutation(async (opts) => {
      const { input } = opts;
      const { payload, secret } = input;
      return sign(payload, secret);
    }),
  // all: publicProcedure.query(({ ctx }) => {
  //   return ctx.prisma.user.findMany({ orderBy: { id: "desc" } });
  // })
});
