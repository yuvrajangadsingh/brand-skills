---
name: anthropic-brand
description: Use when the user wants AI-product UI that feels like Anthropic: warm neutrals, restrained palette, editorial typography, calm density. Tokens (colors, typography, spacing, components, shape language) are in references/DESIGN.md.
compatibility: Requires references/DESIGN.md (bundled with this skill).
---

# Anthropic brand

Use when the user wants AI-product UI that feels like Anthropic: warm neutrals, restrained palette, editorial typography, calm density.

## How to apply

1. Read @references/DESIGN.md first. Always.
2. When generating any component, page, or style block:
   - Use the documented colors, not arbitrary hex values
   - Match the typography exactly (font family, sizes, weights)
   - Honor the spacing scale; don't substitute arbitrary pixels
   - Match shape language (border radius, shadow styles)
3. If a token isn't specified, derive from the closest documented one. Don't fall back to generic Tailwind defaults or random Bootstrap/Material values.

## Source

Extracted with [brandmd](https://github.com/yuvrajangadsingh/brandmd) from https://anthropic.com. Anthropic publishes the Claude Code Skills spec. This skill extracts the public anthropic.com marketing site's visual system. Not affiliated with Anthropic.

Regenerate the underlying tokens any time:

```bash
npx brandmd https://anthropic.com -o references/DESIGN.md
```
