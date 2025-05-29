"use client";

import React, { useEffect, useState } from "react";
import { PageLayout } from "@components/PageLayout/PageLayout";
import { useRouter } from "next/navigation";
import BookMeLogo from "@assets/icons/bookme.svg";
import { Eye, EyeOff, LoaderCircle } from "lucide-react";
import { GooglePill } from "@components/GooglePill/GooglePill";
import { useSession } from "next-auth/react";
import { TextInput } from "@components/TextInput/TextInput";
import * as yup from "yup";
import { useForm, SubmitHandler } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

type FormValues = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  passwordConfirmation: string;
};

const signUpSchema = yup.object().shape({
  firstName: yup.string().required("Prénom requis"),
  lastName: yup.string().required("Nom requis"),
  email: yup.string().email("Email invalide").required("Email requis"),
  password: yup
    .string()
    .min(6, "Le mot de passe doit contenir au moins 6 caractères")
    .required("Mot de passe requis"),
  passwordConfirmation: yup
    .string()
    .required("Confirm password is required")
    .oneOf([yup.ref("password")], "Passwords must match"),
});

const SignUpPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>({
    resolver: yupResolver(signUpSchema),
  });

  const onSubmit: SubmitHandler<FormValues> = (data) => {
    console.log(data);
  };

  return (
    <PageLayout
      title={{
        text: "",
      }}
      previousBtn={{ hidden: true }}
    >
      <BookMeLogo />
      <form onSubmit={handleSubmit(onSubmit)}>
        <TextInput
          name="First name"
          register={register}
          error={errors.firstName?.message}
        />
        <TextInput
          name="Last name"
          register={register}
          error={errors.lastName?.message}
        />
        <TextInput
          name="Email"
          type="email"
          register={register}
          error={errors.email?.message}
        />
        <TextInput
          name="Password"
          type="password"
          register={register}
          error={errors.password?.message}
        />
        <TextInput
          name="Confirm password"
          type="password"
          register={register}
          error={errors.passwordConfirmation?.message}
        />
        <button
          type="submit"
          disabled={isSubmitting}
          className={`${isSubmitting ? "bg-light-blue " : "bg-electric-blue"} text-white rounded-md py-2 px-6 mt-4 ${
            !isSubmitting && "hover:bg-light-blue"
          }`}
        >
          {isSubmitting ? (
            <LoaderCircle className="animate-spin w-4 h-4" />
          ) : (
            "Sign up"
          )}
        </button>
      </form>
    </PageLayout>
  );
};

export default SignUpPage;
