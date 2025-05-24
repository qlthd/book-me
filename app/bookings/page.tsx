'use client';

import React from "react";
import { trpc } from "@/utils/trpc";
import { PageLayout} from "../components/PageLayout/PageLayout";
import {formatDateToReadableString} from "../helpers/dateHelper";

const Bookings = () => {

    const upcomingBookingsQueryResult =
        trpc.bookings.getBookingsByEmail.useQuery({ email : "quentinlathaud@hotmail.fr" },);
    const bookingsLength = upcomingBookingsQueryResult.data?.length || 0;


    return (
        <PageLayout
            title={{
                text: bookingsLength > 0 ? `Your upcoming bookings (${bookingsLength})` : "",
                className: "text-electric-blue font-bold text-xl"
            }}
            previousBtn={{ hidden: true }}
        >
            {
                upcomingBookingsQueryResult.data?.map((booking) =>
                    <div className="flex w-full justify-between items-center" key={booking.id}>
                        <div>
                            <h1 className="text-xl font-bold">1:1 Jane & John</h1>
                        </div>
                        {booking.availability &&
                            <div className="flex justify-end font-bold gap-2">
                                <span>{formatDateToReadableString(new Date(booking.availability.date))}</span>
                                <span>{booking.availability.startTime } - {booking.availability.endTime}</span>
                            </div>
                        }
                    </div>
                )
            }
        </PageLayout>
    );
};

export default Bookings;