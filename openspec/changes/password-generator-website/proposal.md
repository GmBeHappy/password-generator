## Why

Users need strong, random passwords to protect their online accounts, but most people default to weak, predictable patterns. A client-side password generator provides instant, secure passwords without relying on third-party servers or storing any data. This project creates a modern, fast, and visually polished alternative to existing tools like passgen.co, built with a current stack (Next.js + Bun + Radix UI) and a dark-mode-first design.

## What Changes

- New Next.js web application bootstrapped with Bun and TypeScript
- Client-side password generation engine with cryptographic randomness (`crypto.getRandomValues`)
- Customizable options: password length (6-4096), uppercase, lowercase, numbers, symbols
- Multiple passwords generated at once (1-16)
- Exclude similar-looking characters (e.g., 1, l, I, 0, O) and ambiguous symbols
- One-click copy to clipboard with visual confirmation feedback
- Permalink/shareable URL reflecting current settings for saving/sharing configurations
- Dark mode design system built on Radix UI primitives with responsive layout
- No backend, no data collection, no signup — everything runs client-side

## Capabilities

### New Capabilities
- `password-generation`: Core password generation engine supporting configurable length (6-4096), character type selection (uppercase, lowercase, numbers, symbols), exclusion of similar characters and ambiguous symbols, batch generation (1-16 passwords), and cryptographic randomness via `crypto.getRandomValues`.
- `password-controls`: UI controls for configuring generation parameters — length slider/input, character type toggle switches, exclusion options, and amount selector. Controls update the password output in real time.
- `password-display`: Display of generated passwords with individual copy-to-clipboard buttons, visual copy confirmation, and a permalink button that encodes current settings into the URL for sharing.
- `design-system`: Dark-mode-first design system using Radix UI primitives (Slider, Toggle, Switch, Tooltip, etc.), CSS variables for theming, and responsive layout supporting desktop and mobile.

### Modified Capabilities
<!-- No existing capabilities to modify -->

## Impact

- New project: Next.js app router with TypeScript, Bun as package manager/runtime
- Radix UI for accessible, unstyled primitives
- No API routes or server-side logic — fully static/client-side
- CSS Modules or Tailwind CSS for styling (to be decided in design phase)
- No database, no authentication, no external dependencies outside of Radix UI and Next.js
