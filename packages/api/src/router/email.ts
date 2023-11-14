import nodemailer from "nodemailer";
import { z } from "zod";

import { createTRPCRouter, protectedProcedure } from "../trpc";

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  auth: {
    //TODO: cambiar a .env
    user: "bikeqr.business@gmail.com",
    pass: "snfy jtdn kizr njdp",
  },
});

export const emailRouter = createTRPCRouter({
  send: protectedProcedure
    .input(z.object({ subject: z.string(), body: z.string() }))
    .mutation(async ({ ctx, input }) => {
      const { userId } = ctx;
      const { subject, body } = input;
      const user = await ctx.prisma.user.findUnique({ where: { id: userId } });
      if (user) {
        const { name, email } = user;
        const info = await transporter.sendMail({
          from: `"${name}" <${email}>`, // sender address
          to: "bikeqr.business@gmail.com", // list of receivers
          subject: `${name}: ${subject}`, // Subject line
          html: `${body}, <br/> Correo: ${email}`, // html body
        });
        console.log(info);
        return {
          error: false,
        };
      }
      return {
        error: true,
        msg: "No se ha podido enviar correo desde el usuario",
      };
    }),
});
