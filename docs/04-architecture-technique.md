# KIRA Paris — Proposition d'architecture technique

## 1. Recommandation : Shopify Headless + Next.js sur Vercel

Le site actuel tourne sur Shopify, qui gère déjà **produits, stocks, commandes, paiements (Shop Pay, PayPal, Apple Pay), taxes et emails transactionnels**. Il ne faut **pas** reconstruire cela.

→ On garde Shopify comme **back-office et checkout**, et on remplace uniquement la **vitrine** par une application Next.js connectée via la **Storefront API**.

```
                 ┌──────────────────────────── Vercel ─────────────────────────────┐
 Visiteur ──────▶│ Next.js (App Router, RSC)                                       │
                 │  ├─ pages statiques + ISR (accueil, collections, produits)      │
                 │  ├─ Server Actions : panier (Cart API)                          │
                 │  └─ /api/revalidate ◀── webhooks Shopify (produit/stock modifié)│
                 └───────────────┬───────────────────────────────┬─────────────────┘
                                 │ Storefront API (GraphQL)      │ Judge.me API (avis réels)
                                 ▼                               ▼
                 ┌──────────────────────── Shopify ─────────────────────────┐
                 │ Produits · Stocks · Collections · Métachamps · Commandes │
                 │ Checkout hébergé (checkout.kiraparis.com) · Paiements    │
                 └──────────────────────────────────────────────────────────┘
```

**Le checkout reste 100 % Shopify** : le bouton « Commander » redirige vers l'URL `checkoutUrl` renvoyée par la Cart API. Aucun paiement n'est simulé.

### Alternative écartée
- **Rester sur Shopify Liquid** (thème custom) : moins de liberté d'animation et de performance, mais pas besoin de Vercel. Écartée car tu as demandé Next.js + Vercel ; reste une option de repli valable.
- **Hydrogen (Remix) sur Oxygen** : excellent, mais hébergé chez Shopify, pas sur Vercel.

## 2. Stack

| Couche | Choix |
|---|---|
| Framework | Next.js (dernière version stable, App Router, React Server Components) |
| Langage | TypeScript strict |
| Style | Tailwind CSS + tokens CSS (palette DA) |
| Animations | CSS + Framer Motion (drawer, menu, révélations) |
| Icônes | Lucide React |
| Polices | `next/font/google` : Archivo, Instrument Serif, JetBrains Mono |
| Images | `next/image` + loader CDN Shopify (redimensionnement à la volée, AVIF/WebP) |
| Données | Storefront API GraphQL (`@shopify/storefront-api-client` ou fetch typé) |
| Validation | Zod sur les réponses API |
| Qualité | ESLint, Prettier, `tsc --noEmit`, Playwright (parcours critiques) |
| Hébergement | Vercel (preview par PR, production sur `main`) |

## 3. Arborescence

```
kiraparis/
├── app/
│   ├── layout.tsx                 # polices, header, footer, drawer panier
│   ├── page.tsx                   # accueil
│   ├── collections/[handle]/page.tsx
│   ├── produits/[handle]/page.tsx
│   ├── notre-histoire/page.tsx
│   ├── faq/page.tsx
│   ├── contact/page.tsx
│   ├── legal/[slug]/page.tsx      # CGV, mentions, confidentialité, livraison, retours
│   ├── api/revalidate/route.ts
│   ├── sitemap.ts · robots.ts · opengraph-image.tsx
│   └── not-found.tsx · error.tsx
├── components/
│   ├── layout/   (Header, MobileMenu, Footer, AnnouncementBar)
│   ├── product/  (ProductCard, Gallery, VariantPicker, SizeGuide, SpecSheet, AddToCart)
│   ├── cart/     (CartDrawer, CartLine, CartProvider)
│   ├── sections/ (Hero, Marquee, DropGrid, Manifesto, CollectionShowcase, Craft, Reviews, Reassurance, Newsletter)
│   └── ui/       (Button, Badge, Accordion, Sheet…)
├── lib/
│   ├── commerce/
│   │   ├── types.ts               # Product, Variant, Collection, Cart (indépendants de la source)
│   │   ├── index.ts               # interface unique getProduct/getCollection/cart…
│   │   ├── shopify/               # implémentation Storefront API (phase 7)
│   │   └── mock/                  # implémentation prototype (snapshot réel du catalogue)
│   ├── seo.ts · jsonld.ts
├── content/                       # textes éditoriaux (histoire, FAQ) en MDX/TS
├── public/images/{products,collections,banners,lifestyle,brand,icons}  + /videos
└── docs/
```

