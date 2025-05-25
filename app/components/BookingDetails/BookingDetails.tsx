
import React, {useEffect} from "react";
import {formatDateToReadableString} from "../../helpers/dateHelper";
import Meet from "../../../public/icons/meet.svg";
import { BookingDetailsProps } from "./BookingDetails.types";

export const BookingDetails = (props: BookingDetailsProps) => {
    const { booking } = props;
    return (
        <div className="flex flex-col">
            <div className="flex items-center gap-2">
                <Meet className="w-8 h-8"/>
                <h1 className="text-xl font-bold">1:1 Jane & John</h1>
            </div>
            <span className="font-bold">{formatDateToReadableString(new Date(booking.availability.date))}</span>
            <span className="font-bold">{booking.availability.startTime} - {booking.availability.endTime}</span>
        </div>
    );
};

