export interface CharPoolOptions {
  uppercase: boolean;
  lowercase: boolean;
  numbers: boolean;
  symbols: boolean;
  excludeSimilar: boolean;
  excludeAmbiguous: boolean;
  customSymbols?: string;
}

const UPPERCASE = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
const LOWERCASE = "abcdefghijklmnopqrstuvwxyz";
const NUMBERS = "0123456789";
const SYMBOLS = "!@#$%^&*()_+-=[]{}|;:,.<>?/~";
const SIMILAR_CHARS = new Set(["1", "I", "i", "L", "l", "0", "O", "o"]);
const AMBIGUOUS_SYMBOLS = new Set([
  "(", ")", "[", "]", "{", "}", "|", "/", "\\", "`", "~",
  ";", ":", "'", '"', ",", ".", "<", ">", "?",
]);

export function buildCharPool(opts: CharPoolOptions): string {
  let pool = "";

  if (opts.uppercase) pool += UPPERCASE;
  if (opts.lowercase) pool += LOWERCASE;
  if (opts.numbers) pool += NUMBERS;
  if (opts.symbols) pool += opts.customSymbols ?? SYMBOLS;

  if (opts.excludeSimilar) {
    pool = [...pool].filter((c) => !SIMILAR_CHARS.has(c)).join("");
  }
  if (opts.excludeAmbiguous) {
    pool = [...pool].filter((c) => !AMBIGUOUS_SYMBOLS.has(c)).join("");
  }

  return pool;
}

function randInt(max: number): number {
  const range = 256 - (256 % max);
  const buf = new Uint8Array(1);
  let value: number;
  do {
    crypto.getRandomValues(buf);
    value = buf[0];
  } while (value >= range);
  return value % max;
}

export function generatePassword(length: number, pool: string): string {
  if (pool.length === 0) return "";
  const result = new Array(length);
  for (let i = 0; i < length; i++) {
    result[i] = pool[randInt(pool.length)];
  }
  return result.join("");
}

export function generateBatch(
  count: number,
  length: number,
  pool: string
): string[] {
  const passwords: string[] = new Array(count);
  for (let i = 0; i < count; i++) {
    passwords[i] = generatePassword(length, pool);
  }
  return passwords;
}
