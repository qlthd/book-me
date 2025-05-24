'use client';

import React, { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { LoaderCircle } from "lucide-react";
import toast, {Toaster} from "react-hot-toast";
import Ok from "../../../../public/icons/ok.svg";
import {PageLayout} from "../../../components/PageLayout/PageLayout";
import {useCalendarStore} from "../../../stores/useCalendarStore";
import {formatDateToReadableString} from "../../../helpers/dateHelper";

const ConfirmPage = () => {
    const params = useParams();
    const router = useRouter();
    const { selectedDate } = useCalendarStore();
    const availabilityId = Array.isArray(params?.availabilityId) ? params.availabilityId[0] : params?.availabilityId;
    const [isChangingSlot, setIsChangingSlot] = useState(false);
    const [isCancelling, setIsCancelling] = useState(false);

    const cancelBooking = async () => {
        setIsCancelling(true);
        setTimeout(() => {
            notifyCancelSuccess();
            setIsCancelling(false);
        }, 2000);
    }

    const notifyCancelSuccess = () => toast.success('Booking successfully cancelled!');

    const changeSlot = () => {
        setIsChangingSlot(true);
        // Simulate a delay for the change slot operation
        setTimeout(() => {
            router.push(`/slots/${params?.userId}/${params?.date}`);
        }, 2000);
    }

    return (
        <PageLayout previousBtn={{ hidden: true }}>
            <div className="flex flex-col items-center justify-center w-full gap-2">
                <Ok className="w-12 h-12 gap-4"/>
                Successfully booked on
                <b>{formatDateToReadableString(selectedDate)}</b>
                <div className="flex gap-4">
                    <button
                        type="button"
                        onClick={changeSlot}
                        disabled={isChangingSlot || isCancelling}
                        className={`${isChangingSlot || isCancelling ? 'bg-light-blue ' : 'bg-electric-blue'} text-white rounded-md py-2 px-6 mt-4 ${!isChangingSlot && 'hover:bg-light-blue'} `}
                    >
                        {isChangingSlot ?
                            <LoaderCircle className="animate-spin w-4 h-4" /> :
                            "Change slot"
                        }
                    </button>
                    <button
                        type="button"
                        disabled={isCancelling}
                        onClick={cancelBooking}
                        className={`bg-light-gray ${isCancelling ? 'text-gray-500' : 'text-black'} rounded-md py-2 px-6 mt-4 ${!isCancelling && 'hover:bg-light-blue'}`}
                    >
                        {isCancelling ?
                            <LoaderCircle className="animate-spin w-4 h-4" /> :
                            "Cancel booking"
                        }
                    </button>
                    <Toaster />
                </div>
            </div>


        </PageLayout>
    );
};

export default ConfirmPage;