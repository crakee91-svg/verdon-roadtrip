/*
  SOURCE UNIQUE DE VÉRITÉ DU SITE.
  Pour actualiser le trip (depuis un téléphone, sans VS Code) : modifie SEULEMENT ce fichier.
  - Édite via l'appli GitHub / github.com (bouton crayon) si le site est hébergé sur GitHub Pages,
    ou avec n'importe quel éditeur de texte, puis re-uploade.
  - Ne touche pas index.html / style.css / script.js : ils lisent ces données automatiquement.
  - Respecte la syntaxe JS (virgules, guillemets) sinon le site plantera au chargement.
*/
const SITE_DATA = {

  meta: {
    titre: "Road Trip Verdon",
    sousTitre: "Mission Baignade",
    intro: "Boucle depuis Andon · début août 2026 · 4-5 jours · ~280 km · tente + campings municipaux.",
    priorites: "Priorités : baignade + randos qui mènent à l'eau. Anti-foule : dans l'eau avant 10h ou après 17h30.",
    chiffresCles: [
      "Nuits ~15 €/2 pers",
      "Lac 22-25 °C",
      "Rivière 15-18 °C",
      "Kayak 20-30 €/2h",
      "Andon → Rougon 1h15",
      "Esparron → Andon ~2h15",
      "Max ~1h de route/jour"
    ],
    heroImage: "images/hero.jpg"
  },

  // Statuts possibles par jour : "confirme" | "a-reserver" | "plan-b-actif" | "annule"
  jours: [
    {
      id: "j1",
      titre: "Jour 1 — Rivière sauvage (Rougon)",
      statut: "a-reserver",
      images: ["images/carajuan.jpg"],
      zones: ["gorges_04"],
      items: [
        { heure: "10h00", texte: "Départ d'Andon, par Castellane puis D952 (1h15)" },
        { heure: "12h00", texte: "Installation camping Carajuan, pique-nique bord de rivière" },
        { heure: "14h30", texte: "Rando pont de Tusset : pont du XVIIe, vasques émeraude (1h AR, facile)" },
        { heure: "16h30", texte: "Baignade rivière plage de Carajuan — VÉRIFIER les lâchers EDF à l'accueil avant" },
        { heure: "19h00", texte: "Repas froid, coucher de soleil sur les falaises de Rougon" }
      ],
      nuit: "Camping municipal Verdon Carajuan — 04 86 62 00 26",
      planB: "Lâchers EDF → couloir Samson l'après-midi + descente au lac le lendemain matin."
    },
    {
      id: "j2",
      titre: "Jour 2 — Canyon le matin, lac le soir",
      statut: "a-reserver",
      images: ["images/samson.jpg", "images/saint-maurin.jpg", "images/galetas.jpg"],
      zones: ["gorges_04", "lac_var"],
      alerte: "Camping du Galetas FERMÉ en 2026 (annonce mairie d'Aiguines, 05/05/2026 : mise aux normes sécurité). La plage et le kayak du Galetas restent a priori accessibles au public, mais ne comptez pas dessus pour dormir — voir alternative ci-dessous.",
      items: [
        { heure: "08h00", texte: "Couloir Samson (Point Sublime) : 2,8 km AR, 2h, facile. Tunnels (le Baou : 670 m de noir complet) → lampe + veste + chaussures d'eau. Vautours. Baignade interdite dans le canyon." },
        { heure: "11h00", texte: "Route des Crêtes en voiture (3-4 premiers belvédères)" },
        { heure: "14h30", texte: "Cascades de Saint-Maurin : sentier bas balisage jaune, 1h30. Cascades de tuf, vasques turquoise, grottes troglodytes. RÉSERVE : baignade interdite." },
        { heure: "17h30", texte: "Baignade plage du Galetas (foule partie) puis route vers le camping du soir (~20 min, voir alternative)" }
      ],
      nuit: "Camping du Galetas FERMÉ en 2026 → Camping Les Ruisses (Les Salles-sur-Verdon), bord du lac — 04 98 10 28 15",
      planB: "Canicule → sauter Saint-Maurin, sieste, baignade prolongée."
    },
    {
      id: "j3",
      titre: "Jour 3 — Kayak dans les gorges + criques",
      statut: "a-reserver",
      images: ["images/galetas.jpg", "images/moustiers.jpg", "images/bauduen.jpg"],
      zones: ["lac_var"],
      items: [
        { heure: "09h00", texte: "Kayak/pédalo au Galetas DÈS L'OUVERTURE : entrée des gorges (~2 km navigables), baignades depuis le kayak. Retour avant 11h." },
        { heure: "12h00", texte: "Moustiers-Sainte-Marie : déjeuner, ruelles. Option : Tour du village + chapelle (3,2 km, 193 m D+, superbe vue — fiche AllTrails \"Tour du Village de Moustiers\")" },
        { heure: "15h00", texte: "Plage de Bauduen : galets blancs, sauts de rochers, sieste" },
        { heure: "18h30", texte: "Camping du soir, apéro plage" }
      ],
      nuit: "Camping Les Roches (Sainte-Croix-du-Verdon) — 04 92 77 78 99, ou Les Ruisses (Les Salles-sur-Verdon) — 04 98 10 28 15",
      planB: "Bauduen bondé → criques de Sainte-Croix-du-Verdon, ou lac d'Artignosc (voir spots bonus)."
    },
    {
      id: "j4",
      titre: "Jour 4 — Basses gorges secrètes",
      statut: "a-reserver",
      images: ["images/garde-canal.jpg", "images/esparron.jpg"],
      zones: ["basses_gorges_04"],
      items: [
        { heure: "08h00", texte: "Route vers Quinson (35 min), parking du Musée de Préhistoire" },
        { heure: "08h30", texte: "Basses Gorges / sentier du garde-canal : LA rando n°1 du parc sur AllTrails (4,6★, 1 570 avis). Boucle 10 km, 336 m D+, 3-3,5h, modéré. Sentier taillé dans la falaise au-dessus de l'eau émeraude, baignade possible dans les gorges en chemin, tunnel et grottes (lampe), passages avec chaînes, chapelle Sainte-Maxime. Chiens interdits." },
        { heure: "14h00", texte: "Calanques d'Esparron : criques turquoise à 10 min à pied, masque/tuba. LE spot du séjour." },
        { heure: "17h30", texte: "SI 4 JOURS : retour Andon (Quinson → Montmeyan → Aups → Comps, ~2h15, essence à Aups). SI 5 JOURS : nuit à Esparron ou Quinson." }
      ],
      nuit: "SI 5 JOURS : Camping La Grangeonne (Esparron) — 04 92 77 16 87, ou Camping Le Lavandin (Esparron) — 04 92 77 41 31",
      planB: "Flemme → kayak/bateau électrique Montmeyan-plage (04 92 74 40 76), baignades côté Esparron."
    },
    {
      id: "j5",
      titre: "Jour 5 (option) — Rando-baignade finale + retour panoramique",
      statut: "a-reserver",
      images: ["images/baudinard.jpg", "images/mescla.jpg"],
      zones: ["baudinard_var", "retour"],
      items: [
        { heure: "08h30", texte: "Canyon de Baudinard depuis Montmeyan-plage (barre de hauteur au parking !) : GR99, falaises, tunnel (lampe), 2-3h moyen. Longe les lacs de Montpezat et d'Artignosc, panoramas sur les basses gorges. Baignade au lac de Montpezat au retour. CÔTÉ VAR : vérifier l'ouverture du massif LE MATIN MÊME." },
        { heure: "14h00", texte: "Retour panoramique : Aups → Aiguines → Corniche Sublime (D71) → Balcons de la Mescla" },
        { heure: "17h00", texte: "Comps-sur-Artuby → Andon (45 min) — arrivée pour l'apéro" }
      ],
      nuit: null,
      planB: "Massif fermé → matinée calanques d'Esparron puis retour direct par Aups."
    }
  ],

  spotsBonus: [
    {
      titre: "Lac d'Artignosc — baignade calme",
      image: "images/artignosc.jpg",
      texte: "Petit lac du canyon de Baudinard, nettement moins couru que Sainte-Croix. Base nautique, plage, canoës. Côté Var → vérifier la carte massif.",
      seCase: "Après-midi du J3 si Bauduen déborde, ou couplé au J5 (la rando de Baudinard le longe)."
    },
    {
      titre: "Sillans-la-Cascade — la chute de 42 m",
      image: "images/sillans.jpg",
      texte: "Cascade spectaculaire vert émeraude, accès facile ~20 min à pied depuis le village. ATTENTION : baignade interdite dans le bassin (arrêté municipal) — on vient pour le point de vue et le village perché.",
      seCase: "Sur la route du retour J4 (Sillans est à 15 min d'Aups)."
    },
    {
      titre: "Gorges de Trévans — le Verdon sans personne",
      image: "images/trevans.jpg",
      texte: "Gorges voisines au nord (Estoublon, ~40 min de Moustiers), réserve biologique et Natura 2000. Rando en rive droite vers les ruines de Valbonnette, fraîche et confidentielle. Fiche : AllTrails \"Gorges de Trévans\".",
      seCase: "Si vous voulez remplacer une journée gorges bondée par du 100 % tranquille."
    },
    {
      titre: "Plateau de Valensole — les lavandes",
      image: "images/valensole.jpg",
      texte: "À 20 min de Moustiers/Riez. Début août la récolte est souvent passée : y aller sans attente, en bonus photo au lever du soleil si un champ tardif reste violet.",
      seCase: "Matinée J3 avant le kayak, ou sur la route Moustiers → Quinson (via Riez)."
    },
    {
      titre: "Village d'Aiguines + château",
      image: null,
      texte: "Vue plongeante sur le lac, ruelles calmes le soir.",
      seCase: "Soirée J2 (vous dormez à côté)."
    },
    {
      titre: "Sentier Blanc-Martel — le monument (pour une prochaine fois ?)",
      image: null,
      texte: "LA rando mythique du canyon : 4,7★ (820 avis) sur AllTrails, mais ~16 km, 6-7h, navette obligatoire au retour → hors format de ce trip. À garder pour un retour dédié. NE PAS confondre avec l'Imbut/Vidal : passages câblés exposés, déconseillé.",
      seCase: "À prévoir sur un futur séjour dédié."
    }
  ],

  // niveau: "faible" | "moyenne" | "forte"
  baignade: [
    { spot: "Calanques d'Esparron", niveau: "faible", notes: "La pépite. Criques turquoise, 10 min à pied" },
    { spot: "Lac d'Artignosc", niveau: "faible", notes: "Petit lac calme, base nautique" },
    { spot: "Criques de Sainte-Croix-du-Verdon", niveau: "faible", notes: "Sous le village, méconnues" },
    { spot: "Rivière Carajuan / pont de Tusset", niveau: "faible", notes: "Vasques sauvages, 15-18 °C, lâchers EDF !" },
    { spot: "Lac de Montpezat", niveau: "faible", notes: "Se mérite (rando Baudinard)" },
    { spot: "Bords du Verdon sur le garde-canal", niveau: "faible", notes: "Coins de baignade en chemin, places prisées le midi" },
    { spot: "Plage de Bauduen", niveau: "moyenne", notes: "Top mais prisée, viser 15h+" },
    { spot: "Plage du Galetas", niveau: "forte", notes: "Forte 10h-17h. Carte postale — avant 9h30 ou après 17h30" }
  ],

  randos: [
    {
      nom: "Couloir Samson",
      duree: "2h AR, facile",
      liens: [
        { label: "Itinéraire Visorando", url: "https://www.visorando.com/randonnee-les-tunnels-du-couloir-samson-et-les-tou/" },
        { label: "GPX (Verdon Tourisme)", url: "https://www.verdontourisme.com/offres/couloir-samson-rougon-fr-2918806/" }
      ]
    },
    {
      nom: "Pont de Tusset",
      duree: "1h AR, très facile",
      liens: [{ label: "Infos camping Carajuan", url: "https://camping-gorgesduverdon-carajuan-rougon.com/" }]
    },
    {
      nom: "Saint-Maurin (Plein Voir)",
      duree: "1h30-2h, facile",
      liens: [{ label: "Fiche rando", url: "https://www.rando-alpes-haute-provence.fr/trek/240038-Plein-Voir" }]
    },
    {
      nom: "Basses Gorges (garde-canal + Ste-Maxime)",
      duree: "10 km, 336 m D+, 3-3,5h, modéré, 4,6★",
      liens: [
        { label: "AllTrails", url: "https://www.alltrails.com/fr/randonnee/france/alpes-de-haute-provence/basses-gorges-du-verdon" },
        { label: "GPX", url: "https://www.rando-alpes-haute-provence.fr/trek/189044-Basses-gorges-du-Verdon---sentier-du-garde-canal" }
      ]
    },
    {
      nom: "Canyon de Baudinard → Montpezat",
      duree: "2-3h, moyen",
      liens: [{ label: "Description Decathlon Outdoor", url: "https://www.decathlon-outdoor.com/fr-fr/explore/france/basses-gorges-du-verdon-et-bain-de-fraicheur-5fb6beaa19565" }]
    },
    {
      nom: "Tour du village de Moustiers",
      duree: "3,2 km, 193 m D+, 4,5★",
      liens: [{ label: "Hub AllTrails du parc", url: "https://www.alltrails.com/fr/parcs/france/alpes-de-haute-provence/parc-naturel-regional-du-verdon" }]
    },
    {
      nom: "Gorges de Trévans (bonus)",
      duree: "demi-journée, facile-moyen",
      liens: [{ label: "Hub AllTrails du parc", url: "https://www.alltrails.com/fr/parcs/france/alpes-de-haute-provence/parc-naturel-regional-du-verdon" }]
    },
    {
      nom: "Kayak basses gorges (Esparron)",
      duree: "à la carte",
      liens: [{ label: "Chemins des Parcs", url: "https://www.cheminsdesparcs.fr/fr/outdoor-site/57-ESPARRON-DE-VERDON---Les-basses-gorges-en-canoe-kayak" }]
    }
  ],

  randosLiensGeneraux: [
    { label: "Hub AllTrails du parc (toutes les fiches + GPX avec un compte)", url: "https://www.alltrails.com/fr/parcs/france/alpes-de-haute-provence/parc-naturel-regional-du-verdon" },
    { label: "Basses gorges côté Esparron", url: "https://www.alltrails.com/fr/poi/france/alpes-de-haute-provence/esparron-de-verdon/basses-gorges-du-verdon" },
    { label: "Secteur grand canyon (La Palud)", url: "https://www.alltrails.com/fr/poi/france/alpes-de-haute-provence/la-palud-sur-verdon/gorges-du-verdon" }
  ],

  contacts: [
    { qui: "Camping Verdon Carajuan (Rougon)", quoi: "Nuit 1", numero: "04 86 62 00 26" },
    { qui: "Camping Le Grand Canyon (La Palud)", quoi: "Secours nuit 1-2", numero: "04 92 77 38 13" },
    { qui: "Camping du Galetas (Aiguines)", quoi: "⚠️ FERMÉ 2026 (mise aux normes) — ne pas compter dessus", numero: "—" },
    { qui: "Camping Les Ruisses (Les Salles-sur-Verdon)", quoi: "Nuit 2 ou 3 — remplace le Galetas, bord du lac", numero: "04 98 10 28 15" },
    { qui: "Camping Les Roches (Sainte-Croix-du-Verdon)", quoi: "Nuit 3 — bord du lac", numero: "04 92 77 78 99" },
    { qui: "Camping Le Lac (Bauduen)", quoi: "Nuit 3 option — 1 étoile, simple", numero: "à confirmer sur place / mairie de Bauduen" },
    { qui: "Camping La Grangeonne (Esparron)", quoi: "Nuit 4 option", numero: "04 92 77 16 87" },
    { qui: "Camping Le Lavandin (Esparron)", quoi: "Nuit 4 option", numero: "04 92 77 41 31" },
    { qui: "Kayak/bateau électrique Montmeyan-plage", quoi: "J4-J5", numero: "04 92 74 40 76" },
    { qui: "Urgence incendie", quoi: "—", numero: "18 ou 112" }
  ],

  planGeneraux: [
    "Massifs fermés (feux) : plages et kayak restent accessibles → journée lac. Les randos côté Var (Bauduen, Baudinard, Artignosc) ferment en premier ; Trévans (04) souvent épargné.",
    "Spot bondé : repli vers l'ouest — Les Salles → Bauduen → criques Sainte-Croix → Artignosc → Esparron.",
    "Lâchers EDF : J1 bascule sur couloir Samson. Les lacs ne sont jamais affectés.",
    "Camping complet : appeler Galetas → Ruisses → Roches. JAMAIS de tente sauvage : interdit dans tout le parc, 135 € d'amende, contrôles fréquents en août."
  ],

  regles: [
    "Camping sauvage et bivouac interdits partout (parc naturel régional)",
    "Feux, barbecues, réchauds interdits même à gaz (risque très élevé — gros incendie à Cotignac en juillet)",
    "Baignade interdite : rivière entre Castellane et le lac hors zones tolérées, canyon (Samson), Saint-Maurin (réserve), bassin de Sillans-la-Cascade"
  ],

  todoAvant: [
    "Réserver la nuit 3 (lac) EN PREMIER — la plus tendue — puis nuits 1 et 2",
    "Compléter les numéros \"à compléter\" via les mairies",
    "Installer Visorando ou AllTrails + télécharger les GPX hors-ligne (pas de 4G dans les gorges)",
    "Sac : 2 lampes frontales, chaussures d'eau, masque/tuba, 3L d'eau/pers, cash, batterie externe"
  ],

  todoMatin: [
    "Carte incendie : risque-prevention-incendie.fr (04 puis Var) → rando jouable ou pas",
    "Jour rivière : horaires des lâchers EDF à l'accueil AVANT de se baigner",
    "Gourdes pleines, départ avant 9h"
  ],

  risqueFeuxSpots: [
    { spot: "Carajuan / pont de Tusset / Samson", dept: "04", exposition: "Faible-moyenne", situation: "Aucun feu actif dans le 04" },
    { spot: "Saint-Maurin / La Palud", dept: "04", exposition: "Moyenne", situation: "RAS, secteur falaises peu combustible" },
    { spot: "Plage + camping du Galetas (Aiguines)", dept: "83", exposition: "Plage faible / sentiers moyenne", situation: "Var en alerte récurrente, plage toujours OK" },
    { spot: "Bauduen / Les Salles", dept: "83", exposition: "Plage faible / sentiers forte", situation: "Feu actif à Pontevès à ~25 km — plages OK, pas de rando alentour sans check" },
    { spot: "Quinson / garde-canal", dept: "04", exposition: "Moyenne (gorges encaissées)", situation: "RAS — la valeur sûre si le Var ferme" },
    { spot: "Calanques d'Esparron", dept: "04", exposition: "Faible (accès bord de lac)", situation: "RAS — plan B universel" },
    { spot: "Canyon de Baudinard / Artignosc", dept: "83", exposition: "Forte (massif forestier varois)", situation: "Le spot le plus exposé du trip — GO/NO-GO le matin même" },
    { spot: "Sillans-la-Cascade", dept: "83", exposition: "Moyenne", situation: "À 15 km du feu de Cotignac — vérifier avant le détour" },
    { spot: "Gorges de Trévans", dept: "04", exposition: "Faible", situation: "RAS — le refuge anti-feux du programme" }
  ],

  // statut zone: "ok" | "vigilance" | "alerte"
  fireStatus: {
    derniereMaj: "2026-07-25",
    source: "https://feuxdeforet.fr/cartes/feux/",
    zones: [
      { id: "gorges_04", nom: "Gorges (Rougon, La Palud, St-Maurin)", dept: "04", statut: "ok", detail: "Aucun feu actif signalé dans le 04" },
      { id: "lac_var", nom: "Lac côté Var (Aiguines, Bauduen, Les Salles)", dept: "83", statut: "vigilance", detail: "Feu en cours à Pontevès (~25 km sud de Bauduen). Plages OK, sentiers selon carte massifs" },
      { id: "basses_gorges_04", nom: "Basses gorges (Quinson, Esparron)", dept: "04", statut: "ok", detail: "Aucun feu actif signalé" },
      { id: "baudinard_var", nom: "Baudinard (Montmeyan, Artignosc, canyon)", dept: "83", statut: "vigilance", detail: "Secteur Var : massifs fermés à répétition depuis mi-juillet (feu majeur Cotignac ~2 500 ha, 30 km sud)" },
      { id: "retour", nom: "Retour (Aups, Comps-sur-Artuby)", dept: "83", statut: "vigilance", detail: "Routes ouvertes, surveiller fumées — feu Cotignac au sud d'Aups" }
    ],
    liensLive: [
      { label: "Carte des feux en cours", url: "https://feuxdeforet.fr/cartes/feux/" },
      { label: "Vigilance journalière", url: "https://feuxdeforet.fr/cartes/vigilance/" },
      { label: "Fil Var (83)", url: "https://feuxdeforet.fr/provence-alpes-cote-dazur/var/" },
      { label: "Fil Alpes-de-Haute-Provence (04)", url: "https://feuxdeforet.fr/provence-alpes-cote-dazur/alpes-de-haute-provence/" },
      { label: "Carte officielle fermetures massifs", url: "https://www.risque-prevention-incendie.fr" }
    ]
  }
};
