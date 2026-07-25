/*
  SOURCE UNIQUE DE VÉRITÉ DU SITE.
  Pour actualiser le trip (depuis un téléphone, sans VS Code) : modifie SEULEMENT ce fichier.
  - Édite via l'appli GitHub / github.com (bouton crayon) si le site est hébergé sur GitHub Pages,
    ou avec n'importe quel éditeur de texte, puis re-uploade.
  - Ne touche pas index.html / style.css / script.js : ils lisent ces données automatiquement.
  - Respecte la syntaxe JS (virgules, guillemets) sinon le site plantera au chargement.
*/
window.SITE_DATA = {

  meta: {
    titre: "Road Trip Verdon",
    sousTitre: "Mission Baignade",
    intro: "Boucle Andon → Andon · début août 2026 · 4-5 jours · ~280 km · tente + campings.",
    priorites: "Priorités : baignade + randos qui finissent dans l'eau. Anti-foule : à l'eau avant 10h ou après 17h30.",
    chiffresCles: [
      "Nuits 15-25 €/2 pers",
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
        { heure: "10h00", texte: "Andon → Castellane → D952 → Carajuan (1h15)" },
        { heure: "12h00", texte: "Installation camping Carajuan, pique-nique bord de rivière" },
        { heure: "14h30", texte: "Pont de Tusset (sur place, +1h — fiche dans Randos)" },
        { heure: "16h30", texte: "Baignade plage de Carajuan (5 min à pied du camping) — lâchers EDF à vérifier AVANT" },
        { heure: "19h00", texte: "Repas froid, coucher de soleil sur les falaises de Rougon" }
      ],
      nuit: "Camping municipal Verdon Carajuan — 04 86 62 00 26",
      planB: "Lâchers EDF → couloir Samson cet aprem, lac demain matin.",
      gps: [
        { label: "🧭 GPS du jour", url: "https://www.google.com/maps/dir/?api=1&origin=Andon&destination=Camping+Verdon+Carajuan+Rougon&travelmode=driving" }
      ]
    },
    {
      id: "j2",
      titre: "Jour 2 — Canyon le matin, lac le soir",
      statut: "a-reserver",
      images: ["images/samson.jpg", "images/saint-maurin.jpg", "images/galetas.jpg"],
      zones: ["gorges_04", "lac"],
      alerte: "Le camping municipal du Galetas est FERMÉ en 2026 (annonce mairie d'Aiguines : mise aux normes sécurité). La plage et le kayak du Galetas restent accessibles au public — seule la nuitée change, voir ci-dessous.",
      items: [
        { heure: "08h00", texte: "Couloir Samson (Point Sublime, à 5 min de route du camping, +2h — fiche dans Randos)" },
        { heure: "11h00", texte: "Route des Crêtes (boucle depuis La Palud, +45 min-1h de conduite) — 3-4 belvédères suffisent" },
        { heure: "14h30", texte: "Cascades de Saint-Maurin (sur la D952 entre La Palud et Moustiers, détour 0 km, +1h30-2h)" },
        { heure: "17h30", texte: "Installation camping Aiguines + baignade plage du Galetas (à 5 min du camping)" }
      ],
      nuit: "Camping de l'Aigle (Aiguines), terrasses vue lac — réservation : campasun.eu/aigle. Alternative : Domaine de Chanteraine, 500 m du lac.",
      planB: "Canicule → sauter Saint-Maurin, sieste, baignade longue.",
      gps: [
        { label: "🧭 GPS du jour", url: "https://www.google.com/maps/dir/?api=1&origin=Camping+Verdon+Carajuan+Rougon&destination=Aiguines&waypoints=Point+Sublime+Rougon%7CLa+Palud-sur-Verdon&travelmode=driving" }
      ]
    },
    {
      id: "j3",
      titre: "Jour 3 — Kayak dans les gorges + criques",
      statut: "a-reserver",
      images: ["images/galetas.jpg", "images/moustiers.jpg", "images/bauduen.jpg"],
      zones: ["lac"],
      items: [
        { heure: "09h00", texte: "Kayak au pont du Galetas (5 min du camping, 2h sur l'eau) — DÈS L'OUVERTURE" },
        { heure: "12h00", texte: "Moustiers (10 min du Galetas par D957) : déjeuner + option Tour du village (+1h — fiche dans Randos)" },
        { heure: "15h00", texte: "Plage de Bauduen (25 min de Moustiers par la rive sud)" },
        { heure: "18h30", texte: "Camping du soir, apéro plage" }
      ],
      nuit: "La Source ★★★★ (Les Salles, bord du lac) — 04 94 70 20 40, ou Les Roches (Sainte-Croix-du-Verdon) — 04 92 77 78 99. Petits budgets : Les Roux 04 92 77 75 83 / Les Truffières 04 92 77 87 91 (Sainte-Croix).",
      planB: "Bauduen bondé → criques de Sainte-Croix-du-Verdon (sur le trajet du soir si nuit aux Roches).",
      gps: [
        { label: "🧭 GPS du jour", url: "https://www.google.com/maps/dir/?api=1&origin=Aiguines&destination=Les+Salles-sur-Verdon&waypoints=Pont+du+Galetas%7CMoustiers-Sainte-Marie%7CBauduen&travelmode=driving" }
      ]
    },
    {
      id: "j4",
      titre: "Jour 4 — Basses gorges secrètes",
      statut: "a-reserver",
      images: ["images/garde-canal.jpg", "images/esparron.jpg"],
      zones: ["basses_gorges_04"],
      items: [
        { heure: "08h00", texte: "Lac → Quinson (35 min, sur l'itinéraire)" },
        { heure: "08h30", texte: "Basses Gorges / garde-canal (départ parking du Musée, détour 0 km, +3h-3h30 — fiche dans Randos)" },
        { heure: "14h00", texte: "Calanques d'Esparron (15 min de Quinson, l'aprem entière)" },
        { heure: "17h30", texte: "SI 4 JOURS : retour Andon (Quinson → Montmeyan → Aups → Comps, ~2h15, essence à Aups). SI 5 JOURS : nuit à Esparron ou Quinson." }
      ],
      nuit: "SI 5 JOURS : campings de village (Esparron / Quinson), réserver 2-3 j avant. Ex. : La Grangeonne 04 92 77 16 87, Le Lavandin 04 92 77 41 31 (Esparron).",
      planB: "Flemme → kayak/bateau électrique Montmeyan-plage (04 92 74 40 76).",
      gps: [
        { label: "🧭 GPS du jour", url: "https://www.google.com/maps/dir/?api=1&origin=Les+Salles-sur-Verdon&destination=Esparron-de-Verdon&waypoints=Quinson&travelmode=driving" },
        { label: "🧭 GPS retour direct (si 4 jours)", url: "https://www.google.com/maps/dir/?api=1&origin=Esparron-de-Verdon&destination=Andon&waypoints=Aups&travelmode=driving" }
      ]
    },
    {
      id: "j5",
      titre: "Jour 5 (option) — Rando-baignade finale + retour panoramique",
      statut: "a-reserver",
      images: ["images/baudinard.jpg", "images/mescla.jpg"],
      zones: ["baudinard_var", "retour"],
      items: [
        { heure: "08h30", texte: "Canyon de Baudinard depuis Montmeyan-plage (+10 min de route depuis Quinson, +2h30-3h, moyen — fiche dans Randos). GO/NO-GO selon carte massifs Var LE MATIN MÊME." },
        { heure: "14h00", texte: "Retour panoramique : Aups → Aiguines → Corniche Sublime D71 (+30 min vs route directe) → Balcons de la Mescla (arrêt 20 min)" },
        { heure: "17h00", texte: "Comps-sur-Artuby → Andon — arrivée ~17h pour l'apéro" }
      ],
      nuit: null,
      planB: "Massif fermé → matinée calanques d'Esparron, retour direct par Aups.",
      gps: [
        { label: "🧭 GPS retour panoramique", url: "https://www.google.com/maps/dir/?api=1&origin=Esparron-de-Verdon&destination=Andon&waypoints=Montmeyan%7CAups%7CAiguines%7CBalcons+de+la+Mescla%7CComps-sur-Artuby&travelmode=driving" }
      ]
    }
  ],

  // Carte Google My Maps (voir MAPS-IMPORT.md pour la générer et remplir embedUrl).
  // Tant que embedUrl est vide, le site affiche un encart "Carte en préparation".
  carte: {
    embedUrl: "",
    calques: [
      {
        emoji: "🔵", nom: "Baignade",
        points: [
          { nom: "Calanques d'Esparron", description: "Criques turquoise, 10 min à pied. LE spot. Masque/tuba.", lat: 43.7263, lon: 5.9632 },
          { nom: "Plage de Carajuan", description: "Rivière au camping. Lâchers EDF à vérifier !", lat: 43.7953, lon: 6.4375 },
          { nom: "Vasques du pont de Tusset", description: "Pont XVIIe + vasques. 15 min du parking Samson.", lat: 43.7940, lon: 6.4150 },
          { nom: "Criques de Sainte-Croix-du-Verdon", description: "Sous le village, méconnues.", lat: 43.7657, lon: 6.1509 },
          { nom: "Plage de Bauduen", description: "Galets blancs, sauts de rochers. Viser 15h+.", lat: 43.7316, lon: 6.1772 },
          { nom: "Plage du Galetas", description: "Carte postale. Avant 9h30 ou après 17h30 SEULEMENT.", lat: 43.8017, lon: 6.2495 },
          { nom: "Lac de Montpezat", description: "Récompense de la rando Baudinard.", lat: 43.7050, lon: 6.0700 },
          { nom: "Lac d'Artignosc", description: "Plan B calme, base nautique.", lat: 43.7030, lon: 6.0855 }
        ]
      },
      {
        emoji: "🟢", nom: "Randos",
        points: [
          { nom: "Couloir Samson (départ Point Sublime)", description: "2h AR facile. LAMPE pour les tunnels.", lat: 43.7935, lon: 6.3981 },
          { nom: "Cascades de Saint-Maurin", description: "1h30. Cascades de tuf + grottes. Baignade interdite.", lat: 43.7995, lon: 6.2905 },
          { nom: "Garde-canal (départ Musée Quinson)", description: "10 km, 3h. N°1 AllTrails du parc. Lampe.", lat: 43.6947, lon: 6.0397 },
          { nom: "Canyon de Baudinard (départ Montmeyan-plage)", description: "2h30-3h. Massif Var : GO/NO-GO le matin.", lat: 43.6880, lon: 6.0530 },
          { nom: "Tour du village de Moustiers", description: "1h. Chapelle + vue lac.", lat: 43.8457, lon: 6.2215 },
          { nom: "Gorges de Trévans (bonus)", description: "Plan anti-feu/anti-foule, 40 min au nord.", lat: 44.0000, lon: 6.1900 }
        ]
      },
      {
        emoji: "🟡", nom: "Campings",
        points: [
          { nom: "Verdon Carajuan (nuit 1)", description: "Municipal bord de rivière. 04 86 62 00 26", lat: 43.7953, lon: 6.4375 },
          { nom: "De l'Aigle, Aiguines (nuit 2)", description: "Terrasses vue lac. Municipal Galetas FERMÉ.", lat: 43.7772, lon: 6.2440 },
          { nom: "Chanteraine, Aiguines (nuit 2 alt.)", description: "Tentes à 500 m du lac.", lat: 43.7790, lon: 6.2440 },
          { nom: "La Source, Les Salles (nuit 3)", description: "Bord du lac. 04 94 70 20 40", lat: 43.7740, lon: 6.2101 },
          { nom: "Les Roches, Ste-Croix (nuit 3 alt.)", description: "Municipal vue lac. 04 92 77 78 99", lat: 43.7670, lon: 6.1509 },
          { nom: "Le Grand Canyon, La Palud (secours)", description: "04 92 77 38 13", lat: 43.7804, lon: 6.3488 },
          { nom: "Campings Esparron/Quinson (nuit 4 opt.)", description: "Appeler 2-3 j avant.", lat: 43.7270, lon: 5.9632 }
        ]
      },
      {
        emoji: "🟣", nom: "Points de vue",
        points: [
          { nom: "Point Sublime", description: "Belvédère mythique, entrée du canyon.", lat: 43.7935, lon: 6.3981 },
          { nom: "Route des Crêtes (1er belvédère)", description: "Boucle sens unique, vautours.", lat: 43.7750, lon: 6.3600 },
          { nom: "Balcons de la Mescla", description: "Plus belle vue des gorges. Arrêt retour J5.", lat: 43.7414, lon: 6.3818 },
          { nom: "Moustiers-Sainte-Marie", description: "Village + étoile suspendue.", lat: 43.8457, lon: 6.2215 },
          { nom: "Aiguines village", description: "Vue plongeante lac, soirée J2.", lat: 43.7772, lon: 6.2440 }
        ]
      },
      {
        emoji: "⚪", nom: "Bonus / plans B",
        points: [
          { nom: "Sillans-la-Cascade", description: "Chute 42 m. BAIGNADE INTERDITE. Détour retour J4.", lat: 43.5650, lon: 6.1858 },
          { nom: "Kayak Montmeyan-plage", description: "Kayak/bateau élec ~25 €/2h. 04 92 74 40 76", lat: 43.6880, lon: 6.0530 },
          { nom: "Aups (essence + ravitaillement)", description: "Étape retour.", lat: 43.6280, lon: 6.2243 }
        ]
      }
    ]
  },

  // baignade.ok: true | false | null (null = "selon niveau d'eau" / occasionnel)
  randos: [
    {
      nom: "Pont de Tusset",
      position: "J1 · à 5 min de route du camping Carajuan",
      duree: "+1h AR, marche très facile",
      description: "Pont en pierre du XVIIe enjambant le Verdon sous la forêt, vasques émeraude en contrebas. On y voit : le Verdon avant le canyon, falaises de Rougon au loin, quasi personne.",
      baignade: { ok: true, note: "OUI dans les vasques (eau vive 15-18 °C) si pas de lâcher EDF" },
      liens: [{ label: "Infos camping Carajuan", url: "https://camping-gorgesduverdon-carajuan-rougon.com/" }]
    },
    {
      nom: "Couloir Samson",
      position: "J2 matin · Point Sublime, sur l'itinéraire",
      duree: "+2h, facile, 2,8 km AR",
      description: "Descente au fond du canyon par le GR4 : tunnels creusés dans la roche (le Baou, 670 m de noir complet → lampe + veste), passerelle sur le Baou, belvédère de Trescaïre. On y voit : l'entrée du grand canyon d'en bas, falaises de 400 m, vautours fauves.",
      baignade: { ok: false, note: "NON (interdite dans le canyon) — c'est la rando \"wow\" du séjour" },
      liens: [
        { label: "Itinéraire Visorando", url: "https://www.visorando.com/randonnee-les-tunnels-du-couloir-samson-et-les-tou/" },
        { label: "GPX (Verdon Tourisme)", url: "https://www.verdontourisme.com/offres/couloir-samson-rougon-fr-2918806/" }
      ]
    },
    {
      nom: "Cascades de Saint-Maurin",
      position: "J2 aprem · bord de la D952 entre La Palud et Moustiers, détour 0 km",
      duree: "+1h30-2h, facile",
      description: "Réserve naturelle : terrasses de tuf, cascades qui se jettent vers le Verdon, vasques turquoise, grottes troglodytes habitées dès le Ve siècle. Sentier bas, balisage jaune. On y voit : le spot \"caché\" le plus photogénique du trip, fraîcheur garantie.",
      baignade: { ok: false, note: "NON (réserve protégée) — on se baigne au lac 30 min après" },
      liens: [{ label: "Fiche rando", url: "https://www.rando-alpes-haute-provence.fr/trek/240038-Plein-Voir" }]
    },
    {
      nom: "Tour du village de Moustiers",
      position: "J3 midi · sur l'itinéraire",
      duree: "+1h, 3,2 km, 193 m D+, 4,5★ AllTrails",
      description: "Montée à la chapelle Notre-Dame de Beauvoir par le chemin pavé, étoile suspendue entre les falaises. On y voit : le village en contrebas, le lac au loin, la faïence partout.",
      baignade: { ok: false, note: "Non — c'est la pause culture" },
      liens: [{ label: "Hub AllTrails du parc", url: "https://www.alltrails.com/fr/parcs/france/alpes-de-haute-provence/parc-naturel-regional-du-verdon" }]
    },
    {
      nom: "Basses Gorges / garde-canal",
      position: "J4 matin · départ Quinson, sur l'itinéraire, détour 0 km",
      duree: "+3h-3h30, modéré, 10 km, 336 m D+, 4,6★ AllTrails (1 570 avis)",
      description: "LA rando n°1 du parc sur AllTrails. Sentier taillé dans la falaise au-dessus de l'eau émeraude, tunnel et grottes (lampe), passages avec chaînes, chapelle Sainte-Maxime et grotte des Jourdans, retour par le plateau. On y voit : les basses gorges intimes, eau émeraude en contrebas tout du long. Chiens interdits.",
      baignade: { ok: true, note: "OUI, coins de baignade au bord du Verdon en chemin (y être tôt, places prises à midi)" },
      liens: [
        { label: "AllTrails", url: "https://www.alltrails.com/fr/randonnee/france/alpes-de-haute-provence/basses-gorges-du-verdon" },
        { label: "GPX", url: "https://www.rando-alpes-haute-provence.fr/trek/189044-Basses-gorges-du-Verdon---sentier-du-garde-canal" }
      ]
    },
    {
      nom: "Calanques d'Esparron",
      position: "J4 aprem · Esparron, 15 min de Quinson",
      duree: "+10 min de marche seulement",
      description: "Sentier de rive qui dessert une succession de criques turquoise entre falaises blanches. On y voit : la carte postale calanques… sans Marseille. Plus on marche, plus c'est désert.",
      baignade: { ok: true, note: "OUI, la meilleure du séjour. Masque/tuba indispensables" },
      liens: [{ label: "Kayak basses gorges (Esparron)", url: "https://www.cheminsdesparcs.fr/fr/outdoor-site/57-ESPARRON-DE-VERDON---Les-basses-gorges-en-canoe-kayak" }]
    },
    {
      nom: "Canyon de Baudinard → lac de Montpezat",
      position: "J5 matin · Montmeyan-plage, +10 min depuis Quinson",
      duree: "+2h30-3h, moyen",
      description: "GR99 le long des falaises, tunnel (lampe), longe les lacs de Montpezat et d'Artignosc. On y voit : panoramas sur les basses gorges, grottes préhistoriques en rive gauche. Parking : barre de hauteur !",
      baignade: { ok: true, note: "OUI au lac de Montpezat au retour" },
      liens: [{ label: "Description Decathlon Outdoor", url: "https://www.decathlon-outdoor.com/fr-fr/explore/france/basses-gorges-du-verdon-et-bain-de-fraicheur-5fb6beaa19565" }]
    },
    {
      nom: "Gorges de Trévans (bonus anti-foule/anti-feu)",
      position: "Remplace une demi-journée · Estoublon, 40 min au nord de Moustiers",
      duree: "+1h20 AR de route + 3h de marche",
      image: "images/trevans.jpg",
      description: "Réserve biologique Natura 2000, rive droite vers les ruines de Valbonnette. Fraîcheur, zéro foule. On y voit : des gorges sauvages confidentielles. À sortir si : massifs Var fermés + envie de calme absolu.",
      baignade: { ok: null, note: "Petites vasques selon niveau d'eau" },
      liens: [{ label: "Hub AllTrails du parc", url: "https://www.alltrails.com/fr/parcs/france/alpes-de-haute-provence/parc-naturel-regional-du-verdon" }]
    }
  ],

  randosLiensGeneraux: [
    { label: "Hub AllTrails du parc (toutes les fiches + GPX avec un compte)", url: "https://www.alltrails.com/fr/parcs/france/alpes-de-haute-provence/parc-naturel-regional-du-verdon" },
    { label: "Basses gorges côté Esparron", url: "https://www.alltrails.com/fr/poi/france/alpes-de-haute-provence/esparron-de-verdon/basses-gorges-du-verdon" },
    { label: "Secteur grand canyon (La Palud)", url: "https://www.alltrails.com/fr/poi/france/alpes-de-haute-provence/la-palud-sur-verdon/gorges-du-verdon" }
  ],

  // niveau : "faible" | "moyenne" | "forte" (pilote la couleur du point)
  baignade: [
    { spot: "Calanques d'Esparron", jour: "J4 aprem", position: "Esparron, fin d'itinéraire", detour: "0 + 10 min à pied", niveau: "faible" },
    { spot: "Plage de Carajuan", jour: "J1", position: "5 min à pied du camping", detour: "0", niveau: "faible" },
    { spot: "Vasques du pont de Tusset", jour: "J1", position: "5 min de route du camping", detour: "+1h AR marche", niveau: "faible" },
    { spot: "Bords du Verdon (garde-canal)", jour: "J4 matin", position: "sur la rando", detour: "inclus", niveau: "faible" },
    { spot: "Criques de Sainte-Croix-du-Verdon", jour: "J3 soir / plan B", position: "sous le village Ste-Croix (rive nord)", detour: "+10 min vs Bauduen", niveau: "faible" },
    { spot: "Lac de Montpezat", jour: "J5", position: "au bout de la rando Baudinard", detour: "inclus", niveau: "faible" },
    { spot: "Lac d'Artignosc", jour: "plan B J3/J5", position: "10 min de Montmeyan", detour: "+15 min", niveau: "faible" },
    { spot: "Plage de Bauduen", jour: "J3 aprem", position: "rive sud, 25 min de Moustiers", detour: "0 (sur itinéraire)", niveau: "moyenne", note: "viser 15h+" },
    { spot: "Plage du Galetas", jour: "J2 soir + J3 kayak", position: "pied du camping d'Aiguines", detour: "0", niveau: "forte", note: "sauf avant 9h30 / après 17h30" }
  ],

  // contact : numéro de tél, site web (sans https://), ou texte libre ("sur place", "—")
  campings: [
    { nom: "Verdon Carajuan (municipal)", nuit: "Nuit 1", lieu: "Rougon", contact: "04 86 62 00 26", notes: "Bord de rivière, nature, pas cher" },
    { nom: "De l'Aigle", nuit: "Nuit 2", lieu: "Aiguines", contact: "campasun.eu/aigle", notes: "Terrasses vue lac, resto — remplace le municipal FERMÉ" },
    { nom: "Domaine de Chanteraine", nuit: "Nuit 2 (alt.)", lieu: "Aiguines", contact: "camping-chanteraine.com", notes: "Tentes à 500 m du lac" },
    { nom: "La Source ★★★★", nuit: "Nuit 3", lieu: "Les Salles", contact: "04 94 70 20 40", notes: "Bord du lac, plages, base nautique" },
    { nom: "Les Roches (municipal)", nuit: "Nuit 3 (alt.)", lieu: "Sainte-Croix-du-Verdon", contact: "04 92 77 78 99", notes: "Ombragé, vue lac, 500 m du village" },
    { nom: "Les Roux (aire naturelle)", nuit: "Nuit 3 (petit budget)", lieu: "Sainte-Croix", contact: "04 92 77 75 83", notes: "Simple et pas cher" },
    { nom: "Les Truffières (aire naturelle)", nuit: "Nuit 3 (petit budget)", lieu: "Sainte-Croix", contact: "04 92 77 87 91", notes: "Simple et pas cher" },
    { nom: "Le Grand Canyon (municipal)", nuit: "Secours J1-J2", lieu: "La Palud", contact: "04 92 77 38 13", notes: "~15 €/nuit pour 2" },
    { nom: "Campings de village", nuit: "Nuit 4 option", lieu: "Esparron / Quinson", contact: "sur place", notes: "Détendu, 2-3 j avant suffit. Ex. : La Grangeonne 04 92 77 16 87, Le Lavandin 04 92 77 41 31" }
  ],

  planGeneraux: [
    "Massifs Var fermés (feux) : plages et kayak restent accessibles → tout basculer sur le 04 (Quinson, Esparron, Trévans).",
    "Spot bondé : repli vers l'ouest — Les Salles → Bauduen → criques Sainte-Croix → Artignosc → Esparron.",
    "Lâchers EDF : J1 bascule sur couloir Samson, baignade au lac le lendemain.",
    "Camping complet : suivre l'ordre des tableaux ci-dessus. JAMAIS de tente sauvage : interdit dans tout le parc, 135 € d'amende, contrôles fréquents en août."
  ],

  regles: [
    "Camping sauvage et bivouac interdits dans tout le parc naturel régional",
    "Feux, barbecues, réchauds interdits même à gaz (risque très élevé — gros incendie à Cotignac en juillet)",
    "Baignade interdite : rivière entre Castellane et le lac hors zones tolérées, canyon (Samson), Saint-Maurin (réserve), bassin de Sillans-la-Cascade",
    "Urgence incendie : 18 ou 112"
  ],

  todoAvant: [
    "Réserver nuit 3 (lac) EN PREMIER : La Source 04 94 70 20 40 → Les Roches 04 92 77 78 99",
    "Réserver nuit 2 : Camping de l'Aigle (site campasun) ou Chanteraine",
    "Réserver nuit 1 : Carajuan 04 86 62 00 26",
    "Télécharger les GPX hors-ligne (AllTrails/Visorando) — pas de 4G dans les gorges",
    "Sac : 2 lampes frontales, chaussures d'eau, masque/tuba, 3L d'eau/pers, cash, batterie externe"
  ],

  todoMatin: [
    "risque-prevention-incendie.fr (04 + Var) → rando jouable ? · feuxdeforet.fr → feux en cours ?",
    "Jour rivière : horaires des lâchers EDF à l'accueil AVANT de se baigner",
    "Gourdes pleines, départ avant 9h"
  ],

  risqueFeuxSpots: [
    { spot: "Carajuan / pont de Tusset / Samson", dept: "04", exposition: "Faible-moyenne", situation: "Aucun feu actif dans le 04" },
    { spot: "Saint-Maurin / La Palud", dept: "04", exposition: "Moyenne", situation: "RAS, secteur falaises peu combustible" },
    { spot: "Plage + camping du Galetas (Aiguines)", dept: "83", exposition: "Plage faible / sentiers moyenne", situation: "Var en alerte récurrente, plage toujours OK" },
    { spot: "Bauduen / Les Salles / Sainte-Croix", dept: "83/04", exposition: "Plage faible / sentiers forte", situation: "Feu actif à Pontevès à ~25 km — plages OK, pas de rando alentour sans check" },
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
      { id: "lac", nom: "Lac (Aiguines, Bauduen, Les Salles, Ste-Croix)", dept: "83/04", statut: "vigilance", detail: "Feu en cours à Pontevès (~25 km sud). Plages OK, sentiers Var selon carte massifs" },
      { id: "basses_gorges_04", nom: "Basses gorges (Quinson, Esparron)", dept: "04", statut: "ok", detail: "RAS — la valeur sûre" },
      { id: "baudinard_var", nom: "Baudinard (Montmeyan, Artignosc, canyon)", dept: "83", statut: "vigilance", detail: "Massifs Var fermés à répétition (feu Cotignac ~2 500 ha à 30 km)" },
      { id: "retour", nom: "Retour (Aups, Comps-sur-Artuby)", dept: "83", statut: "vigilance", detail: "Routes ouvertes, surveiller fumées" }
    ],
    liensLive: [
      { label: "Carte des feux en cours", url: "https://feuxdeforet.fr/cartes/feux/" },
      { label: "Vigilance journalière", url: "https://feuxdeforet.fr/cartes/vigilance/" },
      { label: "Fil Var (83)", url: "https://feuxdeforet.fr/provence-alpes-cote-dazur/var/" },
      { label: "Fil Alpes-de-Haute-Provence (04)", url: "https://feuxdeforet.fr/provence-alpes-cote-dazur/alpes-de-haute-provence/" },
      { label: "Carte officielle fermetures massifs (décisive pour randonner)", url: "https://www.risque-prevention-incendie.fr" }
    ]
  }
};
