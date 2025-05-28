"use client";
import React from "react";
import Paperplane from "@assets/icons/paperplane.svg";
import { PageLayout } from "@components/PageLayout/PageLayout";

const SignupSuccessPage = () => {
  return (
    <PageLayout
      className="flex flex-col items-center justify-center w-full gap-2 p-12"
      previousBtn={{ hidden: true }}
    >
      <Paperplane />
      <h1 className="text-3xl font-semibold">
        Check your <span className="text-electric-blue">email</span> !
      </h1>
      <h1 className="text-3xl font-semibold">
        We've sent you a link to
        <span className="text-electric-blue"> confirm</span> your account.
      </h1>
    </PageLayout>
  );
};

export default SignupSuccessPage;
