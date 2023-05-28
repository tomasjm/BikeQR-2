import { userRouter } from "./router/user";
import { bikeRouter } from "./router/bike";
import { createTRPCRouter } from "./trpc";

export const appRouter = createTRPCRouter({
  user: userRouter,
  bike: bikeRouter
});

// export type definition of API
export type AppRouter = typeof appRouter;
