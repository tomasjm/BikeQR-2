import { userRouter } from "./router/user";
import { jwtRouter } from "./router/jwt";
import { createTRPCRouter } from "./trpc";

export const appRouter = createTRPCRouter({
  user: userRouter,
  jwt: jwtRouter
});

// export type definition of API
export type AppRouter = typeof appRouter;
