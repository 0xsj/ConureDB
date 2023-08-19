import { router } from "../trpc";
import { todoRouter } from "./todo";
import { authRouter } from "./auth";

export const appRouter = router({
  todo: todoRouter,
  auth: authRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
