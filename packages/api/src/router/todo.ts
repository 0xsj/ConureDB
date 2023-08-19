import { router, publicProcedure, protectedProcedure } from "../trpc";
import { z } from "zod";

const Priority = z.enum(["LOW", "MEDIUM", "HIGH"]);

export const todoRouter = router({
  all: publicProcedure.query(({ ctx }) => {
    return ctx.prisma.todo.findMany();
  }),
  byId: publicProcedure.input(z.number()).query(({ ctx, input }) => {
    return ctx.prisma.todo.findFirst({ where: { id: input } });
  }),
  create: publicProcedure
    .input(
      z.object({
        title: z.string(),
        content: z.string(),
        isDone: z.boolean(),
        priority: Priority,
      }),
    )
    .mutation(({ ctx, input }) => {
      return ctx.prisma.todo.create({ data: input });
    }),
});
