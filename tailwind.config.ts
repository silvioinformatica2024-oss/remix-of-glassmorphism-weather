import type { Config } from "tailwindcss";

export default {
  darkMode: ["class"],
  content: ["./pages/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}", "./app/**/*.{ts,tsx}", "./src/**/*.{ts,tsx}"],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      fontFamily: {
        sans: ["Inter", "system-ui", "sans-serif"],
      },
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        sidebar: {
          DEFAULT: "hsl(var(--sidebar-background))",
          foreground: "hsl(var(--sidebar-foreground))",
          primary: "hsl(var(--sidebar-primary))",
          "primary-foreground": "hsl(var(--sidebar-primary-foreground))",
          accent: "hsl(var(--sidebar-accent))",
          "accent-foreground": "hsl(var(--sidebar-accent-foreground))",
          border: "hsl(var(--sidebar-border))",
          ring: "hsl(var(--sidebar-ring))",
        },
        glass: {
          DEFAULT: "hsl(var(--glass-bg))",
          strong: "hsl(var(--glass-bg-strong))",
          border: "hsl(var(--glass-border))",
        },
        nav: {
          DEFAULT: "hsl(var(--nav-bg))",
          icon: "hsl(var(--nav-icon))",
        },
        fab: {
          DEFAULT: "hsl(var(--fab-bg))",
        },
        sky: {
          top: "hsl(var(--sky-top))",
          mid: "hsl(var(--sky-mid))",
          bottom: "hsl(var(--sky-bottom))",
        },
        sun: {
          core: "hsl(var(--sun-core))",
          edge: "hsl(var(--sun-edge))",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
        widget: "40px",
        card: "24px",
        pill: "50px",
      },
      boxShadow: {
        widget: "var(--shadow-widget)",
        "glass-card": "var(--shadow-card)",
        fab: "var(--shadow-fab)",
        sun: "var(--shadow-sun)",
      },
      backdropBlur: {
        glass: "var(--glass-blur)",
        "glass-xl": "var(--glass-blur-xl)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
        "sun-pulse": {
          "0%, 100%": { boxShadow: "0 0 30px 8px hsla(40,100%,60%,0.4)" },
          "50%": { boxShadow: "0 0 50px 12px hsla(40,100%,60%,0.6)" },
        },
        "float": {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-6px)" },
        },
        "drift-slow": {
          "0%, 100%": { transform: "translateX(0)" },
          "50%": { transform: "translateX(-30px)" },
        },
        "drift-med": {
          "0%, 100%": { transform: "translateX(0)" },
          "50%": { transform: "translateX(25px)" },
        },
        "drift-fast": {
          "0%, 100%": { transform: "translateX(0)" },
          "50%": { transform: "translateX(-18px)" },
        },
        "rain-fall": {
          "0%": { transform: "translateY(-20px)", opacity: "1" },
          "100%": { transform: "translateY(600px)", opacity: "0.3" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "sun-pulse": "sun-pulse 3s ease-in-out infinite",
        "float": "float 4s ease-in-out infinite",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;
