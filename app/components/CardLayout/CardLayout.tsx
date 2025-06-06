import React, { useEffect } from "react";

export const CardLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex rounded-lg bg-white border border-gray-200 shadow-lg p-4 justify-between items-center gap-x-4">
      {children}
    </div>
  );
};
