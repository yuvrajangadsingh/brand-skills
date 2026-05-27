---
name: vercel-brand
description: >-
  Use when the user is building a developer / infrastructure product UI that should feel
  like Vercel: black/white core, minimal accents, geist-style typography, generous
  whitespace, sharp edges. Tokens (colors, typography, spacing, components, shape language)
  are in references/DESIGN.md.
compatibility: Requires references/DESIGN.md (bundled with this skill).
---

# Vercel brand

Use when the user is building a developer / infrastructure product UI that should feel like Vercel: black/white core, minimal accents, geist-style typography, generous whitespace, sharp edges.

## How to apply

1. Read @references/DESIGN.md first. Always.
2. When generating any component, page, or style block:
   - Use the documented colors, not arbitrary hex values
   - Match the typography exactly (font family, sizes, weights)
   - Honor the spacing scale; don't substitute arbitrary pixels
   - Match shape language (border radius, shadow styles)
3. If a token isn't specified, derive from the closest documented one. Don't fall back to generic Tailwind defaults or random Bootstrap/Material values.

## Source

Extracted with [brandmd](https://github.com/yuvrajangadsingh/brandmd) from https://vercel.com. Vercel publishes brand guidance at vercel.com/design. This skill extracts the public marketing site's visual system. Not affiliated with Vercel.

Regenerate the underlying tokens any time:

```bash
npx brandmd https://vercel.com -o references/DESIGN.md
```
