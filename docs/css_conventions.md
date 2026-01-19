# CSS Conventions

This file provides information about the CSS architecture and usage.

## CSS Architecture

### PostCSS
PostCSS processes CSS with standard and custom plugins (see `postcss.config.js`).
Key Plugins:
- `postcss-advanced-variables` - Sass-like `@import`, `@mixin`, `@include`, `@if`, `@for`, `@each`
- `lib/iff.js` - Custom `iff()` function for conditional values
- `lib/responsive-font-size.js` - `responsive-font-size()` function for fluid typography
- `postcss-nesting` - CSS nesting support
- `postcss-preset-env` - Modern CSS features (custom media queries enabled)
- `postcss-rem` - Automatic px to rem conversion. Provides `rem-convert()` function

### CSS Variables
CSS variables are defined in `source/00-config/vars`.

### Mixins
`postcss-advanced-variables` allows for Sass-like mixins. Mixins are located in `source/00-config/mixins/`.
Project configuration allows shorthand imports: `@import "mixins";` resolves to `/source/00-config/mixins.css`.

### Linting
- Stylelint enforces alphabetical property ordering.
- **IMPORTANT**: Linting with Stylelint must pass without errors or warnings for any CSS task to be considered complete

## CSS Styleguide
### Class naming
- Use **kebab-case** for CSS class names, NOT camelCase (even with CSS modules)
  - Example: `.content-type` NOT `.contentType`
- Variations use `--` between base class name and variant name
  - Example: `.component--variation`

### CSS Rules
- ALWAYS use CSS logical properties (e.g., `padding-inline`, `padding-block`) instead of directional properties
- When block-size and inline-size differ, write them separately (never use shorthand):
  ```css
  /* CORRECT */
  padding-block: var(--spacing-2xl);
  padding-inline: var(--spacing-xl);

  /* INCORRECT */
  padding: var(--spacing-2xl) var(--spacing-xl);
  ```
- Order CSS properties alphabetically. CSS custom properties/CSS variables are listed first, followed by all other CSS properties.
- Use existing CSS variables where possible

### Breakpoints
Defined in `source/00-config/vars/breakpoints.css` using custom media queries:
```css
@media (--mobile) {}      /* >= 380px */
@media (--tablet) {}      /* >= 768px */
@media (--desktop) {}     /* >= 1024px */
@media (--desktop-lg) {}  /* >= 1440px */
```
Use existing media queries where relevant. Otherwise, use the modern breakpoint syntax:

BEST
```css
@media (--desktop) {}
```
ACCEPTABLE
```css
@media (width >= 1024px) {}
```
AVOID
```css
@media (min-width: 1024px) {}
```

## Example CSS Structure
```css
@layer components {
  .wrapper {
    --local-var: value;
    background-color: var(--color-surface);
    display: flex;
    padding-block: var(--spacing-md);
    padding-inline: var(--spacing-lg);
  }

  .wrapper--primary {
    background-color: var(--color-primary);
  }

  .title {
    color: var(--color-text);
    font-size: var(--font-size-lg);
  }
}
```
