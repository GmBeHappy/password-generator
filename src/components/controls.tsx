"use client";

import { motion } from "motion/react";
import * as Switch from "@radix-ui/react-switch";
import type { Settings } from "@/lib/encoding";
import styles from "./controls.module.css";

interface ControlsProps {
  settings: Settings;
  onChange: (partial: Partial<Settings>) => void;
}

const container = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.06 },
  },
};

const item = {
  hidden: { opacity: 0, y: 12 },
  show: { opacity: 1, y: 0, transition: { duration: 0.35, ease: "easeOut" as const } },
};

export default function Controls({ settings, onChange }: ControlsProps) {
  return (
    <motion.div className={styles.controls} variants={container} initial="hidden" animate="show">
      <motion.div className={styles.group} variants={item}>
        <span className={styles.groupLabel}>Length: {settings.length}</span>
        <div className={styles.shortcuts}>
          {[8, 16, 24, 32, 64, 128, 256, 512].map((n) => (
            <motion.button
              key={n}
              className={`${styles.shortcutButton} ${settings.length === n ? styles.shortcutActive : ""}`}
              onClick={() => onChange({ length: n })}
              type="button"
              whileTap={{ scale: 0.92 }}
            >
              {n}
            </motion.button>
          ))}
          <motion.input
            type="number"
            className={styles.shortcutInput}
            value={settings.length}
            onChange={(e) => {
              const v = parseInt(e.target.value, 10);
              if (!isNaN(v)) {
                onChange({ length: Math.min(4096, Math.max(6, v)) });
              }
            }}
            min={6}
            max={4096}
            aria-label="Custom password length"
            placeholder="Custom"
            whileFocus={{ scale: 1.02 }}
          />
        </div>
      </motion.div>

      <motion.div className={styles.group} variants={item}>
        <span className={styles.groupLabel}>Character Types</span>
        <div className={styles.toggleRow}>
          <label className={styles.switchLabel}>
            <Switch.Root
              className={styles.switchRoot}
              checked={settings.uppercase}
              onCheckedChange={(v) => onChange({ uppercase: v })}
            >
              <Switch.Thumb className={styles.switchThumb} />
            </Switch.Root>
            ABC
          </label>
          <label className={styles.switchLabel}>
            <Switch.Root
              className={styles.switchRoot}
              checked={settings.lowercase}
              onCheckedChange={(v) => onChange({ lowercase: v })}
            >
              <Switch.Thumb className={styles.switchThumb} />
            </Switch.Root>
            abc
          </label>
          <label className={styles.switchLabel}>
            <Switch.Root
              className={styles.switchRoot}
              checked={settings.numbers}
              onCheckedChange={(v) => onChange({ numbers: v })}
            >
              <Switch.Thumb className={styles.switchThumb} />
            </Switch.Root>
            123
          </label>
          <label className={styles.switchLabel}>
            <Switch.Root
              className={styles.switchRoot}
              checked={settings.symbols}
              onCheckedChange={(v) => onChange({ symbols: v })}
            >
              <Switch.Thumb className={styles.switchThumb} />
            </Switch.Root>
            $?%
          </label>
        </div>
      </motion.div>

      <motion.div className={styles.group} variants={item}>
        <span className={styles.groupLabel}>Exclusions</span>
        <div className={styles.exclusionRow}>
          <div className={styles.exclusionItem}>
            <label className={styles.switchLabel}>
              <Switch.Root
                className={styles.switchRoot}
                checked={settings.excludeSimilar}
                onCheckedChange={(v) => onChange({ excludeSimilar: v })}
              >
                <Switch.Thumb className={styles.switchThumb} />
              </Switch.Root>
              Exclude similar characters
            </label>
            <div className={styles.charHint}>1, I, i, L, l, 0, O, o</div>
          </div>
          <div className={styles.exclusionItem}>
            <label className={styles.switchLabel}>
              <Switch.Root
                className={styles.switchRoot}
                checked={settings.excludeAmbiguous}
                onCheckedChange={(v) => onChange({ excludeAmbiguous: v })}
              >
                <Switch.Thumb className={styles.switchThumb} />
              </Switch.Root>
              Exclude ambiguous symbols
            </label>
            <div className={styles.charHint}>&#40; &#41; &#91; &#93; &#123; &#125; / \ | ` ~ ; : &#39; &quot; , . &lt; &gt; ?</div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}
