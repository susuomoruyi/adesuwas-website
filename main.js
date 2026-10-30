(function () {
  const S = window.SITE;
  const POSTS = window.POSTS || [];
  const $ = (id) => document.getElementById(id);
  document.documentElement.classList.add("js");

  function el(tag, props, children) {
    const node = document.createElement(tag);
    Object.entries(props || {}).forEach(([k, v]) => {
      if (k === "class") node.className = v;
      else if (k === "text") node.textContent = v;
      else node.setAttribute(k, v);
    });
    (children || []).forEach((c) => c && node.appendChild(c));
    return node;
  }
  const img = (p, extra) => el("img", Object.assign({ src: p.src, alt: p.alt || "" }, extra || {}));
  const fmtDate = (iso) =>
    new Date(iso + "T00:00:00").toLocaleDateString("en-US", { month: "short", year: "numeric" });
  const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  // ---- Cover ---------------------------------------------------------
  $("issue").textContent = S.issue;
  $("hero-tagline").textContent = S.tagline;
  $("cover-photo").appendChild(img(S.cover));
  $("badge-text").textContent = S.badge;
  $("badge-text").setAttribute("textLength", "485");
  $("badge-text").setAttribute("lengthAdjust", "spacing");
  S.coverLines.forEach((l) =>
    $("cover-lines").appendChild(el("li", {}, [el("a", { href: l.href, text: l.text })]))
  );

  // ---- Ticker (list twice so the loop is seamless) -------------------
  const items = S.ticker.concat(S.ticker).concat(S.ticker).concat(S.ticker);
  items.forEach((t) => $("ticker").appendChild(el("span", { text: t })));

  // ---- Quotes --------------------------------------------------------
  let q = 0;
  let qTimer;
  const dots = S.quotes.map((_, i) => {
    const b = el("button", { type: "button", role: "tab", "aria-label": "Quote " + (i + 1) });
    b.addEventListener("click", () => { show(i); restart(); });
    $("quote-dots").appendChild(b);
    return b;
  });
  function show(i, instant) {
    q = i;
    const data = S.quotes[i];
    const p = $("quote-text");
    const apply = () => {
      p.textContent = data.text;
      $("quote-from").textContent = data.from;
      $("quote-from").href = "blog/" + data.post + "/index.html";
      p.classList.remove("out");
    };
    dots.forEach((d, j) => d.setAttribute("aria-selected", String(j === i)));
    if (instant || reduced) return apply();
    p.classList.add("out");
    setTimeout(apply, 320);
  }
  function restart() {
    clearInterval(qTimer);
    if (!reduced) qTimer = setInterval(() => show((q + 1) % S.quotes.length), 7000);
  }
  show(0, true);
  restart();
  $("quote").addEventListener("mouseenter", () => clearInterval(qTimer));
  $("quote").addEventListener("mouseleave", restart);

  // ---- About ---------------------------------------------------------
  $("about-title").textContent = "hi. i’m " + S.name.toLowerCase() + ".";
  $("about-photo").appendChild(img(S.aboutPhoto, { loading: "lazy" }));
  S.about.forEach((p) => $("about-body").appendChild(el("p", { text: p })));
  const facts = [
    ["Role", S.now.role + ", " + S.now.company],
    ["Since", S.now.dates.split("–")[0].trim()],
    ["Essays written", String(POSTS.length)],
    ["Books in 2026", String(S.read.length)],
    ["Learning", "French"],
    ["Recognition", "Forbes Africa 30 Under 30"],
  ];
  facts.forEach(([k, v]) =>
    $("facts").appendChild(el("div", {}, [el("dt", { text: k }), el("dd", { text: v })]))
  );

  // ---- Work ----------------------------------------------------------
  $("role-line").textContent = S.now.role + " · " + S.now.dates;
  $("work-summary").textContent = S.now.summary;
  const fmt = (n) => n.toLocaleString("en-US");
  S.stats.forEach((s) => {
    const b = el("b", { text: (s.prefix || "") + fmt(s.value) + s.suffix });
    b.dataset.value = s.value;
    b.dataset.prefix = s.prefix || "";
    b.dataset.suffix = s.suffix;
    $("stats").appendChild(el("div", { class: "stat" }, [b, el("span", { text: s.label })]));
  });
  S.now.highlights.forEach((h) => $("highlights").appendChild(el("li", { text: h })));
  if (S.before.length) {
    S.before.forEach((b) =>
      $("before").appendChild(
        el("li", {}, [el("b", { text: b.company }), el("span", { text: b.role + " · " + b.dates })])
      )
    );
  } else {
    $("before-wrap").remove();
  }

  // ---- Contact sheet -------------------------------------------------
  S.frames.forEach((f) =>
    $("frames").appendChild(
      el("figure", { class: "frame reveal" }, [
        img(f, { loading: "lazy" }),
        el("figcaption", {}, [el("span", { text: f.caption }), el("span", { text: "Adesuwa" })]),
      ])
    )
  );

  // ---- Bookshelf -----------------------------------------------------
  const SPINES = [
    { bg: "#d11f2f", fg: "#f6efe4" },
    { bg: "#5e6b49", fg: "#f6efe4" },
    { bg: "#e7b8a0", fg: "#1c1a18" },
    { bg: "#2b3a67", fg: "#f6efe4" },
    { bg: "#f1e9dd", fg: "#1c1a18" },
    { bg: "#7a2e4d", fg: "#f6efe4" },
    { bg: "#c8962f", fg: "#1c1a18" },
    { bg: "#34505f", fg: "#f6efe4" },
    { bg: "#3f3a35", fg: "#f6efe4" },
  ];
  const HEIGHTS = [300, 262, 322, 270, 292, 252, 310, 280, 296];
  const WIDTHS = [64, 54, 74, 58, 68, 52, 62, 72, 60];
  const spines = [];
  function selectBook(i) {
    spines.forEach((s, j) => s.setAttribute("aria-selected", String(j === i)));
    const b = S.read[i];
    const d = $("book-detail");
    d.textContent = "";
    d.appendChild(
      el("div", {}, [el("h3", { text: b.title }), el("p", { class: "by", text: b.author })])
    );
    const body = b.learned || b.note;
    if (body) {
      d.style.gridTemplateColumns = "";
      d.appendChild(
        el("div", {}, [
          b.learned ? el("p", { class: "learned-label", text: "What I learned" }) : null,
          el("p", { class: "note", text: body }),
        ])
      );
    } else {
      d.style.gridTemplateColumns = "1fr";
    }
  }
  S.read.forEach((b, i) => {
    const c = SPINES[i % SPINES.length];
    const s = el("button", { class: "spine", type: "button", role: "tab", "aria-label": b.title + " by " + b.author }, [
      el("span", { text: b.title }),
      el("small", { text: b.author.split(" ").pop() }),
    ]);
    s.style.background = c.bg;
    s.style.color = c.fg;
    s.style.height = HEIGHTS[i % HEIGHTS.length] + "px";
    s.style.width = WIDTHS[i % WIDTHS.length] + "px";
    s.addEventListener("click", () => selectBook(i));
    spines.push(s);
    $("shelf").appendChild(s);
  });
  $("read-count").textContent = S.read.length;
  if (S.read.length) selectBook(0);

  // ---- Latest essays -------------------------------------------------
  POSTS.slice(0, 6).forEach((a) => {
    $("articles").appendChild(
      el("li", {}, [
        el("div", { class: "meta" }, [
          el("span", { text: fmtDate(a.date) }),
          el("span", { class: "tag", text: a.minutes + " min" }),
        ]),
        el("a", { href: "blog/" + a.slug + "/index.html", text: a.title }),
        a.description ? el("p", { text: a.description }) : null,
      ])
    );
  });

  // ---- Contact -------------------------------------------------------
  $("email").href = "mailto:" + S.contact.email;
  $("email").textContent = S.contact.email;
  S.contact.links.forEach((l) =>
    $("links").appendChild(el("li", {}, [el("a", { href: l.url, text: l.label, rel: "noopener" })]))
  );
  $("footer-name").textContent = S.fullName;
  $("year").textContent = new Date().getFullYear();

  // ---- Motion: reveal on scroll, count-up numbers --------------------
  const reveals = document.querySelectorAll(".reveal");
  if (!("IntersectionObserver" in window) || reduced) {
    reveals.forEach((r) => r.classList.add("in"));
    return;
  }
  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) {
          e.target.classList.add("in");
          io.unobserve(e.target);
        }
      });
    },
    { threshold: 0.12 }
  );
  reveals.forEach((r) => io.observe(r));

  const counters = document.querySelectorAll(".stat b");
  const cio = new IntersectionObserver(
    (entries) => {
      entries.forEach((e) => {
        if (!e.isIntersecting) return;
        const node = e.target;
        const end = Number(node.dataset.value);
        const start = performance.now();
        const dur = 1400;
        (function tick(now) {
          const t = Math.min(1, (now - start) / dur);
          const eased = 1 - Math.pow(1 - t, 3);
          node.textContent = node.dataset.prefix + fmt(Math.round(end * eased)) + node.dataset.suffix;
          if (t < 1) requestAnimationFrame(tick);
        })(start);
        cio.unobserve(node);
      });
    },
    { threshold: 0.6 }
  );
  counters.forEach((c) => cio.observe(c));
})();
