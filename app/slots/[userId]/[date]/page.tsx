'use client';

import React, { useState } from "react";
import { trpc } from "@/utils/trpc";
import { useParams, useRouter } from "next/navigation";
import { PageLayout } from "../../../components/PageLayout/PageLayout";

const Page = () => {
    const params = useParams();
    const userId = Array.isArray(params?.userId) ? params.userId[0] : params?.userId;
    const date = Array.isArray(params?.date) ? params.date[0] : params?.date;
    const router = useRouter();
    const availableSlotsQueryResult = trpc.availabilities.getByUserAndDate.useQuery({ userId, date });

    const [selectedSlot, setSelectedSlot] = useState(null);

    const handleSelect = (slot: any) => {
        setSelectedSlot(slot);
        router.push(`/book/${slot.id}`);
    };

    const formatDate = (date: Date): string => {
        const options: Intl.DateTimeFormatOptions = {
            weekday: "long",
            month: "long",
            day: "numeric",
            year: "numeric",
        };
        return date.toLocaleDateString("en-US", options);
    };

    return (
        <PageLayout title={formatDate(new Date(date))} >
            {availableSlotsQueryResult.data && availableSlotsQueryResult.data.map((slot) => (
                <div
                    className={`bg-light-gray rounded-lg p-2 m-2 text-center hover:bg-light-blue hover:text-electric-blue w-24 cursor-pointer ${
                        selectedSlot === slot ? "!bg-electric-blue text-white hover:bg-electric-blue" : ""
                    }`}
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