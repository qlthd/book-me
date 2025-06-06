import React, { useEffect } from "react";
import { TimeInput } from "@components/TimeInput/TimeInput";
import { UseFormRegister } from "react-hook-form";

type RangeTimePickerProps = {
  startTimeError?: string;
  endTimeError?: string;
  register: UseFormRegister<any>;
};

export const RangeTimePicker = (props: RangeTimePickerProps) => {
  const { startTimeError, endTimeError, register } = props;
  return (
    <div className="flex w-full gap-x-6">
      <TimeInput
        label="Start time"
        error={startTimeError}
        {...register("startTime")}
      />
      <TimeInput
        label="End time"
        error={endTimeError}
        {...register("endTime")}
      />
    </div>
  );
};
