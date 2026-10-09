import type { FestivalDay, Stage } from "@/types";

export const festival = {
  name: "NSU International Cultural Festival",
  shortName: "NSU Festival",
  tagline: "A World of Cultures, One Community",
  venue: "NSU Main Field, Novosibirsk, Russia",
  dateLabel: "Sat–Sun, 24–25 May 2027",
  hours: "10:00 – 20:00",
  year: 2027,
  /**
   * Outside the festival dates the schedule pretends it is this moment,
   * so the "Now" highlight is visible in the prototype.
   */
  previewNow: "2027-05-24T11:10:00",
} as const;

export const festivalDays: FestivalDay[] = [
  { date: "2027-05-24", label: "May 24", weekday: "Sat" },
  { date: "2027-05-25", label: "May 25", weekday: "Sun" },
];

export const stages: Stage[] = [
  { id: "main", name: "Main Stage" },
  { id: "garden", name: "Garden Stage" },
];
