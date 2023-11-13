import { z } from "zod";

import { createTRPCRouter, protectedProcedure } from "../trpc";
import { Resend } from 'resend';

const RESEND_API_KEY = process.env.RESEND_API_KEY
const RESEND_EMAIL = process.env.RESEND_EMAIL
const resendParser = z.string().min(3, "RESEND ENV LENGTH")
const resend = new Resend(resendParser.parse(RESEND_API_KEY));
const admin_email = resendParser.parse(RESEND_EMAIL)

export const userRouter = createTRPCRouter({
  send: protectedProcedure
    .input(z.object({ subject: z.string(), body: z.string() }))
    .mutation(async ({ ctx, input }) => {
      const { userId } = ctx;
      const { subject, body } = input;
      const user = await ctx.prisma.user.findUnique({ where: { id: userId } })
      if (user) {
        const { name, email } = user;
        resend.emails.send({
          from: email,
          to: admin_email,
          subject: subject,
          html: `<h3>${name}<h3><br/><p>${body}</p>`
        });
        return {
          error: false
        };
      }
      return {
        error: true,
        msg: "No se ha podido enviar correo desde el usuario"
      }
    })
});
