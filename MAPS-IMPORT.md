# Import de la carte dans Google My Maps

Les 5 fichiers KML sont dans `./kml/` — un fichier par calque/couleur. Les coordonnées
de certains points sont approximatives : tu pourras glisser-déposer les épingles
imprécises directement dans My Maps une fois importées.

## Étapes

1. Va sur **[mymaps.google.com](https://mymaps.google.com)** → **Créer une carte** → nomme-la
   "Road trip Verdon août 2026".
2. **Importer** → sélectionne `kml/baignade.kml` → une fois importé, sur ce calque :
   icône pinceau (style) → **Style uniforme** → couleur **BLEU**.
3. **Ajouter un calque**, puis **Importer** pour chacun des fichiers restants, avec sa couleur :
   - `kml/randos.kml` → **VERT**
   - `kml/campings.kml` → **JAUNE**
   - `kml/points_de_vue.kml` → **VIOLET**
   - `kml/bonus_planb.kml` → **GRIS**
4. **Optionnel (tracé de la route)** : Ajouter un calque → icône itinéraire 🚗 sous la barre
   de recherche → A : Andon, B : Rougon → puis "Ajouter une destination" pour chaque étape :
   Aiguines, Bauduen, Quinson, Esparron.
5. **Partager** → "Toute personne disposant du lien" → copie ce lien pour l'envoyer au groupe.
6. Menu **⋮** de la carte → **"Intégrer à mon site"** → copie l'URL de l'iframe (elle
   ressemble à `https://www.google.com/maps/d/embed?mid=...`).
7. Colle cette URL dans `data.js`, champ `carte.embedUrl` (actuellement vide), puis
   republie le site (voir README.md pour la méthode depuis le téléphone) — la carte
   apparaît automatiquement dans la section "Carte" du site, avec un bouton "Ouvrir
   dans Google Maps" et la légende des couleurs.

Tant que `carte.embedUrl` reste vide, le site affiche un encart "Carte en préparation"
avec un lien vers mymaps.google.com — rien ne casse en attendant.

## Légende des calques

| Couleur | Calque | Contenu |
|---|---|---|
| 🔵 Bleu | `baignade.kml` | Spots de baignade |
| 🟢 Vert | `randos.kml` | Départs de randonnées |
| 🟡 Jaune | `campings.kml` | Campings du trip |
| 🟣 Violet | `points_de_vue.kml` | Belvédères et villages |
| ⚪ Gris | `bonus_planb.kml` | Bonus et plans B |

## Rappel

Les liens GPS "🧭 GPS du jour" affichés sur chaque carte de journée du site sont
indépendants de cette carte My Maps : ce sont des liens directs vers Google Maps
Directions, ils fonctionnent même si `carte.embedUrl` n'est pas encore renseigné.
