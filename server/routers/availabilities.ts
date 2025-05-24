import { z } from "zod";
import { publicProcedure, router } from "../index";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const availabilityRouter = router({
    getByUserAndDate: publicProcedure
        .input(
            z.object({
                userId: z.string(),
                date: z.string(), // "YYYY-MM-DD"
            })
        )
        .query(async ({ input }) => {
            const { userId, date } = input;

            const parsedDate = new Date(date);

            return prisma.availability.findMany({
                where: {
                    userId: userId,
                    date: parsedDate,
                    isBooked: false,
                },
            });
        }),
    updateAvailability: publicProcedure
        .input(
            z.object({
                availabilityId: z.string(),
                isBooked: z.boolean(),
            })
        )
        .mutation(async ({ input }) => {
            const { availabilityId, isBooked } = input;

            return prisma.availability.update({
                where: { id: availabilityId },
                data: { isBooked },
            });
        }),
});