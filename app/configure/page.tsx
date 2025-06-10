"use client";
import React, { useState } from "react";
import { PageLayout } from "@components/PageLayout/PageLayout";
import { TextInput } from "@components/TextInput/TextInput";
import { FormProvider, SubmitHandler, useForm } from "react-hook-form";
import {
  ForgotPasswordFormValues,
  ForgotPasswordSchema,
} from "@components/Modal/Modal.types";
import { yupResolver } from "@hookform/resolvers/yup";
import { CardLayout } from "@components/CardLayout/CardLayout";
import { RangeTimePicker } from "../components/RangeTimePicker/RangeTimePicker";
import { TrashIcon } from "lucide-react";
import Switch from "@components/Switch/Switch";
import { CustomDayPicker } from "@components/CustomDayPicker/CustomDayPicker";
import * as yup from "yup";
import { trpc } from "@/utils/trpc";

const timeStringToMinutes = (time: string) => {
  const [_, hourStr, minuteStr, period] =
    time.match(/(\d{1,2}):(\d{2})\s?(AM|PM)/i) || [];
  if (!hourStr || !minuteStr || !period) return null;
  let hour = parseInt(hourStr, 10);
  const minute = parseInt(minuteStr, 10);
  if (period.toUpperCase() === "PM" && hour !== 12) hour += 12;
  if (period.toUpperCase() === "AM" && hour === 12) hour = 0;
  return hour * 60 + minute;
};

const ConfigureFormSchema = yup.object().shape({
  meetingDuration: yup
    .number()
    .typeError("Meeting duration is required")
    .required("Meeting duration is required")
    .moreThan(0, "Meeting duration must be greater than zero"),
  bufferTime: yup
    .number()
    .nullable()
    .transform((_, val) => (val !== "" ? Number(val) : null)),
  meetingDescription: yup.string().required("Meeting description is required"),
  startTime: yup.string().required("Start time is required"),
  endTime: yup
    .string()
    .required("End time is required")
    .test(
      "is-after-start",
      "End time must be after start time",
      function (value) {
        const { startTime } = this.parent;
        const start = timeStringToMinutes(startTime);
        const end = timeStringToMinutes(value || "");
        if (start == null || end == null) return false;
        return end > start;
      },
    ),
  phoneNumberRequired: yup.boolean().required(),
  autoAcceptBookings: yup.boolean().required(),
});

export type ConfigureFormValues = {
  meetingDuration: number;
  bufferTime: number | null | undefined;
  meetingDescription: string;
  phoneNumberRequired: boolean;
  autoAcceptBookings: boolean;
  startTime: string;
  endTime: string;
};

const ConfigurePage = () => {
  const methods = useForm<ConfigureFormValues>({
    resolver: yupResolver(ConfigureFormSchema) as any,
  });
  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors, isSubmitting },
  } = methods;
  const [breakTimesCount, setBreakTimesCount] = useState(0);

  const availabilitiesCreateMutation =
    trpc.availabilities.createAvailability.useMutation({});

  const onSubmit: SubmitHandler<ConfigureFormValues> = (data) => {};

  const DefaultDayButton = ({ modifiers, day, ...buttonProps }: any) => {
    const isOutside = modifiers.outside;
    const isToday = modifiers.today;

    return (
      <button
        {...buttonProps}
        className={`w-10 h-10 m-0.5 rounded-lg ${isOutside ? "text-zinc-400" : `text-zinc-950 bg-light-gray w-10 h-10 m-0.5 group-aria-selected:bg-electric-blue group-aria-selected:text-white hover:bg-light-blue hover:text-electric-blue rounded-lg ${isToday && "bg-gray-200"}`}`}
      />
    );
  };

  return (
    <div className="bg-[#f9fafb] p-4">
      <FormProvider {...methods}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="grid grid-cols-2 grid-rows-2 gap-6">
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <h1 className="text-xl mb-4">Time settings</h1>
              <div className="grid grid-cols-2 gap-x-8">
                <TextInput
                  error={errors.meetingDuration?.message}
                  label="Meeting duration (minutes)"
                  {...register("meetingDuration")}
                  type="number"
                />
                <TextInput
                  error={errors.bufferTime?.message}
                  label="Buffer time (minutes)"
                  {...register("bufferTime")}
                  type="number"
                />
                <RangeTimePicker
                  startTimeError={errors.startTime?.message}
                  endTimeError={errors.endTime?.message}
                />
              </div>
              <div>
                <div className="flex items-center justify-between my-2">
                  <h1 className="text-lg">Break times</h1>
                  <button
                    className="border bg-electric-blue  text-white hover:bg-light-blue rounded-lg px-4 py-2"
                    onClick={() => setBreakTimesCount(breakTimesCount + 1)}
                    type="button"
                  >
                    Add breaks
                  </button>
                </div>
                <div className="grid grid-cols-1 gap-4">
                  {breakTimesCount == 0 && (
                    <p className="text-gray-500 text-sm">
                      No breaks configured
                    </p>
                  )}
                  {Array.from({ length: breakTimesCount }).map((_, index) => (
                    <div key={index} className="inline-flex gap-2 items-center">
                      <div className="grid grid-cols-2 gap-x-8">
                        <RangeTimePicker />
                      </div>
                      <button
                        type="button"
                        className="bg-red-500 hover:bg-red-400 rounded-full p-3 h-10"
                        onClick={() => setBreakTimesCount(breakTimesCount - 1)}
                      >
                        <TrashIcon color="white" size={18} />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <CustomDayPicker dayButton={DefaultDayButton} />
            </div>
            <div className="col-span-2 bg-white p-6 rounded-lg shadow-lg">
              <h1 className="text-xl mb-4">Meeting configuration</h1>
              <div className="">
                <label htmlFor="description" className="block mb-2 font-medium">
                  Meeting description
                </label>
                <textarea
                  className="border border-gray-300 w-full rounded-md"
                  rows={5}
                  id="description"
                />
              </div>
              <div className="grid grid-cols-2 gap-x-6 mt-8">
                <Switch
                  description="Make phone number mandatory for bookings"
                  label="Require phone number"
                />
                <Switch label="Auto-accept bookings" />
              </div>
              <div className="mt-8">
                <button
                  className="bg-electric-blue  text-white hover:bg-light-blue rounded-lg px-4 py-2"
                  type="submit"
                >
                  Save
                </button>
              </div>
            </div>
          </div>
        </form>
      </FormProvider>
    </div>
  );
};
export default ConfigurePage;
