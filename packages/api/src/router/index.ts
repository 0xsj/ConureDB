import { router } from "../trpc";
import { noteRouter } from "./note";
import { authRouter } from "./auth";

export const appRouter = router({
  note: noteRouter,
  auth: authRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
