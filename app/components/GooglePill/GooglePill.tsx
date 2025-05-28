import React, { useEffect } from "react";
import Google from "@assets/icons/google.svg";
import { signIn, signOut } from "next-auth/react";

export const GooglePill = () => {
  return (
    <button
      aria-label="Sign in with Google"
      className="flex items-center bg-white border border-button-snow-tiger rounded-md p-0.5 pr-4"
      onClick={() => signIn("google")}
    >
      <div className="flex items-center justify-center bg-white w-9 h-9 rounded-full">
        <Google className="w-5 h-5" />
      </div>
      <span className="text-sm text-baltic-sea tracking-wider">Google</span>
    </button>
  );
};
