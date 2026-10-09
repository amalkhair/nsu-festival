import { cn, flagUrl } from "@/lib/utils";

/** Country flag from flagcdn.com, sized by the caller via className (height). */
export function Flag({ code, name, className }: { code: string; name?: string; className?: string }) {
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={flagUrl(code, 80)}
      srcSet={`${flagUrl(code, 160)} 2x`}
      alt={name ? `Flag of ${name}` : ""}
      className={cn("inline-block aspect-[3/2] h-4 rounded-[3px] object-cover ring-1 ring-black/10", className)}
      loading="lazy"
    />
  );
}
