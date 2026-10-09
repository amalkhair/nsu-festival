"use client";

import { useEffect, useMemo, useState } from "react";
import { ChevronRight, Clock } from "lucide-react";
import type { FestivalDay, ScheduleItem, SessionStatus, Stage } from "@/types";
import { useT } from "@/lib/i18n";
import { getFestivalNow, getStatus, isPreviewTime, toHHMM, toISODate } from "@/lib/time";
import { cn } from "@/lib/utils";
import { Card, Pills } from "@/components/ui/primitives";
import { Flag } from "@/components/ui/Flag";
import { Scene } from "@/components/ui/Scene";

export function ScheduleView({ items, days, stages }: { items: ScheduleItem[]; days: FestivalDay[]; stages: Stage[] }) {
  const t = useT();
  const [now, setNow] = useState<Date | null>(null);
  const [preview, setPreview] = useState(false);
  const [day, setDay] = useState(days[0].date);
  const [stage, setStage] = useState<string>("all");

  useEffect(() => {
    const update = () => {
      const real = new Date();
      setNow(getFestivalNow(real));
      setPreview(isPreviewTime(real));
    };
    update();
    const fresh = getFestivalNow();
    if (days.some((d) => d.date === toISODate(fresh))) setDay(toISODate(fresh));
    const timer = window.setInterval(update, 60_000);
    return () => window.clearInterval(timer);
  }, [days]);

  const stageName = useMemo(() => Object.fromEntries(stages.map((s) => [s.id, s.name])), [stages]);
  const visible = items.filter((i) => i.day === day && (stage === "all" || i.stage === stage));
  const nowDay = now ? days.find((d) => d.date === toISODate(now)) : undefined;

  return (
    <>
      <div className="mb-5 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <Pills
          options={[{ value: "all", label: t("schedule.allStages") }, ...stages.map((s) => ({ value: s.id, label: s.name }))]}
          value={stage}
          onChange={setStage}
          label={t("schedule.title")}
        />
        <div role="tablist" className="flex gap-2">
          {days.map((d) => {
            const active = d.date === day;
            return (
              <button
                key={d.date}
                type="button"
                role="tab"
                aria-selected={active}
                onClick={() => setDay(d.date)}
                className={cn(
                  "flex-1 rounded-xl px-5 py-2 text-center transition sm:flex-none",
                  active ? "bg-brand-soft text-brand ring-2 ring-brand" : "bg-white text-ink-soft ring-1 ring-line hover:text-ink",
                )}
              >
                <span className="block text-sm font-bold">{d.label}</span>
                <span className="block text-[11px]">({d.weekday})</span>
              </button>
            );
          })}
        </div>
      </div>

      {preview && now && nowDay && (
        <p className="mb-4 flex items-center gap-2 rounded-lg bg-white/70 px-3 py-2 text-xs text-ink-soft ring-1 ring-line">
          <Clock className="size-3.5 shrink-0" />
          {t("schedule.preview", { time: toHHMM(now), day: `${nowDay.weekday} ${nowDay.label}` })}
        </p>
      )}

      <Card className="divide-y divide-line/70 overflow-hidden">
        {visible.map((item) => {
          const status: SessionStatus | null = now ? getStatus(item, now) : null;
          const ongoing = status === "ongoing";
          return (
            <div
              key={item.id}
              className={cn(
                "relative flex items-center gap-3 px-3 py-3 transition sm:gap-5 sm:px-5",
                ongoing && "bg-[#fff1f3]",
                status === "finished" && "opacity-55",
              )}
            >
              {ongoing && <span className="absolute inset-y-0 left-0 w-1 bg-[#ef476f]" />}
              <div className="w-12 shrink-0 text-center sm:w-16">
                <p className={cn("text-sm font-bold tabular-nums sm:text-base", ongoing ? "text-[#d6204d]" : "text-ink")}>
                  {item.start}
                </p>
                {ongoing && (
                  <span className="mt-0.5 inline-block rounded-full bg-[#ef476f] px-2 py-0.5 text-[10px] font-bold text-white uppercase">
                    {t("schedule.now")}
                  </span>
                )}
              </div>
              <div className="min-w-0 flex-1">
                <p className="flex items-center gap-2 text-sm font-bold text-ink sm:text-base">
                  {item.country && <Flag code={item.country} className="h-3.5 shrink-0" />}
                  <span className="truncate">{item.title}</span>
                </p>
                <p className="text-xs text-ink-soft sm:text-sm">
                  {stageName[item.stage]} · {item.start}–{item.end}
                  {status === "finished" && <> · {t("schedule.finished")}</>}
                </p>
              </div>
              <div className="h-12 w-20 shrink-0 overflow-hidden rounded-lg sm:h-14 sm:w-24">
                <Scene variant={item.scene} />
              </div>
              <ChevronRight className="hidden size-4 shrink-0 text-ink-faint sm:block" />
            </div>
          );
        })}
        {visible.length === 0 && <p className="p-6 text-center text-sm text-ink-faint">{t("schedule.empty")}</p>}
      </Card>
    </>
  );
}
