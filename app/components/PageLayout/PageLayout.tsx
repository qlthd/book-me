import React, { useEffect } from "react";
import { PageLayoutProps } from "./PageLayout.types";
import { ArrowLeft, LoaderCircle } from "lucide-react";
import { useRouter, usePathname } from "next/navigation";
import { useSession } from "next-auth/react";

export const PageLayout = (props: PageLayoutProps) => {
  const {
    children,
    title = { disabled: true },
    className,
    previousBtn = { disabled: false, hidden: false },
  } = props;

  const router = useRouter();
  const pathname = usePathname();

  const handleBack = () => {
    router.back();
  };
  const { data: session, status } = useSession();
  const unauthenticatedRoutes = ["/login", "/sign-up"];

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/login");
    }
    if (
      unauthenticatedRoutes.find((r) => r == pathname) &&
      status === "authenticated"
    ) {
      router.push("/s");
    }
  }, [status]);

  const shouldRenderContent =
    (status === "authenticated" && !unauthenticatedRoutes.includes(pathname)) ||
    (status === "unauthenticated" && unauthenticatedRoutes.includes(pathname));

  return shouldRenderContent ? (
    <div className="text-black bg-white shadow-lg rounded-lg m-12 p-6 min-h-40">
      {(!previousBtn.hidden || !title.disabled) && (
        <div className="flex items-center gap-2 mb-4">
          {!previousBtn.hidden && (
            <button
              disabled={previousBtn.disabled}
              className={`bg-light-gray rounded-full h-12 w-12 p-2 shadow-sm hover:bg-light-blue ${previousBtn.disabled && "text-gray-500 hover:bg-light-gray"}`}
              onClick={handleBack}
            >
              <ArrowLeft className="w-6 h-6 mx-auto" />
            </button>
          )}
          {!title.disabled && (
            <h1 className={title?.className ?? "flex-1 text-center text-2xl"}>
              {title?.text}
            </h1>
          )}
        </div>
      )}
      <div
        className={
          className ??
          `flex flex-wrap justify-center items-start gap-1 p-4 w-full text-black`
        }
      >
        {children}
      </div>
    </div>
  ) : (
    <> </>
  );
};
