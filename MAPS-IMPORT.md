# Import de la carte dans Google My Maps

## Méthode express (recommandée — 2 minutes, couleurs automatiques)

Un seul fichier contient tous les points **avec leurs couleurs déjà définies** :
`kml/verdon-roadtrip-complet.kml`. My Maps lit les styles KML à l'import, donc pas
besoin de colorier quoi que ce soit à la main.

1. Va sur **[mymaps.google.com](https://mymaps.google.com)** → **Créer une carte** → nomme-la
   "Road trip Verdon août 2026".
2. **Importer** → sélectionne `kml/verdon-roadtrip-complet.kml`. C'est tout : les 29
   points arrivent groupés par catégorie, chacun avec sa couleur.
3. **Partager** → "Toute personne disposant du lien" → copie ce lien pour le groupe.
4. Menu **⋮** de la carte → **"Intégrer à mon site"** → copie l'URL de l'iframe (elle
   ressemble à `https://www.google.com/maps/d/embed?mid=...`).
5. Colle cette URL dans `data.js`, champ `carte.embedUrl` (actuellement vide), puis
   republie le site (voir README.md pour la méthode depuis le téléphone) — la carte
   My Maps remplace alors automatiquement la carte OpenStreetMap par défaut du site.

Si une épingle est mal placée (certaines coordonnées sont approximatives), glisse-la
simplement au bon endroit dans My Maps.

**Optionnel (tracé de la route)** : Ajouter un calque → icône itinéraire 🚗 sous la barre
de recherche → A : Andon, B : Rougon → puis "Ajouter une destination" pour chaque étape :
Aiguines, Bauduen, Quinson, Esparron.

En attendant : le site affiche déjà une carte OpenStreetMap interactive couvrant tous
les points — rien ne casse sans My Maps, c'est juste moins joli et sans les épingles colorées.

## Méthode alternative : 5 calques séparés (un fichier par couleur)

Utile si tu veux pouvoir masquer/afficher chaque catégorie indépendamment dans My Maps :
importe chaque fichier dans un calque distinct ("Ajouter un calque" entre chaque), puis
applique la couleur à la main (icône pinceau → Style uniforme) :

| Couleur | Calque | Contenu |
|---|---|---|
| 🔵 Bleu | `baignade.kml` | Spots de baignade |
| 🟤 Marron | `randos.kml` | Départs de randonnées |
| 🟡 Jaune | `campings.kml` | Campings du trip |
| 🟢 Vert | `points_de_vue.kml` | Panoramas et villages |
| ⚪ Gris | `bonus_planb.kml` | Bonus et plans B |

## Rappel

Les liens GPS "🧭 GPS du jour" affichés sur chaque carte de journée du site sont
indépendants de cette carte My Maps : ce sont des liens directs vers Google Maps
Directions, ils fonctionnent même si `carte.embedUrl` n'est pas encore renseigné.
