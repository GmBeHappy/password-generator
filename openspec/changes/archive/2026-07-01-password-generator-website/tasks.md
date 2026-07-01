## Implementation Tasks

### Phase 1: Project Setup

- [x] **T1** Scaffold Next.js app with Bun: `bun create next-app@latest passgen --typescript --tailwind=false --eslint --app --src-dir --import-alias="@/*"`
- [x] **T2** Install dependencies: `bun add @radix-ui/react-slider @radix-ui/react-switch @radix-ui/react-tooltip @radix-ui/react-visually-hidden`
- [x] **T3** Configure `next.config.ts`: set `output: "export"` for static export, enable strict TypeScript
- [x] **T4** Add `app/globals.css` with CSS custom properties (colors, typography scale, spacing), CSS reset, `color-scheme: dark`, and body background
- [x] **T5** Add `app/layout.tsx` with metadata (title: "Password Generator", description), global styles import, and `<body>` with dark background class

### Phase 2: Core Library

- [x] **T6** Implement `src/lib/password.ts`: `buildCharPool(opts)` — assemble character set from type flags minus exclusions
- [x] **T7** Implement `src/lib/password.ts`: `generatePassword(length, pool)` — crypto.getRandomValues with rejection sampling for modulo bias
- [x] **T8** Implement `src/lib/password.ts`: `generateBatch(count, length, pool)` — call generatePassword N times, return `string[]`
- [x] **T9** Implement `src/lib/strength.ts`: entropy calculation (`poolSize^length`), return level (weak/fair/strong/very-strong) and percentage
- [x] **T10** Implement `src/lib/encoding.ts`: `encodeSettings(config)` → URL-safe string (22 bits → 4 base64url chars)
- [x] **T11** Implement `src/lib/encoding.ts`: `decodeSettings(encoded)` → config object with validation and defaults fallback

### Phase 3: Hooks

- [x] **T12** Implement `src/hooks/use-password-generator.ts`: config state (useState), URL sync via `useSearchParams`/`useRouter` on mount and change
- [x] **T13** Implement `src/hooks/use-password-generator.ts`: derived char pool (useMemo), derived passwords array (useMemo), expose `regenerate()`

### Phase 4: UI Components

- [x] **T14** Create `src/components/icons.tsx`: CopyIcon, CheckIcon, LinkIcon as inline SVG components inheriting `currentColor`
- [x] **T15** Create `src/components/controls.tsx` + `controls.module.css`: LengthSlider (Radix Slider) + LengthInput (number input), bidirectional sync
- [x] **T16** Add to controls: AmountSelector (slider or input, range 1–16)
- [x] **T17** Add to controls: CharTypeToggles — 4x Radix Switch components (uppercase, lowercase, numbers, symbols), enforce at least one active
- [x] **T18** Add to controls: ExclusionToggles — 2x Radix Switch with character hint labels for "similar" and "ambiguous"
- [x] **T19** Create `src/components/strength-bar.tsx` + `strength-bar.module.css`: colored bar (red → yellow → green → dark green), level label
- [x] **T20** Create `src/components/password-row.tsx` + `password-row.module.css`: monospace password text, copy button with CheckIcon confirmation (2s timeout), clipboard fallback handling
- [x] **T21** Create `src/components/password-list.tsx` + `password-list.module.css`: map passwords to PasswordRow, CopyAllButton (visible when >1), PermalinkButton
- [x] **T22** Create `src/components/password-generator.tsx` + `password-generator.module.css`: assemble Controls + StrengthBar + PasswordList, pass hook data down
- [x] **T23** Implement `src/app/page.tsx`: render `<PasswordGenerator />` client component inside centered layout
- [x] **T24** Add `"use client"` directive to all client components (PasswordGenerator, Controls, PasswordList, PasswordRow, StrengthBar)

### Phase 6: Polish

- [x] **T25** Style Radix components via CSS Modules targeting `[data-state]`, `[data-disabled]` attributes — hover/active/focus states
- [x] **T26** Add `aria-label` to copy buttons, `aria-live="polite"` region for clipboard confirmation
- [x] **T27** Responsive testing: verify layout at 320px, 768px, 1440px — controls stack vertically on mobile
- [x] **T28** Test edge cases: max length (4096), batch of 16 at 128 chars, all toggles off, clipboard unavailable, encoded URL load
- [x] **T29** Verify `bun run build` succeeds with no errors for static export
- [x] **T30** Verify `bun run dev` runs without errors, all interactions work end-to-end

### Dependencies between tasks

```
Phase 1 (T1-T5) → Phase 2 (T6-T11) → Phase 3 (T12-T13) → Phase 4 (T14-T22) → Phase 5 (T23-T24) → Phase 6 (T25-T30)
```

Within phases, tasks can be done in any order except where noted.
