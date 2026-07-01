"use client";

import { motion } from "motion/react";
import { usePasswordGenerator } from "@/hooks/use-password-generator";
import Controls from "./controls";
import PasswordList from "./password-list";
import styles from "./password-generator.module.css";

export default function PasswordGenerator() {
  const { passwords, settings, update, regenerate } =
    usePasswordGenerator();

  return (
    <motion.div
      className={styles.generator}
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" as const }}
    >
      <motion.div
        className={styles.header}
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1, duration: 0.4 }}
      >
        <h1 className={styles.title}>Password Generator</h1>
        <p className={styles.subtitle}>
          Generate strong, secure passwords with cryptographic randomness
        </p>
      </motion.div>
      <PasswordList passwords={passwords} onRegenerate={regenerate} />
      <Controls settings={settings} onChange={update} />
      <div
        aria-live="polite"
        style={{
          position: "absolute",
          width: 1,
          height: 1,
          padding: 0,
          margin: -1,
          overflow: "hidden",
          clip: "rect(0, 0, 0, 0)",
          whiteSpace: "nowrap",
          borderWidth: 0,
        }}
      />
    </motion.div>
  );
}
