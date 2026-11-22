"use client";

import { useState } from "react";
import { Check } from "lucide-react";
import { buttonClass } from "@/components/ui/button";

const field =
  "mt-2 w-full border border-ink/20 bg-transparent px-3.5 py-3 text-base transition-colors focus:border-ink focus:outline-none";

export function ContactForm() {
  const [sent, setSent] = useState(false);
  if (sent) {
    return (
      <div className="bg-clay-100 p-8" role="status">
        <Check className="size-6 text-terracotta" />
        <p className="mt-4 font-serif text-3xl italic">Message prêt à partir.</p>
        <p className="mt-2 text-[15px] text-muted">
          Prototype : le formulaire n&apos;est pas encore relié à la boîte mail de la marque. En production, il sera branché sur le
          formulaire de contact Shopify.
        </p>
      </div>
    );
  }
  return (
    <form
      className="grid gap-5 bg-clay-100 p-6 md:p-10"
      onSubmit={(e) => {
        e.preventDefault();
        setSent(true);
      }}
    >
      <div className="grid gap-5 sm:grid-cols-2">
        <label className="label-mono text-muted">
          Prénom
          <input name="name" required autoComplete="given-name" className={field} />
        </label>
        <label className="label-mono text-muted">
          Email
          <input name="email" type="email" required autoComplete="email" className={field} />
        </label>
      </div>
      <label className="label-mono text-muted">
        Sujet
        <select name="subject" className={field} defaultValue="commande">
          <option value="commande">Ma commande</option>
          <option value="retour">Retour ou échange</option>
          <option value="taille">Conseil taille</option>
          <option value="autre">Autre</option>
        </select>
      </label>
      <label className="label-mono text-muted">
        N° de commande <span className="normal-case tracking-normal">(facultatif)</span>
        <input name="order" className={field} placeholder="#1001" />
      </label>
      <label className="label-mono text-muted">
        Message
        <textarea name="message" required rows={6} className={field} />
      </label>
      <button type="submit" className={buttonClass("ink", "w-full sm:w-auto sm:justify-self-start")}>
        Envoyer le message
      </button>
    </form>
  );
}
