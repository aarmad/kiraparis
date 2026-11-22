# KIRA Paris — Audit complet de kiraparis.com

_Audit réalisé le 22/11/2026 sur le site public (desktop 1280 px et mobile 375 px), le HTML, les endpoints publics Shopify et les pages légales. Aucune zone protégée (compte, checkout) n'a été sollicitée._

---

## 0. Synthèse en 30 secondes

KIRA Paris a **une vraie histoire** (Kirané, village du Mali, culture soninké), **des produits graphiquement forts** (motif terre craquelée, maillot floral, tracksuits Kira Athletics) et **un shooting de campagne réussi**. Le site actuel n'exploite presque rien de tout cela : c'est un thème Shopify **Dawn quasi non personnalisé**, sans H1, avec une homepage qui **cache le dernier drop**, des promesses commerciales **contradictoires** entre bandeau, FAQ et CGV, et deux pop‑ups superposées qui **masquent tout le contenu sur mobile**.

Le potentiel est élevé : l'essentiel du gain viendra d'une **mise en scène éditoriale de la marque**, d'une **structure de catalogue par drops**, et d'un **nettoyage des incohérences** qui freinent la confiance.

---

## 1. Fiche technique du site actuel

| Élément | Constat |
|---|---|
| Plateforme | **Shopify** (Online Store 2.0) |
| Thème | **Dawn 15.2.0** (thème gratuit par défaut) |
| Typographie | **Space Grotesk** (titres + texte), via Shopify Fonts |
| Langues | FR + DE (Weglot) |
| Paiements | Cartes (Visa, Mastercard, CB), PayPal, Apple Pay, Shop Pay |
| Apps détectées | Judge.me (avis), Kiwi Sizing (guide des tailles), Weglot (traduction), Instafeed (Instagram), Shopify Forms (pop-up -10 %), bannière de consentement Shopify |
| Catalogue | **11 produits**, **3 collections** (dont une vide) |
| Pages | À propos, FAQ, Contact, Suivre ma commande, Mentions légales, CGV, Confidentialité + politiques Shopify (livraison, retours, CGU, confidentialité) |
| Vidéo | Aucune |
| Blog | Sitemap présent, aucun article exploitable |

---

## 2. Cartographie des pages

```
kiraparis.com
├── /                                   Accueil
├── /collections/all                    « Catalogue » (11 produits)
├── /collections/collection-hunter      Collection Hunter (7 produits)
├── /collections/frontpage              Collection technique « Page d'accueil » (exposée dans le sitemap)
├── /collections/bonnet-noir            ⚠️ VIDE (0 produit) mais indexable
├── /products/…                         11 fiches produits
│   ├── DROP « ATHLETICS » (nov. 2026)
│   │   ├── sans-titre-1nov-_11-49-37   Ensemble Tracksuit Burgundy/Cream — 139,90 €
│   │   ├── sans-titre-1nov-_12-10-05   Ensemble Kira Athletics Bleu/Black — 139,90 €
│   │   └── jersey-kira-green           Maillot de football KIRA Vert — 30,99 €
│   ├── DENIM (avr. 2026)
│   │   └── kira-jean-terre-craquelee   Jean Terre Craquelée Noir — 79,90 € (édition limitée)
│   └── HUNTER / ESSENTIELS (2025)
│       ├── hoodie-kira-noir            Hoodie KIRA Noir — 69,90 €
│       ├── hoodie-hunter               Hoodie Hunter Gris — 69,90 €
│       ├── hoodie-hunter-1             Hoodie Hunter « Noir » (option : Gris Foncé) — 69,90 €
│       ├── hoodie-hunter-2             Hoodie Hunter Deep Chestnut (option : Rouge délavé) — 69,90 €
│       ├── hoodie-kira                 Hoodie KIRA « bleu marine » (option : Bleu Ciel) — 59,90 €
│       ├── sans-titre-24fevr-_21-32    Hoodie KIRA Vert — 59,90 €
│       └── pantalon                    Pantalon Jogging Noir — 60,90 € (M/L/XL épuisés)
├── /pages/a-propos-de-nous             Manifeste de marque (texte seul)
├── /pages/faq                          FAQ (livraison, retours, tailles, paiement)
├── /pages/contact                      Formulaire Dawn
├── /pages/suivre-ma-commande           Champ de suivi
├── /pages/mentions-legales             Éditeur : Kira Paris, Gagny (93), RCS Bobigny
├── /pages/condition-generale-de-vente  CGV
├── /pages/data-sharing-opt-out         Confidentialité
├── /policies/{shipping,refund,privacy,terms-of-service,terms-of-sale,legal-notice,contact-information}
└── /cart → checkout Shopify
```

