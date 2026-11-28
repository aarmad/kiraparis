"use client";

import { useState } from "react";
import { Check } from "lucide-react";
import { cn } from "@/lib/cn";

/** Formulaire newsletter. Prototype : non connecté (sera relié à Shopify Customers / outil emailing). */
export function NewsletterForm({ className }: { className?: string }) {
  const [state, setState] = useState<"idle" | "done">("idle");

  if (state === "done") {
    return (
      <p className={cn("flex items-start gap-2 text-sm", className)} role="status">
        <Check className="mt-0.5 size-4 shrink-0 text-terracotta" />
        <span>
          Merci ! <span className="text-ink-soft">(Prototype : l&apos;inscription n&apos;est pas encore reliée à l&apos;outil d&apos;emailing.)</span>
        </span>
      </p>
    );
  }

  return (
    <form
      className={cn("flex", className)}
      onSubmit={(e) => {
        e.preventDefault();
        setState("done");
      }}
    >
      <label htmlFor="newsletter-email" className="sr-only">
        Adresse e-mail
      </label>
      <input
        id="newsletter-email"
        type="email"
        required
        autoComplete="email"
        placeholder="Adresse e-mail"
        className="h-12 min-w-0 flex-1 border border-r-0 border-ink bg-clay-50 px-3.5 text-[15px] placeholder:text-muted focus:outline-none"
      />
      <button
        type="submit"
        className="h-12 shrink-0 bg-ink px-5 text-[13px] font-bold uppercase tracking-[0.04em] text-clay-50 transition-colors hover:bg-terracotta"
      >
        S&apos;inscrire →
      </button>
    </form>
  );
}
