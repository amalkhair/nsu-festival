import type { Metadata } from "next";
import Link from "next/link";
import { Card, Container } from "@/components/ui/primitives";

export const metadata: Metadata = { title: "Admin", robots: { index: false } };

const modules = [
  { name: "Countries & booths", status: "Static data in src/data/countries/list.ts", next: "Supabase table + edit form" },
  { name: "Country content (quiz, food, culture)", status: "Static data per country folder", next: "Per-country editor for booth teams" },
  { name: "Schedule", status: "Static data in src/data/schedule.ts", next: "Timetable editor with drag-to-reorder" },
  { name: "Festival map", status: "Coordinates in src/data/map.ts", next: "Click-to-place booth editor" },
  { name: "Reward codes", status: "Generated in the visitor's browser (not secure)", next: "Server-issued one-time tokens + scanner page for booth staff" },
  { name: "Accounts", status: "None", next: "Supabase Auth: organisers and booth leads" },
];

/** Placeholder for the organiser dashboard. Not linked from the public navigation. */
export default function AdminPage() {
  return (
    <Container className="max-w-3xl py-10">
      <h1 className="text-2xl font-extrabold text-ink sm:text-3xl">Organiser dashboard</h1>
      <p className="mt-1 text-sm text-ink-soft">
        Placeholder. Nothing here is protected or editable yet; it lists what each module will become.
      </p>
      <Card className="mt-6 divide-y divide-line/70">
        {modules.map((m) => (
          <div key={m.name} className="p-4">
            <p className="font-bold text-ink">{m.name}</p>
            <p className="mt-0.5 text-sm text-ink-soft">Now: {m.status}</p>
            <p className="text-sm text-ink-soft">Next: {m.next}</p>
          </div>
        ))}
      </Card>
      <Link href="/" className="mt-6 inline-block text-sm font-semibold text-brand hover:underline">
        ← Back to the festival site
      </Link>
    </Container>
  );
}
