import type { CharPoolOptions } from "./password";

export interface Settings extends CharPoolOptions {
  length: number;
  amount: number;
}

const CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_";

export const DEFAULTS: Settings = {
  length: 16,
  amount: 1,
  uppercase: true,
  lowercase: true,
  numbers: true,
  symbols: true,
  excludeSimilar: false,
  excludeAmbiguous: false,
};

export function encodeSettings(settings: Settings): string {
  let bits = 0;

  bits |= settings.length & 0xfff;
  bits |= (settings.amount & 0xf) << 12;
  bits |= ((settings.uppercase ? 1 : 0) |
           (settings.lowercase ? 2 : 0) |
           (settings.numbers ? 4 : 0) |
           (settings.symbols ? 8 : 0)) << 16;
  bits |= (settings.excludeSimilar ? 1 : 0) << 20;
  bits |= (settings.excludeAmbiguous ? 1 : 0) << 21;

  let encoded = "";
  for (let i = 0; i < 4; i++) {
    encoded = CHARS[bits & 0x3f] + encoded;
    bits >>>= 6;
  }

  return encoded;
}

export function decodeSettings(encoded: string): Settings {
  let bits = 0;
  const safe = typeof encoded === "string" ? encoded.slice(0, 4) : "";

  for (const ch of safe) {
    const idx = CHARS.indexOf(ch);
    bits = (bits << 6) | (idx === -1 ? 0 : idx);
  }

  const length = clamp(bits & 0xfff, 6, 4096, DEFAULTS.length);
  const amount = clamp((bits >> 12) & 0xf, 1, 16, DEFAULTS.amount);
  const charBits = (bits >> 16) & 0xf;
  const uppercase = !!(charBits & 1);
  const lowercase = !!(charBits & 2);
  const numbers = !!(charBits & 4);
  const symbols = !!(charBits & 8);
  const excludeSimilar = !!((bits >> 20) & 1);
  const excludeAmbiguous = !!((bits >> 21) & 1);

  const charEnabled = [uppercase, lowercase, numbers, symbols].some(Boolean);

  return {
    length,
    amount,
    uppercase: charEnabled ? uppercase : DEFAULTS.uppercase,
    lowercase: charEnabled ? lowercase : DEFAULTS.lowercase,
    numbers: charEnabled ? numbers : DEFAULTS.numbers,
    symbols: charEnabled ? symbols : DEFAULTS.symbols,
    excludeSimilar,
    excludeAmbiguous,
  };
}

function clamp(value: number, min: number, max: number, fallback: number): number {
  if (isNaN(value) || value < min) return fallback;
  if (value > max) return max;
  return value;
}
