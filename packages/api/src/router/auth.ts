import bcrypt from "bcrypt";
import { z } from "zod";

import { sign } from "@acme/jwt";

import { createTRPCRouter, protectedProcedure, publicProcedure } from "../trpc";

const saltRounds = 10;

export const authRouter = createTRPCRouter({
  register: publicProcedure
    .input(
      z.object({ name: z.string(), email: z.string(), password: z.string() }),
    )
    .mutation(async ({ ctx, input }) => {
      const { email, password, name } = input;
      const existingUser = await ctx.prisma.user.findUnique({
        where: { email },
      });
      if (existingUser) {
        return {
          error: true,
          msg: "El correo ingresado ya se encuentra registrado.",
        };
      }
      const hash = await bcrypt.hash(password, saltRounds);
      const user = await ctx.prisma.user.create({
        data: {
          name,
          email,
          password: hash,
        },
      });
      if (user.id) {
        return {
          error: false,
          msg: {
            userId: user.id,
          },
        };
      }
      return {
        error: true,
        msg: "Hubo un error al registrar el usuario, intente nuevamente.",
      };
    }),
  login: publicProcedure
    .input(z.object({ email: z.string(), password: z.string() }))
    .mutation(async ({ ctx, input }) => {
      const { email, password } = input;
      const user = await ctx.prisma.user.findUnique({
        where: {
          email,
        },
      });
      if (user?.password) {
        const passwordAreEquals = await bcrypt.compare(password, user.password);
        if (passwordAreEquals) {
          const token = sign({ userId: user.id });
          return {
            error: false,
            token,
          };
        }
      }
      return {
        error: true,
        msg: "El correo o la contraseña son incorrectos.",
      };
    }),
  logout: protectedProcedure.mutation(async ({ ctx }) => {
    const { userId } = ctx;
    await ctx.prisma.user.updateMany({
      where: {
        id: userId,
      },
      data: {
        expoPushToken: "",
      },
    });
    return {
      error: false,
    };
  }),
  checkSession: protectedProcedure.mutation(({ ctx }) => {
    const { userId } = ctx;
    return {
      error: false,
      userId,
    };
  }),
  getSession: protectedProcedure.query(({ ctx }) => {
    return {
      error: false,
      user: {
        id: ctx.userId,
        role: ctx.role,
      },
    };
  }),
});
