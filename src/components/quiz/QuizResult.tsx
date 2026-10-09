"use client";

import { useEffect, useRef, useState } from "react";
import { QRCodeSVG } from "qrcode.react";
import { ChevronLeft, ChevronRight, Download, Gift, ImageIcon, Lock, RotateCcw } from "lucide-react";
import type { Country, CountryContent, Souvenir } from "@/types";
import { useT } from "@/lib/i18n";
import { getOrCreateRewardCode, loadQuizResult, rewardQrValue, type QuizResult as Result } from "@/lib/rewards";
import { cn } from "@/lib/utils";
import { buttonClass, ButtonLink, Card } from "@/components/ui/primitives";
import { Picture } from "@/components/ui/Picture";
import { Confetti } from "./Confetti";

export function QuizResult({ country, content, year }: { country: Country; content: CountryContent; year: number }) {
  const t = useT();
  const [result, setResult] = useState<Result | null | undefined>(undefined);
  const [code, setCode] = useState<string | null>(null);

  useEffect(() => {
    const r = loadQuizResult(country.slug);
    setResult(r);
    if (r && r.score >= content.rewardThreshold) {
      setCode(getOrCreateRewardCode(country.slug, content.rewardPrefix, year));
    }
  }, [country.slug, content.rewardPrefix, content.rewardThreshold, year]);

  if (result === undefined) return <Card className="h-96 animate-pulse" />;

  if (result === null) {
    return (
      <Card className="p-8 text-center">
        <h1 className="text-xl font-extrabold text-ink">{t("result.noResultTitle")}</h1>
        <p className="mt-2 text-sm text-ink-soft">{t("result.noResultText")}</p>
        <ButtonLink href={`/country/${country.slug}/quiz`} variant="country" className="mt-5">
          {t("result.start")}
        </ButtonLink>
      </Card>
    );
  }

  const passed = result.score >= content.rewardThreshold;

  return (
    <Card className="relative overflow-hidden p-5 sm:p-8">
      {passed && <Confetti />}

      <div className="relative text-center">
        <TrophyIcon className="animate-pop mx-auto size-20 sm:size-24" />
        <h1 className="mt-2 text-3xl font-extrabold tracking-tight text-[var(--c-accent)] sm:text-4xl">
          {passed ? t("result.congrats") : t("result.niceTry")}
        </h1>
        <p className="mt-2 text-base font-semibold text-ink">
          {t("result.score", { score: result.score, total: result.total })}
        </p>
        <p className="mt-1 text-sm text-ink-soft">
          {passed ? t("result.learned", { country: country.name }) : t("result.keepLearning", { country: country.name })}
        </p>
      </div>

      <div className="relative mt-7 grid gap-4 sm:grid-cols-2">
        <SouvenirPicker souvenirs={content.souvenirs} country={country} year={year} />

        <div className="rounded-2xl bg-white p-4 ring-1 ring-line">
          <h2 className="flex items-center gap-2 text-sm font-extrabold text-ink">
            <Gift className="size-4 text-[#ef476f]" /> {t("result.stickerTitle")}
          </h2>
          {passed && code ? (
            <>
              <p className="mt-1 text-xs text-ink-soft">{t("result.stickerDesc", { country: country.name })}</p>
              <div className="mt-4 flex flex-col items-center">
                <div className="rounded-xl bg-white p-3 ring-1 ring-line">
                  <QRCodeSVG value={rewardQrValue(code)} size={168} level="M" marginSize={0} />
                </div>
                <p className="mt-3 font-mono text-lg font-bold tracking-wider text-ink">{code}</p>
                <p className="mt-1 text-xs text-ink-faint">{t("result.onceOnly")}</p>
              </div>
            </>
          ) : (
            <div className="mt-4 flex flex-col items-center py-6 text-center">
              <span className="grid size-14 place-items-center rounded-full bg-mist text-ink-faint">
                <Lock className="size-6" />
              </span>
              <p className="mt-3 max-w-[16rem] text-sm text-ink-soft">
                {t("result.stickerLocked", { n: content.rewardThreshold, country: country.name })}
              </p>
            </div>
          )}
        </div>
      </div>

      <div className="relative mt-6 text-center">
        <ButtonLink href={`/country/${country.slug}/quiz`} variant="secondary" className="px-6">
          <RotateCcw className="size-4" /> {t("result.retry")}
        </ButtonLink>
      </div>
    </Card>
  );
}

