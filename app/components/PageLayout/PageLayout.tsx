import React, { useEffect } from "react";
import { SkeletonProps } from "./PageLayout.types";
import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import {useCalendarStore} from "../../stores/useCalendarStore";

export const PageLayout = (props : SkeletonProps) => {
    const { children, title, className, previousBtn = { disabled: false, hidden: false } } = props;
    const router = useRouter();
    const { selectedDate } = useCalendarStore();

    const handleBack = () => {
        router.back();
    };

    useEffect(() => {
        if (!selectedDate) {
            //router.push('/');
        }
    }, [selectedDate, router]);

    return (
        <div className="text-black bg-white shadow-lg rounded-lg m-12 p-6 min-h-40">
            <div className="flex items-center gap-2 mb-4">
                {!previousBtn.hidden &&
                    <button
                        disabled={previousBtn.disabled}
                        className={`bg-light-gray rounded-full h-12 w-12 p-2 shadow-sm hover:bg-light-blue ${previousBtn.disabled && 'text-gray-500 hover:bg-light-gray'}`}
                        onClick={handleBack}>
                        <ArrowLeft className="w-6 h-6 mx-auto" />
                    </button>
                }
                <h1 className={title?.className ?? "flex-1 text-center text-2xl"}>{title?.text}</h1>
            </div>
            <div className="flex flex-wrap justify-center items-start gap-1 p-4 w-full  text-black">
                {children}
            </div>
        </div>
    );
};

