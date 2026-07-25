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
  function renderHero(meta) {
    document.title = `${meta.titre} — ${meta.sousTitre}`;
    document.getElementById("site-titre").textContent = meta.titre;
    document.getElementById("site-sous-titre").textContent = meta.sousTitre;
    document.getElementById("site-intro").textContent = meta.intro;
    document.getElementById("site-priorites").textContent = meta.priorites;
    document.getElementById("chiffres-cles").innerHTML =
      meta.chiffresCles.map((c) => `<li>${escapeHTML(c)}</li>`).join("");

    const heroMedia = document.querySelector(".hero-media");
    if (meta.heroImage) {
      heroMedia.dataset.label = "Gorges du Verdon";
      const img = heroMedia.querySelector("img");
      img.src = meta.heroImage;
    }
  }

  // ---------- Jours ----------
  function renderJours(jours, zonesById) {
    const wrap = document.getElementById("jours-liste");
    wrap.innerHTML = jours.map((j) => {
      const statutClass = j.statut || "a-reserver";
      const statutLabel = STATUT_LABELS[statutClass] || statutClass;
      const imagesHTML = (j.images || []).map((src) => mediaHTML(src, j.titre)).join("");
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
          ${imagesHTML ? `<div class="jour-carte-images">${imagesHTML}</div>` : ""}
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
      embedEl.innerHTML = `
        <div class="carte-placeholder">
          🗺️ Carte en préparation — <a href="https://mymaps.google.com" target="_blank" rel="noopener">créer/consulter sur mymaps.google.com</a>
        </div>`;
    }

    const legendeEl = document.getElementById("carte-legende");
    legendeEl.innerHTML = carte.calques.map((c) =>
      `<span class="carte-legende-item">${c.emoji} ${escapeHTML(c.nom)}</span>`
    ).join("");

    const pointsEl = document.getElementById("carte-points");
    pointsEl.innerHTML = carte.calques.map((c) => `
      <div class="carte-calque">
        <h3>${c.emoji} ${escapeHTML(c.nom)}</h3>
        <ul class="carte-liste-points">
          ${c.points.map((p) => `
            <li>
              <span class="carte-point-nom">${escapeHTML(p.nom)}</span>
              <span class="carte-point-desc">${escapeHTML(p.description)}</span>
              <a class="carte-point-lien" href="https://www.google.com/maps?q=${Number(p.lat)},${Number(p.lon)}" target="_blank" rel="noopener">📍 Ouvrir</a>
            </li>
          `).join("")}
        </ul>
      </div>
    `).join("");
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
          <p>${escapeHTML(r.description)}</p>
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
      renderJours(data.jours, zonesById);
      renderFeuxSection(data.fireStatus, data.risqueFeuxSpots);
    }

    rerenderFireDependent();
    renderHero(data.meta);
    renderCarte(data.carte);
    renderBaignade(data.baignade);
    renderRandos(data.randos, data.randosLiensGeneraux);
    renderCampings(data.campings);
    renderPlansB(data.planGeneraux, data.regles);
    renderChecklist("todo-avant", "verdon-todo-avant", data.todoAvant);
    renderChecklist("todo-matin", "verdon-todo-matin", data.todoMatin);
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