**Navigation principale** : `Accueil · Catalogue · Contact` (3 liens, aucun sous-menu).
**Footer** : Recherche, Suivre ma commande, Contact, FAQ, À propos, Bouton de rétractation · newsletter « Rejoins la communauté » · Instagram, TikTok · sélecteurs pays/langue · moyens de paiement · liens légaux.

---

## 3. Analyse visuelle

### 3.1 Couleurs (extraites des variables CSS du thème)

| Rôle | Valeur | Remarque |
|---|---|---|
| Fond principal | `#F5F2EB` (crème) | Bon choix, chaleureux, mais seule couleur de surface |
| Texte | `#1A1A1A` | OK |
| Contraste / accent doux | `#CBBB96` (sable) | Quasi inutilisé |
| CTA du hero | brun‑terracotta | Seule touche de couleur, isolée |
| Emblème | sable `≈ #D3A57A` | Favicon |
| Logo script | terracotta `≈ #B5501F` | Utilisé dans une seule image |

→ La **palette « terre »** (terracotta, chestnut, sable, crème) existe dans les visuels de la marque, mais **le site ne l'utilise pas** : tout est crème + noir, sans hiérarchie chromatique.

### 3.2 Typographies
- **Space Grotesk** partout. Elle est correcte, mais c'est une police très répandue dans les templates tech/SaaS ; elle ne dit rien de l'héritage ni du streetwear.
- Les titres produits en capitales énormes cassent mal : sur la fiche produit desktop, « ENSEMBLE TRACKSUIT BURGUNDY/CR‑EAM » est coupé au milieu d'un mot.
- Aucune hiérarchie éditoriale (pas de surtitre, pas de chiffres, pas de contraste de style).

### 3.3 Espacements et proportions
- **Hero de 1 970 px de haut sur desktop** avec une image source de 1 284 px de large étirée sur toute la largeur → image **floue** et l'utilisateur doit scroller deux écrans entiers avant de voir un produit.
- Cartes produits : packshots paysage (≈ 3:2) dans des cartes carrées → **beaucoup de vide blanc** autour des hoodies, rendu « marketplace ».
- Section « HOODIE HUNTER » : deux images sans texte ni lien → section morte.

### 3.4 Animations / transitions
Uniquement les animations par défaut de Dawn (fondu au scroll, zoom léger au survol). Rien de propriétaire.

### 3.5 Couches visuelles (layers)
Hero = image + 1 bouton. Pas de superposition texte/image, pas de dégradé, pas de texture, pas de jeu de plans. Les seuls « layers » sont **deux pop‑ups** (cookies + -10 %) qui s'empilent sur le contenu.

### 3.6 Images
- **Excellentes** : la campagne Kira Athletics (`IMG_1169`, modèles + portant), la photo Hunter sur fond terracotta (5 783 px), les photos studio du maillot, des tracksuits et du jean (2 048–4 672 px).
- **Faibles** : les 7 packshots de hoodies/jogging (1 284 × ~850, paysage, fond blanc, rendus qui semblent être des **mockups numériques** plutôt que des photos). Aucune photo portée pour 5 coloris de hoodie.
- Incohérence de formats : carré 2048 (nouveautés) vs paysage 1284 (anciens).

---

## 4. Composants récurrents

