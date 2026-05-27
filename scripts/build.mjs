#!/usr/bin/env node
// One-shot builder for brand-skills repo. Pulls DESIGN.md from brandmd's examples
// folder (or a /tmp path for fresh extractions), places it under skills/<name>/references/,
// then writes a per-brand SKILL.md with custom frontmatter + provenance note.

import { readFileSync, writeFileSync, mkdirSync, existsSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const here = dirname(fileURLToPath(import.meta.url));
const repoRoot = join(here, "..");

const brandmdExamples = "/Users/yuvrajangadsingh/Sites/projects/personal/brandmd/examples";

const brands = [
  {
    slug: "tailwind-brand",
    display: "Tailwind CSS",
    source_url: "https://tailwindcss.com",
    source_design: join(brandmdExamples, "tailwindcss.md"),
    when_to_use: "Use when the user is building a developer documentation, landing page, or UI that should feel like the Tailwind CSS website: clean utility-first aesthetic, generous whitespace, sky/blue accents, system-sans typography.",
    note: "Tailwind CSS is open source (MIT). The design system extracted here is from the public marketing site.",
  },
  {
    slug: "shadcn-brand",
    display: "shadcn/ui",
    source_url: "https://ui.shadcn.com",
    source_design: "/tmp/shadcn-test.md",
    when_to_use: "Use when the user wants a UI that follows the shadcn/ui aesthetic: neutral palette, refined typography, restrained accents, minimal shadows, dense but readable.",
    note: "shadcn/ui is explicitly designed to be copied (MIT, components are meant to be vendored). This skill captures the high-level brand context of the ui.shadcn.com showcase site.",
  },
  {
    slug: "vercel-brand",
    display: "Vercel",
    source_url: "https://vercel.com",
    source_design: join(brandmdExamples, "vercel.md"),
    when_to_use: "Use when the user is building a developer / infrastructure product UI that should feel like Vercel: black/white core, minimal accents, geist-style typography, generous whitespace, sharp edges.",
    note: "Vercel publishes brand guidance at vercel.com/design. This skill extracts the public marketing site's visual system. Not affiliated with Vercel.",
  },
  {
    slug: "mintlify-brand",
    display: "Mintlify",
    source_url: "https://mintlify.com",
    source_design: join(brandmdExamples, "mintlify.md"),
    when_to_use: "Use when the user is building documentation or a developer marketing site that should feel like Mintlify: clean docs aesthetic, soft accents, friendly typography, generous spacing.",
    note: "Mintlify is a documentation platform. This skill extracts the public marketing site's visual system. Not affiliated with Mintlify.",
  },
  {
    slug: "anthropic-brand",
    display: "Anthropic",
    source_url: "https://anthropic.com",
    source_design: join(brandmdExamples, "anthropic.md"),
    when_to_use: "Use when the user wants AI-product UI that feels like Anthropic: warm neutrals, restrained palette, editorial typography, calm density.",
    note: "Anthropic publishes the Claude Code Skills spec. This skill extracts the public anthropic.com marketing site's visual system. Not affiliated with Anthropic.",
  },
];

// brandmd's example files have a custom intro block (4 lines of `>` blockquote) my Sunday rewrite added.
// Strip that. Keep everything from the first H2 onward, plus the original H1.
function extractDesignBody(raw) {
  const lines = raw.split("\n");
  const h1Idx = lines.findIndex((l) => l.startsWith("# Design System"));
  const firstH2Idx = lines.findIndex((l) => l.startsWith("## 1."));
  if (h1Idx === -1 || firstH2Idx === -1) {
    throw new Error("source DESIGN.md missing expected H1 or `## 1.` section");
  }
  const h1 = lines[h1Idx];
  const body = lines.slice(firstH2Idx).join("\n");
  return `${h1}\n\n${body}`;
}

function buildSkillMd(brand) {
  const ref = "references/DESIGN.md";
  return `---
name: ${brand.slug}
description: ${brand.when_to_use} Tokens (colors, typography, spacing, components, shape language) are in ${ref}.
compatibility: Requires ${ref} (bundled with this skill).
---

# ${brand.display} brand

${brand.when_to_use}

## How to apply

1. Read @${ref} first. Always.
2. When generating any component, page, or style block:
   - Use the documented colors, not arbitrary hex values
   - Match the typography exactly (font family, sizes, weights)
   - Honor the spacing scale; don't substitute arbitrary pixels
   - Match shape language (border radius, shadow styles)
3. If a token isn't specified, derive from the closest documented one. Don't fall back to generic Tailwind defaults or random Bootstrap/Material values.

## Source

Extracted with [brandmd](https://github.com/yuvrajangadsingh/brandmd) from ${brand.source_url}. ${brand.note}

Regenerate the underlying tokens any time:

\`\`\`bash
npx brandmd ${brand.source_url} -o references/DESIGN.md
\`\`\`
`;
}

for (const brand of brands) {
  if (!existsSync(brand.source_design)) {
    console.error(`SKIP ${brand.slug}: source ${brand.source_design} not found`);
    continue;
  }
  const raw = readFileSync(brand.source_design, "utf8");
  const designOut = extractDesignBody(raw);

  const designPath = join(repoRoot, "skills", brand.slug, "references", "DESIGN.md");
  mkdirSync(dirname(designPath), { recursive: true });
  writeFileSync(designPath, designOut);

  const skillPath = join(repoRoot, "skills", brand.slug, "SKILL.md");
  writeFileSync(skillPath, buildSkillMd(brand));

  console.log(`OK ${brand.slug} -> SKILL.md (${buildSkillMd(brand).length} chars) + references/DESIGN.md (${designOut.length} chars)`);
}
