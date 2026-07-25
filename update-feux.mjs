#!/usr/bin/env node
/*
  Mise à jour semi-auto du risque feux (optionnel — la mise à jour manuelle dans data.js
  reste la méthode par défaut, voir README.md).

  Usage : node update-feux.mjs
  Nécessite Node 18+ (fetch natif). Zéro dépendance npm.

  Ce script :
  1. Télécharge les pages fil Var (83) et Alpes-de-Haute-Provence (04) de feuxdeforet.fr
  2. Essaie d'en extraire les feux "en cours" (commune + département)
  3. Écrit data/feux.json avec un statut par défaut "vigilance" si des feux sont trouvés
     dans un département, sinon garde le statut existant du fichier data.js

  Best-effort : si la structure HTML de la source change, ce script peut ne rien
  trouver ou échouer — dans ce cas il n'écrit rien et le site retombe sur le
  FIRE_STATUS codé dans data.js (aucune casse possible côté site).
*/

import { readFileSync, writeFileSync, mkdirSync, existsSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const __dirname = dirname(fileURLToPath(import.meta.url));

const SOURCES = [
  { dept: "83", label: "Var", url: "https://feuxdeforet.fr/provence-alpes-cote-dazur/var/" },
  { dept: "04", label: "Alpes-de-Haute-Provence", url: "https://feuxdeforet.fr/provence-alpes-cote-dazur/alpes-de-haute-provence/" }
];

async function fetchText(url) {
  const res = await fetch(url, { headers: { "User-Agent": "Mozilla/5.0 (roadtrip-verdon-updater)" } });
  if (!res.ok) throw new Error(`HTTP ${res.status} pour ${url}`);
  return res.text();
}

// Recherche best-effort de mentions "en cours" suivies d'un nom de commune.
// Fragile par nature (dépend du HTML de la source) — voir avertissement en tête de fichier.
function extractFeuxEnCours(html) {
  const feux = [];
  const re = /([A-ZÀ-Ü][A-Za-zÀ-ÿ' -]{2,40})[^<]{0,60}?(en cours|en\s*lutte)/gi;
  let m;
  while ((m = re.exec(html)) !== null) {
    const commune = m[1].trim();
    if (commune.length > 2 && !feux.includes(commune)) feux.push(commune);
  }
  return feux.slice(0, 10);
}

function loadExistingFireStatus() {
  // Lit le FIRE_STATUS actuel depuis data.js (en évaluant tout le fichier) pour garder
  // les zones/libellés existants en fallback si le scraping ne trouve rien pour un département.
  // Robuste à la mise en forme du fichier (pas de dépendance à l'indentation).
  const dataJsPath = join(__dirname, "data.js");
  const src = readFileSync(dataJsPath, "utf8").replace(/^window\.SITE_DATA\s*=/m, "return");
  try {
    // eslint-disable-next-line no-new-func
    const site = new Function(src)();
    return site && site.fireStatus ? site.fireStatus : null;
  } catch {
    return null;
  }
}

async function main() {
  console.log("Récupération des fils feuxdeforet.fr…");
  const existing = loadExistingFireStatus();
  const results = { par_dept: {} };

  for (const src of SOURCES) {
    try {
      const html = await fetchText(src.url);
      const feux = extractFeuxEnCours(html);
      results.par_dept[src.dept] = feux;
      console.log(`  ${src.label} (${src.dept}) : ${feux.length ? feux.join(", ") : "aucun feu détecté"}`);
    } catch (e) {
      console.warn(`  ⚠️  Échec pour ${src.label} (${src.dept}) : ${e.message} — zone laissée inchangée`);
      results.par_dept[src.dept] = null;
    }
  }

  if (!existing) {
    console.warn("Impossible de lire fireStatus depuis data.js — abandon, rien écrit.");
    return;
  }

  const zones = existing.zones.map((z) => {
    const feuxDept = results.par_dept[z.dept];
    if (feuxDept === null) return z; // échec réseau/parsing : on garde tel quel
    if (feuxDept.length === 0) {
      return { ...z, statut: "ok", detail: `Aucun feu "en cours" détecté sur ${z.dept} (vérif. auto)` };
    }
    return { ...z, statut: "vigilance", detail: `Feux en cours détectés dans le ${z.dept} : ${feuxDept.join(", ")} (vérifier distance sur la carte)` };
  });

  const out = {
    derniereMaj: new Date().toISOString().slice(0, 10),
    source: "https://feuxdeforet.fr/cartes/feux/ (extraction auto, à vérifier)",
    zones,
    liensLive: existing.liensLive
  };

  const dataDir = join(__dirname, "data");
  if (!existsSync(dataDir)) mkdirSync(dataDir);
  writeFileSync(join(dataDir, "feux.json"), JSON.stringify(out, null, 2), "utf8");
  console.log("✅ data/feux.json écrit. Le site l'utilisera automatiquement une fois hébergé (fetch bloqué en file:// local).");
}

main().catch((e) => {
  console.error("Échec général du script — data/feux.json non modifié, le site reste sur data.js.", e);
  process.exitCode = 1;
});
