import { userRouter } from "./router/user";
import { bikeRouter } from "./router/bike";
import { jwtRouter } from "./router/jwt";
import { createTRPCRouter } from "./trpc";
import { storageRouter } from "./router/storage";
import { authRouter } from "./router/auth"

export const appRouter = createTRPCRouter({
  user: userRouter,
  bike: bikeRouter,
  jwt: jwtRouter,
  storage: storageRouter,
  auth: authRouter
});

// export type definition of API
export type AppRouter = typeof appRouter;
