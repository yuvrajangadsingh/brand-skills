---
name: mintlify-brand
description: Use when the user is building documentation or a developer marketing site that should feel like Mintlify: clean docs aesthetic, soft accents, friendly typography, generous spacing. Tokens (colors, typography, spacing, components, shape language) are in references/DESIGN.md.
compatibility: Requires references/DESIGN.md (bundled with this skill).
---

# Mintlify brand

Use when the user is building documentation or a developer marketing site that should feel like Mintlify: clean docs aesthetic, soft accents, friendly typography, generous spacing.

## How to apply

1. Read @references/DESIGN.md first. Always.
2. When generating any component, page, or style block:
   - Use the documented colors, not arbitrary hex values
   - Match the typography exactly (font family, sizes, weights)
   - Honor the spacing scale; don't substitute arbitrary pixels
   - Match shape language (border radius, shadow styles)
3. If a token isn't specified, derive from the closest documented one. Don't fall back to generic Tailwind defaults or random Bootstrap/Material values.

## Source

Extracted with [brandmd](https://github.com/yuvrajangadsingh/brandmd) from https://mintlify.com. Mintlify is a documentation platform. This skill extracts the public marketing site's visual system. Not affiliated with Mintlify.

Regenerate the underlying tokens any time:

```bash
npx brandmd https://mintlify.com -o references/DESIGN.md
```
