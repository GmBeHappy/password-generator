"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Sun, Moon } from "lucide-react";
import styles from "./theme-toggle.module.css";

export default function ThemeToggle() {
  const [theme, setTheme] = useState<"dark" | "light">("dark");

  useEffect(() => {
    const stored = document.documentElement.getAttribute("data-theme");
    setTheme(stored === "light" ? "light" : "dark");
  }, []);

  const toggleTheme = useCallback(() => {
    const next = theme === "dark" ? "light" : "dark";
    document.documentElement.setAttribute("data-theme", next);
    localStorage.setItem("theme", next);
    setTheme(next);
  }, [theme]);

  return (
    <motion.button
      className={styles.toggle}
      onClick={toggleTheme}
      aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
      type="button"
      whileTap={{ scale: 0.85 }}
    >
      <AnimatePresence mode="wait">
        {theme === "dark" ? (
          <motion.span
            key="sun"
            style={{ display: "flex" }}
            initial={{ rotate: -90, opacity: 0 }}
            animate={{ rotate: 0, opacity: 1 }}
            exit={{ rotate: 90, opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            <Sun size={16} />
          </motion.span>
        ) : (
          <motion.span
            key="moon"
            style={{ display: "flex" }}
            initial={{ rotate: 90, opacity: 0 }}
            animate={{ rotate: 0, opacity: 1 }}
            exit={{ rotate: -90, opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            <Moon size={16} />
          </motion.span>
        )}
      </AnimatePresence>
    </motion.button>
  );
}
