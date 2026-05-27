---
name: tailwind-brand
description: Use when the user is building a developer documentation, landing page, or UI that should feel like the Tailwind CSS website: clean utility-first aesthetic, generous whitespace, sky/blue accents, system-sans typography. Tokens (colors, typography, spacing, components, shape language) are in references/DESIGN.md.
compatibility: Requires references/DESIGN.md (bundled with this skill).
---

# Tailwind CSS brand

Use when the user is building a developer documentation, landing page, or UI that should feel like the Tailwind CSS website: clean utility-first aesthetic, generous whitespace, sky/blue accents, system-sans typography.

## How to apply

1. Read @references/DESIGN.md first. Always.
2. When generating any component, page, or style block:
   - Use the documented colors, not arbitrary hex values
   - Match the typography exactly (font family, sizes, weights)
   - Honor the spacing scale; don't substitute arbitrary pixels
   - Match shape language (border radius, shadow styles)
3. If a token isn't specified, derive from the closest documented one. Don't fall back to generic Tailwind defaults or random Bootstrap/Material values.

## Source

Extracted with [brandmd](https://github.com/yuvrajangadsingh/brandmd) from https://tailwindcss.com. Tailwind CSS is open source (MIT). The design system extracted here is from the public marketing site.

Regenerate the underlying tokens any time:

```bash
npx brandmd https://tailwindcss.com -o references/DESIGN.md
```
