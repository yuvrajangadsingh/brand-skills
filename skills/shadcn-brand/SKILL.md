---
name: shadcn-brand
description: >-
  Use when the user wants a UI that follows the shadcn/ui aesthetic: neutral palette,
  refined typography, restrained accents, minimal shadows, dense but readable. Tokens
  (colors, typography, spacing, components, shape language) are in references/DESIGN.md.
compatibility: Requires references/DESIGN.md (bundled with this skill).
---

# shadcn/ui brand

Use when the user wants a UI that follows the shadcn/ui aesthetic: neutral palette, refined typography, restrained accents, minimal shadows, dense but readable.

## How to apply

1. Read @references/DESIGN.md first. Always.
2. When generating any component, page, or style block:
   - Use the documented colors, not arbitrary hex values
   - Match the typography exactly (font family, sizes, weights)
   - Honor the spacing scale; don't substitute arbitrary pixels
   - Match shape language (border radius, shadow styles)
3. If a token isn't specified, derive from the closest documented one. Don't fall back to generic Tailwind defaults or random Bootstrap/Material values.

## Source

Extracted with [brandmd](https://github.com/yuvrajangadsingh/brandmd) from https://ui.shadcn.com. shadcn/ui is explicitly designed to be copied (MIT, components are meant to be vendored). This skill captures the high-level brand context of the ui.shadcn.com showcase site.

Regenerate the underlying tokens any time:

```bash
npx brandmd https://ui.shadcn.com -o references/DESIGN.md
```
