#!/usr/bin/env node
// Reproducible build for brand-skills. Reads brandmd-extracted DESIGN.md snapshots
// from ./sources/<slug>.md, sanitizes, and emits self-contained skills under
// ./skills/<slug>-brand/{SKILL.md, references/DESIGN.md}.
//
// Run from repo root:
//   node scripts/build.mjs
//
// To refresh a source snapshot, regenerate with brandmd and overwrite the file:
//   npx brandmd https://tailwindcss.com -o sources/tailwind.md

import { readFileSync, writeFileSync, mkdirSync, existsSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const here = dirname(fileURLToPath(import.meta.url));
const repoRoot = join(here, "..");
const sourcesDir = join(repoRoot, "sources");

const BUILT_ON = new Date().toISOString().slice(0, 10);

const brands = [
  {
    slug: "tailwind",
    display: "Tailwind CSS",
    source_url: "https://tailwindcss.com",
    when_to_use: "Use when the user is building a developer documentation, landing page, or UI that should feel like the Tailwind CSS website, a clean utility-first aesthetic with generous whitespace, sky/blue accents, and a system-sans typography.",
    note: "Tailwind CSS is open source (MIT). The design tokens captured here are observed from the public marketing site.",
  },
  {
    slug: "shadcn",
    display: "shadcn/ui",
    source_url: "https://ui.shadcn.com",
    when_to_use: "Use when the user wants a UI that follows the shadcn/ui aesthetic, a neutral palette with refined typography, restrained accents, minimal shadows, and dense but readable layout.",
    note: "shadcn/ui is explicitly designed to be copied (MIT, components are meant to be vendored). This skill captures the high-level brand context observed on the ui.shadcn.com showcase site.",
  },
  {
    slug: "vercel",
    display: "Vercel",
    source_url: "https://vercel.com",
    when_to_use: "Use when the user is building a developer or infrastructure product UI that should feel like Vercel, a black/white core with minimal accents, geist-style typography, generous whitespace, and sharp edges.",
    note: "Vercel publishes brand guidance at vercel.com/design. This skill captures observed design tokens from the public marketing site.",
  },
  {
    slug: "mintlify",
    display: "Mintlify",
    source_url: "https://mintlify.com",
    when_to_use: "Use when the user is building documentation or a developer marketing site that should feel like Mintlify, a clean docs aesthetic with soft accents, friendly typography, and generous spacing.",
    note: "Mintlify is a documentation platform. This skill captures observed design tokens from the public marketing site.",
  },
  {
    slug: "anthropic",
    display: "Anthropic",
    source_url: "https://anthropic.com",
    when_to_use: "Use when the user wants AI-product UI that feels like Anthropic, warm neutrals, restrained palette, editorial typography, and calm density.",
    note: "Anthropic publishes the Claude Code Skills spec. This skill captures observed design tokens from the public anthropic.com marketing site.",
  },
];

const DISCLAIMER = `## Unaffiliated, observed from public pages

This skill is an **unofficial, unaffiliated** snapshot of design tokens observed from the named brand's public marketing site. It is not endorsed by the brand owner. The brand name appears here for reference only.

**Do not** use the brand's name, logos, or trademarks in UI you ship to end users unless you have separate permission from the brand owner. Use this skill for prototyping, internal tools, learning, aesthetic studies, or wherever matching a known visual system is the goal.`;

const FONT_NOTE = `## Font availability note

The font names captured in \`references/DESIGN.md\` reflect what the source site uses. Some are proprietary (for example, Anthropic Sans, Geist, custom brand families) and not publicly licensed for redistribution. If the project you are building has font-license constraints, substitute with publicly available fallbacks (Inter, system-ui, Geist Mono if available via npm) that match the role and weight, and document the swap.`;

// Sanitize artifacts from brandmd's CSS extraction
function sanitizeDesignBody(raw) {
  // Replace pill-radius scientific notation (3.35544e+07px etc) with the canonical 9999px.
  // CSS pill buttons use border-radius: 99999px; getComputedStyle returns it as scientific notation.
  return raw
    .replace(/\b\d+(?:\.\d+)?e\+\d+px/g, "9999px (pill)")
    .replace(/\b(\d{6,})px/g, "9999px (pill)");
}

function extractDesignBody(raw) {
  const lines = raw.split("\n");
  const h1Idx = lines.findIndex((l) => l.startsWith("# Design System"));
  const firstH2Idx = lines.findIndex((l) => l.startsWith("## 1."));
  if (h1Idx === -1 || firstH2Idx === -1) {
    throw new Error("source DESIGN.md missing expected H1 or `## 1.` section");
  }
  const h1 = lines[h1Idx];
  const body = lines.slice(firstH2Idx).join("\n");
  return sanitizeDesignBody(`${h1}\n\n${body}`);
}

function buildSkillMd(brand) {
  const ref = "references/DESIGN.md";
  const fullDesc = `${brand.when_to_use} Tokens (colors, typography, spacing, components, shape language) are in ${ref}.`;
  // YAML block scalar for description: safely contains colons inside the prose.
  const yamlDesc = fullDesc.match(/.{1,90}(\s|$)/g).map((s) => `  ${s.trim()}`).join("\n");

  return `---
name: ${brand.slug}-brand
description: >-
${yamlDesc}
---

# ${brand.display} brand

${brand.when_to_use}

## Requirements

This skill expects \`references/DESIGN.md\` (bundled with the skill) at the skill's own folder. The path is referenced as \`@references/DESIGN.md\` so the agent loads it relative to the skill, not the project root.

## How to apply

1. Read \`@${ref}\` first. Always.
2. When generating any component, page, or style block:
   - Use the colors observed in the Color Palette section. Don't invent new shades.
   - Match the typography (font family, sizes, weights) as documented, subject to the Font availability note below.
   - Honor the spacing scale; don't substitute arbitrary pixel values.
   - Match shape language (border radius, shadow styles).
3. If a token isn't specified, derive from the closest documented one. Don't fall back to generic Tailwind defaults or random Bootstrap / Material values.

${DISCLAIMER}

${FONT_NOTE}

## Provenance

- Source: ${brand.source_url}
- Generated by [brandmd](https://github.com/yuvrajangadsingh/brandmd) from the public marketing site
- Snapshot built: ${BUILT_ON}
- ${brand.note}

Regenerate the underlying tokens any time:

\`\`\`bash
npx brandmd ${brand.source_url} -o references/DESIGN.md
\`\`\`
`;
}

let built = 0;
for (const brand of brands) {
  const sourcePath = join(sourcesDir, `${brand.slug}.md`);
  if (!existsSync(sourcePath)) {
    console.error(`SKIP ${brand.slug}: source ${sourcePath} not found`);
    continue;
  }
  const raw = readFileSync(sourcePath, "utf8");
  const designOut = extractDesignBody(raw);

  const skillDir = join(repoRoot, "skills", `${brand.slug}-brand`);
  const designPath = join(skillDir, "references", "DESIGN.md");
  const skillPath = join(skillDir, "SKILL.md");
  mkdirSync(dirname(designPath), { recursive: true });
  writeFileSync(designPath, designOut);
  writeFileSync(skillPath, buildSkillMd(brand));

  console.log(`OK ${brand.slug}-brand`);
  built++;
}
console.log(`\nbuilt ${built} of ${brands.length} skills.`);
