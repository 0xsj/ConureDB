import { router, publicProcedure, protectedProcedure } from "../trpc";
import { z } from "zod";

const Priority = z.enum(["LOW", "MEDIUM", "HIGH"]);

export const noteRouter = router({
  all: publicProcedure.query(({ ctx }) => {
    return ctx.prisma.note.findMany();
  }),
  byId: publicProcedure.input(z.number()).query(({ ctx, input }) => {
    return ctx.prisma.note.findFirst({ where: { id: input } });
  }),
  create: protectedProcedure
    .input(
      z.object({
        title: z.string(),
        content: z.string(),
        isDone: z.boolean(),
        priority: Priority,
      }),
    )
    .mutation(({ ctx, input }) => {
      return ctx.prisma.note.create({ data: input });
    }),
});
