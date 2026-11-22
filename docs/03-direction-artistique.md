# KIRA Paris — Proposition de direction artistique

## Concept : « TERRE D'ORIGINE »

> _Née à Kirané. Portée à Paris._

KIRA n'est pas une marque streetwear de plus avec un logo sur un hoodie. C'est une marque **d'origine** : un village du Mali, une culture soninké, une manière de se tenir (« force tranquille »). La nouvelle DA traite le site comme **un magazine de mode imprimé sur de la terre** : matières brutes, couleurs de latérite, typographie affirmée, et une précision presque technique sur les produits.

Trois tensions guident chaque section :

| Héritage | ↔ | Rue |
|---|---|---|
| Terre, motifs, carte, mémoire | | Drops, sport, Paris, énergie |
| Serif italique, texture, grain | | Grotesk condensé, chiffres, étiquettes |
| Lenteur, silence, grandes marges | | Rythme, défilement, contraste |

Ce n'est pas du « luxe » froid ni du « hype » agressif. C'est **éditorial, chaud et sûr de lui**.

---

## 1. Palette

| Token | Hex | Nom | Usage |
|---|---|---|---|
| `--clay-50` | `#F4EFE6` | Argile claire | Fond principal (hérite du crème actuel, légèrement plus chaud) |
| `--clay-100` | `#EAE2D3` | Argile | Cartes, zones secondaires |
| `--sand` | `#D3A57A` | Sable de Kirané | Accents, emblème, filets (couleur exacte de l'emblème actuel) |
| `--terracotta` | `#B04A1F` | Latérite | **Couleur signature** : manifeste, CTA secondaires, sélection (issue du logo script) |
| `--chestnut` | `#4A2117` | Chestnut | Sections sombres chaudes, footer (écho au hoodie Deep Chestnut) |
| `--ink` | `#15120F` | Encre | Texte, CTA principal |
| Couleurs de drop | `#1E4A35` vert maillot · `#5A1C24` burgundy · `#1D5BD8` bleu Athletics | | Utilisées **uniquement** dans les pages/sections du drop concerné |

Règle : **une couleur de surface par section**. Jamais plus de deux couleurs d'accent à l'écran.

## 2. Typographie

| Rôle | Police | Pourquoi |
|---|---|---|
| Display | **Big Shoulders** (800, capitales) | Grotesque condensée née de la signalétique athlétique : écho direct aux maillots, flocages et au drop Athletics |
| Éditorial | **Brygada 1918** (italique) | Revival d'un caractère de 1918 : chaleur, patine, voix « héritage » en contrepoint du display |
| Texte, UI & étiquettes | **Schibsted Grotesk** | Grotesque de presse, sobre et un peu brute ; les étiquettes en petites capitales espacées remplacent la mono |

_Révision du 22/11/2026 : Archivo, Instrument Serif et JetBrains Mono remplacées (jugées trop « génériques / IA »)._

Toutes sur Google Fonts, chargées via `next/font` (aucun CLS, auto-hébergées).

Échelle fluide : display `clamp(3.5rem, 12vw, 11rem)`, H2 `clamp(2rem, 5vw, 4rem)`, texte 16–17 px, interlignage 1,55.

## 3. Éléments graphiques propriétaires

1. **Le motif « terre craquelée »** (celui du jean) redessiné en SVG léger : texture de fond en très faible opacité sur les sections terracotta, masque d'image au survol, séparateurs.
2. **L'emblème carte** (favicon actuel) comme repère : point de navigation, loader, puce de liste, filigrane du manifeste.
3. **Numérotation des drops** : `DROP 01 — HUNTER` · `DROP 02 — DENIM` · `DROP 03 — ATHLETICS` _(ordre chronologique à valider)_.
4. **Grain photographique** subtil (SVG noise, 3–4 %) sur les sections sombres pour éviter l'effet « template plat ».
5. **Étiquettes tissées** : les badges (« Édition limitée », « Nouveau ») reprennent la forme d'une étiquette cousue (petit rectangle, mono, bord fin).

## 4. Composition et layers

- **Hero split asymétrique** (desktop) : photo de campagne portrait à droite (60 %), titre condensé géant qui **déborde sur l'image** (texte en `mix-blend-mode` ou double couche clip), surtitre serif italique, 2 CTA. Mobile : photo plein écran, titre en bas sur dégradé encre → transparent.
- **Superpositions maîtrisées** : un seul niveau d'overlay par image (dégradé directionnel, jamais de voile gris uniforme).
- **Grilles éditoriales** : alternance grille 12 colonnes / pleine largeur / bande défilante. Les grilles produits restent régulières (lisibilité), les sections éditoriales cassent la grille.
- **Images produits** : ratio **4:5** partout, fond argile unifié. Survol = 2e image (porté/dos).

## 5. Motion

| Interaction | Comportement |
|---|---|
| Apparition au scroll | Montée 16 px + fondu, 500 ms, `cubic-bezier(.2,.7,.2,1)`, une seule fois |
| Titres hero | Révélation ligne par ligne (masque), 700 ms |
| Bande manifeste | Défilement horizontal continu, pause au survol |
| Cartes produit | Échange d'image en fondu croisé, swatchs couleurs |
| Ajout au panier | Le bouton passe en « Ajouté ✓ », le drawer glisse, compteur qui pulse |
| Navigation | Header transparent sur hero → fond argile flouté au scroll, masqué au scroll bas, réapparaît au scroll haut |
| `prefers-reduced-motion` | Toutes les animations désactivées |

Framer Motion uniquement pour le drawer, le menu mobile et les révélations de titres ; le reste en CSS.

## 6. Structure de la nouvelle homepage

| # | Section | Objectif | Contenu |
|---|---|---|---|
| 0 | Bandeau d'annonce | Réassurance immédiate | Message livraison **validé** (cf. audit §11) |
| 1 | **Hero — Drop Athletics** | Montrer la nouveauté, donner envie | Photo `IMG_1169`, « KIRA ATHLETICS », « _Drop 03_ », CTA « Découvrir le drop » + « Tout le vestiaire » |
| 2 | Bande défilante | Installer la signature | « Force tranquille · Élégance essentielle · Né à Kirané · Porté à Paris » |
| 3 | **Le drop en 3 pièces** | Conversion directe | Grille asymétrique : 2 ensembles (grand format), maillot, jean |
| 4 | **Manifeste Kirané** (fond latérite) | Différenciation, attachement | Texte court + emblème + CTA « Notre histoire » |
| 5 | **Collection Hunter** | Cross-sell sur les essentiels | Visuel `HOODIE_HUNTER_KIRA` plein cadre + carrousel des hoodies avec swatchs |
| 6 | **Fait pour durer** | Lever l'objection prix | 3 chiffres vérifiés : `400 GSM` · `100 % coton` · `Logo brodé` + `Denim 12,5 oz` |
| 7 | Avis | Preuve sociale | **Uniquement des avis réels** (Judge.me). Si aucun n'est exploitable, la section est masquée. |
| 8 | Réassurance | Lever les derniers freins | Livraison · Retours 14 j · Paiement sécurisé · Contact |
| 9 | « Le prochain drop » | Capter les emails | Newsletter inline (remplace la pop‑up intrusive) |
| 10 | Footer chestnut | Navigation, légal | Logo XXL en filigrane, liens, réseaux, paiements |

## 7. Pages

- **Collection** : en-tête éditorial par drop (photo + texte + couleur du drop), filtres taille/couleur/catégorie, tri, badges.
- **Fiche produit** : galerie verticale (desktop) / swipe (mobile), titre propre, prix, swatchs couleur reliés aux autres coloris du même modèle, sélecteur de taille en boutons (épuisé barré + « Me prévenir »), guide des tailles en tiroir, **fiche technique mono**, réassurance sous le CTA, ATC collant en bas sur mobile, « Complète le look ».
- **Notre histoire** : récit long-form en chapitres (Une origine · L'héritage · Entre deux mondes · Le début d'un mouvement), avec photos et emblème.
- **FAQ** : accordéons par thème + recherche.
- **Panier** : drawer latéral, rappel de la livraison, estimation, upsell léger.

## 8. Copywriting — ton et exemples

**Ton** : tutoiement (déjà adopté), phrases courtes, affirmatives, sans superlatifs creux. On parle de la matière et de l'origine, pas de « qualité premium incroyable ».

| Emplacement | Actuel | Proposé |
|---|---|---|
| Hero titre | _(vide)_ | **KIRA ATHLETICS** — _Drop 03_ |
| Hero sous-titre | — | « Le vestiaire sportif de Kirané, coupé pour Paris. » |
| Hero CTA | « Découvrir Tous les produits » | « Découvrir le drop » · « Tout le vestiaire » |
| Manifeste | (page À propos uniquement) | « KIRA vient de Kirané, un village du Mali. Un point sur la carte, une empreinte immense. On ne dilue pas ses racines : on les porte. » |
| Hunter | « HOODIE HUNTER » | « **Hunter.** Coton épais, broderie devant, sérigraphie dans le dos. L'essentiel, sans compromis. » |
| Bloc matière | — | « 400 grammes de coton au mètre carré. Tu le sens dès que tu l'enfiles. » |
| Fiche produit — nom | « Hoodie oversize streetwear noir – Collection Hunter KIRA Paris » | « Hoodie Hunter — Gris foncé » (les mots-clés vont dans le title SEO, pas dans le nom) |
| Panier vide | défaut Dawn | « Ton panier attend sa première pièce. » + liens vers le drop |
| Newsletter | « Rejoins la communauté » | « **Le prochain drop part vite.** Inscris-toi pour y accéder en premier — et reçois -10 % sur ta première commande. » |

Tous les chiffres utilisés (GSM, oz, composition, délais, prix) proviennent des fiches et politiques actuelles. Aucune certification, note moyenne, nombre de clients ou statistique ne sera inventé.
