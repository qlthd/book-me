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
      }),
    )
    .query(async ({ input }) => {
      const { userId, date } = input;

      const parsedDate = new Date(date);

      return prisma.availability.findMany({
        where: {
          userId: userId,
          date: parsedDate,
          bookingId: null,
        },
      });
    }),
  createAvailability: publicProcedure
    .input(
      z.object({
        meetingDuration: z.number(),
        bufferTime: z.number().optional(),
        meetingDescription: z.string(),
        isPhoneRequested: z.boolean(),
        isAutomaticallyAccepted: z.boolean(),
        startDate: z.date(),
        endDate: z.date(),
      }),
    )
    .mutation(async ({ input }) => {
      const {
        meetingDuration,
        bufferTime,
        meetingDescription,
        isPhoneRequested,
        isAutomaticallyAccepted,
        startDate,
        endDate,
      } = input;
      const availabilities = [];
      let current = new Date(startDate);
      while (current < endDate) {
        const next = new Date(current.getTime() + meetingDuration * 60000);

        if (next > endDate) break;

        const availability = await prisma.availability.create({
          data: {
            userId: "1",
            date: current,
            startTime: startDate.toString(),
            endTime: next.toString(),
          },
        });

        availabilities.push(availability);

        current = new Date(next.getTime() + bufferTime * 60000);
      }
      return availabilities;
    }),
});
