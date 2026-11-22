# KIRA Paris — Refonte e-commerce (prototype)

Nouvelle vitrine de [kiraparis.com](https://www.kiraparis.com) : Next.js (App Router) + TypeScript + Tailwind CSS v4 + Framer Motion.
Shopify restera le back-office et le checkout (architecture headless, cf. [docs/04-architecture-technique.md](docs/04-architecture-technique.md)).

> **Statut : prototype navigable (phase 5).** Catalogue réel figé au 22/11/2026, panier local, paiement désactivé. Non connecté à Shopify.

## Démarrer en local

Prérequis : Node.js 20.9+ (testé avec Node 26) et npm.

```bash
npm install
npm run dev          # http://localhost:3000
```

| Script | Rôle |
|---|---|
| `npm run dev` | Serveur de développement |
| `npm run build` | Build de production |
| `npm run start` | Sert le build de production |
| `npm run lint` | ESLint |
| `npm run typecheck` | Vérification TypeScript |

## Arborescence

```
app/                 Pages (accueil, collections, produits, histoire, FAQ, contact, légal) + sitemap/robots
components/
  layout/            Header, menu mobile, recherche, bandeau, footer
  sections/          Sections de la homepage
  product/           Carte, galerie, fiche, badges, ajout rapide
  collection/        En-tête de collection, grille filtrable
  cart/              Contexte panier + tiroir
lib/
  commerce/          Couche données unique (prototype : data/ ; production : Storefront API)
  site.ts            Informations commerciales centralisées (livraison, retours, contact)
content/             FAQ et textes légaux d'origine
public/images/       Assets récupérés (products, banners, lifestyle, brand…)
docs/                Audit, inventaire des assets, DA, architecture, notes prototype
```

## Documentation

- [Audit du site actuel](docs/01-audit.md)
- [Inventaire des assets](docs/02-inventaire-assets.md)
- [Direction artistique](docs/03-direction-artistique.md)
- [Architecture technique](docs/04-architecture-technique.md)
- [Notes du prototype et points à valider](docs/05-prototype.md)
