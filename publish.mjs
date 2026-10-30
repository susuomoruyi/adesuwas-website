// Builds the site and publishes it:
//
//   npm run publish
//
// Rebuilds the blog, commits everything, and pushes to GitHub. GitHub Pages
// then updates the live site in about a minute.

import { execFileSync } from "node:child_process";

const run = (cmd, args, opts = {}) => execFileSync(cmd, args, { stdio: "inherit", ...opts });

run("node", ["build.mjs"]);
run("git", ["add", "-A"]);

let changed = true;
try {
  execFileSync("git", ["diff", "--cached", "--quiet"]);
  changed = false;
} catch {}

if (!changed) {
  console.log("Nothing new to publish.");
  process.exit(0);
}

const message = process.argv.slice(2).join(" ").trim() || "Publish updates";
run("git", ["commit", "-q", "-m", message]);
// Use the GitHub CLI's login so this works without extra setup.
run("git", ["-c", "credential.helper=", "-c", "credential.helper=!gh auth git-credential", "push", "origin", "main"]);
console.log("\nPublished. The live site updates in about a minute.");
