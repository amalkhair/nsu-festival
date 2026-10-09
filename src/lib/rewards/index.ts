/**
 * Quiz results and reward codes — PROTOTYPE VERSION.
 *
 * Everything here lives in the visitor's browser, so codes are not secure and
 * "can only be used once" is not enforced yet. The production version moves
 * code generation and redemption to the server:
 *   POST /api/quiz/submit   → validates answers server-side, issues a signed one-time token
 *   POST /api/rewards/redeem → booth staff scan the QR; marks the token as used in Supabase
 * Keep the function signatures so the UI only needs to swap the implementation.
 */

export interface QuizResult {
  score: number;
  total: number;
  completedAt: string;
}

const resultKey = (slug: string) => `nsu-festival:quiz:${slug}`;
const rewardKey = (slug: string) => `nsu-festival:reward:${slug}`;

function safeGet(storage: "local" | "session", key: string): string | null {
  try {
    return (storage === "local" ? window.localStorage : window.sessionStorage).getItem(key);
  } catch {
    return null;
  }
}

function safeSet(storage: "local" | "session", key: string, value: string) {
  try {
    (storage === "local" ? window.localStorage : window.sessionStorage).setItem(key, value);
  } catch {
    /* storage unavailable */
  }
}

export function saveQuizResult(slug: string, result: QuizResult) {
  safeSet("session", resultKey(slug), JSON.stringify(result));
}

export function loadQuizResult(slug: string): QuizResult | null {
  const raw = safeGet("session", resultKey(slug));
  if (!raw) return null;
  try {
    return JSON.parse(raw) as QuizResult;
  } catch {
    return null;
  }
}

/** Returns this visitor's reward code for a country, creating one if needed. */
export function getOrCreateRewardCode(slug: string, prefix: string, year: number): string {
  const existing = safeGet("local", rewardKey(slug));
  if (existing) return existing;
  const bytes = new Uint8Array(2);
  crypto.getRandomValues(bytes);
  const hex = Array.from(bytes, (b) => b.toString(16).padStart(2, "0")).join("").toUpperCase();
  const code = `${prefix}-${year}-${hex}`;
  safeSet("local", rewardKey(slug), code);
  return code;
}

/** What gets encoded in the QR code. */
export function rewardQrValue(code: string): string {
  return `NSUFEST:REWARD:${code}`;
}
