// store/useCalendarStore.ts (or .js if not using TypeScript)
import { create } from "zustand";

type CalendarStore = {
  displayedMonthYear: Date;
  selectedDate: Date | null;
  selectedSlot: string | null;
  setDisplayedMonthYear: (month: Date) => void;
  setSelectedDate: (date: Date | null) => void;
  setSlot: (slot: string) => void;
  clearSlot: () => void;
};

const now = new Date();

export const useCalendarStore = create<CalendarStore>((set) => ({
  displayedMonthYear: now,
  selectedSlot: null,
  selectedDate: null,
  setDisplayedMonthYear: (date: Date) => set({ displayedMonthYear: date }),
  setSlot: (slot) => set({ selectedSlot: slot }),
  setSelectedDate: (date: Date | null) => set({ selectedDate: date }),
  clearSlot: () => set({ selectedSlot: null }),
}));
