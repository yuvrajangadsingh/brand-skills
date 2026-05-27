# brand-skills

Installable [Agent Skills](https://agentskills.io/home) for popular dev / SaaS brand design systems.

```bash
npx skills add yuvrajangadsingh/brand-skills
```

Each skill drops a `SKILL.md` and a `references/DESIGN.md` into your project's `.claude/skills/<brand>-brand/` (or equivalent agent skills path). Your AI coding agent (Claude Code, Cursor, Codex, Gemini CLI) then has the observed public CSS/design tokens (colors, typography, spacing, components) for that brand when generating UI in that aesthetic.

## What's here

| Skill | Source | When to use |
|---|---|---|
| `tailwind-brand` | [tailwindcss.com](https://tailwindcss.com) | Clean utility-first developer aesthetic, generous whitespace |
| `shadcn-brand` | [ui.shadcn.com](https://ui.shadcn.com) | Neutral, refined, minimal-shadow UI shell |
| `vercel-brand` | [vercel.com](https://vercel.com) | Black/white core, geist-style typography, sharp infra-product feel |
| `mintlify-brand` | [mintlify.com](https://mintlify.com) | Clean documentation aesthetic with soft accents |
| `anthropic-brand` | [anthropic.com](https://anthropic.com) | Warm neutrals, restrained palette, editorial calm |

## Disclaimer

**These are community examples generated from public brand pages using [brandmd](https://github.com/yuvrajangadsingh/brandmd). They are NOT affiliated with or endorsed by the named brands.** Each skill is a snapshot of the public marketing site's visible design tokens. Use them for prototyping, internal tools, learning, or any UI work where matching a known aesthetic is the goal. For commercial brand reproduction, always check the brand's own brand-guidelines page first.

## How this compares to other skills repos

[google/skills](https://github.com/google/skills) ships skills for Google Cloud products (Gemini API, Firebase, BigQuery, etc). [vercel-labs/agent-skills](https://github.com/vercel-labs/agent-skills) ships React + Vercel skills. `brand-skills` follows the same installable-skills convention but ships brand design system snapshots instead. Same install path, different scope.

## Generate your own

Want a skill for a brand that's not here? Generate one in 5 seconds:

```bash
npx brandmd https://yoursite.com --agent
```

That writes `.claude/skills/brand-style/SKILL.md` + `.cursor/rules/brand.mdc` into your current project, pointing at a fresh `DESIGN.md` extraction of the site. See [brandmd](https://github.com/yuvrajangadsingh/brandmd) for all options (`--css`, `--tailwind`, `--json`, `--html`, `--dark`, `--vision`).

## Contributing

To add a new brand skill to this repo: open an issue with the public URL you'd like extracted. Permissive-license / public-brand-page targets preferred; brand-protected commercial sites will be declined to avoid trademark issues.

## License

Apache 2.0. See [LICENSE](LICENSE). The extracted design tokens themselves remain the property of their respective brand owners; only this skill packaging is Apache-licensed.
