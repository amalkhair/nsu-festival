import type { ScheduleItem, SessionStatus } from "@/types";
import { festival, festivalDays } from "@/data/festival";

/**
 * The moment the schedule should treat as "now".
 * During the festival this is the real time; otherwise it's the preview time
 * from festival.ts so the prototype always shows an ongoing performance.
 */
export function getFestivalNow(real: Date = new Date()): Date {
  const first = new Date(`${festivalDays[0].date}T00:00:00`);
  const last = new Date(`${festivalDays[festivalDays.length - 1].date}T23:59:59`);
  if (real >= first && real <= last) return real;
  return new Date(festival.previewNow);
}

export function isPreviewTime(real: Date = new Date()): boolean {
  return getFestivalNow(real) !== real;
}

export function getStatus(item: ScheduleItem, now: Date): SessionStatus {
  const start = new Date(`${item.day}T${item.start}:00`);
  const end = new Date(`${item.day}T${item.end}:00`);
  if (now < start) return "upcoming";
  if (now >= end) return "finished";
  return "ongoing";
}

/** "2027-05-24" for a Date, in local time. */
export function toISODate(d: Date): string {
  const pad = (n: number) => String(n).padStart(2, "0");
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;
}

export function toHHMM(d: Date): string {
  return `${String(d.getHours()).padStart(2, "0")}:${String(d.getMinutes()).padStart(2, "0")}`;
}
