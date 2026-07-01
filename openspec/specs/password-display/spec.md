## Overview

Displays generated passwords in a readable, scannable format with individual copy-to-clipboard actions and a shareable permalink. Provides clear visual feedback on user interactions.

## Functional Requirements

### FR-01: Password List Display
- MUST render each generated password on its own line/card with a monospace font
- Passwords MUST be displayed in full (no truncation), with line-wrapping for long passwords
- An empty state MUST show when no passwords have been generated yet (e.g., loading state or initial placeholder)
- Long password lists (>8 passwords) MUST be scrollable within the viewport

### FR-02: Copy to Clipboard
- Each password row MUST have a copy button (icon + optional label)
- Clicking copy MUST write the password to the system clipboard via `navigator.clipboard.writeText`
- On successful copy, the button MUST show a visual confirmation (icon swap to checkmark + color change) for 2 seconds, then revert
- If clipboard API is unavailable (HTTP context), the button MUST be hidden or disabled with a tooltip explaining why

### FR-03: Batch Copy
- When multiple passwords are generated (>1), a "Copy all" button MUST appear above or below the list
- Clicking "Copy all" MUST join passwords with newlines and copy to clipboard with the same visual confirmation feedback

### FR-04: Permalink
- A permalink button or icon MUST be present that encodes the current settings into a URL
- Clicking or focusing the permalink MUST copy the URL to clipboard and show confirmation feedback
- The URL, when visited, MUST restore the exact same settings and regenerate passwords
- The permalink MUST NOT include generated password data in the URL

### FR-05: Strength Indicator
- Each password or the primary password MUST show a visual strength indicator (color-coded bar or label)
- Strength calculation MUST consider: length, character set diversity, and presence of all four character types
- Strength levels: Weak (red/orange), Fair (yellow), Strong (green), Very Strong (dark green)
- Indicator MUST update in real time as password options change

### FR-06: Responsive Behavior
- On mobile, each password row MUST accommodate full-length passwords without horizontal scroll
- Copy buttons MUST have sufficient touch targets (minimum 44x44px)
- Font size MUST remain readable at all viewport widths

## Accessibility

- Copy buttons MUST have `aria-label` indicating which password is being copied
- Confirmation feedback MUST be announced to screen readers via `aria-live` region
- Password text MUST be selectable by the user but NOT marked as `aria-hidden`

## State Dependencies

- Reads from: generated passwords array, current settings (for permalink)
- Writes to: clipboard (side effect), permalink URL
