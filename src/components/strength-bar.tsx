import { calculateStrength } from "@/lib/strength";
import type { StrengthResult } from "@/lib/strength";
import styles from "./strength-bar.module.css";

interface StrengthBarProps {
  poolSize: number;
  length: number;
}

const LABELS: Record<StrengthResult["level"], string> = {
  weak: "Weak",
  fair: "Fair",
  strong: "Strong",
  "very-strong": "Very Strong",
};

export default function StrengthBar({ poolSize, length }: StrengthBarProps) {
  const { level, percentage } = calculateStrength(poolSize, length);

  return (
    <div className={styles.wrapper}>
      <div className={styles.bar}>
        <div
          className={`${styles.fill} ${styles[level]}`}
          style={{ width: `${percentage}%` }}
        />
      </div>
      <span className={`${styles.label} ${styles[`label${level.charAt(0).toUpperCase() + level.slice(1)}`] || styles.labelWeak}`}>
        {LABELS[level]}
      </span>
    </div>
  );
}
