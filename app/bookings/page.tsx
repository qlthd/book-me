"use client";

import React, { useState } from "react";
import { trpc } from "@/utils/trpc";
import { PageLayout } from "@components/PageLayout/PageLayout";
import { LoaderCircle } from "lucide-react";
import { BookingDetails } from "@components/BookingDetails/BookingDetails";
import { useRouter } from "next/navigation";

const Bookings = () => {
  const router = useRouter();
  const [isChangingSlot, setIsChangingSlot] = useState(false);
  const [isCancelling, setIsCancelling] = useState(false);
  const upcomingBookingsQueryResult = trpc.bookings.getBookingsByEmail.useQuery(
    { email: "quentinlathaud@hotmail.fr" },
  );
  const bookingsLength = upcomingBookingsQueryResult.data?.length || 0;

  const cancelBooking = (bookingId: string) => {
    router.push(`/booking/${bookingId}/cancel`);
  };

  return (
    <PageLayout
      title={{
        text:
          bookingsLength > 0
            ? `Your upcoming bookings (${bookingsLength})`
            : "",
        className: "text-electric-blue font-bold text-xl",
      }}
      previousBtn={{ hidden: true }}
    >
      {upcomingBookingsQueryResult.data?.map((booking) => (
        <div
          className="flex w-full justify-between items-center"
          key={booking.id}
        >
          {booking.availability && <BookingDetails booking={booking} />}
          <div className="flex items-center justify-end gap-4">
            <div className="flex gap-2">
              <button
                className={`${isChangingSlot || isCancelling ? "bg-light-blue " : "bg-electric-blue"} bg-light-blue text-electric-blue rounded-md py-2 px-6 ${!isChangingSlot && "hover:bg-electric-blue hover:text-white"} `}
              >
                Reschedule
              </button>
              <button
                type="button"
                disabled={isCancelling}
                onClick={() => cancelBooking(booking.id)}
                className={`bg-light-gray ${isCancelling ? "text-gray-500" : "text-black"} rounded-md py-2 px-6 ${!isCancelling && "hover:bg-light-blue"}`}
              >
                {isCancelling ? (
                  <LoaderCircle className="animate-spin w-4 h-4" />
                ) : (
                  "Cancel booking"
                )}
              </button>
            </div>
          </div>
        </div>
      ))}
    </PageLayout>
  );
};

export default Bookings;
