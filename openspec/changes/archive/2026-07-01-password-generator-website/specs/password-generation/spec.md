## Overview

Core password generation engine that produces cryptographically secure random passwords based on user-configurable parameters. Runs entirely client-side using `crypto.getRandomValues`. Supports single and batch generation modes.

## Functional Requirements

### FR-01: Character Type Selection
- The generator MUST accept independent boolean toggles for: uppercase (A-Z), lowercase (a-z), numbers (0-9), symbols (default set: `!@#$%^&*()_+-=[]{}|;:,.<>?/~`)
- At least one character type MUST be selected; the generator MUST NOT produce output if all types are disabled
- Symbol set MAY be overridden with a custom character string

### FR-02: Password Length
- The generator MUST accept a length parameter in the range 6–4096 inclusive
- Values outside this range MUST be clamped to the nearest valid boundary
- Default length MUST be 16

### FR-03: Cryptographic Randomness
- Every generated password character MUST be selected using `crypto.getRandomValues`
- The generator MUST NOT use `Math.random()` or any non-cryptographic PRNG
- Each byte from the random buffer MUST be mapped uniformly to the chosen character pool; modulo bias MUST be mitigated via rejection sampling

### FR-04: Batch Generation
- The generator MUST accept an amount parameter in the range 1–16 inclusive
- Each password in the batch MUST be generated independently with fresh random values
- Default amount MUST be 1

### FR-05: Similar Character Exclusion
- When enabled, the generator MUST exclude: `1`, `I`, `i`, `L`, `l`, `0`, `O`, `o`
- Exclusion MUST apply after character type selection; remaining pool may be empty

### FR-06: Ambiguous Symbol Exclusion
- When enabled, the generator MUST exclude: `(`, `)`, `[`, `]`, `{`, `}`, `|`, `/`, `\`, `` ` ``, `~`, `;`, `:`, `'`, `"`, `,`, `.`, `<`, `>`, `?`
- The remaining symbol set after exclusion MUST still be valid for generation (at minimum `!@#$%^&*_-+=` should survive)

### FR-07: Settings Encoding
- Generation settings (length, character types, exclusions, amount) MUST be encodable to a compact URL-safe string and decodable back without loss
- The encoding MUST be deterministic: same input settings produce the same encoded string
- Encoding MUST NOT include generated password values

## Performance Requirements

### PR-01: Generation Speed
- A single 16-character password MUST generate in under 1ms on average
- A batch of 16 passwords at 128 characters each MUST generate in under 50ms on average

## Edge Cases

- All character types disabled: return empty array or single empty string (no crash)
- Length set to 0 or below: clamp to minimum 6
- Pool reduced to 1 character after exclusions: still generate (repeated character is acceptable)
- Amount 0: return empty array
- Extreme length (4096): must complete without stack overflow or out-of-memory