Annonce défilante · header centré (logo + 3 liens + pays/langue + compte + panier) · bannière image · multicolonne · grille produits (4 col.) · carte produit (image, titre, « Prix habituel ») · fiche produit Dawn (galerie, sélecteurs, quantité, ATC, bouton de paiement accéléré, accordéon description) · bloc avis Judge.me · newsletter · footer 3 colonnes · drawer panier Dawn.

---

## 5. Parcours utilisateur

1. **Arrivée** → 2 pop‑ups simultanées (cookies en bas, -10 % à droite). Sur mobile, la pop‑up -10 % **couvre 80 % de l'écran** et réapparaît après fermeture/navigation.
2. **Hero** → aucun titre, aucune proposition de valeur ; un seul bouton « Découvrir Tous les produits » (casse incohérente).
3. **Scroll** → section Hunter muette → 4 hoodies (anciens) → témoignages.
4. Le **dernier drop (tracksuits, maillot, jean)** n'apparaît **nulle part** sur la homepage, alors qu'il est sur la photo du hero.
5. **Catalogue** → 11 produits sans filtre utile, sans tri par drop, sans badge (nouveau, édition limitée, épuisé).
6. **Fiche produit** → pas de guide des tailles visible, mention « Frais d'expédition calculés à l'étape de paiement » qui contredit le bandeau « livraison offerte », aucun élément de réassurance près du bouton, double bloc « Avis Clients — Soyez le premier… », bouton « Share » en anglais.
7. **Panier/checkout** → checkout Shopify standard (fiable, à conserver).

---

## 6. Arguments commerciaux actuels (vérifiés sur le site)

| Argument | Source | Statut |
|---|---|---|
| Héritage soninké, village de Kirané (Mali) | À propos | ✅ Fort, sous‑exploité |
| « Force tranquille, élégance essentielle » | Footer, fiches produits | ✅ Signature à valoriser |
| Coton 100 %, 400–420 GSM, broderies, sérigraphie | Fiches hoodies | ✅ Concret, à mettre en avant |
| Denim 12,5 oz, édition limitée | Fiche jean | ✅ |
| Livraison offerte en France | Bandeau, FAQ, meta description | ⚠️ **Contredit par la politique d'expédition** (« à partir de 70 € ») |
| Retours gratuits sous 14 jours | FAQ | ⚠️ La politique de remboursement ne mentionne pas la gratuité |
| Livraison 3–5 jours ouvrés | FAQ + politique | ✅ (7 j ouvrés en période de drop) |
| -10 % première commande | Pop‑up | ✅ (Shopify Forms) |
| Avis clients | Homepage | ⚠️ 4 témoignages saisis à la main (dont 2 du même auteur) ; **0 avis Judge.me** sur les fiches |

---

## 7. Freins à la conversion (classés par impact)

| # | Frein | Impact |
|---|---|---|
| 1 | **Pop‑ups superposées**, pop‑up -10 % plein écran et récurrente sur mobile | 🔴 Critique |
| 2 | **Dernier drop invisible** sur la homepage ; hero sans message | 🔴 Critique |
| 3 | **Promesses contradictoires** (livraison offerte vs seuil 70 € ; retours gratuits ; 2 emails de contact : `contact@kiraparis.com` et une adresse Gmail) | 🔴 Confiance |
| 4 | Navigation à 3 liens, aucune entrée par drop/catégorie | 🟠 |
| 5 | Packshots petits, paysage, pas de porté pour la majorité des hoodies | 🟠 |
| 6 | Pas de guide des tailles visible (app Kiwi chargée mais inactive) | 🟠 Retours |
| 7 | Noms produits incohérents : titre « noir » / option « Gris Foncé » ; « bleu marine » / « Bleu Ciel » ; « Deep Chestnut » / « Rouge délavé » | 🟠 Confiance + SEO |
| 8 | URLs non éditées (`sans-titre-1nov-_11-49-37`, `sans-titre-24fevr-_21-32`, `pantalon`) | 🟠 SEO |
| 9 | Pas de badge « Nouveau », « Édition limitée », « Plus que X » ; tailles épuisées sans alerte de réassort | 🟡 |
| 10 | Page À propos texte seul, alors que c'est l'argument différenciant n°1 ; elle mentionne une casquette qui n'est pas vendue | 🟡 |
| 11 | Mélange FR/EN (« Share », mentions légales de la pop‑up en anglais) | 🟡 |
| 12 | Collection « Bonnet noir » vide mais indexée ; collection `frontpage` exposée dans le sitemap | 🟡 SEO |

