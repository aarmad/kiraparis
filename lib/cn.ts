import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

/** Fusionne les classes Tailwind en résolvant les conflits (la dernière l'emporte). */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
