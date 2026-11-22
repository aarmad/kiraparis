"use client";

import { useEffect } from "react";

/** Bloque le scroll du body et ferme le panneau avec Échap tant qu'il est ouvert. */
export function useBodyLock(active: boolean, onEscape?: () => void) {
  useEffect(() => {
    if (!active) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onEscape?.();
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
    };
  }, [active, onEscape]);
}
