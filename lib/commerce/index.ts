/**
 * Point d'accès unique aux données commerce.
 * Prototype : données locales (instantané réel). Production : remplacer l'implémentation
 * par la Storefront API Shopify sans modifier les composants.
 */
import { products } from "./data/products";
import { collections } from "./data/collections";
import type { Category, Collection, CollectionHandle, Product } from "./types";

export type { Product, Collection, CollectionHandle, Category };

export const CATEGORY_LABELS: Record<Category, string> = {
  ensembles: "Ensembles",
  maillots: "Maillots",
  hoodies: "Hoodies",
  pantalons: "Pantalons",
};

export function getProducts(): Product[] {
  return products;
}

export function getProduct(handle: string): Product | undefined {
  return products.find((p) => p.handle === handle);
}

export function getProductByLegacyHandle(legacy: string): Product | undefined {
  return products.find((p) => p.legacyHandle === legacy);
}

export function getCollections(): Collection[] {
  return collections;
}

export function getCollection(handle: string): Collection | undefined {
  return collections.find((c) => c.handle === handle);
}

export function getCollectionProducts(handle: string): Product[] {
  return products.filter((p) => p.collection === handle);
}

/** Autres coloris du même modèle (incluant le produit courant). */
export function getColorSiblings(product: Product): Product[] {
  return products.filter((p) => p.model === product.model);
}

export function getRelated(product: Product, limit = 4): Product[] {
  const same = products.filter((p) => p.collection === product.collection && p.model !== product.model);
  const others = products.filter(
    (p) => p.collection !== product.collection && p.model !== product.model,
  );
  return [...same, ...others].slice(0, limit);
}

export function getVariant(variantId: string) {
  for (const p of products) {
    const v = p.variants.find((x) => x.id === variantId);
    if (v) return { product: p, variant: v };
  }
  return undefined;
}

export function isSoldOut(p: Product) {
  return p.variants.every((v) => !v.available);
}

export function lowStockSizes(p: Product) {
  return p.variants.filter((v) => !v.available).map((v) => v.size);
}
