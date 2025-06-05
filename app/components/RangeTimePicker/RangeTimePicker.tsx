import React, { useEffect } from "react";
import Google from "@assets/icons/google.svg";
import { signIn, signOut } from "next-auth/react";
import { TextInput } from "../TextInput/TextInput";
import { useForm } from "react-hook-form";
import { ForgotPasswordSchema } from "@components/Modal/Modal.types";
import { yupResolver } from "@hookform/resolvers/yup";
import {
  RangeTimePickerFormValues,
  RangeTimePickerSchema,
} from "@components/RangeTimePicker/RangeTimePicker.props";
import TimeInput from "@components/TimeInput/TimeInput";

export const RangeTimePicker = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<RangeTimePickerFormValues>({
    resolver: yupResolver(RangeTimePickerSchema),
  });

  return (
    <div className="flex gap-x-8 ">
      <TextInput
        error={errors.startTime?.message}
        {...register("startTime")}
        name="Start time"
      />
      <TextInput
        error={errors.startTime?.message}
        {...register("endTime")}
        name="End time"
      />
      {/*<TimeInput />*/}
    </div>
  );
};
