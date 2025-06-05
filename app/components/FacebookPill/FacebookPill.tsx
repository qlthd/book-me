import React, { useEffect } from "react";
import Facebook from "@assets/icons/facebook.svg";
import { signIn, signOut } from "next-auth/react";

export const FacebookPill = () => {
  return (
    <button
      aria-label="Sign in with Facebook"
      className="flex items-center bg-white border border-button-snow-tiger rounded-md p-0.5 pr-4 w-32"
      onClick={() => signIn("facebook")}
    >
      <div className="flex items-center justify-center w-9 h-9 rounded-full">
        <Facebook className="w-36" />
      </div>
      <span className="text-sm text-baltic-sea tracking-wider">Facebook</span>
    </button>
  );
};
