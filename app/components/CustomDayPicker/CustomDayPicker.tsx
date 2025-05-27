import React, { useEffect } from "react";
import { DayPicker, getDefaultClassNames } from "react-day-picker";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useRouter } from "next/navigation";
import { useCalendarStore } from "../../stores/useCalendarStore";

export const CustomDayPicker = () => {
  const { setDisplayedMonthYear, displayedMonthYear, setSelectedDate } =
    useCalendarStore();
  const [selected, setSelected] = React.useState<{
    from: Date | null;
    to: Date | null;
  }>();

  const router = useRouter();

  const defaultClassNames = getDefaultClassNames();

  const userId = "cmazqg2gn0000f0qclgj098ns";

  const redirectToAvailableSlots = (date: Date) => {
    setSelectedDate(date);
    router.push(`slots/${userId}`);
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
      onSelect={(selected) =>
        setSelected(
          selected?.from && selected?.to
            ? { from: selected.from, to: selected.to }
            : undefined,
        )
      }
      // disabled={[{ before: today }]}
      className="custom-dropdown-root"
      classNames={{
        selected: `text-white bg-electric-blue`,
        root: `${defaultClassNames.root} bg-white shadow-lg p-5 text-dark-gray w-max mx-auto rounded-lg my-4`,
        day: `group w-10 h-10 rounded-full`,
        weekday: `text-dark-gray font-semibold`,
        weekdays: "my-8",
        month_caption: `${defaultClassNames.month_caption} mb-4`,
        caption_label: `text-base m-auto text-center flex items-center gap-1`,
        disabled: `text-blue`,
        dropdown_root: "bg-white rounded-lg px-4 py-2 my-24",
      }}
      components={{
        DayButton: ({ modifiers, day, ...buttonProps }) => {
          const isOutside = modifiers.outside;
          const isToday = modifiers.today;
          const date = modifiers.date;
          return (
            <button
              {...buttonProps}
              onClick={() => redirectToAvailableSlots(day.date)}
              className={`w-10 h-10 m-0.5 rounded-lg ${isOutside ? "text-zinc-400" : `text-zinc-950 bg-light-gray w-10 h-10 m-0.5 group-aria-selected:bg-electric-blue group-aria-selected:text-white hover:bg-light-blue hover:text-electric-blue rounded-lg ${isToday && "bg-gray-200"}`} }`}
            />
          );
        },
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
