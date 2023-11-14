import { authRouter } from "./router/auth";
import { bikeRouter } from "./router/bike";
import { emailRouter } from "./router/email";
import { jwtRouter } from "./router/jwt";
import { notificationsRouter } from "./router/notifications";
import { storageRouter } from "./router/storage";
import { userRouter } from "./router/user";
import { createTRPCRouter } from "./trpc";

export const appRouter = createTRPCRouter({
  user: userRouter,
  bike: bikeRouter,
  jwt: jwtRouter,
  storage: storageRouter,
  auth: authRouter,
  notifications: notificationsRouter,
  email: emailRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
