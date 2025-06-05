"use client";
import React, { useState } from "react";
import { PageLayout } from "@components/PageLayout/PageLayout";
import { TextInput } from "@components/TextInput/TextInput";
import { useForm } from "react-hook-form";
import {
  ForgotPasswordFormValues,
  ForgotPasswordSchema,
} from "@components/Modal/Modal.types";
import { yupResolver } from "@hookform/resolvers/yup";
import { CardLayout } from "@components/CardLayout/CardLayout";
import { RangeTimePicker } from "../components/RangeTimePicker/RangeTimePicker";
import { TrashIcon } from "lucide-react";
import Switch from "@components/Switch/Switch";
const ConfigurePage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ForgotPasswordFormValues>({
    resolver: yupResolver(ForgotPasswordSchema),
  });
  const [breakTimesCount, setBreakTimesCount] = useState(0);

  return (
    <PageLayout
      className="mx-"
      previousBtn={{ hidden: true }}
      title={{
        text: "Configure meeting parameters and availability",
        className: "text-2xl",
      }}
      fullWidth
    >
      <div className="">
        <div className="grid grid-cols-2 gap-4">
          <TextInput
            error={errors.email?.message}
            {...register("email")}
            name="Meeting duration (minutes)"
          />
          <TextInput
            error={errors.email?.message}
            {...register("email")}
            name="Buffer time (minutes)"
          />
          <TextInput
            error={errors.email?.message}
            {...register("email")}
            name="Start time"
          />
          <TextInput
            error={errors.email?.message}
            {...register("email")}
            name="End time"
          />
        </div>

        <div>
          <div className="flex items-center justify-between my-2">
            <h1 className="text-xl">Break times</h1>
            <button
              className="bg-electric-blue  text-white hover:bg-light-blue rounded-lg px-4 py-2"
              onClick={() => setBreakTimesCount(breakTimesCount + 1)}
            >
              Add break time
            </button>
          </div>
          <div className="grid grid-cols-1 gap-4">
            {breakTimesCount == 0 && (
              <p className="text-gray-500 text-sm">No breaks configured</p>
            )}
            {Array.from({ length: breakTimesCount }).map((_, index) => (
              <CardLayout
                key={index}
                className="flex items-center justify-between"
              >
                <RangeTimePicker />
                <button
                  type="button"
                  className="bg-red-500 hover:bg-red-400 rounded-full p-4"
                  onClick={() => setBreakTimesCount(breakTimesCount - 1)}
                >
                  <TrashIcon color="white" />
                </button>
              </CardLayout>
            ))}
          </div>
        </div>

        <div className="mt-12">
          <label
            htmlFor="description"
            className="block mb-2 text-lg font-medium"
          >
            Meeting description
          </label>
          <textarea
            className="border border-gray-300 w-full rounded-md"
            rows="3"
            id="description"
          />
        </div>
        <div className="inline-flex gap-x-6 mt-8">
          <Switch
            description="Make phone number mandatory for bookings"
            label="Require phone number"
          />
          <Switch label="Auto-accept bookings" />
        </div>
      </div>
    </PageLayout>
  );
};
export default ConfigurePage;
