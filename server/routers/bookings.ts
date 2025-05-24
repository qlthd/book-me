import { z } from "zod";
import { publicProcedure, router } from "../index";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const bookingsRouter = router({
    getBookingsByEmail: publicProcedure
        .input(
            z.object({
                email: z.string(),
            })
        )
        .query(async ({ input }) => {
            const { email } = input;

            return prisma.booking.findMany({
                where: {
                    inviteeEmail: email
                },
                include: {
                    availability: true,
                },
            });
        }),
    createBooking: publicProcedure
        .input(
            z.object({
                inviteeFirstName: z.string(),
                inviteeLastName: z.string(),
                inviteeEmail: z.string().email(),
                userId: z.string(),
                eventTypeId: z.string(),
                availabilityId: z.string(),
            })
        )
        .mutation(async ({ input }) => {
            const { inviteeFirstName, inviteeLastName, inviteeEmail,
                userId, availabilityId, eventTypeId } = input;

            const availability = await prisma.availability
                    .findUnique({ where: { id: availabilityId } });
            if(!availability) {
                throw new Error("Availability not found");
            }
            return prisma.booking.create({
                data: {
                    inviteeFirstName,
                    inviteeLastName,
                    inviteeEmail,
                    hostId: userId,
                    eventTypeId,
                    availability: {
                        connect: { id: availabilityId },
                    },
                    createdAt: new Date()
                },
            });
        }),
});