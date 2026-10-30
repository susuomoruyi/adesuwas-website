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
    const FALLBACKS = ["#c8202f", "#2b3a67", "#5e6b49", "#7a2e4d"];
    const tiles = [];
    function cover(b, i, cls) {
      const box = el("div", { class: "cover " + (cls || "") });
      if (b.cover) {
        const im = img({ src: b.cover, alt: "Cover of " + b.title + " by " + b.author });
        im.addEventListener("error", () => { box.textContent = ""; fallback(box, b, i); });
        box.appendChild(im);
      } else {
        fallback(box, b, i);
      }
      return box;
    }
    function fallback(box, b, i) {
      box.classList.add("typo");
      box.style.background = FALLBACKS[i % FALLBACKS.length];
      box.appendChild(el("span", { class: "typo-title", text: b.title }));
      box.appendChild(el("span", { class: "typo-author", text: b.author }));
    }
    function selectBook(i) {
      tiles.forEach((t, j) => t.setAttribute("aria-selected", String(j === i)));
      const b = S.read[i];
      const d = $("book-detail");
      d.textContent = "";
      const text = el("div", { class: "book-text" }, [
        el("h3", { text: b.title }),
        el("p", { class: "by", text: b.author }),
        b.learned ? el("p", { class: "learned-label", text: "What I learned" }) : null,
        b.learned || b.note ? el("p", { class: "note", text: b.learned || b.note }) : null,
      ]);
      d.appendChild(cover(b, i, "big"));
      d.appendChild(text);
    }
    S.read.forEach((b, i) => {
      const t = el("button", { class: "tile", type: "button", role: "tab", "aria-label": b.title + " by " + b.author }, [cover(b, i)]);
      t.addEventListener("click", () => {
        selectBook(i);
        if (window.innerWidth < 800) $("book-detail").scrollIntoView({ behavior: "smooth", block: "start" });
      });
      tiles.push(t);
      $("shelf").appendChild(t);
    });
    if (S.read.length) selectBook(0);
  }
})();
