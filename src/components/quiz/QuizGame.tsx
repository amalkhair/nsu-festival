"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { ArrowRight, Check, Lightbulb, X } from "lucide-react";
import type { Country, QuizQuestion } from "@/types";
import { useT } from "@/lib/i18n";
import { saveQuizResult } from "@/lib/rewards";
import { cn } from "@/lib/utils";
import { buttonClass, Card } from "@/components/ui/primitives";
import { Scene } from "@/components/ui/Scene";

const LETTERS = ["A", "B", "C", "D", "E", "F"];

export function QuizGame({ country, questions }: { country: Country; questions: QuizQuestion[] }) {
  const t = useT();
  const router = useRouter();
  const [index, setIndex] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [score, setScore] = useState(0);

  const q = questions[index];
  const answered = selected !== null;
  const isCorrect = answered && selected === q.correctIndex;
  const isLast = index === questions.length - 1;
  const progress = ((index + (answered ? 1 : 0)) / questions.length) * 100;

  function choose(i: number) {
    if (answered) return;
    setSelected(i);
    if (i === q.correctIndex) setScore((s) => s + 1);
  }

  function next() {
    if (!answered) return;
    if (isLast) {
      saveQuizResult(country.slug, { score, total: questions.length, completedAt: new Date().toISOString() });
      router.push(`/country/${country.slug}/quiz/result`);
      return;
    }
    setIndex((i) => i + 1);
    setSelected(null);
  }

  return (
    <Card className="overflow-hidden p-5 sm:p-8">
      {/* Progress */}
      <div className="flex items-center gap-4">
        <div
          className="h-2.5 flex-1 overflow-hidden rounded-full bg-line"
          role="progressbar"
          aria-valuemin={0}
          aria-valuemax={questions.length}
          aria-valuenow={index + (answered ? 1 : 0)}
        >
          <div
            className="h-full rounded-full bg-gradient-to-r from-[var(--c-primary)] to-[var(--c-primary-dark)] transition-[width] duration-500"
            style={{ width: `${progress}%` }}
          />
        </div>
        <span className="shrink-0 text-xs font-semibold text-ink-soft">
          {t("quiz.questionOf", { n: index + 1, total: questions.length })}
        </span>
      </div>

      <h1 key={q.id} className="animate-fade-up mt-6 text-xl leading-snug font-extrabold text-ink sm:text-2xl">
        {q.question}
      </h1>

      {/* Options */}
      <ul className="mt-5 space-y-2.5">
        {q.options.map((option, i) => {
          const picked = selected === i;
          const correct = i === q.correctIndex;
          const showCorrect = answered && correct;
          const showWrong = answered && picked && !correct;
          return (
            <li key={`${q.id}-${i}`}>
              <button
                type="button"
                onClick={() => choose(i)}
                disabled={answered}
                className={cn(
                  "flex w-full items-center gap-3 rounded-xl px-3 py-3 text-left text-[15px] font-semibold ring-1 transition sm:px-4",
                  !answered && "bg-white text-ink ring-line hover:bg-[var(--c-soft)] hover:ring-[var(--c-primary)] active:scale-[0.99]",
                  showCorrect && "bg-[#e9f9ef] text-[#137a3b] ring-2 ring-[#22a559]",
                  showWrong && "bg-[#fff0f1] text-[#c21d33] ring-2 ring-[#e63946]",
                  answered && !showCorrect && !showWrong && "bg-white text-ink-faint ring-line",
                )}
              >
                <span
                  className={cn(
                    "grid size-8 shrink-0 place-items-center rounded-full text-sm font-bold",
                    showCorrect ? "bg-[#22a559] text-white" : showWrong ? "bg-[#e63946] text-white" : "bg-[var(--c-soft)] text-[var(--c-primary)]",
                  )}
                >
                  {showCorrect ? <Check className="size-4" /> : showWrong ? <X className="size-4" /> : LETTERS[i]}
                </span>
                <span className="flex-1">{option}</span>
              </button>
            </li>
          );
        })}
      </ul>

      {/* Feedback + fact */}
      {answered && (
        <div className="animate-fade-up mt-5 overflow-hidden rounded-xl ring-1 ring-line">
          <p
            className={cn(
              "flex items-center gap-2 px-4 py-2.5 text-sm font-bold",
              isCorrect ? "bg-[#e9f9ef] text-[#137a3b]" : "bg-[#fff0f1] text-[#c21d33]",
            )}
          >
            {isCorrect ? <Check className="size-4" /> : <X className="size-4" />}
            {isCorrect ? t("quiz.correct") : t("quiz.incorrect", { answer: q.options[q.correctIndex] })}
          </p>
          {q.scene && (
            <div className="h-32 sm:h-40">
              <Scene variant={q.scene} />
            </div>
          )}
          <div className="bg-white px-4 py-3">
            <p className="flex items-center gap-1.5 text-sm font-bold text-[var(--c-accent)]">
              <Lightbulb className="size-4" /> {t("quiz.fact")}
            </p>
            <p className="mt-1 text-sm text-ink-soft">{q.fact}</p>
          </div>
        </div>
      )}

      <button
        type="button"
        onClick={next}
        disabled={!answered}
        className={buttonClass("country", "mt-6 w-full py-3.5 text-base")}
      >
        {isLast ? t("quiz.finish") : t("quiz.next")} <ArrowRight className="size-5" />
      </button>

      <p className="mt-4 text-center">
        <Link href={`/country/${country.slug}`} className="text-xs font-semibold text-ink-faint hover:text-ink">
          {t("quiz.exit")}
        </Link>
      </p>
    </Card>
  );
}