**Point clé** : la couche `lib/commerce` expose une interface unique. Le **prototype** utilise `mock/` alimenté par un **instantané réel** du catalogue (les 11 vrais produits, prix, variantes, images) ; en phase 7 on bascule sur `shopify/` sans toucher aux composants.

## 4. Fonctionnalités e-commerce

| Fonction | Prototype (phase 5) | Production (phase 7) |
|---|---|---|
| Catalogue, collections, fiches | Données réelles figées | Storefront API + ISR |
| Variantes, stock, épuisé | Réel (instantané) | Temps réel |
| Panier, quantités | Local (navigateur) | Cart API Shopify (persisté, cookie) |
| Checkout | **Désactivé**, message « prototype » | Redirection checkout Shopify |
| Avis | Masqués tant que non vérifiés | Judge.me API |
| Guide des tailles | Gabarit à remplir | Métachamps Shopify |
| Newsletter | Formulaire non connecté (signalé) | Shopify Customer API / Klaviyo selon l'outil de la marque |
| Traduction | FR | FR (+ DE/EN via Shopify Translate & Adapt si souhaité) |

## 5. SEO technique prévu

- Une **H1 unique** par page, hiérarchie H2/H3 propre.
- URLs françaises lisibles (`/produits/hoodie-hunter-gris-fonce`) + **redirections 301** depuis les anciennes URLs Shopify (`/products/sans-titre-…`) dans `next.config` / `vercel.json`.
- `generateMetadata` par page, Open Graph image dynamique (`opengraph-image.tsx`).
- JSON-LD : `Organization`, `WebSite`, `Product` + `Offer` (prix, disponibilité), `BreadcrumbList`, `FAQPage`.
- `sitemap.ts` et `robots.ts` générés, collections vides exclues.
- Alt descriptifs pour chaque image produit.

## 6. Performance

- RSC + rendu statique/ISR → HTML immédiat.
- `next/image` avec tailles adaptées ; hero en `priority`, reste en lazy.
- Scripts tiers chargés **seulement là où nécessaires** (Judge.me sur fiches produits, aucun Instafeed bloquant).
- Objectif : LCP < 2,5 s en 4G, CLS < 0,05, Lighthouse ≥ 90 sur mobile.

## 7. Variables d'environnement (phase 7)

| Variable | Rôle | Secret |
|---|---|---|
| `SHOPIFY_STORE_DOMAIN` | ex. `kira-paris.myshopify.com` | non |
| `SHOPIFY_STOREFRONT_ACCESS_TOKEN` | jeton public Storefront API | public, mais hors repo |
| `SHOPIFY_STOREFRONT_PRIVATE_TOKEN` | jeton privé côté serveur (recommandé) | **oui** |
| `SHOPIFY_REVALIDATION_SECRET` | sécurise le webhook de revalidation | **oui** |
| `JUDGEME_PUBLIC_TOKEN` / `JUDGEME_SHOP_DOMAIN` | avis réels | selon usage |
| `NEXT_PUBLIC_SITE_URL` | URL canonique | non |

Un `.env.example` sera versionné, jamais de `.env` réel.

## 8. Accès nécessaires (à fournir plus tard, pas pour le prototype)

1. **Shopify** : installer le canal **Headless** et générer les jetons Storefront API ; créer un webhook produit.
2. **GitHub** : droits de push sur `aarmad/kiraparis` (le repo existe et est vide ; les droits d'écriture seront vérifiés au moment du push).
3. **Vercel** : compte connecté à GitHub.
4. **DNS** : à la mise en production, `www.kiraparis.com` → Vercel ; le checkout reste servi par Shopify (sous-domaine `checkout.` à configurer). **Aucun changement DNS sans ton accord.**

## 9. Plan des phases suivantes

| Phase | Livrable | Point de validation |
|---|---|---|
| 2 | Téléchargement des assets (manifest prêt : `docs/assets-manifest.json`, 42 fichiers) | — |
| 5 | Prototype Next.js navigable en local (accueil, collections, 11 fiches, histoire, FAQ, panier, menus, mobile) | **Arrêt obligatoire** pour tes retours |
| 7–8 | Branchement Shopify, SEO, perf, tests responsive | Revue |
| 9 | GitHub + Vercel + vérification en ligne | **Uniquement après ton accord explicite** |
