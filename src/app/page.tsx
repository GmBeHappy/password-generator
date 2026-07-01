"use client";

import { motion } from "motion/react";
import PasswordGenerator from "@/components/password-generator";
import ThemeToggle from "@/components/theme-toggle";
import { Lock } from "lucide-react";

export default function Home() {
  return (
    <>
      <ThemeToggle />
      <main style={{ display: "grid", placeItems: "center", minHeight: "100vh", paddingBottom: 60 }}>
        <PasswordGenerator />
      </main>
      <motion.footer
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6, duration: 0.4 }}
        style={{
          position: "fixed",
          bottom: 0,
          left: 0,
          right: 0,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: "var(--spacing-md)",
          padding: "12px var(--spacing-md)",
          background: "var(--color-surface)",
          borderTop: "1px solid var(--color-border)",
          fontSize: "var(--font-size-xs)",
          color: "var(--color-text-muted)",
          zIndex: 5,
        }}
      >
        <span style={{ color: "var(--color-strength-strong)", display: "flex" }}>
          <Lock size={14} />
        </span>
        <span>Everything runs client-side. We never store or see your passwords.</span>
        <a
          href="/terms"
          style={{
            color: "var(--color-accent)",
            textDecoration: "none",
            fontWeight: 500,
          }}
        >
          Terms
        </a>
      </motion.footer>
    </>
  );
}
