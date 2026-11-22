# Déploiement Vercel

Le projet est prêt à être importé dans Vercel tel quel : Vercel détecte Next.js automatiquement, aucun `vercel.json` n'est nécessaire.

## 1. Importer le dépôt (≈ 3 minutes, depuis ton compte)

1. Aller sur **vercel.com/new** et se connecter avec GitHub.
2. Autoriser l'application Vercel à accéder au dépôt **aarmad/kiraparis** (« Install » ou « Adjust GitHub App Permissions »).
3. Cliquer sur **Import** à côté de `kiraparis`.
4. Laisser les réglages détectés :

   | Réglage | Valeur |
   |---|---|
   | Framework Preset | Next.js |
   | Root Directory | `./` |
   | Build Command | `next build` (par défaut) |
   | Install Command | `npm install` (par défaut, utilise `package-lock.json`) |
   | Node.js Version | 20.x ou plus récent (Settings → General) |

5. **Variables d'environnement** : aucune n'est obligatoire pour le prototype. Optionnel :

   | Variable | Valeur | Environnement |
   |---|---|---|
   | `ALLOW_INDEXING` | `false` | Production |
   | `NEXT_PUBLIC_SITE_URL` | l'URL finale, une fois le domaine branché | Production |

6. **Deploy**. Vercel construit le site et fournit une URL `https://kiraparis-xxxx.vercel.app`.

Ensuite, chaque `git push` sur `main` redéploie la production, et chaque branche / pull request obtient sa propre URL d'aperçu.

## 2. Ce qui est déjà configuré dans le code

- **Indexation bloquée par défaut** (`robots.txt` en `Disallow: /` + balise `noindex`) tant que `ALLOW_INDEXING` ≠ `true` en production. Indispensable : le site Shopify actuel reste en ligne, il ne faut pas créer de contenu dupliqué.
- **URL canonique** déduite automatiquement de l'environnement Vercel (`lib/site.ts`).
- **Redirections 301** des anciennes URLs Shopify (`/products/…`, `/pages/…`, `/policies/…`, `/collections/all`).
- **En-têtes de sécurité** (nosniff, referrer-policy, frame-options, permissions-policy) et cache long des images.
- **Images** optimisées par Vercel (AVIF/WebP) via `next/image`.

## 3. Domaine kiraparis.com — à NE PAS faire maintenant

Brancher `www.kiraparis.com` sur Vercel remplacerait la boutique Shopify actuelle, alors que le prototype n'a pas encore de paiement. À faire uniquement après la phase de connexion Shopify (catalogue, panier, checkout) et avec ton accord :

1. Vercel → Settings → Domains → ajouter `www.kiraparis.com` (et `kiraparis.com` en redirection).
2. Chez le registrar : enregistrement `CNAME www → cname.vercel-dns.com` (Vercel affiche les valeurs exactes).
3. Côté Shopify : passer le checkout sur un sous-domaine (ex. `checkout.kiraparis.com`) pour que le paiement reste servi par Shopify.
4. Passer `ALLOW_INDEXING=true` et `NEXT_PUBLIC_SITE_URL=https://www.kiraparis.com`, redéployer.

## 4. Vérifications après le premier déploiement

- [ ] La page d'accueil, une collection et une fiche produit se chargent.
- [ ] Les images s'affichent (optimisation Vercel active).
- [ ] `/robots.txt` renvoie `Disallow: /`.
- [ ] `/products/pantalon` redirige vers `/produits/jogging-noir`.
- [ ] Le panier fonctionne (ajout, quantité, suppression).
- [ ] Test mobile réel (iOS Safari, Android Chrome).
