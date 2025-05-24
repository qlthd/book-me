'use client';

import React, { useState } from "react";
import { useParams } from "next/navigation";
import { LoaderCircle } from "lucide-react";
import toast, {Toaster} from "react-hot-toast";
import Ok from "../../../../public/icons/ok.svg";
import {PageLayout} from "../../../components/PageLayout/PageLayout";

const ConfirmPage = () => {
    const params = useParams();
    const availabilityId = Array.isArray(params?.availabilityId) ? params.availabilityId[0] : params?.availabilityId;
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [errors, setErrors] = useState({
        firstName: "",
        lastName: "",
        email: "",
    });

    const notifySuccess = () => toast.success('Slot successfully booked!');

    const handleSubmit = () => {
        const newErrors = { firstName: "", lastName: "", email: "" };

        if (!document.getElementById("firstName")?.value) {
            newErrors.firstName = "First name is required.";
        }
        if (!document.getElementById("lastName")?.value) {
            newErrors.lastName = "Last name is required.";
        }
        const emailValue = document.getElementById("email")?.value;
        if (!emailValue) {
            newErrors.email = "Email is required.";
        } else if (!/\S+@\S+\.\S+/.test(emailValue)) {
            newErrors.email = "Invalid email format.";
        }

        setErrors(newErrors);

        if (!newErrors.firstName && !newErrors.lastName && !newErrors.email) {
            setIsSubmitting(true);
            notifySuccess();
        }
    };


    return (
        <PageLayout hidePreviousBtn>
            <div className="flex flex-col items-center justify-center w-full gap-2">
                <Ok className="w-12 h-12 gap-4"/>
                Successfully booked on
                <b>Wednesday, April 7th, 2021 at 18:00 </b>
                <div className="flex gap-4">
                    <button
                        type="button"
                        onClick={handleSubmit}
                        disabled={isSubmitting}
                        className={`${isSubmitting ? 'bg-light-blue ' : 'bg-electric-blue'} text-white rounded-md py-2 px-6 mt-4 ${!isSubmitting && 'hover:bg-light-blue'} `}
                    >
                        {isSubmitting ?
                            <LoaderCircle className="animate-spin w-4 h-4" /> :
                            "Change slot"
                        }
                    </button>
                    <button
                        type="button"
                        disabled={isSubmitting}
                        className={`bg-light-gray ${isSubmitting ? 'text-gray-500' : 'text-black'} rounded-md py-2 px-6 mt-4 ${!isSubmitting && 'hover:bg-light-blue'}`}
                    >
                        Cancel booking
                    </button>
                    <Toaster />
                </div>
            </div>


        </PageLayout>
    );
};

export default ConfirmPage;