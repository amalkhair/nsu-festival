import type { Metadata } from "next";
import { getFestival, getSchedule } from "@/lib/api";
import { Container } from "@/components/ui/primitives";
import { ScheduleView } from "@/components/festival/ScheduleView";
import { T } from "@/components/ui/T";

export const metadata: Metadata = { title: "Performance Schedule" };

export default async function SchedulePage() {
  const [festival, items] = await Promise.all([getFestival(), getSchedule()]);
  return (
    <Container className="max-w-4xl py-6 sm:py-10">
      <div className="mb-5">
        <h1 className="text-2xl font-extrabold tracking-tight text-ink sm:text-4xl">
          <T k="schedule.title" />
        </h1>
        <p className="mt-1.5 text-sm text-ink-soft sm:text-base">
          <T k="schedule.subtitle" />
        </p>
      </div>
      <ScheduleView items={items} days={festival.days} stages={festival.stages} />
    </Container>
  );
}
