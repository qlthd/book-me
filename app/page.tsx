"use client";

import { CustomDayPicker } from "./components/CustomDayPicker/CustomDayPicker";
import { ClockIcon } from "lucide-react";
import React, { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { useCalendarStore } from "@/app/stores/useCalendarStore";
import { trpc } from "@/utils/trpc";
import { formatDateToReadableString } from "@/app/helpers/dateHelper";
import { Modal } from "@components/Modal/Modal";
export default function Home() {
  const identity = "John Doe";
  const meetingName = "Acme Corp Meeting";
  const duration = "30 minutes";
  const params = useParams();
  const router = useRouter();
  const userId = "cmazqg2gn0000f0qclgj098ns";

  const { selectedDate } = useCalendarStore();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const formatDateYMD = (date: Date | null) => {
    if (!date) return "";
    return new Intl.DateTimeFormat("en-CA").format(date);
  };

  const availableSlotsQueryResult =
    trpc.availabilities.getByUserAndDate.useQuery(
      { userId, date: formatDateYMD(selectedDate) },
      { enabled: !!selectedDate && !!userId },
    );

  useEffect(() => {
    if (selectedDate) {
    }
  }, [selectedDate]);
  const handleSelect = (slot: any) => {
    //router.push(`/book/${slot.id}`);
    setIsModalOpen(true);
  };

  return (
    <div className="m-12">
      <div className="flex items-center gap-2">
        <img
          src="https://images.ctfassets.net/h6goo9gw1hh6/2sNZtFAWOdP1lmQ33VwRN3/24e953b920a9cd0ff2e1d587742a2472/1-intro-photo-final.jpg"
          className="rounded-full w-10 h-10"
        />
        <p className="text-sm">{identity}</p>
      </div>
      <h1 className="text-2xl font-bold">{meetingName}</h1>
      <div className="flex items-center gap-2 mb-4">
        <ClockIcon size={16} />
        {duration}
      </div>
      <div className="flex gap-4">
        <CustomDayPicker />
        {availableSlotsQueryResult.data &&
          availableSlotsQueryResult.data.length > 0 && (
            <div className="rounded-lg w-full bg-white-smoke shadow-custom-soft">
              <h1 className="mx-auto w-full text-center p-4">
                {formatDateToReadableString(selectedDate)}
              </h1>
              <div className="mx-auto w-full flex flex-wrap justify-center">
                {availableSlotsQueryResult.data.map((slot) => (
                  <button
                    className="bg-light-gray rounded-lg p-2 m-2 text-center hover:bg-light-blue hover:text-electric-blue w-24 cursor-pointer"
                    key={slot.id}
                    onClick={() => handleSelect(slot)}
                    type="button"
                  >
                    {slot.startTime}
                  </button>
                ))}
                {availableSlotsQueryResult.isLoading &&
                  Array.from({ length: 6 }).map((_, index) => (
                    <div
                      className="bg-gray-200 animate-pulse rounded-lg p-2 m-2 text-center w-24 h-10"
                      key={index}
                    />
                  ))}
              </div>
            </div>
          )}
        {isModalOpen && <Modal onConfirm={onModalConfirm} onClose={onClose} />}
      </div>
    </div>
  );
}
