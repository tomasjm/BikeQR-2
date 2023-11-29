import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "../trpc";

export const userRouter = createTRPCRouter({
  all: publicProcedure.query(({ ctx }) => {
    return ctx.prisma.user.findMany({ orderBy: { id: "desc" } });
  }),
  one: publicProcedure
    .input(z.object({ id: z.string() }))
    .query(({ ctx, input }) => {
      return ctx.prisma.user.findUnique({ where: { id: input.id } });
    }),
  editUser: publicProcedure
    .input(
      z.object({
        id: z.string(),
        name: z.string(),
        email: z.string(),
        password: z.string(),
      }),
    )
    .mutation(({ ctx, input }) => {
      const user = ctx.prisma.user.update({
        where: { id: input.id },
        data: {
          name: input.name,
          email: input.email,
          password: input.password,
        },
      });

      if (!user) {
        return {
          error: true,
          msg: "Hubo un error al actualizar el usuario, intente nuevamente.",
        };
      }

      return {
        error: false,
        msg: "Usuario actualizado correctamente",
      };
    }),
});
