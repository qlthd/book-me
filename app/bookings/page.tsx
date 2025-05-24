'use client';

import React, { useEffect, useState } from "react";
import { trpc } from "@/utils/trpc";
import { useParams, useRouter } from "next/navigation";
import {PageLayout} from "../components/PageLayout/PageLayout";

const Bookings = () => {

    const upcomingBookingsQueryResult =
        trpc.bookings.getBookingsByEmail.useQuery({ email : "quentinlathaud@hotmail.fr" },);



    return (
        <PageLayout
            title={{ text: "Your upcoming bookings (3)", className: "text-electric-blue font-bold text-xl" }}
            previousBtn={{ hidden: true }}
        >
            {
                JSON.stringify(upcomingBookingsQueryResult.data)
            }
        </PageLayout>
    );
};

export default Bookings;