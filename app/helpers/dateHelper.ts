export const formatDateToReadableString = (date: Date | null) => {
  const options: Intl.DateTimeFormatOptions = {
    weekday: "long",
    month: "long",
    day: "numeric",
    year: "numeric",
  };
  return date?.toLocaleDateString("en-US", options);
};
