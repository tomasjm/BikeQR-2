import { z } from "zod";
import bcrypt from "bcrypt"
const saltRounds = 10;
import { createTRPCRouter, publicProcedure, protectedProcedure } from "../trpc";

import { sign } from "@acme/jwt"

export const authRouter = createTRPCRouter({
  register: publicProcedure.input(z.object({ email: z.string(), password: z.string() })).mutation(async ({ ctx, input }) => {
    const { email, password } = input;
    const existingUser = await ctx.prisma.user.findUnique({
      where: { email }
    })
    if (existingUser) {
      return {
        error: true,
        msg: "Este correo ya está registrado"
      }
    }
    const hash = await bcrypt.hash(password, saltRounds);
    const user = await ctx.prisma.user.create({
      data: {
        email,
        password: hash,
      }
    })
    if (user.id) {
      return {
        error: false,
        msg: {
          userId: user.id
        }
      }
    }
    return {
      error: true,
      msg: "no se pudo crear usuario"
    }
  }),
  login: publicProcedure.input(z.object({ email: z.string(), password: z.string() })).mutation(async ({ ctx, input }) => {
    const { email, password } = input;
    const user = await ctx.prisma.user.findUnique({
      where: {
        email
      }
    })
    if (user?.password) {
      const passwordAreEquals = await bcrypt.compare(password, user.password);
      if (passwordAreEquals) {
        const token = sign({ userId: user.id }, "123")
        return {
          error: false,
          token
        }
      }
    }
    return {
      error: true,
      msg: "Datos ingresados no corresponden a un usuario"
    }
  }),
  checkSession: protectedProcedure.mutation(({ ctx }) => {
    const { userId } = ctx;
    return {
      error: false,
      userId
    }
  })
});
