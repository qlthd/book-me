'use client';

import React, { useState } from "react";
import { trpc } from "@/utils/trpc";
import { useParams } from "next/navigation";
import { PageLayout } from "../../components/PageLayout/PageLayout";

const Page = () => {
    const params = useParams();
    const availabilityId = Array.isArray(params?.availabilityId) ? params.availabilityId[0] : params?.availabilityId;

    const [errors, setErrors] = useState({
        firstName: "",
        lastName: "",
        email: "",
    });

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
            // Submit logic here
        }
    };

    const errorClass = "text-red-500 text-sm w-full";

    return (
        <PageLayout title="Book Slot">
            <label htmlFor="firstName" className="w-full text-left mb-1 text-lg font-medium text-dark-gray">
                First name
            </label>
            <input
                id="firstName"
                type="text"
                className={`border ${errors.firstName ? "border-red-500 text-red-500" : "border-gray-300"} rounded-md p-2 w-full`}
                placeholder="Enter a value"
            />
            {errors.firstName && <p className={errorClass}>{errors.firstName}</p>}

            <label htmlFor="lastName" className="w-full text-left mb-1 text-lg font-medium text-dark-gray">
                Last name
            </label>
            <input
                id="lastName"
                type="text"
                className={`border ${errors.lastName ? "border-red-500 text-red-500" : "border-gray-300"} rounded-md p-2 w-full`}
                placeholder="Enter a value"
            />
            {errors.lastName && <p className={errorClass}>{errors.lastName}</p>}

            <label htmlFor="email" className="w-full text-left mb-1 text-lg font-medium text-dark-gray">
                Email
            </label>
            <input
                id="email"
                type="email"
                className={`border ${errors.email ? "border-red-500 text-red-500" : "border-gray-300"} rounded-md p-2 w-full`}
                placeholder="Enter a value"
            />
            {errors.email && <p className={errorClass}>{errors.email}</p>}

            <div className="flex justify-start w-full gap-2">
                <button
                    type="button"
                    onClick={handleSubmit}
                    className="bg-electric-blue text-white rounded-md py-2 px-6 mt-4 hover:bg-light-blue"
                >
                    Confirm
                </button>
                <button
                    type="button"
                    className="bg-light-gray text-black rounded-md py-2 px-6 mt-4 hover:bg-light-blue"
                >
                    Cancel
                </button>
            </div>
        </PageLayout>
    );
};

export default Page;