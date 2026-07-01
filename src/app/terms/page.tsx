"use client";

import ThemeToggle from "@/components/theme-toggle";

export default function Terms() {
  return (
    <div
      style={{
        maxWidth: 640,
        margin: "0 auto",
        padding: "var(--spacing-xl) var(--spacing-md)",
        fontFamily: "var(--font-sans)",
        color: "var(--color-text-primary)",
        lineHeight: 1.7,
      }}
    >
      <ThemeToggle />
      <h1 style={{ fontSize: "var(--font-size-2xl)", fontWeight: 700, marginBottom: "var(--spacing-md)" }}>
        Terms of Service
      </h1>
      <p style={{ color: "var(--color-text-secondary)", marginBottom: "var(--spacing-xl)" }}>
        Last updated: July 1, 2026
      </p>

      <h2 style={{ fontSize: "var(--font-size-lg)", fontWeight: 600, marginTop: "var(--spacing-lg)", marginBottom: "var(--spacing-sm)" }}>
        Privacy & Data
      </h2>
      <p style={{ marginBottom: "var(--spacing-md)" }}>
        We do <strong>not</strong> collect, store, or transmit any of your data. All password generation
        runs entirely in your browser using client-side JavaScript. No passwords, settings, or personal information
        ever leave your device.
      </p>
      <p style={{ marginBottom: "var(--spacing-md)" }}>
        This website has no tracking, no analytics, no cookies, and no third-party scripts.
        Everything you do here stays on your machine.
      </p>

      <h2 style={{ fontSize: "var(--font-size-lg)", fontWeight: 600, marginTop: "var(--spacing-lg)", marginBottom: "var(--spacing-sm)" }}>
        Security
      </h2>
      <p style={{ marginBottom: "var(--spacing-md)" }}>
        Passwords are generated using <code>crypto.getRandomValues()</code>, a cryptographically secure
        random number generator built into modern browsers. This is the same standard used by password managers
        and security tools.
      </p>
      <p style={{ marginBottom: "var(--spacing-md)" }}>
        While our generator produces strong passwords, the security of your accounts ultimately depends on
        you. We recommend using a unique password for every service and pairing it with two-factor authentication
        where available.
      </p>

      <h2 style={{ fontSize: "var(--font-size-lg)", fontWeight: 600, marginTop: "var(--spacing-lg)", marginBottom: "var(--spacing-sm)" }}>
        Disclaimer
      </h2>
      <p style={{ marginBottom: "var(--spacing-md)" }}>
        This tool is provided as-is without warranty of any kind. Use at your own discretion. We are not responsible
        for any security breaches resulting from the use of generated passwords.
      </p>

      <div style={{ marginTop: "var(--spacing-2xl)" }}>
        <a
          href="/"
          style={{
            color: "var(--color-accent)",
            textDecoration: "none",
            fontSize: "var(--font-size-sm)",
          }}
        >
          Back to generator
        </a>
      </div>
    </div>
  );
}
