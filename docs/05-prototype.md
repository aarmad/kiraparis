# Prototype — notes de validation

_Version du 22/11/2026. Lancer avec `npm run dev`, puis ouvrir http://localhost:3000._

## Pages disponibles

| URL | Contenu |
|---|---|
| `/` | Accueil : hero Athletics, bande manifeste, drop, Kirané, Hunter + rail hoodies, matière, denim, réassurance |
| `/collections` | Tout le vestiaire, filtres catégorie / taille dispo, tri, vue compacte |
| `/collections/athletics` · `hunter` · `denim` · `essentiels` | Collections par drop, en-tête éditorial à la couleur du drop |
| `/produits/<slug>` | 11 fiches produits (galerie, visionneuse, coloris, tailles, guide, fiche technique, ATC collant mobile) |
| `/notre-histoire` | Récit en chapitres (texte de la page À propos d'origine) |
| `/faq` · `/contact` · `/suivre-ma-commande` | Aide |
| `/legal/livraison` · `retours` · `cgv` · `confidentialite` · `mentions-legales` | Textes d'origine de la boutique |
| Anciennes URLs (`/products/…`, `/pages/…`, `/policies/…`) | Redirigées en 301/308 vers les nouvelles |

## Interactions fonctionnelles

Méga-menu (desktop), menu plein écran (mobile), recherche instantanée, panier latéral (ajout, quantités, suppression, barre de livraison offerte, persistance navigateur), ajout rapide par taille au survol, filtres et tri synchronisés dans l'URL, sélecteur de coloris entre fiches, validation de taille, alerte « me prévenir » sur taille épuisée, visionneuse plein écran, accordéons, header masqué au scroll, animations au scroll (désactivées si « réduire les animations »).

## Ce qui est simulé (et signalé comme tel dans l'interface)

- **Paiement** : bouton « Commander » désactivé. En production → checkout Shopify.
- **Newsletter, contact, alerte stock, suivi de commande** : formulaires non connectés.
- **Avis** : aucun avis affiché (aucun avis Judge.me vérifiable aujourd'hui).
- **Guide des tailles** : conseils réels de la FAQ, tableau de mesures en attente.

## Décisions prises à valider

| Sujet | Choix du prototype | Pourquoi |
|---|---|---|
| Livraison offerte | **Dès 70 €** (France), 140 € (Europe) | C'est ce que dit la politique d'expédition (document contractuel). La FAQ et le bandeau actuels disent « sans minimum ». Modifiable en une ligne dans `lib/site.ts`. |
| Retours gratuits | **Non affirmé** : « 14 jours pour changer d'avis » | La politique de remboursement ne mentionne pas la gratuité. |
| Email de contact | `contact@kiraparis.com` | Adresse des mentions légales (la politique de retour cite une adresse Gmail). |
| Hoodie Hunter `hoodie-hunter-1` | Affiché **« Noir »** | Titre et photo = noir ; l'option Shopify dit « Gris Foncé ». |
| Hoodie Hunter `hoodie-hunter-2` | Affiché **« Rouge délavé »** | La photo est rouge corail ; le titre dit « Deep Chestnut ». |
| Hoodie KIRA `hoodie-kira` | Affiché **« Bleu ciel »** | Photo et option = bleu ciel ; le titre dit « bleu marine ». |
| Numérotation des drops | Hunter = 01, Denim = 02, Athletics = 03 | Ordre de mise en ligne des produits. |
| Collections | Athletics · Hunter · Denim · Essentiels | Remplacent « Collection Hunter », « frontpage » et « Bonnet noir » (vide). |
| Avis clients de la homepage actuelle | Non repris | Provenance non vérifiable (saisis à la main). |

## Reste à finaliser avant production

1. Réponses de la marque sur les points ci-dessus.
2. Logo et motifs en vectoriel (le logo actuel est un PNG de 974 px, affiché via masque CSS).
3. Mesures du guide des tailles.
4. Shooting packshot / porté des hoodies (visuels actuels petits, probablement des mockups).
5. Accès Shopify (canal Headless, jetons Storefront API) → brancher `lib/commerce` sur l'API, Cart API, checkout.
6. Avis Judge.me, newsletter (outil d'emailing), formulaire de contact.
7. Tests multi-navigateurs, Lighthouse, puis déploiement Vercel (après accord).
