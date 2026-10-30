// Builds the blog from Markdown files in blog/posts/*.md.
//
//   npm run build
//
// Writes blog/index.html, blog/<slug>/index.html, blog/feed.xml and blog/posts.js
// (the latest-posts list the home page reads). To publish a new post, add a
// Markdown file to blog/posts/ with front matter (title, date, description) and rebuild.

import { readdir, readFile, writeFile, mkdir } from "node:fs/promises";
import path from "node:path";
import { Marked } from "marked";

// Used only for the RSS feed's absolute links. Change it when you have a domain.
const SITE_URL = "https://example.com";
const SITE_NAME = "Adesuwa Omoruyi";
const BLOG_DESCRIPTION = "Notes on building Accrue, growing a company, and learning in public.";

const POSTS_DIR = "blog/posts";
const marked = new Marked({
  renderer: {
    image({ href, title, text }) {
      const t = title ? ` title="${esc(title)}"` : "";
      if (!/^(https?:)?\/\//.test(href)) href = "../../" + href; // local images live at the site root
      return `<img src="${esc(href)}" alt="${esc(text)}"${t} loading="lazy">`;
    },
  },
});

const esc = (s) =>
  String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");

function parse(raw) {
  const m = raw.match(/^---\n([\s\S]*?)\n---\n([\s\S]*)$/);
  if (!m) throw new Error("missing front matter");
  const meta = {};
  for (const line of m[1].split("\n")) {
    const i = line.indexOf(":");
    if (i < 0) continue;
    let v = line.slice(i + 1).trim();
    if (v.startsWith('"')) v = JSON.parse(v);
    meta[line.slice(0, i).trim()] = v;
  }
  return { meta, body: m[2] };
}

const fmtDate = (iso) =>
  new Date(iso + "T00:00:00Z").toLocaleDateString("en-US", {
    year: "numeric", month: "long", day: "numeric", timeZone: "UTC",
  });

function page({ title, description, root, body, canonical, current }) {
  return `<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>${esc(title)}</title>
  <meta name="description" content="${esc(description)}">
  <meta property="og:title" content="${esc(title)}">
  <meta property="og:description" content="${esc(description)}">
  ${canonical ? `<link rel="canonical" href="${esc(canonical)}">` : ""}
  <link rel="alternate" type="application/rss+xml" title="${esc(SITE_NAME)}" href="${root}blog/feed.xml">
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&family=Newsreader:ital,opsz,wght@0,6..72,400;0,6..72,500;1,6..72,400&display=swap" rel="stylesheet">
  <link rel="stylesheet" href="${root}style.css">
</head>
<body>
  <header class="bar">
    <a class="name" href="${root}index.html">Adesuwa Omoruyi</a>
    <nav>
      <a href="${root}about/index.html">About</a>
      <a href="${root}blog/index.html"${current ? ' aria-current="page"' : ""}>Writing</a>
      <a href="${root}reading/index.html">Reading</a>
    </nav>
  </header>
${body}
  <script src="${root}track.js" defer></script>
  <footer class="foot">
    <span>&copy; ${new Date().getFullYear()} ${esc(SITE_NAME)}</span>
    <a href="${root}blog/feed.xml">RSS</a>
  </footer>
</body>
</html>
`;
}

const files = (await readdir(POSTS_DIR)).filter((f) => f.endsWith(".md"));
const posts = [];
for (const f of files) {
  const { meta, body } = parse(await readFile(path.join(POSTS_DIR, f), "utf8"));
  const html = marked.parse(body);
  const words = body.split(/\s+/).length;
  const firstPara = (body.trim().split("\n\n").find((p) => !p.startsWith("!")) || "").replace(/[*_\[\]]|\([^)]*\)/g, "").trim();
  if (meta.description && firstPara.startsWith(meta.description.slice(0, 40))) meta.description = ""; // deck would just repeat the opening
  posts.push({
    slug: f.replace(/\.md$/, ""),
    title: meta.title,
    date: meta.date,
    description: meta.description || "",
    medium: meta.medium || "",
    minutes: Math.max(1, Math.round(words / 220)),
    html,
  });
}
posts.sort((a, b) => b.date.localeCompare(a.date));

// Post pages
for (const p of posts) {
  const dir = path.join("blog", p.slug);
  await mkdir(dir, { recursive: true });
  const body = `  <main class="page">
    <p class="back"><a href="../index.html">&larr; All writing</a></p>
    <article class="post">
      <header>
        <p class="meta"><span>${fmtDate(p.date)}</span><span class="tag">${p.minutes} min read</span></p>
        <h1>${esc(p.title)}</h1>
        ${p.description ? `<p class="deck">${esc(p.description)}</p>` : ""}
      </header>
      <div class="prose post-body">
${p.html}
      </div>
    </article>
    <p class="back"><a href="../index.html">&larr; All writing</a></p>
  </main>`;
  await writeFile(
    path.join(dir, "index.html"),
    page({
      title: `${p.title} | ${SITE_NAME}`,
      description: p.description || BLOG_DESCRIPTION,
      root: "../../",
      body,
      canonical: `${SITE_URL}/blog/${p.slug}/`,
    })
  );
}

// Index page
const list = posts
  .map(
    (p) => `        <li>
          <div class="meta"><span>${fmtDate(p.date)}</span><span class="tag">${p.minutes} min read</span></div>
          <a href="${p.slug}/index.html">${esc(p.title)}</a>
          ${p.description ? `<p>${esc(p.description)}</p>` : ""}
        </li>`
  )
  .join("\n");
await writeFile(
  "blog/index.html",
  page({
    title: `Writing | ${SITE_NAME}`,
    description: BLOG_DESCRIPTION,
    root: "../",
    current: true,
    body: `  <main class="page wide">
    <h1>Writing</h1>
    <p class="deck">${esc(BLOG_DESCRIPTION)}</p>
    <ul class="articles">
${list}
    </ul>
  </main>`,
  })
);

// RSS feed
const items = posts
  .map(
    (p) => `    <item>
      <title>${esc(p.title)}</title>
      <link>${SITE_URL}/blog/${p.slug}/</link>
      <guid>${SITE_URL}/blog/${p.slug}/</guid>
      <pubDate>${new Date(p.date + "T12:00:00Z").toUTCString()}</pubDate>
      <description>${esc(p.description)}</description>
    </item>`
  )
  .join("\n");
await writeFile(
  "blog/feed.xml",
  `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0">
  <channel>
    <title>${esc(SITE_NAME)}</title>
    <link>${SITE_URL}/blog/</link>
    <description>${esc(BLOG_DESCRIPTION)}</description>
${items}
  </channel>
</rss>
`
);

// Latest posts for the home page (a script, so it also works when opened from disk)
const latest = posts.map(({ slug, title, date, description, minutes }) => ({ slug, title, date, description, minutes }));
await writeFile("blog/posts.js", `window.POSTS = ${JSON.stringify(latest, null, 2)};\n`);

console.log(`Built ${posts.length} posts.`);
