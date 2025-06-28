"use client";

import React, { useEffect, useState } from "react";
import { PageLayout } from "@components/PageLayout/PageLayout";
import { useRouter } from "next/navigation";
import BookMeLogo from "@assets/icons/bookme.svg";
import { Eye, EyeOff, LoaderCircle } from "lucide-react";
import { GooglePill } from "@components/GooglePill/GooglePill";
import { useSession } from "next-auth/react";
import { Modal } from "@components/Modal/Modal";
import toast, { Toaster } from "react-hot-toast";
import { FacebookPill } from "@components/FacebookPill/FacebookPill";
import { TextInput } from "@components/TextInput/TextInput";
import * as yup from "yup";

export const ForgotPasswordSchema = yup.object().shape({
  email: yup.string().email("Email invalide").required("Email requis"),
});

export type ForgotPasswordFormValues = {
  email: string;
};

const Login = () => {
  const router = useRouter();

  const [formData, setFormData] = useState({ email: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { data: session, status } = useSession();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ForgotPasswordFormValues>({
    resolver: yupResolver(ForgotPasswordSchema),
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
    setErrors((prev) => ({ ...prev, [id]: false }));
  };

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  const onModalConfirm = () => {
    setIsModalOpen(false);
    toast.success("Email sent successfully!");
  };

  const onClose = () => {
    setIsModalOpen(false);
  };

  const onSubmit = () => {};

  return (
    <PageLayout
      title={{
        text: "",
      }}
      previousBtn={{ hidden: true }}
    >
      <BookMeLogo />
      <label
        htmlFor="email"
        className="w-full text-left mb-1 text-lg font-medium text-dark-gray"
      >
        Email
      </label>
      <input
        id="email"
        type="email"
        value={formData.email}
        onChange={handleInputChange}
        className={`border ${errors.email ? "border-red-500 text-red-500" : "border-gray-300"} rounded-md p-2 w-full`}
        placeholder="Enter your email"
      />
      <label
        htmlFor="password"
        className="w-full text-left mb-1 text-lg font-medium text-dark-gray"
      >
        Password
      </label>
      <div className="relative w-full">
        <button
          className="text-dark-gray absolute right-3 inset-y-0 my-auto "
          onClick={() => setShowPassword(!showPassword)}
        >
          {showPassword ? <EyeOff /> : <Eye />}
        </button>
        <input
          type={showPassword ? "text" : "password"}
          placeholder="Enter your password"
          className={`border ${errors.password ? "border-red-500 text-red-500" : "border-gray-300"} rounded-md p-2 w-full`}
        />
      </div>
      <button
        className="flex w-full justify-end text-electric-blue text-sm hover:underline cursor-pointer"
        onClick={() => setIsModalOpen(true)}
      >
        Forgot your password ?
      </button>
      <div className="flex flex-col items-center gap-1 w-full">
        <button
          type="button"
          onClick={handleSubmit}
          disabled={isSubmitting}
          className={`${isSubmitting ? "bg-light-blue w-24" : "bg-electric-blue"} text-white rounded-md py-2 px-6 mt-4 ${!isSubmitting && "hover:bg-light-blue"} `}
        >
          {isSubmitting ? (
            <LoaderCircle className="animate-spin h-6 w-6 mx-auto" />
          ) : (
            "Sign in"
          )}
        </button>
        <div
          className="flex items-center gap-2 my-2 w-full"
          data-testid="divider"
        >
          <hr className="w-full h-px bg-gray-300 border-0" />
          <p className="w-full text-sm text-center text-baltic-sea">
            or sign in with
          </p>
          <hr className="w-full h-px bg-gray-300 border-0" />
        </div>
        <GooglePill />
        <FacebookPill />

        {isModalOpen && (
          <Modal onConfirm={onModalConfirm} onClose={onClose}>
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
          </Modal>
        )}
        <Toaster />
      </div>
    </PageLayout>
  );
};

export default Login;
