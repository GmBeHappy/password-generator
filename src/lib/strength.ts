export type StrengthLevel = "weak" | "fair" | "strong" | "very-strong";

export interface StrengthResult {
  level: StrengthLevel;
  percentage: number;
}

export function calculateStrength(
  poolSize: number,
  length: number
): StrengthResult {
  if (poolSize === 0 || length === 0) {
    return { level: "weak", percentage: 0 };
  }

  const entropy = Math.log2(Math.pow(poolSize, length));

  let level: StrengthLevel;
  if (entropy < 40) level = "weak";
  else if (entropy < 60) level = "fair";
  else if (entropy < 80) level = "strong";
  else level = "very-strong";

  const percentage = Math.min(100, Math.round((entropy / 128) * 100));

  return { level, percentage };
}
