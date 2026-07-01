"use client";

import { useState, useCallback } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Copy, Check, RefreshCw } from "lucide-react";
import styles from "./password-row.module.css";

interface PasswordRowProps {
  password: string;
  index: number;
  onRegenerate: () => void;
}

export default function PasswordRow({ password, index, onRegenerate }: PasswordRowProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(password);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
    }
  }, [password]);

  return (
    <div className={styles.row}>
      <span className={styles.password}>
        {password}
      </span>
      <AnimatePresence mode="wait">
        {copied ? (
          <motion.button
            key="check"
            className={`${styles.copyButton} ${styles.copied}`}
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.5, opacity: 0 }}
            transition={{ duration: 0.2 }}
            type="button"
            aria-label="Copied"
          >
            <Check size={16} />
          </motion.button>
        ) : (
          <motion.button
            key="copy"
            className={styles.copyButton}
            onClick={handleCopy}
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.5, opacity: 0 }}
            transition={{ duration: 0.2 }}
            type="button"
            aria-label={`Copy password ${index + 1}`}
          >
            <Copy size={16} />
          </motion.button>
        )}
      </AnimatePresence>
      <button
        className={styles.copyButton}
        onClick={onRegenerate}
        aria-label="Generate new password"
        type="button"
      >
        <motion.span
          style={{ display: "flex" }}
          whileHover={{ rotate: 360 }}
          transition={{ duration: 0.4, ease: "easeInOut" as const }}
        >
          <RefreshCw size={16} />
        </motion.span>
      </button>
    </div>
  );
}
