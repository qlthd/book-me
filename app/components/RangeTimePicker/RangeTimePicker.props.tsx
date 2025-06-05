import * as yup from "yup";

export type RangeTimePickerFormValues = {
  startTime: string;
  endTime: string;
};

export const RangeTimePickerSchema = yup.object().shape({
  startTime: yup.string().required("Start time is required"),
  endTime: yup.string().required("End time is required"),
});
