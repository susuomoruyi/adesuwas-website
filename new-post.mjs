// Creates a new essay file to write in:
//
//   npm run new -- "Title of the essay"
//
// Then write your essay below the "---" line, and run `npm run publish`.

import { writeFile, access } from "node:fs/promises";

const title = process.argv.slice(2).join(" ").trim();
if (!title) {
  console.error('Give it a title:  npm run new -- "Title of the essay"');
  process.exit(1);
}

const slug = title
  .toLowerCase()
  .replace(/[’']/g, "")
  .replace(/[^a-z0-9]+/g, "-")
  .replace(/^-+|-+$/g, "")
  .slice(0, 70)
  .replace(/-+$/, "");
const date = new Date().toISOString().slice(0, 10);
const file = `blog/posts/${slug}.md`;

try {
  await access(file);
  console.error(`${file} already exists.`);
  process.exit(1);
} catch {}

await writeFile(
  file,
  `---
title: ${JSON.stringify(title)}
date: ${date}
description: ""
medium: ""
---

Write your essay here. Use blank lines between paragraphs.

## A section heading

> A pull quote or something you want to stand out.

To add a picture, put the file in images/blog/ and write:
![what the picture shows](images/blog/your-picture.jpg)
`
);

console.log(`Created ${file}\nWrite your essay in it, then run:  npm run publish`);
