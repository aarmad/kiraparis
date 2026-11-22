"use client";

import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import { getVariant } from "@/lib/commerce";
import type { CartLine } from "@/lib/commerce/types";

/**
 * Panier du prototype : conservé dans le navigateur.
 * En production, ces actions appelleront la Cart API Shopify (cartCreate / cartLinesAdd…)
 * et le bouton « Commander » redirigera vers le checkout Shopify.
 */

const STORAGE_KEY = "kira-cart-v1";

interface CartContextValue {
  lines: CartLine[];
  count: number;
  subtotal: number;
  isOpen: boolean;
  open: () => void;
  close: () => void;
  add: (variantId: string, handle: string, quantity?: number) => void;
  update: (variantId: string, quantity: number) => void;
  remove: (variantId: string) => void;
  lastAdded: string | null;
}

const CartContext = createContext<CartContextValue | null>(null);

function readStorage(): CartLine[] {
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw) as CartLine[];
    return Array.isArray(parsed) ? parsed.filter((l) => getVariant(l.variantId)) : [];
  } catch {
    return [];
  }
}

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [lines, setLines] = useState<CartLine[]>([]);
  const [hydrated, setHydrated] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [lastAdded, setLastAdded] = useState<string | null>(null);

  useEffect(() => {
    // Lecture différée du stockage local après hydratation (évite un décalage serveur/client).
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setLines(readStorage());
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(lines));
    } catch {
      /* stockage indisponible : le panier reste en mémoire */
    }
  }, [lines, hydrated]);

  const add = useCallback((variantId: string, handle: string, quantity = 1) => {
    setLines((prev) => {
      const existing = prev.find((l) => l.variantId === variantId);
      if (existing) {
        return prev.map((l) =>
          l.variantId === variantId ? { ...l, quantity: Math.min(l.quantity + quantity, 10) } : l,
        );
      }
      return [...prev, { variantId, handle, quantity }];
    });
    setLastAdded(variantId);
    setIsOpen(true);
  }, []);

  const update = useCallback((variantId: string, quantity: number) => {
    setLines((prev) =>
      quantity <= 0
        ? prev.filter((l) => l.variantId !== variantId)
        : prev.map((l) => (l.variantId === variantId ? { ...l, quantity: Math.min(quantity, 10) } : l)),
    );
  }, []);

  const remove = useCallback((variantId: string) => {
    setLines((prev) => prev.filter((l) => l.variantId !== variantId));
  }, []);

  const value = useMemo<CartContextValue>(() => {
    const count = lines.reduce((n, l) => n + l.quantity, 0);
    const subtotal = lines.reduce((sum, l) => {
      const found = getVariant(l.variantId);
      return sum + (found ? found.product.price * l.quantity : 0);
    }, 0);
    return {
      lines,
      count,
      subtotal,
      isOpen,
      open: () => setIsOpen(true),
      close: () => setIsOpen(false),
      add,
      update,
      remove,
      lastAdded,
    };
  }, [lines, isOpen, add, update, remove, lastAdded]);

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart doit être utilisé dans <CartProvider>");
  return ctx;
}