function SouvenirPicker({ souvenirs, country, year }: { souvenirs: Souvenir[]; country: Country; year: number }) {
  const t = useT();
  const [index, setIndex] = useState(0);
  const [busy, setBusy] = useState(false);
  const frameRef = useRef<HTMLDivElement>(null);
  const current = souvenirs[index];
  const go = (d: number) => setIndex((i) => (i + d + souvenirs.length) % souvenirs.length);

  async function download() {
    setBusy(true);
    try {
      const blob = await renderSouvenir({
        frame: frameRef.current,
        souvenir: current,
        caption: t("result.souvenirFooter", { year }),
        countryName: country.name,
        color: country.theme.primary,
      });
      if (!blob) return;
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `nsu-festival-${country.slug}-${current.id}.png`;
      document.body.appendChild(a);
      a.click();
      a.remove();
      setTimeout(() => URL.revokeObjectURL(url), 2000);
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="rounded-2xl bg-white p-4 ring-1 ring-line">
      <h2 className="flex items-center gap-2 text-sm font-extrabold text-ink">
        <ImageIcon className="size-4 text-[#22a559]" /> {t("result.photoTitle")}
      </h2>
      <p className="mt-1 text-xs text-ink-soft">{t("result.photoDesc")}</p>
      <div className="relative mt-4 overflow-hidden rounded-xl">
        <div ref={frameRef} className="aspect-[4/3]">
          <Picture key={current.id} image={current.image} scene={current.scene} alt={current.title} className="animate-fade-up" />
        </div>
        <button
          type="button"
          onClick={() => go(-1)}
          aria-label={t("result.prev")}
          className="absolute top-1/2 left-2 grid size-9 -translate-y-1/2 place-items-center rounded-full bg-white/90 text-ink shadow-md hover:bg-white"
        >
          <ChevronLeft className="size-5" />
        </button>
        <button
          type="button"
          onClick={() => go(1)}
          aria-label={t("result.nextPhoto")}
          className="absolute top-1/2 right-2 grid size-9 -translate-y-1/2 place-items-center rounded-full bg-white/90 text-ink shadow-md hover:bg-white"
        >
          <ChevronRight className="size-5" />
        </button>
      </div>
      <p className="mt-2 text-center text-sm font-bold text-ink">{current.title}</p>
      <div className="mt-1.5 flex justify-center gap-1.5">
        {souvenirs.map((s, i) => (
          <span key={s.id} className={cn("h-1.5 rounded-full transition-all", i === index ? "w-5 bg-[var(--c-primary)]" : "w-1.5 bg-line")} />
        ))}
      </div>
      <button type="button" onClick={download} disabled={busy} className={buttonClass("country", "mt-4 w-full")}>
        <Download className="size-4" /> {t("result.download")}
      </button>
    </div>
  );
}

/** Draws the chosen picture plus a festival caption into a 1080×1350 PNG. */
async function renderSouvenir({
  frame,
  souvenir,
  caption,
  countryName,
  color,
}: {
  frame: HTMLElement | null;
  souvenir: Souvenir;
  caption: string;
  countryName: string;
  color: string;
}): Promise<Blob | null> {
  const W = 1080;
  const H = 1350;
  const PHOTO = 1080;
  const canvas = document.createElement("canvas");
  canvas.width = W;
  canvas.height = H;
  const ctx = canvas.getContext("2d");
  if (!ctx) return null;

  ctx.fillStyle = "#ffffff";
  ctx.fillRect(0, 0, W, H);

  const img = new Image();
  if (souvenir.image) {
    img.src = souvenir.image;
  } else {
    const svg = frame?.querySelector("svg");
    if (!svg) return null;
    const clone = svg.cloneNode(true) as SVGSVGElement;
    clone.setAttribute("width", "400");
    clone.setAttribute("height", "260");
    img.src = `data:image/svg+xml;charset=utf-8,${encodeURIComponent(new XMLSerializer().serializeToString(clone))}`;
  }
  await img.decode();

  // object-fit: cover into the square photo area
  const ratio = Math.max(PHOTO / img.width, PHOTO / img.height);
  const dw = img.width * ratio;
  const dh = img.height * ratio;
  ctx.drawImage(img, (PHOTO - dw) / 2, (PHOTO - dh) / 2, dw, dh);

  ctx.fillStyle = color;
  ctx.fillRect(0, PHOTO, W, 14);

  try {
    await document.fonts.ready;
  } catch {
    /* ignore */
  }
  const font = `"Plus Jakarta Sans", system-ui, sans-serif`;
  ctx.fillStyle = "#0b1b3f";
  ctx.font = `800 64px ${font}`;
  ctx.fillText(souvenir.title, 64, PHOTO + 110);
  ctx.fillStyle = "#4a5878";
  ctx.font = `600 34px ${font}`;
  ctx.fillText(`${countryName} · ${caption}`, 64, PHOTO + 170);
  ctx.fillStyle = color;
  ctx.font = `700 28px ${font}`;
  ctx.fillText("A World of Cultures, One Community", 64, PHOTO + 222);

  return new Promise((resolve) => canvas.toBlob(resolve, "image/png"));
}

function TrophyIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 96 96" className={className} aria-hidden>
      <defs>
        <linearGradient id="trophy-g" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#ffd84d" />
          <stop offset="100%" stopColor="#f2a100" />
        </linearGradient>
      </defs>
      <path d="M26 14 H70 V34 C70 48 60 58 48 58 C36 58 26 48 26 34 Z" fill="url(#trophy-g)" />
      <path d="M26 20 H14 C14 34 20 40 30 42" fill="none" stroke="#f2a100" strokeWidth="6" strokeLinecap="round" />
      <path d="M70 20 H82 C82 34 76 40 66 42" fill="none" stroke="#f2a100" strokeWidth="6" strokeLinecap="round" />
      <rect x="42" y="56" width="12" height="14" fill="#e09400" />
      <rect x="30" y="70" width="36" height="10" rx="3" fill="#c97f00" />
      <rect x="24" y="80" width="48" height="8" rx="3" fill="#a96a00" />
      <path d="M48 22 L51.5 30 L60 30.5 L53.5 36 L55.5 44 L48 39.5 L40.5 44 L42.5 36 L36 30.5 L44.5 30 Z" fill="#fff6c9" />
    </svg>
  );
}
