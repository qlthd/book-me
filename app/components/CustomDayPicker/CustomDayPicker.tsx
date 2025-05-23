import React from "react";
import { DayPicker, getDefaultClassNames } from "react-day-picker";
import { ChevronLeft, ChevronRight } from "lucide-react";
export const CustomDayPicker = () => {
    const [selected, setSelected] = React.useState<{
        from: Date | null;
        to: Date | null;
    }>();

    const defaultClassNames = getDefaultClassNames();

    /* Today's date */
    const today = new Date();

    return (
        <div className="block">
            <DayPicker
                mode="range"
                navLayout="around"
                showOutsideDays
                selected={
                    selected?.from && selected?.to
                        ? { from: selected.from, to: selected.to }
                        : undefined
                }
                onSelect={(selected) =>
                    setSelected(
                        selected?.from && selected?.to
                            ? { from: selected.from, to: selected.to }
                            : undefined
                    )
                }
                // disabled={[{ before: today }]}
                className="custom-dropdown-root"
                classNames={{
                    selected: `text-white bg-electric-blue`,
                    root: `${defaultClassNames.root} bg-light-gray shadow-lg p-5 text-dark-gray`,
                    day: `group w-10 h-10 rounded-full`,
                    weekday: `text-dark-gray font-semibold`,
                    weekdays: 'my-8',
                    // month_caption: ``,
                    caption_label: `text-base m-auto text-center`,
                    disabled: `text-blue`,
                }}
                components={{
                    DayButton: ({ date, modifiers, ...buttonProps }) => {
                        const isOutside = modifiers.outside;

                        return (
                            <button
                                {...buttonProps}
                                className={`w-10 h-10 m-0.5 rounded-lg ${isOutside ? 'text-zinc-400' : 'text-zinc-950 bg-white w-10 h-10 m-0.5 group-aria-selected:bg-electric-blue group-aria-selected:text-white hover:bg-light-blue hover:text-electric-blue rounded-lg'} }`}
                            />
                        );
                    },
                    NextMonthButton: ({ onClick, dir }) => (
                        <button
                            onClick={onClick}
                            className="flex items-center absolute top-0 end-0 inset justify-center w-10 h-10 rounded-full bg-white text-zinc-800 hover:bg-light-blue hover:text-electric-blue"
                            aria-label={dir === "prev" ? "Previous month" : "Next month"}
                        >
                            <ChevronRight className="w-4 h-4" />
                        </button>
                    ),
                    PreviousMonthButton: ({ onClick, dir }) => (
                        <button
                            onClick={onClick}
                            className="flex items-center absolute top-0 inset justify-center w-10 h-10 rounded-full bg-white text-zinc-800 hover:bg-light-blue hover:text-electric-blue"
                            aria-label={dir === "prev" ? "Previous month" : "Next month"}
                        >
                            <ChevronLeft className="w-4 h-4" />
                        </button>
                    ),


                }}
            />
        </div>
    );
};

