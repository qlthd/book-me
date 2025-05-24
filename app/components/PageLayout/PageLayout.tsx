import React from "react";
import { SkeletonProps } from "./PageLayout.types";
import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";

export const PageLayout = (props : SkeletonProps) => {
    const { children, title, className, hidePreviousBtn = false } = props;
    const router = useRouter();

    const handleBack = () => {
        router.back();
    };

    return (
        <div className="text-black bg-white shadow-lg rounded-lg m-12 p-6 min-h-40">
            <div className="flex items-center gap-2 mb-4">
                {!hidePreviousBtn &&
                    <button className="bg-light-gray rounded-full h-12 w-12 p-2 shadow-sm hover:bg-light-blue" onClick={handleBack}>
                        <ArrowLeft className="w-6 h-6 mx-auto" />
                    </button>
                }
                <h1 className="flex-1 text-center text-2xl">{title}</h1>
            </div>
            <div className="flex flex-wrap justify-center items-start gap-1 p-4 w-full  text-black">
                {children}
            </div>
        </div>
    );
};

