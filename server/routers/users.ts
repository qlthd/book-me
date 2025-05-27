import { z } from "zod";
import { publicProcedure, router } from "../index";

import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const usersRouters = router({
  get: publicProcedure.query(async () => {
    return prisma.user.findMany();
  }),
  create: publicProcedure
    .input(
      z.object({
        firstName: z.string(),
        lastName: z.string(),
        email: z.string(),
      }),
    )
    .mutation(async (opts) => {
      const { input } = opts;
      await prisma.user.create({
        data: {
          firstName: input.firstName,
          lastName: input.lastName,
          email: input.email,
        },
      });
    }),
});
