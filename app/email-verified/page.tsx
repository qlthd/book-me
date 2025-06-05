"use client";
import React from "react";
import Ok from "@assets/icons/ok.svg";
import { PageLayout } from "@components/PageLayout/PageLayout";

const EmailVerifiedPage = () => {
  return (
    <PageLayout
      className="flex flex-col items-center justify-center w-full gap-2 p-12"
      previousBtn={{ hidden: true }}
    >
      <Ok className="size-20" />
      <h1 className="text-3xl font-semibold">You're all set !</h1>
      <h1 className="text-3xl font-semibold">
        Your email has been
        <span className="text-electric-blue"> verified</span>.
      </h1>
    </PageLayout>
  );
};
export default EmailVerifiedPage;