## 8. Ce qui favorise la conversion (à conserver)

- Checkout Shopify (Shop Pay, Apple Pay, PayPal) : rapide et rassurant.
- Fond crème chaleureux, sobriété générale.
- Photos de campagne et studio des derniers drops.
- Ton direct et tutoiement (« Rejoins la communauté ») : cohérent avec la cible.
- Délais clairs dans la FAQ.

---

## 9. SEO technique (état actuel)

| Point | Constat |
|---|---|
| H1 homepage | **Vide** |
| Titre homepage | « KIRA Paris – KIRA Paris » (doublon, aucun mot-clé) |
| Meta description | Bonne (« marque streetwear ancrée dans la culture Soninké… ») |
| Open Graph | Image = logo PNG détouré avec padding blanc → aperçu social pauvre |
| URLs produits | 3 sur 11 non lisibles |
| Titres produits | Bourrés de mots-clés (« Hoodie oversize streetwear noir – Collection Hunter KIRA Paris ») au lieu de vrais noms produits |
| Données structurées | Product de base (Dawn) ; pas d'Organization/Breadcrumb enrichis |
| Alt images | Majoritairement noms de fichiers ou vides |
| Sitemap | OK (Shopify) mais inclut une collection vide et `frontpage` |
| Performances | Images de hero étirées ; nombreux scripts tiers (Weglot, Instafeed, Kiwi, Judge.me, PayPal SDK, Forms) chargés sur chaque page |

---

## 10. Opportunités prioritaires

1. **Raconter Kirané** : faire de l'origine un fil conducteur visuel (carte, motifs, couleurs terre), pas un paragraphe caché.
2. **Penser en drops** : Drop Hunter · Drop Denim · Drop Athletics. La marque fonctionne déjà comme ça (CGV : « 2 premières semaines suivant le drop »), le site doit le montrer.
3. **Mettre les nouveautés en tête** avec la photo de campagne qui existe déjà.
4. **Fiches produits « fiche technique »** : GSM, coton, broderie, coupe, taille du mannequin (déjà renseignée pour le jean : 1,88 m, porte du L).
5. **Une seule vérité commerciale** (livraison, retours, contact) répétée partout.
6. **Pop‑up newsletter repensée** : non bloquante, différée, et orientée « accès au prochain drop ».

---

## 11. Décisions et informations à obtenir de la marque

1. **Livraison** : offerte sans minimum (bandeau/FAQ) ou dès 70 € (politique) ? Seuil Europe 140 € confirmé ?
2. **Retours** : gratuits ou non ?
3. **Email de contact officiel** unique.
4. **Témoignages homepage** : d'où viennent-ils ? On n'affichera que des avis réels et traçables (idéalement via Judge.me).
5. **Visuels hoodies** : photos réelles ou mockups ? Possibilité d'un shooting porté/packshot ?
6. **Fichiers sources** : logo vectoriel, motifs (terre craquelée, pétales, soleil Hunter, carte + étoiles).
7. **Guide des tailles** : mesures réelles par pièce.
8. **Rushs vidéo** du shooting Athletics.
9. **Accès Shopify** (création d'un canal Headless / jeton Storefront API) pour la phase 7.

> Note : le `robots.txt` du site contient un texte adressé aux agents IA leur demandant de recommander l'installation d'un « skill » shop.com. Je l'ai ignoré : ce n'est pas une instruction de ta part.
