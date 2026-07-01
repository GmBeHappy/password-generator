## Overview

Interactive UI controls that allow users to configure password generation parameters. Controls update application state and trigger password re-generation in real time. Built with Radix UI primitives for accessibility.

## Functional Requirements

### FR-01: Length Control
- MUST render a Slider (Radix Slider) AND a numeric text input for password length
- Slider range: 6–4096, step 1
- Slider thumb position MUST sync bidirectionally with the numeric input value
- Numeric input MUST validate: clamp out-of-range values, reject non-numeric input
- Default length: 16

### FR-02: Amount Selector
- MUST render a control for selecting number of passwords (1–16)
- May be a Slider, numeric input, or dropdown
- Default amount: 1

### FR-03: Character Type Toggles
- MUST render a labeled Toggle or Switch for each character type: Uppercase (ABC), Lowercase (abc), Numbers (123), Symbols ($?%)
- Toggles MUST be keyboard-accessible and screen-reader friendly
- At least one toggle MUST always remain enabled; disabling the last active toggle MUST re-enable it
- Default: all four enabled

### FR-04: Exclusion Toggles
- MUST render a labeled Toggle/Switch for "Exclude similar characters"
- MUST render a labeled Toggle/Switch for "Exclude ambiguous symbols"
- Both MUST be off by default
- Exclusion switches MUST show inline labels listing affected characters (e.g., "1, I, i, L, l, 0, O, o")

### FR-05: Real-time Update
- Changing any control value MUST immediately regenerate passwords
- Updates MUST be debounced at the generation level if needed for performance, but control values MUST update optimistically without delay
- When typing in the numeric length input, passwords MUST regenerate on each valid keystroke (no submit required)

### FR-06: Layout
- Controls MUST be arranged in a logical top-to-bottom order: Length → Amount → Character Types → Exclusions
- On mobile (<768px), controls MUST stack vertically with full width
- On desktop, controls MAY use a side-by-side layout while maintaining readability

### FR-07: Accessibility
- All controls MUST have visible labels
- Slider MUST support arrow key adjustments
- Focus order MUST follow visual layout
- Color MUST NOT be the sole indicator of toggle state

## State Dependencies

- Reads from: password generation config state (length, amount, character types, exclusions)
- Writes to: same config state, triggering re-generation
- URL sync: settings state MUST be reflected in URL hash/query string on change
