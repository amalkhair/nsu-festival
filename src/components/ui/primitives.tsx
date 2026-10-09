import Link from "next/link";
import { cn } from "@/lib/utils";

export function Container({ className, children }: { className?: string; children: React.ReactNode }) {
  return <div className={cn("mx-auto w-full max-w-6xl px-4 sm:px-6", className)}>{children}</div>;
}

export function Card({
  className,
  children,
  as: Tag = "div",
}: {
  className?: string;
  children?: React.ReactNode;
  as?: "div" | "section" | "article";
}) {
  return <Tag className={cn("rounded-card bg-white shadow-card ring-1 ring-line/70", className)}>{children}</Tag>;
}

export function PageHeader({ title, subtitle, className }: { title: string; subtitle?: string; className?: string }) {
  return (
    <div className={cn("mb-6 sm:mb-8", className)}>
      <h1 className="text-2xl font-extrabold tracking-tight text-ink sm:text-4xl">{title}</h1>
      {subtitle && <p className="mt-1.5 text-sm text-ink-soft sm:text-base">{subtitle}</p>}
    </div>
  );
}

type ButtonVariant = "primary" | "secondary" | "country" | "ghost";

const buttonBase =
  "inline-flex items-center justify-center gap-2 rounded-full px-5 py-2.5 text-sm font-semibold transition active:scale-[0.98] disabled:pointer-events-none disabled:opacity-50";

const buttonVariants: Record<ButtonVariant, string> = {
  primary: "bg-brand text-white shadow-sm hover:bg-brand-dark",
  secondary: "bg-white text-ink ring-1 ring-line hover:bg-brand-soft",
  country: "bg-[var(--c-primary)] text-white shadow-sm hover:bg-[var(--c-primary-dark)]",
  ghost: "text-ink-soft hover:bg-white hover:text-ink",
};

export function buttonClass(variant: ButtonVariant = "primary", className?: string) {
  return cn(buttonBase, buttonVariants[variant], className);
}

export function ButtonLink({
  href,
  variant = "primary",
  className,
  children,
  external,
}: {
  href: string;
  variant?: ButtonVariant;
  className?: string;
  children: React.ReactNode;
  external?: boolean;
}) {
  if (external) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" className={buttonClass(variant, className)}>
        {children}
      </a>
    );
  }
  return (
    <Link href={href} className={buttonClass(variant, className)}>
      {children}
    </Link>
  );
}

/** Pill-shaped segmented filter (All / Main Dishes / …). */
export function Pills<T extends string>({
  options,
  value,
  onChange,
  className,
  tone = "brand",
  label,
}: {
  options: { value: T; label: string }[];
  value: T;
  onChange: (value: T) => void;
  className?: string;
  tone?: "brand" | "country";
  label?: string;
}) {
  return (
    <div
      role="tablist"
      aria-label={label}
      className={cn("scrollbar-none -mx-4 flex gap-2 overflow-x-auto px-4 sm:mx-0 sm:flex-wrap sm:px-0", className)}
    >
      {options.map((o) => {
        const active = o.value === value;
        return (
          <button
            key={o.value}
            type="button"
            role="tab"
            aria-selected={active}
            onClick={() => onChange(o.value)}
            className={cn(
              "shrink-0 rounded-full px-4 py-2 text-sm font-semibold whitespace-nowrap transition",
              active
                ? tone === "country"
                  ? "bg-[var(--c-primary)] text-white shadow-sm"
                  : "bg-brand text-white shadow-sm"
                : "bg-white text-ink-soft ring-1 ring-line hover:text-ink",
            )}
          >
            {o.label}
          </button>
        );
      })}
    </div>
  );
}
