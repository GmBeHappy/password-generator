"use client";

import PasswordRow from "./password-row";
import styles from "./password-list.module.css";

interface PasswordListProps {
  passwords: string[];
  onRegenerate: () => void;
}

export default function PasswordList({ passwords, onRegenerate }: PasswordListProps) {
  if (passwords.length === 0) {
    return <div className={styles.empty}>Configure options to generate passwords</div>;
  }

  return (
    <div className={styles.list}>
      {passwords.map((pw, i) => (
        <PasswordRow key={`${i}-${pw.slice(0, 4)}`} password={pw} index={i} onRegenerate={onRegenerate} />
      ))}
    </div>
  );
}
