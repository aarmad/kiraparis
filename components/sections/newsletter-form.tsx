"use client";

import { useState } from "react";
import { cn as clsx } from "@/lib/cn";
import { ArrowRight, Check } from "lucide-react";

/** Formulaire newsletter. Prototype : non connecté (sera relié à Shopify Customers / outil emailing). */
export function NewsletterForm({ tone = "light", className }: { tone?: "light" | "dark"; className?: string }) {
  const [state, setState] = useState<"idle" | "done">("idle");
  const dark = tone === "dark";

  if (state === "done") {
    return (
      <p className={clsx("flex items-start gap-2 text-sm", className)} role="status">
        <Check className="mt-0.5 size-4 shrink-0 text-sand" />
        <span>
          Merci ! <span className="opacity-70">(Prototype : l&apos;inscription n&apos;est pas encore reliée à l&apos;outil d&apos;emailing.)</span>
        </span>
      </p>
    );
  }

  return (
    <form
      className={clsx("max-w-md", className)}
      onSubmit={(e) => {
        e.preventDefault();
        setState("done");
      }}
    >
      <label htmlFor={`nl-${tone}`} className="sr-only">
        Adresse e-mail
      </label>
      <div className={clsx("flex border-b transition-colors focus-within:border-sand", dark ? "border-clay-50/50" : "border-ink/50")}>
        <input
          id={`nl-${tone}`}
          type="email"
          required
          autoComplete="email"
          placeholder="ton@email.com"
          className={clsx(
            "h-12 min-w-0 flex-1 bg-transparent text-base focus:outline-none",
            dark ? "placeholder:text-clay-50/40" : "placeholder:text-ink/35",
          )}
        />
        <button type="submit" className="group/nl flex items-center gap-2 pl-4 text-[13px] font-semibold uppercase tracking-[0.12em]">
          Je m&apos;inscris
          <ArrowRight className="size-4 transition-transform group-hover/nl:translate-x-1" />
        </button>
      </div>
      <p className={clsx("mt-3 text-[12px]", dark ? "text-clay-50/50" : "text-muted")}>
        Un email par drop, pas plus. Désinscription en un clic.
      </p>
    </form>
  );
}
