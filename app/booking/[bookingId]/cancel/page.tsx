"use client";

import React, { useState } from "react";
import { trpc } from "@/utils/trpc";
import { PageLayout } from "@components/PageLayout/PageLayout";
import { BookingDetails } from "@components/BookingDetails/BookingDetails";
import { LoaderCircle } from "lucide-react";
import toast, { Toaster } from "react-hot-toast";
import { useParams } from "next/navigation";

const CancelBooking = () => {
  const [isCancelling, setIsCancelling] = useState(false);
  const params = useParams();
  const bookingId = Array.isArray(params?.bookingId)
    ? params.bookingId[0]
    : params?.bookingId;

  const bookingQueryResult = bookingId
    ? trpc.bookings.getBookingById.useQuery({ bookingId }, { enabled: true })
    : { isLoading: false, data: null };

  const cancelBookingMutation = trpc.bookings.cancelBooking.useMutation();

  const handleCancel = async () => {
    setIsCancelling(true);
    try {
      if (bookingId) {
        await cancelBookingMutation.mutate({ bookingId });
        toast.success("Booking successfully cancelled!");
      }
    } catch (err) {
      console.error("Error cancelling booking:", err);
      toast.error("Failed to cancel booking. Please try again later.");
    } finally {
      setIsCancelling(false);
    }
  };

  return (
    <PageLayout
      title={{
        text: "You are about to cancel :",
      }}
    >
      <div className="flex flex-col w-full gap-2">
        {bookingQueryResult.isLoading ? (
          <LoaderCircle className="animate-spin w-4 h-4" />
        ) : bookingQueryResult.data ? (
          <BookingDetails booking={bookingQueryResult.data} />
        ) : (
          <p>Aucune réservation trouvée.</p>
        )}
      </div>

      <label
        htmlFor="reason"
        className="w-full text-left mt-4 mb-1 text-sm font-medium text-dark-gray"
      >
        Reason (optional)
      </label>
      <textarea
        id="reason"
        className="w-full rounded-md p-2 border border-gray-300 text-sm"
      />
      <div className="flex justify-start w-full gap-2">
        <button
          type="button"
          onClick={handleCancel}
          disabled={isCancelling}
          className={`${isCancelling ? "bg-red-400 " : "bg-red-600"} text-white rounded-md py-2 px-6 mt-4 ${!isCancelling && "hover:bg-red-400"} `}
        >
          {isCancelling ? (
            <LoaderCircle className="animate-spin w-4 h-4" />
          ) : (
            "Cancel"
          )}
        </button>
        <button
          type="button"
          disabled={isCancelling}
          className={`bg-light-blue ${isCancelling ? "text-gray-500" : "text-electric-blue"} rounded-md py-2 px-6 mt-4 ${!isCancelling && "hover:bg-light-blue"}`}
        >
          Keep booking
        </button>
        <Toaster />
      </div>
    </PageLayout>
  );
};

export default CancelBooking;
