import { z } from "zod";
import { publicProcedure, router } from "../index";
import { PrismaClient } from "@prisma/client";
import {$brand} from "zod/dist/types/v4";

const prisma = new PrismaClient();

export const bookingsRouter = router({
    getBookingById: publicProcedure
        .input(
            z.object({
                    bookingId: z.string(),
            })
        ).query(async ({ input }) => {
            const { bookingId } = input;

            return prisma.booking.findUnique({
                where: {
                    id: bookingId
                },
                include: {
                    availability: true,
                },
            });
        }),
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
        cancelBooking: publicProcedure
        .input(
            z.object({
                bookingId: z.string(),
            })
        ).mutation(async ({ input }) => {
            console.log("Cancel booking input:", input);
            const { bookingId } = input;
            const booking = await prisma.booking.findUnique({
                where: { id: bookingId },
            });
            if (!booking) {
                throw new Error("Booking not found");
            }
            return prisma.booking.delete(
                {
                    where: { id: bookingId },
                }
            );
        })
});