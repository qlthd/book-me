import React, { useEffect } from "react";
import {
  DayPicker,
  DayPickerProps,
  getDefaultClassNames,
} from "react-day-picker";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useRouter } from "next/navigation";
import { useCalendarStore } from "../../stores/useCalendarStore";
import "react-day-picker/style.css";

type CustomDayPickerProps = {
  dayButton?: (props: any) => React.JSX.Element;
  onDateRangeChange?: (range: { from?: Date; to?: Date } | undefined) => void;
  initialRange?: { from?: Date; to?: Date };
};

export const CustomDayPicker = (props: CustomDayPickerProps) => {
  const { setDisplayedMonthYear, displayedMonthYear, setSelectedDate } =
    useCalendarStore();
  const [selected, setSelected] = React.useState<{
    from: Date | null;
    to: Date | null;
  }>();
  const { dayButton } = props;

  const router = useRouter();

  const defaultClassNames = getDefaultClassNames();

  const redirectToAvailableSlots = (date: Date) => {
    setSelectedDate(date);
    //router.push(`slots/${userId}`);
  };

  const DefaultDayButton = ({ modifiers, day, ...buttonProps }: any) => {
    const isOutside = modifiers.outside;
    const isToday = modifiers.today;
    return (
      <button
        {...buttonProps}
        onClick={() => redirectToAvailableSlots(day.date)}
        className={`w-10 h-10 m-0.5 rounded-lg ${isOutside ? "text-zinc-400" : `text-zinc-950 bg-light-gray w-10 h-10 m-0.5 group-aria-selected:bg-electric-blue group-aria-selected:text-white hover:bg-light-blue hover:text-electric-blue rounded-lg ${isToday && "bg-gray-200"}`}`}
      />
    );
  };

  return (
    <DayPicker
      mode="range"
      navLayout="around"
      showOutsideDays
      captionLayout="dropdown"
      onMonthChange={(value) => {
        setDisplayedMonthYear(value);
      }}
      defaultMonth={displayedMonthYear}
      selected={
        selected?.from && selected?.to
          ? { from: selected.from, to: selected.to }
          : undefined
      }
      onSelect={(selected) => {
        setSelected(
          selected?.from && selected?.to
            ? { from: selected.from, to: selected.to }
            : undefined,
        );
        props.onDateRangeChange({ from: selected.from, to: selected.to });
      }}
      // disabled={[{ before: today }]}
      className="custom-dropdown-root"
      classNames={{
        selected: `text-white bg-electric-blue`,
        root: `${defaultClassNames.root} bg-white-smoke shadow-custom-soft p-5 text-dark-gray w-max rounded-lg`,
        day: `group w-10 h-10 rounded-full`,
        weekday: `text-dark-gray font-semibold`,
        weekdays: "my-8",
        month_caption: `${defaultClassNames.month_caption} mb-4`,
        caption_label: `text-base m-auto text-center flex items-center gap-1`,
        disabled: `text-blue`,
        dropdown_root: "bg-white rounded-lg px-4 py-2 my-24",
      }}
      components={{
        DayButton: dayButton ?? DefaultDayButton,
        NextMonthButton: ({ onClick, dir }) => (
          <button
            onClick={onClick}
            className="flex items-center absolute top-0 end-0 inset justify-center w-10 h-10 mb-4 rounded-full bg-white text-dark-gray hover:bg-light-blue hover:text-electric-blue"
            aria-label={dir === "prev" ? "Previous month" : "Next month"}
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        ),
        PreviousMonthButton: ({ onClick, dir }) => (
          <button
            onClick={onClick}
            className="flex items-center absolute top-0 inset justify-center w-10 h-10 mb-4 rounded-full bg-white text-dark-gray hover:bg-light-blue hover:text-electric-blue"
            aria-label={dir === "prev" ? "Previous month" : "Next month"}
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
        ),
      }}
    />
  );
};
