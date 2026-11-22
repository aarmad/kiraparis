import Link from "next/link";
import { cn as clsx } from "@/lib/cn";
import { ArrowUpRight } from "lucide-react";

type Variant = "ink" | "clay" | "outline" | "outline-light" | "terracotta";

const styles: Record<Variant, string> = {
  ink: "bg-ink text-clay-50 hover:bg-terracotta",
  clay: "bg-clay-50 text-ink hover:bg-sand",
  terracotta: "bg-terracotta text-clay-50 hover:bg-terracotta-deep",
  outline: "border border-ink/80 text-ink hover:bg-ink hover:text-clay-50",
  "outline-light": "border border-clay-50/70 text-clay-50 hover:bg-clay-50 hover:text-ink",
};

const base =
  "group/btn relative inline-flex h-12 items-center justify-center gap-3 overflow-hidden px-6 text-[13px] font-semibold uppercase tracking-[0.12em] transition-colors duration-300 ease-[var(--ease-out-soft)] disabled:opacity-50";

export function ButtonLink({
  href,
  children,
  variant = "ink",
  className,
  arrow = true,
}: {
  href: string;
  children: React.ReactNode;
  variant?: Variant;
  className?: string;
  arrow?: boolean;
}) {
  return (
    <Link href={href} className={clsx(base, styles[variant], className)}>
      <span>{children}</span>
      {arrow && (
        <ArrowUpRight
          aria-hidden
          className="size-4 transition-transform duration-300 group-hover/btn:-translate-y-0.5 group-hover/btn:translate-x-0.5"
        />
      )}
    </Link>
  );
}

export function buttonClass(variant: Variant = "ink", className?: string) {
  return clsx(base, styles[variant], className);
}
