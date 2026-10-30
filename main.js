(function () {
  const S = window.SITE;
  const page = document.body.dataset.page;
  const $ = (id) => document.getElementById(id);

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
  // Pages in a subfolder reach images and the site root through ../
  const root = page === "home" ? "" : "../";
  const img = (p, extra) => el("img", Object.assign({ src: root + p.src, alt: p.alt || "" }, extra || {}));
  const link = (label) => S.contact.links.find((l) => l.label === label);

  if ($("year")) $("year").textContent = new Date().getFullYear();

  // ---------------- Home ----------------
  if (page === "home") {
    $("intro").textContent = S.homeIntro;
    const li = link("LinkedIn");
    if (li) $("linkedin").href = li.url;
    $("email").href = "mailto:" + S.contact.email;

    const imgs = S.photos.map((p, i) => {
      const n = img(p, i === 0 ? {} : { loading: "lazy" });
      if (i === 0) n.classList.add("on");
      $("portrait").appendChild(n);
      return n;
    });
    let current = 0;
    function swap(i) {
      if (i === current || !imgs[i]) return;
      imgs[current].classList.remove("on");
      imgs[i].classList.add("on");
      current = i;
    }
    document.querySelectorAll("[data-photo]").forEach((a) => {
      const i = Number(a.dataset.photo);
      a.addEventListener("mouseenter", () => swap(i));
      a.addEventListener("focus", () => swap(i));
      a.addEventListener("mouseleave", () => swap(0));
      a.addEventListener("blur", () => swap(0));
    });
  }

  // ---------------- About ----------------
  if (page === "about") {
    S.about.forEach((p) => $("about-body").appendChild(el("p", { text: p })));
    $("role-title").textContent = S.now.role + ", " + S.now.company;
    $("role-when").textContent = S.now.dates;
    S.now.highlights.forEach((h) => $("highlights").appendChild(el("li", { text: h })));
    $("about-photo").appendChild(img(S.photos[1]));
    [S.photos[4], S.photos[3]].forEach((p) => $("pics").appendChild(img(p, { loading: "lazy" })));
  }

  // ---------------- Reading ----------------
  if (page === "reading") {
    const SPINES = [
      { bg: "#c8202f", fg: "#f5f0e8" },
      { bg: "#5e6b49", fg: "#f5f0e8" },
      { bg: "#e2b49b", fg: "#1b1917" },
      { bg: "#2b3a67", fg: "#f5f0e8" },
      { bg: "#ebe2d3", fg: "#1b1917" },
      { bg: "#7a2e4d", fg: "#f5f0e8" },
      { bg: "#c8962f", fg: "#1b1917" },
      { bg: "#34505f", fg: "#f5f0e8" },
      { bg: "#3f3a35", fg: "#f5f0e8" },
    ];
    const HEIGHTS = [300, 262, 322, 270, 292, 252, 310, 280, 296];
    const WIDTHS = [64, 54, 74, 58, 68, 52, 62, 72, 60];
    const spines = [];
    function selectBook(i) {
      spines.forEach((s, j) => s.setAttribute("aria-selected", String(j === i)));
      const b = S.read[i];
      const d = $("book-detail");
      d.textContent = "";
      d.appendChild(el("h3", { text: b.title }));
      d.appendChild(el("p", { class: "by", text: b.author }));
      if (b.learned) {
        d.appendChild(el("p", { class: "learned-label", text: "What I learned" }));
        d.appendChild(el("p", { class: "note", text: b.learned }));
      } else if (b.note) {
        d.appendChild(el("p", { class: "note", text: b.note }));
      }
    }
    S.read.forEach((b, i) => {
      const c = SPINES[i % SPINES.length];
      const s = el(
        "button",
        { class: "spine", type: "button", role: "tab", "aria-label": b.title + " by " + b.author },
        [el("span", { text: b.title }), el("small", { text: b.author.split(" ").pop() })]
      );
      s.style.background = c.bg;
      s.style.color = c.fg;
      s.style.height = HEIGHTS[i % HEIGHTS.length] + "px";
      s.style.width = WIDTHS[i % WIDTHS.length] + "px";
      s.addEventListener("click", () => selectBook(i));
      spines.push(s);
      $("shelf").appendChild(s);
    });
    if (S.read.length) selectBook(0);
  }
})();
