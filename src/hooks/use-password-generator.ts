"use client";

import { useState, useMemo, useCallback, useEffect } from "react";
import {
  buildCharPool,
  generateBatch,
} from "@/lib/password";
import {
  DEFAULTS,
  type Settings,
} from "@/lib/encoding";
import { calculateStrength } from "@/lib/strength";

export function usePasswordGenerator() {
  const [settings, setSettings] = useState<Settings>({ ...DEFAULTS });
  const [mounted, setMounted] = useState(false);
  const [seed, setSeed] = useState(0);

  useEffect(() => {
    setMounted(true);
  }, []);

  const pool = useMemo(() => buildCharPool(settings), [settings]);

  const passwords = useMemo(() => {
    if (!mounted) return [];
    return generateBatch(settings.amount, settings.length, pool);
  }, [mounted, settings.amount, settings.length, pool, seed]);

  const strength = useMemo(
    () => calculateStrength(pool.length, settings.length),
    [pool.length, settings.length]
  );

  const update = useCallback((partial: Partial<Settings>) => {
    setSettings((prev) => {
      const next = { ...prev, ...partial };
      const charEnabled = [next.uppercase, next.lowercase, next.numbers, next.symbols];
      if (!charEnabled.some(Boolean)) {
        next.lowercase = true;
      }
      return next;
    });
  }, []);

  const regenerate = useCallback(() => {
    setSeed((s) => s + 1);
  }, []);

  return {
    passwords,
    strength,
    poolSize: pool.length,
    settings,
    update,
    regenerate,
  };
}
