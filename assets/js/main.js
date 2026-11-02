/* =====================================================================
   Donald Moiwa — portfolio behaviour.
   Renders everything from window.PORTFOLIO (assets/js/content.js).
   You shouldn't need to edit this file to change content.
   ===================================================================== */
(function () {
  "use strict";

  const C = window.PORTFOLIO;
  const $ = (s, el = document) => el.querySelector(s);
  const $$ = (s, el = document) => Array.from(el.querySelectorAll(s));
  const PREVIEW = new URLSearchParams(location.search).has("preview");
  const REDUCED = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  const esc = (v) =>
    String(v ?? "").replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
  const visible = (list) => (list || []).filter((x) => x && (PREVIEW || !x.draft));
  const draftAttr = (x) => (x && x.draft ? ' data-draft="true"' : "");
  const draftBadge = (x) => (x && x.draft ? '<span class="draft-badge">Draft · hidden on live site</span>' : "");
  const get = (path) => path.split(".").reduce((o, k) => (o ? o[k] : undefined), C);
  const ext = (url) => (url ? ' target="_blank" rel="noopener noreferrer"' : "");

  // Image helper: "assets/img/foo" → <picture> with webp + jpg; a full path is used as-is.
  function picture(path, alt, attrs = "") {
    if (!path) return "";
    if (/\.\w{3,4}$/.test(path)) return `<img src="${esc(path)}" alt="${esc(alt)}" loading="lazy" decoding="async" ${attrs}>`;
    return `<picture><source srcset="${esc(path)}.webp" type="image/webp"><img src="${esc(path)}.jpg" alt="${esc(alt)}" loading="lazy" decoding="async" ${attrs}></picture>`;
  }

  /* ---------------- Simple bindings ---------------- */
  $$("[data-bind]").forEach((el) => {
    const v = get(el.dataset.bind);
    if (v) el.textContent = v;
  });
  $("#year").textContent = new Date().getFullYear();

  /* ---------------- Resume buttons ---------------- */
  $$("[data-resume]").forEach((a) => {
    if (C.person.resume) {
      a.href = C.person.resume;
      a.hidden = false;
    } else if (PREVIEW) {
      a.hidden = false;
      a.href = "#";
      a.classList.add("is-draft");
      a.title = "Add your CV path in content.js → person.resume";
      a.addEventListener("click", (e) => e.preventDefault());
    }
  });

  /* ---------------- Social links ---------------- */
  const SOCIAL_LABEL = { github: "GitHub", linkedin: "LinkedIn", instagram: "Instagram", youtube: "YouTube", facebook: "Facebook" };
  function socialLinks(keys) {
    return keys
      .filter((k) => C.social[k])
      .map((k) => `<li><a class="icon-link" href="${esc(C.social[k])}"${ext(1)} aria-label="${SOCIAL_LABEL[k]}">${icon(k)}</a></li>`)
      .join("");
  }
  $("#heroSocial").innerHTML = socialLinks(["github", "linkedin"]);
  $("#footerSocial").innerHTML =
    socialLinks(["github", "linkedin", "instagram", "youtube"]) +
    `<li><a class="icon-link" href="mailto:${esc(C.person.email)}" aria-label="Email">${icon("mail")}</a></li>`;

  /* ---------------- Hero ---------------- */
  $("[data-bind='hero.intro']").textContent = C.hero.intro;
  // Each sentence of the headline starts on its own line.
  $("#heroTitle").innerHTML = (C.hero.headline.match(/[^.!?]+[.!?]*/g) || [C.hero.headline])
    .map((s) => `<span class="hero__line">${esc(s.trim())}</span>`).join(" ");
  const portraitImg = $("[data-portrait]");
  portraitImg.alt = C.person.portraitAlt;

  const leaf = '<svg class="swatch__mark" viewBox="0 0 14 20" aria-hidden="true"><path d="M7 1C3 5 1.5 9 1.5 12.3a5.5 5.5 0 0 0 11 0C12.5 9 11 5 7 1Z" fill="none" stroke="currentColor" stroke-width="1.6"/><path d="M7 6v12" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"/></svg>';
  $("#heroCards").innerHTML = C.hero.cards
    .filter((c) => !(c.key === "availability" && !C.person.showAvailability))
    .map(
      (c, i) => `<li class="swatch${c.key === "availability" ? " swatch--live" : ""}" style="--i:${i}">
        ${leaf}<span class="swatch__value">${esc(c.value)}</span><strong class="swatch__label">${esc(c.label)}</strong></li>`
    )
    .join("");

  // Botanical texture: veins of a hosta leaf, drawn as long parallel curves.
  (function drawVeins() {
    const g = $("#veinGroup");
    if (!g) return;
    let d = "";
    for (let i = 0; i < 22; i++) {
      const t = i / 21;
      const sx = 1250, sy = -60 + t * 120;
      const ex = -80 + t * 260, ey = 260 + t * 640;
      const c1x = 900 - t * 120, c1y = 40 + t * 420;
      const c2x = 380 - t * 60, c2y = 120 + t * 520;
      d += `<path d="M${sx} ${sy}C${c1x} ${c1y} ${c2x} ${c2y} ${ex} ${ey}"/>`;
    }
    d += `<path d="M1250 -40C980 160 720 340 120 860" stroke-width="2.4"/>`;
    g.innerHTML = d;
  })();

  /* ---------------- About ---------------- */
  const A = C.about;
  $("[data-about-webp]").srcset = A.image + ".webp";
  const aImg = $("[data-about-img]");
  aImg.src = A.image + ".jpg";
  aImg.alt = A.imageAlt;
  $("#aboutText").innerHTML = A.paragraphs.map((p) => `<p>${esc(p)}</p>`).join("");
  $("#aboutStatement").textContent = A.statement;
  if (A.stats && A.stats.length) {
    const s = $("#aboutStats");
    s.innerHTML = A.stats.map((x) => `<div><dt>${esc(x.label)}</dt><dd>${esc(x.value)}</dd></div>`).join("");
    s.hidden = false;
  }
  $("#aboutInterests").innerHTML = A.interests.map((x) => `<li>${esc(x)}</li>`).join("");

  /* ---------------- Skills ---------------- */
  $("#skillsGrid").innerHTML = C.skills
    .filter((g) => g.items && g.items.length)
    .map(
      (g, gi) => `<div class="skill-group" data-reveal style="--d:${gi}">
        <h3>${esc(g.category)} <span>${g.items.length}</span></h3>
        <ul class="skill-list">${g.items
          .map(
            (s) =>
              `<li class="skill"><span class="skill__icon${s.icon ? "" : " skill__icon--blank"}" aria-hidden="true">${
                s.icon ? `<i class="${esc(s.icon)}"></i>` : ""
              }</span>${esc(s.name)}</li>`
          )
          .join("")}</ul></div>`
    )
    .join("");

  /* ---------------- Projects ---------------- */
  const projects = visible(C.projects);
  const cats = C.projectCategories || {};
  const usedCats = Object.keys(cats).filter((k) => projects.some((p) => p.category === k));

  function initials(title) {
    return title.replace(/[^A-Za-z0-9 ]/g, "").split(/\s+/).filter(Boolean).slice(0, 2).map((w) => w[0].toUpperCase()).join("");
  }
  const coverVeins =
    '<svg viewBox="0 0 400 260" preserveAspectRatio="xMidYMid slice" aria-hidden="true"><g fill="none" stroke="#B4CC8A" stroke-opacity=".35">' +
    Array.from({ length: 9 }, (_, i) => `<path d="M420 ${-20 + i * 12}C300 ${40 + i * 30} 180 ${60 + i * 34} ${-20 + i * 30} ${150 + i * 18}"/>`).join("") +
    "</g></svg>";

  function media(p, cls = "project__media") {
    const contain = p.imageFit === "contain";
    const pos = p.imagePosition ? `style="object-position:${esc(p.imagePosition)}"` : "";
    const inner = p.image
      ? picture(p.image, `${p.title} preview`, pos)
      : `<div class="project__cover">${coverVeins}<span>${esc(p.coverText || initials(p.title))}</span></div>`;
    return `<div class="${cls}${contain ? " project__media--contain" : ""}${contain && p.darkBg !== false ? " is-dark" : ""}">${inner}${
      p.status ? `<span class="project__status">${esc(p.status)}</span>` : ""
    }</div>`;
  }

  function projectCard(p, i, layout) {
    const hasCase = true; // every project opens its detail view
    const links = [
      p.live ? `<a class="btn btn--outline btn--sm" href="${esc(p.live)}"${ext(1)}>Live demo ${icon("arrow-up-right")}</a>` : "",
      p.github ? `<a class="icon-link" href="${esc(p.github)}"${ext(1)} aria-label="${esc(p.title)} on GitHub">${icon("github")}</a>` : "",
    ].join("");
    return `<article class="project ${layout}"${draftAttr(p)} data-reveal style="--d:${i % 3}">
      ${draftBadge(p)}
      ${media(p)}
      <div class="project__body">
        <p class="project__cat">${esc(cats[p.category] || p.category)}</p>
        <h3 class="project__title">${esc(p.title)}</h3>
        <p class="project__summary">${esc(p.summary)}</p>
        ${layout === "project--feature" && p.problem ? `<p class="project__problem"><strong>The problem:</strong> ${esc(p.problem)}</p>` : ""}
        ${p.tech && p.tech.length ? `<ul class="tags" aria-label="Built with">${p.tech.map((t) => `<li>${esc(t)}</li>`).join("")}</ul>` : ""}
        <div class="project__actions">
          ${hasCase ? `<button class="btn btn--primary btn--sm" type="button" data-open="${esc(p.id)}">View project</button>` : ""}
          ${links}
        </div>
      </div>
    </article>`;
  }

  function layoutFor(list) {
    // First project is featured; then pairs fill the row, triples otherwise.
    const rest = list.length - 1;
    return list.map((_, i) => {
      if (i === 0) return "project--feature";
      if (rest % 3 === 2 && i <= 2) return "project--wide";
      if (rest % 3 === 1 && i === 1) return "project--feature";
      return "";
    });
  }

  function renderProjects(filter) {
    const list = filter === "all" ? projects : projects.filter((p) => p.category === filter);
    const grid = $("#projectGrid");
    if (!list.length) {
      grid.innerHTML = `<p class="projects__empty">No projects in this category yet.</p>`;
      return;
    }
    const layouts = layoutFor(list);
    grid.innerHTML = list.map((p, i) => projectCard(p, i, layouts[i])).join("");
    decorateDrafts(grid);
    observe($$("[data-reveal]", grid));
  }

  const filters = $("#projectFilters");
  if (usedCats.length > 1) {
    filters.innerHTML =
      `<button class="filter" type="button" data-filter="all" aria-pressed="true">All</button>` +
      usedCats.map((k) => `<button class="filter" type="button" data-filter="${esc(k)}" aria-pressed="false">${esc(cats[k])}</button>`).join("");
    filters.addEventListener("click", (e) => {
      const b = e.target.closest("[data-filter]");
      if (!b) return;
      $$(".filter", filters).forEach((x) => x.setAttribute("aria-pressed", String(x === b)));
      renderProjects(b.dataset.filter);
    });
  } else {
    filters.hidden = true;
  }

  /* ---------------- Case study dialog ---------------- */
  const dialog = $("#caseDialog");
  const CASE_FIELDS = [
    ["overview", "Overview"],
    ["problem", "Problem"],
    ["architecture", "Technical architecture"],
    ["process", "Development process"],
    ["challenges", "Key challenges"],
    ["solutions", "Solutions"],
    ["results", "Results & impact"],
  ];
  let lastTrigger = null;

  function openCase(id, trigger) {
    const p = projects.find((x) => x.id === id);
    if (!p) return;
    lastTrigger = trigger || null;
    const cs = p.caseStudy || {};
    const section = (title, body) => (body ? `<section class="case__section"><h3>${title}</h3>${body}</section>` : "");
    const para = (t) => (t ? `<p>${esc(t)}</p>` : "");
    const list = (arr) => (arr && arr.length ? `<ul>${arr.map((x) => `<li>${esc(x)}</li>`).join("")}</ul>` : "");

    const problem = cs.problem || p.problem;
    const solution = cs.solutions || p.solution;
    const meta = [
      p.role ? ["My role", p.role] : null,
      p.status ? ["Status", p.status] : null,
      p.tech && p.tech.length ? ["Stack", p.tech.join(", ")] : null,
    ].filter(Boolean);

    const filled =
      CASE_FIELDS.some(([k]) => cs[k]) || p.problem || p.solution || (p.features && p.features.length);

    $("#caseBody").innerHTML = `
      <button class="case__close" type="button" data-close aria-label="Close project details">${icon("x")}</button>
      ${media(p, "case__media")}
      <div class="case__content">
        <p class="project__cat">${esc(cats[p.category] || p.category)}</p>
        <h2 class="case__title" id="caseTitle">${esc(p.title)}</h2>
        <p class="case__lede">${esc(cs.overview || p.summary)}</p>
        ${meta.length ? `<dl class="case__meta">${meta.map(([k, v]) => `<div><dt>${k}</dt><dd>${esc(v)}</dd></div>`).join("")}</dl>` : ""}
        ${section("The problem", para(problem))}
        ${section("The solution", para(solution))}
        ${section("Key features", list(p.features))}
        ${section("Technical architecture", para(cs.architecture))}
        ${section("Development process", para(cs.process))}
        ${section("Key challenges", para(cs.challenges))}
        ${section("Results & impact", para(cs.results))}
        ${!filled ? `<p class="case__note">A full write-up for this project is on the way.</p>` : ""}
        ${
          p.live || p.github
            ? `<div class="case__actions">
              ${p.live ? `<a class="btn btn--primary" href="${esc(p.live)}"${ext(1)}>Open live demo ${icon("arrow-up-right")}</a>` : ""}
              ${p.github ? `<a class="btn btn--outline" href="${esc(p.github)}"${ext(1)}>${icon("github")} View source</a>` : ""}
            </div>`
            : ""
        }
      </div>`;
    if (typeof dialog.showModal === "function") dialog.showModal();
    else dialog.setAttribute("open", "");
    $(".case__close", dialog).focus();
  }
  function closeCase() {
    if (dialog.open) dialog.close();
  }
  document.addEventListener("click", (e) => {
    const o = e.target.closest("[data-open]");
    if (o) openCase(o.dataset.open, o);
    if (e.target.closest("[data-close]")) closeCase();
  });
  dialog.addEventListener("click", (e) => {
    if (e.target === dialog) closeCase(); // click on backdrop
  });
  dialog.addEventListener("close", () => lastTrigger && lastTrigger.focus());

  /* ---------------- Experience ---------------- */
  const jobs = visible(C.experience);
  $("#experienceList").innerHTML = jobs
    .map(
      (j, i) => `<li class="job"${draftAttr(j)} data-reveal style="--d:${i}">
      <div class="job__card">${draftBadge(j)}
        <div class="job__top">
          <div><h3 class="job__role">${esc(j.role)}</h3><p class="job__company">${esc(j.company)}${j.type ? ` · ${esc(j.type)}` : ""}</p></div>
          <p class="job__when">${esc(j.start)} – ${esc(j.end)}${j.location ? `<br>${esc(j.location)}` : ""}</p>
        </div>
        ${j.summary ? `<p class="job__summary">${esc(j.summary)}</p>` : ""}
        ${j.highlights && j.highlights.length ? `<ul class="job__list">${j.highlights.map((h) => `<li>${esc(h)}</li>`).join("")}</ul>` : ""}
        ${j.tech && j.tech.length ? `<ul class="tags">${j.tech.map((t) => `<li>${esc(t)}</li>`).join("")}</ul>` : ""}
      </div></li>`
    )
    .join("");

  /* ---------------- Education & certifications ---------------- */
  const edu = visible(C.education);
  const certs = visible(C.certifications);
  $("#educationList").innerHTML =
    edu
      .map(
        (e, i) => `<article class="edu-card"${draftAttr(e)} data-reveal style="--d:${i}">${draftBadge(e)}
      <span class="edu-card__icon">${icon("graduation-cap")}</span>
      <h3>${esc(e.degree)}${e.field ? `, ${esc(e.field)}` : ""}</h3>
      <p class="edu-card__sub">${esc(e.institution)}</p>
      <p class="edu-card__when">${esc([e.start, e.end].filter(Boolean).join(" – "))}</p>
      ${e.coursework && e.coursework.length ? `<p class="edu-card__extra"><strong>Coursework:</strong> ${esc(e.coursework.join(", "))}</p>` : ""}
      ${e.achievements && e.achievements.length ? `<p class="edu-card__extra"><strong>Achievements:</strong> ${esc(e.achievements.join(", "))}</p>` : ""}
    </article>`
      )
      .join("") +
    certs
      .map(
        (c, i) => `<article class="edu-card"${draftAttr(c)} data-reveal style="--d:${edu.length + i}">${draftBadge(c)}
      <span class="edu-card__icon">${icon("star")}</span>
      <h3>${esc(c.name)}</h3>
      <p class="edu-card__sub">${esc(c.issuer)}</p>
      <p class="edu-card__when">${esc(c.date)}${c.credentialId ? ` · ID ${esc(c.credentialId)}` : ""}</p>
      ${c.url ? `<p class="edu-card__extra"><a href="${esc(c.url)}"${ext(1)}>Verify credential</a></p>` : ""}
    </article>`
      )
      .join("");

  /* ---------------- Services & process ---------------- */
  $("#servicesList").innerHTML = visible(C.services)
    .map(
      (s, i) => `<li class="service"${draftAttr(s)} data-reveal style="--d:${i}">${draftBadge(s)}
      <span class="service__icon">${icon(s.icon)}</span><h3>${esc(s.title)}</h3><p>${esc(s.text)}</p></li>`
    )
    .join("");

  $("#processList").innerHTML = C.process
    .map(
      (s, i) => `<li class="step" data-reveal style="--d:${i % 3}">
      <span class="step__num" aria-hidden="true">${String(i + 1).padStart(2, "0")}</span>
      <h3><span class="sr-only">Step ${i + 1}: </span>${esc(s.title)}</h3><p>${esc(s.text)}</p></li>`
    )
    .join("");

  /* ---------------- Testimonials ---------------- */
  $("#quoteList").innerHTML = visible(C.testimonials)
    .map(
      (q, i) => `<figure class="quote"${draftAttr(q)} data-reveal style="--d:${i}">${draftBadge(q)}
      ${icon("quote")}<blockquote>${esc(q.quote)}</blockquote>
      <figcaption><strong>${esc(q.name)}</strong>${esc(q.role)}</figcaption></figure>`
    )
    .join("");

  /* ---------------- Hide empty sections + build nav ---------------- */
  const sectionHasContent = {
    experience: jobs.length > 0,
    education: edu.length + certs.length > 0,
    testimonials: visible(C.testimonials).length > 0,
  };
  Object.entries(sectionHasContent).forEach(([id, has]) => {
    if (!has) $("#" + id).hidden = true;
  });
  $$("#navLinks a").forEach((a) => {
    const sec = document.getElementById(a.dataset.section);
    if (!sec || sec.hidden) a.parentElement.remove();
  });
  const navItems = $$("#navLinks a");
  $("#mobileLinks").innerHTML = navItems.map((a) => `<li><a href="${a.getAttribute("href")}" data-section="${a.dataset.section}">${a.textContent}${icon("arrow-right")}</a></li>`).join("");
  $("#mobileLinks").querySelectorAll("svg").forEach((s) => { s.style.width = "20px"; s.style.height = "20px"; s.style.opacity = ".5"; });
  $("#footerLinks").innerHTML = navItems.map((a) => `<li><a href="${a.getAttribute("href")}">${a.textContent}</a></li>`).join("");
  $(".footer__top").insertAdjacentHTML("beforeend", icon("arrow-up"));

  /* ---------------- Contact details ---------------- */
  const P = C.person;
  const rows = [
    { ico: "mail", label: "Email", value: P.email, href: "mailto:" + P.email },
    C.social.linkedin && { ico: "linkedin", label: "LinkedIn", value: "aiah-moiwa", href: C.social.linkedin, ext: 1 },
    C.social.github && { ico: "github", label: "GitHub", value: C.social.githubUser || "GitHub", href: C.social.github, ext: 1 },
    P.whatsapp && { ico: "whatsapp", label: "WhatsApp", value: P.phone || "Message me", href: P.whatsapp, ext: 1 },
    P.location && { ico: "map-pin", label: "Location", value: P.location },
  ].filter(Boolean);
  $("#contactList").innerHTML = rows
    .map((r) => {
      const inner = `<span class="contact__ico">${icon(r.ico)}</span><span><span class="contact__label">${r.label}</span><span class="contact__value">${esc(r.value)}</span></span>`;
      return `<li>${r.href ? `<a href="${esc(r.href)}"${r.ext ? ext(1) : ""}>${inner}</a>` : `<div>${inner}</div>`}</li>`;
    })
    .join("");

  /* ---------------- GitHub repositories (live) ---------------- */
  const G = C.github || {};
  const ghUser = C.social.githubUser;
  $("#activityLinks").innerHTML = [
    C.social.github ? `<a class="btn btn--outline btn--sm" href="${esc(C.social.github)}"${ext(1)}>${icon("github")} GitHub profile</a>` : "",
    C.social.linkedin ? `<a class="btn btn--outline btn--sm" href="${esc(C.social.linkedin)}"${ext(1)}>${icon("linkedin")} LinkedIn</a>` : "",
  ].join("");

  const repoList = $("#repoList");
  const fallback = (msg) =>
    `<div class="repos__fallback"><span>${msg}</span>${
      C.social.github ? `<a class="btn btn--primary btn--sm" href="${esc(C.social.github)}"${ext(1)}>See my GitHub</a>` : ""
    }</div>`;

  function relTime(iso) {
    const days = Math.round((Date.now() - new Date(iso)) / 864e5);
    if (days < 1) return "today";
    if (days < 30) return `${days} day${days === 1 ? "" : "s"} ago`;
    const months = Math.round(days / 30);
    if (months < 12) return `${months} month${months === 1 ? "" : "s"} ago`;
    const y = Math.round(months / 12);
    return `${y} year${y === 1 ? "" : "s"} ago`;
  }

  async function loadRepos() {
    if (!ghUser) {
      $("#activity").hidden = true;
      return;
    }
    repoList.innerHTML = Array.from({ length: 3 }, () => `<div class="repo repo--skeleton" aria-hidden="true"><i style="width:55%"></i><i></i><i style="width:80%"></i></div>`).join("");
    const cacheKey = "gh-repos-" + ghUser;
    try {
      let data;
      try {
        const cached = JSON.parse(sessionStorage.getItem(cacheKey) || "null");
        if (cached && Date.now() - cached.t < 10 * 60 * 1000) data = cached.d;
      } catch (_) {}
      if (!data) {
        const ctrl = new AbortController();
        const timer = setTimeout(() => ctrl.abort(), 8000);
        const res = await fetch(`https://api.github.com/users/${encodeURIComponent(ghUser)}/repos?per_page=100&sort=pushed`, {
          headers: { Accept: "application/vnd.github+json" },
          signal: ctrl.signal,
        });
        clearTimeout(timer);
        if (!res.ok) throw new Error(res.status === 403 ? "rate" : "http");
        data = await res.json();
        try { sessionStorage.setItem(cacheKey, JSON.stringify({ t: Date.now(), d: data })); } catch (_) {}
      }
      const featured = G.featuredRepos || [];
      const repos = data
        .filter((r) => !r.fork && !r.archived)
        .sort((a, b) => {
          const fa = featured.indexOf(a.name), fb = featured.indexOf(b.name);
          if (fa !== -1 || fb !== -1) return (fa === -1 ? 1e3 : fa) - (fb === -1 ? 1e3 : fb);
          return new Date(b.pushed_at) - new Date(a.pushed_at);
        })
        .slice(0, G.maxRepos || 6);
      if (!repos.length) {
        repoList.innerHTML = fallback("No public repositories to show yet.");
        return;
      }
      repoList.innerHTML = repos
        .map(
          (r, i) => `<a class="repo" href="${esc(r.html_url)}"${ext(1)} data-reveal style="--d:${i % 3}">
          <span class="repo__name">${esc(r.name.replace(/[-_]/g, " "))}${icon("arrow-up-right")}</span>
          <span class="repo__desc">${esc(r.description || "No description yet.")}</span>
          <span class="repo__meta">
            ${r.language ? `<span class="repo__lang">${esc(r.language)}</span>` : ""}
            ${r.stargazers_count ? `<span>${icon("star")}${r.stargazers_count}</span>` : ""}
            <span>Updated ${relTime(r.pushed_at)}</span>
          </span></a>`
        )
        .join("");
      observe($$("[data-reveal]", repoList));
    } catch (err) {
      repoList.innerHTML = fallback(
        err.message === "rate"
          ? "GitHub is limiting requests right now, so repositories can't load. They'll be back shortly."
          : "Repositories couldn't load from GitHub just now."
      );
    } finally {
      repoList.setAttribute("aria-busy", "false");
    }
  }

  /* ---------------- Contact form ---------------- */
  const form = $("#contactForm");
  const statusEl = $("#cfStatus");
  const submitBtn = $("#cfSubmit");
  const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
  const rules = {
    name: (v) => (v.trim().length < 2 ? "Enter your name." : ""),
    email: (v) => (!v.trim() ? "Enter your email address." : !EMAIL_RE.test(v.trim()) ? "Enter an email like name@example.com." : ""),
    subject: (v) => (v.trim().length < 3 ? "Add a short subject." : ""),
    message: (v) => (v.trim().length < 10 ? "Write a message of at least 10 characters." : ""),
  };
  function validateField(input) {
    const rule = rules[input.name];
    if (!rule) return true;
    const msg = rule(input.value);
    const err = document.getElementById(input.getAttribute("aria-describedby"));
    input.setAttribute("aria-invalid", msg ? "true" : "false");
    if (err) err.textContent = msg;
    return !msg;
  }
  $$("input, textarea", form).forEach((el) => {
    el.addEventListener("blur", () => el.value && validateField(el));
    el.addEventListener("input", () => el.getAttribute("aria-invalid") === "true" && validateField(el));
  });

  let sending = false;
  const startedAt = Date.now();
  const SEND_LABEL = "Send message";

  function setStatus(kind, html) {
    statusEl.className = "form__status" + (kind ? " is-" + kind : "");
    statusEl.innerHTML = html;
  }

  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    if (sending) return; // prevents double submits
    const fields = $$("input:not([name='_honey']), textarea", form);
    const ok = fields.map(validateField).every(Boolean);
    if (!ok) {
      setStatus("err", "Some fields need attention. Check the messages above and try again.");
      const firstBad = fields.find((f) => f.getAttribute("aria-invalid") === "true");
      firstBad && firstBad.focus();
      return;
    }
    // Spam checks: honeypot filled, or submitted faster than a person could type.
    if (form._honey.value || Date.now() - startedAt < 3000) {
      setStatus("ok", "Thanks, your message has been sent.");
      form.reset();
      return;
    }

    sending = true;
    submitBtn.disabled = true;
    submitBtn.innerHTML = `${icon("loader-circle", "spinner")}<span class="btn__label">Sending…</span>`;
    setStatus("", "");

    const payload = {
      name: form.name.value.trim(),
      email: form.email.value.trim(),
      subject: form.subject.value.trim(),
      message: form.message.value.trim(),
      _subject: "Portfolio message: " + form.subject.value.trim(),
      _replyto: form.email.value.trim(),
      _template: "table",
      _captcha: "false",
      _honey: "",
    };

    try {
      const ctrl = new AbortController();
      const timer = setTimeout(() => ctrl.abort(), 15000);
      const res = await fetch(C.contact.endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify(payload),
        signal: ctrl.signal,
      });
      clearTimeout(timer);
      const body = await res.json().catch(() => ({}));
      if (!res.ok || body.success === false || body.success === "false") throw new Error(body.message || "send");
      setStatus("ok", `Message sent. Thanks, ${esc(payload.name.split(" ")[0])}. I'll reply to ${esc(payload.email)} soon.`);
      form.reset();
      fields.forEach((f) => f.removeAttribute("aria-invalid"));
    } catch (err) {
      const mailto = `mailto:${C.person.email}?subject=${encodeURIComponent(payload.subject)}&body=${encodeURIComponent(payload.message)}`;
      setStatus(
        "err",
        `The message didn't send${err.name === "AbortError" ? " because the connection timed out" : ""}. Your text is still in the form, so try again, or <a href="${esc(mailto)}">email me directly</a>.`
      );
    } finally {
      sending = false;
      submitBtn.disabled = false;
      submitBtn.innerHTML = `<span class="btn__label">${SEND_LABEL}</span>`;
    }
  });

  /* ---------------- Navigation behaviour ---------------- */
  const nav = $("#nav");
  const toggle = $("#navToggle");
  const menu = $("#mobileMenu");
  const hero = $("#home");

  function setMenu(open) {
    toggle.setAttribute("aria-expanded", String(open));
    menu.hidden = !open;
    nav.classList.toggle("is-solid", open || window.scrollY > 24);
    document.body.style.overflow = open ? "hidden" : "";
  }
  toggle.addEventListener("click", () => setMenu(toggle.getAttribute("aria-expanded") !== "true"));
  menu.addEventListener("click", (e) => e.target.closest("a") && setMenu(false));
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && !menu.hidden) {
      setMenu(false);
      toggle.focus();
    }
  });
  window.matchMedia("(min-width: 1081px)").addEventListener("change", (m) => m.matches && setMenu(false));

  const onScroll = () => nav.classList.toggle("is-solid", window.scrollY > 24 || !menu.hidden);
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  // Active section indicator
  const tracked = $$("main > section").filter((s) => !s.hidden && $$(`[data-section="${s.id}"]`).length);
  const spy = new IntersectionObserver(
    (entries) => {
      entries.forEach((en) => {
        if (!en.isIntersecting) return;
        $$("[data-section]").forEach((a) => a.setAttribute("aria-current", String(a.dataset.section === en.target.id)));
      });
    },
    { rootMargin: "-45% 0px -50% 0px" }
  );
  tracked.forEach((s) => spy.observe(s));

  /* ---------------- Reveal on scroll ---------------- */
  const io =
    "IntersectionObserver" in window && !REDUCED
      ? new IntersectionObserver(
          (entries) =>
            entries.forEach((en) => {
              if (en.isIntersecting) {
                en.target.classList.add("is-in");
                io.unobserve(en.target);
              }
            }),
          { rootMargin: "0px 0px -8% 0px", threshold: 0.08 }
        )
      : null;
  function observe(els) {
    els.forEach((el) => (io ? io.observe(el) : el.classList.add("is-in")));
  }

  /* ---------------- Draft decoration ---------------- */
  function decorateDrafts(root = document) {
    $$("[data-draft='true']", root).forEach((el) => el.classList.add("is-draft"));
  }
  if (PREVIEW) {
    const bar = document.createElement("div");
    bar.className = "preview-bar";
    bar.innerHTML = `Preview mode: drafts are visible. <a href="${location.pathname}">See the live version</a>`;
    document.body.appendChild(bar);
  }

  /* ---------------- Go ---------------- */
  renderProjects("all");
  decorateDrafts();
  observe($$("[data-reveal]"));
  loadRepos();
  requestAnimationFrame(() => requestAnimationFrame(() => document.documentElement.classList.add("is-ready")));

  // Keep focus in the page when a hash link is followed (accessibility).
  document.addEventListener("click", (e) => {
    const a = e.target.closest('a[href^="#"]');
    if (!a || a.getAttribute("href") === "#") return;
    const target = document.querySelector(a.getAttribute("href"));
    if (!target) return;
    target.setAttribute("tabindex", "-1");
    setTimeout(() => target.focus({ preventScroll: true }), REDUCED ? 0 : 500);
  });
})();
