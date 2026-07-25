# Road Trip Verdon — le site

Site statique, 4 fichiers (+ images), zéro dépendance, zéro CDN. Fonctionne en ouvrant
`index.html` directement (double-clic) ou hébergé en ligne.

## Fichiers

- `index.html` — structure de la page (à ne quasiment jamais toucher)
- `style.css` — l'habillage visuel
- `script.js` — construit toutes les sections à partir de `data.js`
- **`data.js`** — **le seul fichier à modifier pour actualiser le trip.** Tout le contenu
  (programme, spots, contacts, statuts, risque feux…) est ici sous forme de données.
- `images/` — les photos (voir `images/README.txt` pour les noms attendus)
- `update-feux.mjs` — script optionnel pour semi-automatiser le statut feux (voir plus bas)

## Actualiser le contenu (sans VS Code, depuis un téléphone)

Le contenu vit entièrement dans `data.js` sous forme d'un objet JavaScript lisible
(des listes de `{ champ: "valeur" }`). Pour changer un horaire, un statut de jour,
un numéro de camping, le risque feux, etc. : ouvre `data.js` et modifie le texte
entre guillemets, sans toucher aux virgules ni aux accolades.

Deux façons de faire ça depuis un téléphone, sans installer VS Code :

### Option recommandée : héberger sur GitHub Pages
1. Depuis un ordinateur (une fois), crée un dépôt GitHub et mets-y ces fichiers, puis
   active GitHub Pages (Settings → Pages → branche `main`).
2. Ensuite, **depuis le téléphone** : ouvre le dépôt sur github.com (dans le navigateur,
   ou l'appli GitHub), va sur `data.js`, appuie sur l'icône crayon (Edit), modifie le
   texte, et valide ("Commit changes" directement sur `main`).
3. Le site se met à jour tout seul en ~1 minute à l'URL `https://<toi>.github.io/<repo>/`.
4. Ça marche même avec un mauvais réseau : c'est juste une page web GitHub, pas un IDE.

### Option sans compte GitHub : éditeur de texte + ré-upload
N'importe quel éditeur de texte mobile (Notes, Fichiers + un éditeur type "Text Editor",
Working Copy sur iOS...) permet d'ouvrir `data.js`, le modifier, et le renvoyer vers
l'hébergeur utilisé (Netlify Drop, hébergement web classique en FTP, etc.).

Dans les deux cas : **jamais besoin de toucher html/css/js**, seulement `data.js`.

## Statuts de jour

Dans `data.js`, chaque jour a un champ `statut` :
- `"confirme"` → badge vert
- `"a-reserver"` → badge orange (valeur par défaut actuelle)
- `"plan-b-actif"` → badge violet (si vous basculez sur le plan B ce jour-là)
- `"annule"` → badge gris, la carte du jour reste visible mais grisée (jamais cachée)

## Passer un jour en "plan B"

Chaque jour a un champ `planB` (texte affiché dans un tiroir "Voir le plan B" sur la
carte du jour). Si vous décidez d'activer le plan B : remplacez le contenu du tableau
`items` de ce jour par les nouvelles activités, et passez `statut` à `"plan-b-actif"`.

## Risque feux

Le bandeau en haut du site vient de `fireStatus` dans `data.js` : une date
`derniereMaj`, une liste de `zones` (statut `ok` / `vigilance` / `alerte`) et des liens
vers les sources officielles. Si `derniereMaj` date de plus de 48h, le site affiche
automatiquement "⚠️ à rafraîchir".

**Mise à jour manuelle (par défaut)** : éditez `fireStatus` dans `data.js`, c'est la
donnée de secours toujours utilisée tant que `data/feux.json` n'existe pas ou n'a pas
encore été généré.

**Bouton "🔄 Actualiser" dans le bandeau** : relit `data/feux.json` (la dernière
donnée *publiée*, pas le site source en direct — feuxdeforet.fr ne renvoie pas d'en-
têtes CORS, un navigateur ne peut donc pas aller chercher leurs données lui-même
depuis un autre domaine, c'est une limitation de leur site, pas du nôtre).

**Mise à jour automatique (GitHub Action, déjà en place)** : `.github/workflows/update-feux.yml`
exécute `update-feux.mjs` toutes les 3h (+ déclenchement manuel possible depuis l'onglet
"Actions" du dépôt sur github.com) et pousse `data/feux.json` si le contenu a changé.
Aucune action nécessaire de votre part — le bouton du site reflète alors cette donnée
rafraîchie automatiquement en arrière-plan.

**Lancer la génération à la main** (optionnel, depuis un ordinateur avec Node.js 18+) :
```
node update-feux.mjs
```
Ça télécharge les fils Var/04 de feuxdeforet.fr, essaie d'en extraire les feux "en
cours", et écrit `data/feux.json`. Si le site source change de structure et que le
script ne trouve rien, il ne casse rien : `data/feux.json` n'est simplement pas mis à
jour et l'ancien statut reste affiché.

Rappel : ce système (bouton + Action) est un complément, pas un remplacement de la
vérif' humaine — en cas de doute le matin même, consultez toujours
risque-prevention-incendie.fr (liens dans le bandeau du site).

## Ajouter les photos

Voir `images/README.txt` : liste des noms de fichiers attendus et mots-clés de
recherche associés (Wikimedia Commons / Unsplash / Pexels). Tant qu'une image manque,
le site affiche un dégradé turquoise à la place, la mise en page ne casse jamais.

## Checklists

Les sections "Avant le départ" et "Chaque matin sur place" sont cochables : l'état
des cases est sauvegardé dans le navigateur du téléphone (localStorage), donc ça
persiste même hors connexion et entre deux ouvertures du site.
