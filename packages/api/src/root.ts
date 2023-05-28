import { userRouter } from "./router/user";
import { bikeRouter } from "./router/bike";
import { jwtRouter } from "./router/jwt";
import { createTRPCRouter } from "./trpc";

export const appRouter = createTRPCRouter({
  user: userRouter,
  bike: bikeRouter,
  jwt: jwtRouter
});

// export type definition of API
export type AppRouter = typeof appRouter;
