import React, { useState } from "react";
import { TextInput } from "@components/TextInput/TextInput";
import { ModalProps } from "@components/Modal/Modal.types";

export const Modal = (props: ModalProps) => {
  const { onConfirm } = props;
  const [emailValue, setEmailValue] = useState<string>("");
  return (
    <div
      className="relative z-10"
      aria-labelledby="modal-title"
      role="dialog"
      aria-modal="true"
    >
      <div
        className="fixed inset-0 bg-gray-500/75 transition-opacity"
        aria-hidden="true"
      ></div>

      <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
        <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
          <div className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
            <h1 className="w-full text-center mx-auto my-4 text-xl">
              Forgot your password ?
            </h1>
            <p className="text-gray-500 text-sm text-center mx-20">
              Enter your email address below and we will send you a link to
              reset your password.
            </p>
            <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
              <TextInput
                name="Email"
                type="email"
                value={emailValue}
                onChange={(e) => {
                  setEmailValue(e.target.value);
                }}
              />
            </div>
            <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
              <button
                type="button"
                onClick={onConfirm}
                className="inline-flex w-full justify-center rounded-md bg-electric-blue px-3 py-2 text-sm font-semibold text-white shadow-xs hover:bg-light-blue sm:ml-3 sm:w-auto"
              >
                Confirm
              </button>
              <button
                type="button"
                className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-xs ring-1 ring-gray-300 ring-inset hover:bg-gray-50 sm:mt-0 sm:w-auto"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
