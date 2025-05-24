'use client';

import React, { useEffect, useState } from "react";
import { trpc } from "@/utils/trpc";
import { useParams, useRouter } from "next/navigation";
import { PageLayout } from "../../components/PageLayout/PageLayout";
import { useCalendarStore } from "../../stores/useCalendarStore";
import {formatDateToReadableString} from "../../helpers/dateHelper";

const Page = () => {
    const params = useParams();
    const router = useRouter();
    const userId = Array.isArray(params?.userId) ? params.userId[0] : params?.userId;
    const { selectedDate } = useCalendarStore();

    const formatDateYMD = (date: Date | null) => {
        return new Intl.DateTimeFormat('en-CA').format(date);
    }
    const availableSlotsQueryResult = trpc.availabilities.getByUserAndDate.useQuery({ userId, date: formatDateYMD(selectedDate) },
        { enabled : !!selectedDate });

    const [selectedSlot, setSelectedSlot] = useState(null);

    const handleSelect = (slot: any) => {
        setSelectedSlot(slot);
        router.push(`/book/${slot.id}`);
    };


    return (
        <PageLayout title={ { text: formatDateToReadableString(selectedDate) }} >
            {availableSlotsQueryResult.data && availableSlotsQueryResult.data.map((slot) => (
                <div
                    className="bg-light-gray rounded-lg p-2 m-2 text-center hover:bg-light-blue hover:text-electric-blue w-24 cursor-pointer"
                    key={slot}
                    onClick={() => handleSelect(slot)}
                >
                    {slot.startTime}
                </div>
            ))}
            {
                availableSlotsQueryResult.isLoading && Array.from({ length: 6 }).map((_, index) =>
                <div className="bg-gray-200 animate-pulse rounded-lg p-2 m-2 text-center w-24 h-10"/>)
            }

        </PageLayout>
    );
};

export default Page;