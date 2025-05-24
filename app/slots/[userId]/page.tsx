'use client';

import React from "react";
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
        if (!date) return '';
        return new Intl.DateTimeFormat('en-CA').format(date);
    }

    const availableSlotsQueryResult = trpc.availabilities.getByUserAndDate.useQuery({ userId, date: formatDateYMD(selectedDate) },
        { enabled : !!selectedDate && !!userId });

    const handleSelect = (slot: any) => {
        router.push(`/book/${slot.id}`);
    };


    return (
        <PageLayout title={ { text: formatDateToReadableString(selectedDate) }} >
            {availableSlotsQueryResult.data && availableSlotsQueryResult.data.map((slot) => (
                <button
                    className="bg-light-gray rounded-lg p-2 m-2 text-center hover:bg-light-blue hover:text-electric-blue w-24 cursor-pointer"
                    key={slot.id}
                    onClick={() => handleSelect(slot)}
                    type="button"
                >
                    {slot.startTime}
                </button>
            ))}
            {
                availableSlotsQueryResult.isLoading && Array.from({ length: 6 }).map((_, index) =>
                <div
                    className="bg-gray-200 animate-pulse rounded-lg p-2 m-2 text-center w-24 h-10"
                    key={index}
                />)
            }

        </PageLayout>
    );
};

export default Page;