"use client";
import React, { useEffect } from "react";
import { TimeInput } from "@components/TimeInput/TimeInput";
import { useFormContext, UseFormRegister } from "react-hook-form";

type RangeTimePickerProps = {
  startTimeError?: string;
  endTimeError?: string;
};

export const RangeTimePicker = (props: RangeTimePickerProps) => {
  const { startTimeError, endTimeError } = props;
  const { setValue } = useFormContext();

  const handleStartTimeChange = (newTime: string) => {
    setValue("startTime", newTime, { shouldValidate: true });
  };

  const handleEndTimeChange = (newTime: string) => {
    setValue("endTime", newTime, { shouldValidate: true });
  };

  return (
    <>
      <TimeInput
        label="Start time"
        error={startTimeError}
        onTimeChange={handleStartTimeChange}
      />
      <TimeInput
        label="End time"
        error={endTimeError}
        onTimeChange={handleEndTimeChange}
      />
    </>
  );
};
