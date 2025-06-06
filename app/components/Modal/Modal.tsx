import React, { useState } from "react";
import { TextInput } from "@components/TextInput/TextInput";
import {
  ForgotPasswordFormValues,
  ForgotPasswordSchema,
  ModalProps,
} from "@components/Modal/Modal.types";
import * as yup from "yup";
import { SubmitHandler, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

export const Modal = (props: ModalProps) => {
  const { onConfirm, onClose } = props;
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ForgotPasswordFormValues>({
    resolver: yupResolver(ForgotPasswordSchema),
  });

  const onSubmit: SubmitHandler<ForgotPasswordFormValues> = (data) => {
    console.log("test");
    console.log("data", data);
  };

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
          <div className="flex flex-col gap-y-2 transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg p-8">
            <div className="flex flex-col mb-4 gap-y-2">
              <h1 className="w-full text-center mx-auto text-xl">
                Forgot your password ?
              </h1>
              <p className="text-gray-500 text-sm text-center w-full">
                Enter your email address below and we will send you a link to
                reset your password.
              </p>
            </div>
            <form onSubmit={handleSubmit(onSubmit)}>
              <TextInput
                error={errors.email?.message}
                {...register("email")}
                label="Email"
              />
              <div className="flex gap-x-2">
                <button
                  type="submit"
                  className="inline-flex mt-3 justify-center rounded-md bg-electric-blue px-3 py-2 text-sm font-semibold text-white shadow-xs hover:bg-light-blue w-auto"
                >
                  Confirm
                </button>
                <button
                  type="button"
                  onClick={onClose}
                  className="inline-flex mt-3 justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-xs ring-1 ring-gray-300 ring-inset hover:bg-gray-50 w-auto"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};
