## Architecture

Single-page Next.js app (App Router) with no backend. All logic runs client-side in a single page component. State managed via React hooks (useState/useReducer) persisted to URL search params.

```
Page (app/page.tsx)
├── PasswordGenerator (client component)
│   ├── Controls (Radix Slider, Switch/ToggleGroup, input)
│   │   ├── LengthSlider + LengthInput
│   │   ├── AmountSelector
│   │   ├── CharTypeToggles (4x)
│   │   └── ExclusionToggles (2x)
│   ├── PasswordList
│   │   ├── PasswordRow (×N) ← copy button, strength bar
│   │   ├── CopyAllButton
│   │   └── PermalinkButton
│   └── usePasswordGenerator (hook)
│       ├── generatePassword(config) → string
│       └── generateBatch(config) → string[]
└── lib/
    ├── password.ts      ← pure generation functions
    ├── encoding.ts      ← settings ↔ URL encode/decode
    └── strength.ts      ← entropy calculation
```

## Stack Decisions

| Concern | Choice | Rationale |
|---|---|---|
| Framework | Next.js 15 (App Router) | Static export possible, no server needed |
| Runtime/PM | Bun | Per user request, faster installs |
| Language | TypeScript (strict) | Type safety for generation config |
| Styling | CSS Modules | No runtime cost, tree-shakeable, spec-compliant "no CSS-in-JS" |
| UI Primitives | Radix UI (individual imports) | Accessible, unstyled, tree-shakeable |
| Icons | Inline SVG components | No dependency, `currentColor` support |
| State | React useState + URL search params | Simple, shareable, no library needed |
| Deployment | Static export (`output: "export"`) | No server needed |

## Component Design

### Password Generation (lib/password.ts)
Pure functions, zero dependencies:
- `buildCharPool(opts: CharPoolOptions): string` — assembles character set from selected types minus exclusions
- `generatePassword(length: number, pool: string): string` — uses `crypto.getRandomValues`, rejection sampling for modulo bias
- `generateBatch(count: number, length: number, pool: string): string[]` — calls generatePassword N times

Rejection sampling approach: request enough random bytes, discard values ≥ pool.length × floor(256 / pool.length), map remainder via modulo. This avoids the `Uint32Array` approach (crypto subtle) and works universally.

### Settings Encoding (lib/encoding.ts)
Compact base64url encoding of a binary config struct:
- Length: 12 bits (6–4096)
- Amount: 4 bits (1–16)
- Char types: 4 bits (uppercase, lowercase, numbers, symbols)
- Exclude similar: 1 bit
- Exclude ambiguous: 1 bit
Total: 22 bits → 4 base64url characters. Decoded on mount from `?s=<encoded>` search param.

### Strength (lib/strength.ts)
Entropy-based calculation:
```
entropy = poolSize^length
```
Returns level (weak/fair/strong/very-strong) and percentage for the bar. No password content analysis needed — derived purely from config params.

### Controls Component
Client component with Radix primitives:
- **LengthSlider**: `<Slider.Root>` with `<Slider.Track>`, `<Slider.Thumb>`. Range 6-4096.
- **LengthInput**: `<input type="number">` styled to match theme. Bidirectional sync with slider via shared state.
- **CharTypeToggles**: Use `<Switch.Root>` or styled button group (Radix ToggleGroup). Layout: horizontal row on desktop.
- **ExclusionToggles**: `<Switch.Root>` with visible character hint labels.

### PasswordList Component
- Each `<PasswordRow>` renders monospace text + copy button
- Copy button uses `navigator.clipboard.writeText` with try/catch for HTTP fallback
- Confirmation state: local `useState` with 2s timeout
- `<CopyAllButton>` visible when `passwords.length > 1`, joins with `\n`
- `<PermalinkButton>` encodes current settings, updates `window.location` / copies URL

### usePasswordGenerator Hook
Central hook managing:
- Config state (Synced with URL search params via `useSearchParams` / `useRouter`)
- Derives passwords via `useMemo` (config → pool → passwords)
- Exposes `regenerate()` for manual trigger if needed

## Data Flow

```
URL search params (source of truth on mount)
  ↓
Config state (useState, initialized from URL)
  ↓ (on change: update URL via router.replace + re-derive)
Char pool (useMemo: config → pool string)
  ↓
Passwords (useMemo: pool × config → string[])
  ↓
PasswordList (render loop)
```

URL sync direction: config change → `router.replace` with encoded settings. On mount, decode from URL. This ensures bookmarks and shared links restore the exact state. Generated passwords are never in the URL.

## File Structure

```
src/
├── app/
│   ├── layout.tsx          ← metadata, global styles, color-scheme: dark
│   ├── page.tsx            ← <PasswordGenerator />
│   └── globals.css         ← CSS custom properties, reset, typography
├── components/
│   ├── password-generator.tsx
│   ├── controls.tsx
│   ├── password-list.tsx
│   ├── password-row.tsx
│   ├── strength-bar.tsx
│   └── icons.tsx           ← CopyIcon, CheckIcon, LinkIcon
├── lib/
│   ├── password.ts
│   ├── encoding.ts
│   └── strength.ts
└── hooks/
    └── use-password-generator.ts
```

## CSS Architecture

CSS Modules strategy:
- `globals.css`: CSS custom properties (colors, fonts, spacing), reset, `color-scheme: dark`
- Each component gets a `.module.css` file importing custom properties via `var()`
- Radix components styled by targeting their data attributes (`[data-state="checked"]`, `[data-disabled]`, etc.)
- No CSS preprocessor needed

## Dependencies

```json
{
  "next": "^15",
  "react": "^19",
  "react-dom": "^19",
  "@radix-ui/react-slider": "^1.x",
  "@radix-ui/react-switch": "^1.x",
  "@radix-ui/react-tooltip": "^1.x",
  "@radix-ui/react-visually-hidden": "^1.x"
}
```

Dev: `typescript`, `@types/react`, `@types/react-dom`.
