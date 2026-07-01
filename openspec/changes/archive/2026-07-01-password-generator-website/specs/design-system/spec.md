## Overview

A dark-mode-first design system providing the visual foundation for the password generator application. Uses Radix UI primitives for interactive components, CSS custom properties for theming, and a responsive layout that adapts from mobile to desktop.

## Functional Requirements

### FR-01: Color Theme
- MUST define a dark-mode-first color palette via CSS custom properties (`--color-*`)
- Background: near-black or very dark gray (e.g., `#0a0a0f` or `#111118`)
- Surface/card: slightly lighter dark (e.g., `#1a1a24`)
- Primary accent: a vibrant color (e.g., cyan, emerald, or purple) used for interactive elements, focus rings, and the strength indicator
- Text primary: high-contrast light color (e.g., `#f0f0f5`)
- Text secondary: lower-contrast for labels and hints (e.g., `#8888a0`)
- Border: subtle outline for cards and inputs (e.g., `#2a2a3a`)
- Error/warning colors MUST be distinct from the accent and accessible

### FR-02: Typography
- MUST define a type scale using CSS custom properties (`--font-size-*`, `--line-height-*`)
- Password display MUST use a monospace font (system: `ui-monospace, SFMono-Regular, monospace`)
- Body text MUST use a system sans-serif stack
- Heading and label sizes MUST have clear hierarchy

### FR-03: Radix UI Integration
- MUST use Radix UI primitives for interactive components: Slider, Toggle (or ToggleGroup), Switch, Tooltip
- Components MUST be styled via CSS/className (not inline styles), wrapping Radix primitives
- Radix Dialog or Popover MAY be used for modals if needed
- Radix VisuallyHidden MUST be used for accessible labels where visual labels are replaced by icons

### FR-04: Layout
- The app MUST use a centered single-column layout with a max-width of 640px
- The layout MUST work at viewport widths from 320px (small mobile) to 2560px (large desktop)
- Padding: 16px on mobile, 24px on desktop
- Controls section and display section MUST have distinct visual separation (border, background contrast, or spacing)

### FR-05: Interactive States
- All interactive elements MUST have visible focus rings (using Radix default or custom `:focus-visible` styles)
- Buttons and toggles MUST have hover and active/pressed states with visual feedback
- Disabled states MUST reduce opacity and change cursor to `not-allowed`
- Transitions on color/background changes SHOULD be smooth (150-200ms)

### FR-06: Icons
- Icons for copy, checkmark, link, and any other actions MUST be provided as inline SVG components
- No icon font or external icon library dependency
- Icons MUST inherit currentColor for theming

### FR-07: Dark Mode Only
- The application MUST render exclusively in dark mode
- No light mode toggle required
- `color-scheme: dark` MUST be set on the root element for native browser UI consistency

## Non-functional Requirements

### NFR-01: Performance
- CSS bundle size SHOULD be under 30KB gzipped
- No layout shift during hydration or client-side rendering
- No flash of unstyled content (FOUC)

### NFR-02: Browser Support
- MUST support latest 2 versions of Chrome, Firefox, Safari, and Edge
- MUST gracefully handle missing features (e.g., `navigator.clipboard` in insecure contexts)

## Implementation Constraints

- No CSS-in-JS runtime libraries (e.g., styled-components, Emotion)
- CSS Modules or Tailwind CSS — decided in design phase
- Radix UI components imported individually (tree-shakeable)
