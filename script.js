/*
  Rendu du site à partir de SITE_DATA (voir data.js).
  Ne contient aucune donnée de voyage en dur : tout vient de data.js.
*/
(function () {
  "use strict";

  const STATUT_LABELS = {
    "confirme": "Confirmé",
    "a-reserver": "À réserver",
    "plan-b-actif": "Plan B actif",
    "annule": "Annulé"
  };

  const ZONE_DOT = { ok: "🟢", vigilance: "🟠", alerte: "🔴" };

  function escapeHTML(str) {
    return String(str == null ? "" : str).replace(/[&<>"']/g, (c) => ({
      "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;"
    }[c]));
  }

  function mediaHTML(src, label) {
    const safeLabel = escapeHTML(label || "");
    if (!src) {
      return `<div class="media img-missing" data-label="${safeLabel}"></div>`;
    }
    return `<div class="media" data-label="${safeLabel}">
      <img src="${escapeHTML(src)}" alt="${safeLabel}" loading="lazy"
           onerror="this.closest('.media').classList.add('img-missing')">
    </div>`;
  }

  function zoneBadgesHTML(zoneIds, zonesById) {
    if (!zoneIds || !zoneIds.length) return "";
    return `<div class="zone-badges">${zoneIds.map((id) => {
      const z = zonesById[id];
      if (!z) return "";
      return `<span class="zone-badge">${ZONE_DOT[z.statut] || "⚪"} ${escapeHTML(z.nom)}</span>`;
    }).join("")}</div>`;
  }

  // ---------- Cartes interactives (Leaflet vendorisé + tuiles OpenStreetMap, sans clé API) ----------
  // Code couleur unique du trip : bleu baignade · marron rando · vert panorama · violet village · jaune camping.
  const POINT_TYPES = {
    depart: { icon: "🚗", label: "Départ / arrivée", color: "#374151" },
    arrivee: { icon: "🚗", label: "Départ / arrivée", color: "#374151" },
    camping: { icon: "⛺", label: "Camping (nuit)", color: "#ca8a04" },
    rando: { icon: "🥾", label: "Rando", color: "#92400e" },
    activite: { icon: "🥾", label: "Rando", color: "#92400e" },
    panorama: { icon: "🌄", label: "Panorama", color: "#16a34a" },
    village: { icon: "🏘️", label: "Village mignon", color: "#9333ea" },
    baignade: { icon: "🏊", label: "Baignade", color: "#0284c7" }
  };

  // File d'attente des cartes à initialiser : le HTML est injecté d'abord (innerHTML),
  // puis Leaflet est instancié sur chaque conteneur une fois qu'il est dans le DOM.
  const PENDING_MAPS = [];
  const LIVE_MAPS = [];   // instances Leaflet vivantes, pour les détruire avant un re-rendu
  let mapSeq = 0;

  function leafletMapHTML(points, opts) {
    if (!points || !points.length) return "";
    opts = opts || {};
    const id = "lmap-" + (++mapSeq);
    PENDING_MAPS.push({ id, points, opts, group: opts.group || "permanent" });
    return `<div class="leaflet-map" id="${id}" style="height:${opts.height || 210}px"></div>`;
  }

  function pointMeta(p) {
    if (p.type && POINT_TYPES[p.type]) return POINT_TYPES[p.type];
    return { icon: "📍", label: p.categorie || "", color: p.couleur || "#0d9488" };
  }

  // Détruit les cartes Leaflet vivantes d'un groupe donné (avant un re-rendu qui
  // remplace leurs conteneurs). Sans argument : toutes.
  function destroyLiveMaps(group) {
    for (let i = LIVE_MAPS.length - 1; i >= 0; i--) {
      if (group && LIVE_MAPS[i].group !== group) continue;
      try { LIVE_MAPS[i].map.remove(); } catch (e) { /* déjà retirée */ }
      LIVE_MAPS.splice(i, 1);
    }
  }

  function initPendingMaps() {
    if (typeof L === "undefined") {
      // Leaflet pas chargé (première visite hors-ligne) : on remplace par une note,
      // les listes de points sous chaque carte restent la source d'info.
      PENDING_MAPS.forEach((m) => {
        const el = document.getElementById(m.id);
        if (el) el.outerHTML = '<div class="carte-offline-note">🗺️ Carte interactive indisponible pour l\'instant (pas de réseau) — le détail des étapes reste lisible ci-dessous.</div>';
      });
      PENDING_MAPS.length = 0;
      return;
    }
    PENDING_MAPS.forEach((entry) => {
      const el = document.getElementById(entry.id);
      if (!el) return;
      try {
        const map = L.map(entry.id, { scrollWheelZoom: false });
        LIVE_MAPS.push({ map, group: entry.group });
        L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
          maxZoom: 17,
          attribution: "&copy; OpenStreetMap"
        }).addTo(map);

        if (entry.opts.ligne) {
          L.polyline(entry.points.map((p) => [p.lat, p.lon]), {
            color: "#0f766e", weight: 3, dashArray: "6 6", opacity: 0.8
          }).addTo(map);
        }

        entry.points.forEach((p, i) => {
          const meta = pointMeta(p);
          const marker = L.circleMarker([p.lat, p.lon], {
            radius: 9, color: "#ffffff", weight: 2.5, fillColor: meta.color, fillOpacity: 1
          }).addTo(map);
          const desc = p.info || p.description || "";
          const ordre = entry.opts.ligne ? `<span class="lmap-ordre">Étape ${i + 1}</span> ` : "";
          marker.bindPopup(
            `<div class="lmap-popup">${ordre}<strong>${escapeHTML(p.nom)}</strong>` +
            (meta.label ? `<div class="lmap-type" style="color:${meta.color}">${meta.icon} ${escapeHTML(meta.label)}</div>` : "") +
            (desc ? `<p>${escapeHTML(desc)}</p>` : "") +
            `<a href="https://www.google.com/maps?q=${Number(p.lat)},${Number(p.lon)}" target="_blank" rel="noopener">📍 Ouvrir dans Google Maps</a></div>`
          );
        });

        map.fitBounds(L.latLngBounds(entry.points.map((p) => [p.lat, p.lon])), { padding: [28, 28] });
      } catch (e) {
        // Rendu de carte impossible (ex. conteneur sans dimensions) : on n'interrompt pas la page.
        if (el.parentNode) el.outerHTML = '<div class="carte-offline-note">🗺️ Carte momentanément indisponible — le détail des étapes reste lisible ci-dessous.</div>';
      }
    });
    PENDING_MAPS.length = 0;
  }

  // Distance à vol d'oiseau (Haversine) — pas la distance routière (voir "Andon → Rougon 1h15" etc.
  // dans les chiffres clés pour la vraie distance conduite).
  function distanceKm(a, b) {
    const R = 6371;
    const dLat = (b.lat - a.lat) * Math.PI / 180;
    const dLon = (b.lon - a.lon) * Math.PI / 180;
    const lat1 = a.lat * Math.PI / 180, lat2 = b.lat * Math.PI / 180;
    const h = Math.sin(dLat / 2) ** 2 + Math.cos(lat1) * Math.cos(lat2) * Math.sin(dLon / 2) ** 2;
    return 2 * R * Math.asin(Math.sqrt(Math.min(1, h)));
  }

  function pointsLegendeHTML(points) {
    // Dédoublonnage par LIBELLÉ (depart/arrivee partagent "Départ / arrivée" → une seule entrée).
    const seen = {};
    const legende = points.map((p) => POINT_TYPES[p.type] || POINT_TYPES.activite)
      .filter((meta) => { if (seen[meta.label]) return false; seen[meta.label] = true; return true; })
      .map((meta) => `<span class="point-legende-item"><span class="point-dot" style="background:${meta.color}"></span>${meta.icon} ${escapeHTML(meta.label)}</span>`)
      .join("");

    const items = [];
    points.forEach((p, i) => {
      if (i > 0) {
        const d = distanceKm(points[i - 1], p);
        items.push(`<li class="point-connector">↓ ${d < 1 ? "< 1" : Math.round(d)} km à vol d'oiseau</li>`);
      }
      const meta = POINT_TYPES[p.type] || POINT_TYPES.activite;
      items.push(`
        <li class="point-stop">
          <span class="point-dot" style="background:${meta.color}"></span>
          <span class="point-icon">${meta.icon}</span>
          <span class="point-nom">${escapeHTML(p.nom)}</span>
        </li>`);
    });

    return `
      <div class="point-legende">${legende}</div>
      <ul class="point-liste">${items.join("")}</ul>`;
  }

  // ---------- Fire banner ----------
  // `onRefresh` re-fetches data/feux.json (published by update-feux.mjs / la GitHub Action).
  // Une vraie lecture live de feuxdeforet.fr depuis le navigateur est bloquée par leur
  // politique CORS (testé) : ce bouton relit donc la dernière donnée PUBLIÉE, pas le site en direct.
  function renderFireBanner(fireStatus, onRefresh) {
    const el = document.getElementById("fire-banner");
    if (!fireStatus) { el.style.display = "none"; return; }

    const maj = new Date(fireStatus.derniereMaj + "T00:00:00");
    const ageH = (Date.now() - maj.getTime()) / 36e5;
    const stale = isNaN(ageH) ? false : ageH > 48;

    const zonesHTML = fireStatus.zones.map((z) => `
      <span class="fb-zone" title="${escapeHTML(z.detail)}">
        <span class="fb-dot ${z.statut}"></span> ${escapeHTML(z.nom)} (${escapeHTML(z.dept)})
      </span>
    `).join("");

    const liensHTML = fireStatus.liensLive.map((l) =>
      `<a href="${escapeHTML(l.url)}" target="_blank" rel="noopener">${escapeHTML(l.label)}</a>`
    ).join("");

    el.innerHTML = `
      <div class="fb-top">
        <strong>🔥 Risque feux</strong>
        <span class="fb-maj">MAJ : ${escapeHTML(fireStatus.derniereMaj)}</span>
        ${stale ? '<span class="fb-stale">⚠️ à rafraîchir</span>' : ""}
        <button type="button" class="fb-refresh" id="fb-refresh-btn">🔄 Actualiser</button>
        <span class="fb-refresh-msg" id="fb-refresh-msg"></span>
      </div>
      <div class="fb-zones">${zonesHTML}</div>
      <div class="fb-liens">${liensHTML}</div>
      <div class="fb-rappel">feuxdeforet.fr = feux EN COURS · risque-prevention-incendie.fr = massifs OUVERTS/FERMÉS du jour (c'est elle qui décide si on randonne). Le bouton relit la dernière donnée publiée (mise à jour automatiquement plusieurs fois par jour) — pour une vérif à la minute près, utilisez les liens ci-dessus.</div>
    `;

    // Footer mirrors the live links so they're reachable from the bottom of the page too.
    const footer = document.getElementById("footer-liens-feux");
    if (footer) footer.innerHTML = liensHTML;

    const btn = document.getElementById("fb-refresh-btn");
    const msg = document.getElementById("fb-refresh-msg");
    if (btn && onRefresh) {
      btn.addEventListener("click", async () => {
        btn.disabled = true;
        btn.textContent = "🔄 …";
        msg.textContent = "";
        const result = await onRefresh();
        if (result === "updated") {
          msg.textContent = "✅ Mis à jour";
        } else if (result === "unchanged") {
          msg.textContent = "Déjà à jour";
        } else {
          msg.textContent = "⚠️ Hors-ligne ou pas de données publiées — ouvrez les liens ci-dessus";
        }
        btn.disabled = false;
        btn.textContent = "🔄 Actualiser";
      });
    }
  }

  // ---------- Hero ----------
  function renderHero(meta, apercuGlobal) {
    document.title = `${meta.titre} — ${meta.sousTitre}`;
    document.getElementById("site-titre").textContent = meta.titre;
    document.getElementById("site-sous-titre").textContent = meta.sousTitre;
    document.getElementById("site-intro").textContent = meta.intro;
    document.getElementById("site-priorites").textContent = meta.priorites;
    document.getElementById("chiffres-cles").innerHTML =
      meta.chiffresCles.map((c) => `<li>${escapeHTML(c)}</li>`).join("");

    if (apercuGlobal && apercuGlobal.length) {
      document.getElementById("hero-carte").innerHTML = leafletMapHTML(apercuGlobal, { height: 260, ligne: true });
      document.getElementById("hero-carte-caption").innerHTML = pointsLegendeHTML(apercuGlobal);
    }
  }

  // ---------- Jours ----------
  function renderJours(jours, zonesById) {
    const wrap = document.getElementById("jours-liste");
    wrap.innerHTML = jours.map((j) => {
      const statutClass = j.statut || "a-reserver";
      const statutLabel = STATUT_LABELS[statutClass] || statutClass;
      const carteJourHTML = (j.points && j.points.length) ? `
        <div class="jour-carte-carte">
          ${leafletMapHTML(j.points, { height: 210, ligne: true, group: "jours" })}
          <div class="carte-caption">${pointsLegendeHTML(j.points)}</div>
        </div>` : "";
      const itemsHTML = (j.items || []).map((it) => `
        <li><span class="heure">${escapeHTML(it.heure)}</span><span class="texte">${escapeHTML(it.texte)}</span></li>
      `).join("");
      const alerteHTML = j.alerte ? `<div class="alerte-jour">⚠️ ${escapeHTML(j.alerte)}</div>` : "";
      const nuitHTML = j.nuit ? `<div class="nuit-info">${escapeHTML(j.nuit)}</div>` : "";
      const gpsHTML = (j.gps && j.gps.length) ? `
        <div class="gps-boutons">${j.gps.map((g) =>
          `<a class="btn-gps" href="${escapeHTML(g.url)}" target="_blank" rel="noopener">${escapeHTML(g.label)}</a>`
        ).join("")}</div>` : "";
      const planBHTML = j.planB ? `
        <details class="planb">
          <summary>Voir le plan B</summary>
          <p>${escapeHTML(j.planB)}</p>
        </details>` : "";

      return `
        <article class="jour-carte statut-${statutClass}" id="${escapeHTML(j.id)}">
          ${carteJourHTML}
          <div class="jour-carte-body">
            <div class="jour-carte-head">
              <h3>${escapeHTML(j.titre)}</h3>
              <span class="badge ${statutClass}">${escapeHTML(statutLabel)}</span>
            </div>
            ${zoneBadgesHTML(j.zones, zonesById)}
            ${alerteHTML}
            <ul class="timeline">${itemsHTML}</ul>
            ${nuitHTML}
            ${gpsHTML}
            ${planBHTML}
          </div>
        </article>`;
    }).join("");
  }

  // ---------- Carte ----------
  function renderCarte(carte) {
    if (!carte) return;

    const embedEl = document.getElementById("carte-embed");
    if (carte.embedUrl) {
      const openUrl = carte.embedUrl.includes("/embed") ? carte.embedUrl.replace("/embed", "/viewer") : carte.embedUrl;
      embedEl.innerHTML = `
        <div class="carte-embed-wrap">
          <iframe src="${escapeHTML(carte.embedUrl)}" loading="lazy" title="Carte du road trip Verdon"></iframe>
        </div>
        <a class="btn-gps" href="${escapeHTML(openUrl)}" target="_blank" rel="noopener">🗺️ Ouvrir dans Google Maps</a>`;
    } else {
      // Pas encore de My Maps configuré : grande carte Leaflet couvrant TOUS les points,
      // chacun colorié selon sa catégorie (la couleur de son calque), popup au clic.
      const tousPoints = [];
      carte.calques.forEach((c) => c.points.forEach((p) =>
        tousPoints.push({ nom: p.nom, description: p.description, lat: p.lat, lon: p.lon, couleur: c.couleur, categorie: c.emoji + " " + c.nom })
      ));
      embedEl.innerHTML = `
        ${leafletMapHTML(tousPoints, { height: 420 })}
        <p class="carte-embed-note">💡 Pour la version Google My Maps (épingles colorées natives) : importer <strong>kml/verdon-roadtrip-complet.kml</strong> sur <a href="https://mymaps.google.com" target="_blank" rel="noopener">mymaps.google.com</a> (2 min, couleurs automatiques — voir MAPS-IMPORT.md), puis coller l'URL d'intégration dans data.js → carte.embedUrl.</p>`;
    }

    const legendeEl = document.getElementById("carte-legende");
    legendeEl.innerHTML = carte.calques.map((c) =>
      `<span class="carte-legende-item"><span class="point-dot" style="background:${escapeHTML(c.couleur || "#0d9488")}"></span>${c.emoji} ${escapeHTML(c.nom)}</span>`
    ).join("");

    const pointsEl = document.getElementById("carte-points");
    pointsEl.innerHTML = carte.calques.map((c) => `
      <div class="carte-calque">
        <h3><span class="point-dot" style="background:${escapeHTML(c.couleur || "#0d9488")}"></span> ${c.emoji} ${escapeHTML(c.nom)}</h3>
        <ul class="carte-liste-points">
          ${c.points.map((p) => `
            <li style="border-left: 4px solid ${escapeHTML(c.couleur || "#0d9488")}">
              <span class="carte-point-nom">${escapeHTML(p.nom)}</span>
              <span class="carte-point-desc">${escapeHTML(p.description)}</span>
              <a class="carte-point-lien" href="https://www.google.com/maps?q=${Number(p.lat)},${Number(p.lon)}" target="_blank" rel="noopener">📍 Ouvrir</a>
            </li>
          `).join("")}
        </ul>
      </div>
    `).join("");
  }

  // ---------- Récap des étapes (jour par jour, points colorés + distances) ----------
  function renderEtapesRecap(jours) {
    const el = document.getElementById("etapes-recap");
    if (!el) return;
    el.innerHTML = jours.map((j) => {
      const pts = j.points || [];
      let totalKm = 0;
      for (let i = 1; i < pts.length; i++) totalKm += distanceKm(pts[i - 1], pts[i]);
      const chips = pts.map((p) => {
        const meta = POINT_TYPES[p.type] || POINT_TYPES.rando;
        return `<a class="etape-chip" style="border-color:${meta.color}" href="https://www.google.com/maps?q=${Number(p.lat)},${Number(p.lon)}" target="_blank" rel="noopener">
          <span class="point-dot" style="background:${meta.color}"></span>${meta.icon} ${escapeHTML(p.nom)}
        </a>`;
      }).join("");
      return `
        <div class="etape-jour">
          <div class="etape-jour-head">
            <a href="#${escapeHTML(j.id)}"><strong>${escapeHTML(j.titre)}</strong></a>
            <span class="etape-jour-km">≈ ${Math.round(totalKm)} km à vol d'oiseau</span>
          </div>
          <div class="etape-chips">${chips}</div>
        </div>`;
    }).join("");
  }

  // ---------- Baignade ----------
  function renderBaignade(list) {
    const tbody = document.querySelector("#baignade-table tbody");
    tbody.innerHTML = list.map((b) => `
      <tr>
        <td>${escapeHTML(b.spot)}</td>
        <td>${escapeHTML(b.jour)}</td>
        <td>${escapeHTML(b.position)}</td>
        <td>${escapeHTML(b.detour)}</td>
        <td><span class="foule ${escapeHTML(b.niveau)}">${escapeHTML(b.niveau)}</span>${b.note ? ` — ${escapeHTML(b.note)}` : ""}</td>
      </tr>
    `).join("");
  }

  // ---------- Randos (fiches) ----------
  function baignadeIndicateurHTML(baignade) {
    if (!baignade) return "";
    const icone = baignade.ok === true ? "✅" : baignade.ok === false ? "🚫" : "❔";
    return `<div class="rando-baignade">${icone} Baignade : ${escapeHTML(baignade.note)}</div>`;
  }

  function renderRandos(list, liensGeneraux) {
    const wrap = document.getElementById("randos-liste");
    wrap.innerHTML = list.map((r) => `
      <article class="rando-carte">
        ${r.image ? mediaHTML(r.image, r.nom) : ""}
        <div class="rando-carte-body">
          <h3>${escapeHTML(r.nom)}</h3>
          <div class="rando-meta">
            <span class="rando-position">📍 ${escapeHTML(r.position)}</span>
            <span class="rando-duree">⏱️ ${escapeHTML(r.duree)}</span>
          </div>
          ${r.allTrails ? `<div class="rando-alltrails">⭐ ${escapeHTML(r.allTrails)}</div>` : ""}
          <p>${escapeHTML(r.description)}</p>
          ${r.materiel ? `<div class="rando-materiel">🎒 À emporter : ${escapeHTML(r.materiel)}</div>` : ""}
          ${baignadeIndicateurHTML(r.baignade)}
          <div class="liens-generaux">${(r.liens || []).map((l) =>
            `<a href="${escapeHTML(l.url)}" target="_blank" rel="noopener">${escapeHTML(l.label)}</a>`
          ).join("")}</div>
        </div>
      </article>
    `).join("");

    const gen = document.getElementById("randos-liens-generaux");
    if (liensGeneraux && liensGeneraux.length) {
      gen.innerHTML = "<strong>Hubs utiles :</strong>" + liensGeneraux.map((l) =>
        `<a href="${escapeHTML(l.url)}" target="_blank" rel="noopener">${escapeHTML(l.label)}</a>`
      ).join("");
    }
  }

  // ---------- Campings ----------
  function contactHTML(contact) {
    if (!contact) return "";
    if (/^[\d\s]+$/.test(contact)) {
      return `<a href="tel:${contact.replace(/\s/g, "")}">${escapeHTML(contact)}</a>`;
    }
    if (/^[a-z0-9.-]+\.[a-z]{2,}(\/\S*)?$/i.test(contact)) {
      return `<a href="https://${contact}" target="_blank" rel="noopener">${escapeHTML(contact)}</a>`;
    }
    return escapeHTML(contact);
  }

  function renderCampings(list) {
    const tbody = document.querySelector("#campings-table tbody");
    tbody.innerHTML = list.map((c) => `
      <tr>
        <td>${escapeHTML(c.nom)}</td>
        <td>${escapeHTML(c.nuit)}</td>
        <td>${escapeHTML(c.lieu)}</td>
        <td>${contactHTML(c.contact)}</td>
        <td>${escapeHTML(c.notes)}</td>
      </tr>
    `).join("");
  }

  // ---------- Plans B / règles ----------
  function renderPlansB(planGeneraux, regles) {
    document.getElementById("plans-b-liste").innerHTML =
      planGeneraux.map((t) => `<li>${escapeHTML(t)}</li>`).join("");
    document.getElementById("regles-liste").innerHTML =
      regles.map((t) => `<li>${escapeHTML(t)}</li>`).join("");
  }

  // ---------- Checklists (persistées en local, utile hors-ligne) ----------
  function renderChecklist(containerId, storageKeyPrefix, items) {
    const el = document.getElementById(containerId);
    el.innerHTML = items.map((text, i) => {
      const key = `${storageKeyPrefix}-${i}`;
      const checked = localStorage.getItem(key) === "1";
      return `
        <li class="${checked ? "checked" : ""}" data-key="${key}">
          <input type="checkbox" ${checked ? "checked" : ""} aria-label="${escapeHTML(text)}">
          <span>${escapeHTML(text)}</span>
        </li>`;
    }).join("");

    el.querySelectorAll("li").forEach((li) => {
      const input = li.querySelector("input");
      input.addEventListener("change", () => {
        li.classList.toggle("checked", input.checked);
        try {
          localStorage.setItem(li.dataset.key, input.checked ? "1" : "0");
        } catch (e) { /* stockage indisponible (navigation privée) : on ignore */ }
      });
    });
  }

  // ---------- Section Feux (zones + exposition par spot) ----------
  function renderFeuxSection(fireStatus, risqueFeuxSpots) {
    const zonesEl = document.getElementById("feux-zones");
    if (fireStatus) {
      zonesEl.innerHTML = fireStatus.zones.map((z) => `
        <div class="zone-detail zone-detail-${z.statut}">
          <div class="zone-detail-head">${ZONE_DOT[z.statut] || "⚪"} <strong>${escapeHTML(z.nom)}</strong> <span>(${escapeHTML(z.dept)})</span></div>
          <p>${escapeHTML(z.detail)}</p>
        </div>
      `).join("");
    }

    const tbody = document.querySelector("#risque-table tbody");
    tbody.innerHTML = risqueFeuxSpots.map((r) => `
      <tr>
        <td>${escapeHTML(r.spot)}</td>
        <td>${escapeHTML(r.dept)}</td>
        <td>${escapeHTML(r.exposition)}</td>
        <td>${escapeHTML(r.situation)}</td>
      </tr>
    `).join("");

    const gen = document.getElementById("feux-liens-generaux");
    if (fireStatus && gen) {
      gen.innerHTML = "<strong>Liens live :</strong>" + fireStatus.liensLive.map((l) =>
        `<a href="${escapeHTML(l.url)}" target="_blank" rel="noopener">${escapeHTML(l.label)}</a>`
      ).join("");
    }
  }

  // Essaie de lire data/feux.json (publié par update-feux.mjs, à la main ou via la
  // GitHub Action planifiée). Renvoie "updated" / "unchanged" / "failed".
  async function tryLoadPublishedFireStatus(data) {
    try {
      const res = await fetch("data/feux.json", { cache: "no-store" });
      if (!res.ok) return "failed";
      const feux = await res.json();
      if (!feux || !feux.derniereMaj) return "failed";
      const changed = JSON.stringify(feux) !== JSON.stringify(data.fireStatus);
      data.fireStatus = feux;
      return changed ? "updated" : "unchanged";
    } catch (e) {
      // hors-ligne, ouvert en file://, ou fichier absent : on garde la donnée actuelle
      return "failed";
    }
  }

  // ---------- Init ----------
  async function init() {
    const data = window.SITE_DATA;
    if (!data) {
      document.body.innerHTML = `
        <div style="padding:2rem;font-family:sans-serif;max-width:480px;margin:0 auto">
          <h1 style="font-size:1.3rem">📡 Chargement impossible</h1>
          <p>data.js n'a pas pu être chargé — le plus souvent par manque de réseau au
          premier chargement de cette page sur cet appareil.</p>
          <p><strong>Recharge la page dès que tu as du réseau</strong> (wifi ou 4G) :
          une fois chargée avec succès une première fois, la page reste ensuite
          disponible hors-ligne sur cet appareil.</p>
          <p><button onclick="location.reload()" style="font-size:1rem;padding:.6rem 1rem">🔄 Réessayer maintenant</button></p>
        </div>`;
      return;
    }

    await tryLoadPublishedFireStatus(data);

    function rerenderFireDependent() {
      const zonesById = {};
      ((data.fireStatus && data.fireStatus.zones) || []).forEach((z) => { zonesById[z.id] = z; });
      renderFireBanner(data.fireStatus, async () => {
        const result = await tryLoadPublishedFireStatus(data);
        rerenderFireDependent();
        return result;
      });
      renderJours(data.jours, zonesById);   // (re)crée les conteneurs de cartes de jour
      renderFeuxSection(data.fireStatus, data.risqueFeuxSpots);
      destroyLiveMaps("jours");             // retire les cartes de jour de l'ancien rendu
      initPendingMaps();                    // instancie toutes les cartes en attente
    }

    // Cartes permanentes (hero + globale) : queue une seule fois.
    renderHero(data.meta, data.carte && data.carte.apercuGlobal);
    renderCarte(data.carte);
    renderEtapesRecap(data.jours);
    renderBaignade(data.baignade);
    renderRandos(data.randos, data.randosLiensGeneraux);
    renderCampings(data.campings);
    renderPlansB(data.planGeneraux, data.regles);
    renderChecklist("todo-avant", "verdon-todo-avant", data.todoAvant);
    renderChecklist("todo-matin", "verdon-todo-matin", data.todoMatin);
    rerenderFireDependent();  // en dernier : injecte les jours + instancie hero/globale/jours d'un coup
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
