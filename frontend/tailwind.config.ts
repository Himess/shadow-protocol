import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // Shadow Protocol Color Palette
        background: "#0A0A0A",
        card: "#141414",
        "card-hover": "#1a1a1a",
        border: "#2a2a2a",

        // Brand Colors
        gold: {
          DEFAULT: "#F7B731",
          50: "#FEF6E6",
          100: "#FDECCC",
          200: "#FBD999",
          300: "#F9C766",
          400: "#F7B731",
          500: "#E5A520",
          600: "#B38018",
          700: "#815C11",
          800: "#4F380A",
          900: "#1D1404",
        },

        // Status Colors
        success: {
          DEFAULT: "#10B981",
          light: "#34D399",
          dark: "#059669",
        },
        danger: {
          DEFAULT: "#EF4444",
          light: "#F87171",
          dark: "#DC2626",
        },
        warning: {
          DEFAULT: "#F59E0B",
          light: "#FBBF24",
          dark: "#D97706",
        },
        info: {
          DEFAULT: "#3B82F6",
          light: "#60A5FA",
          dark: "#2563EB",
        },

        // Text Colors
        "text-primary": "#FFFFFF",
        "text-secondary": "#A0A0A0",
        "text-muted": "#6B7280",
      },
      fontFamily: {
        sans: ["Inter", "system-ui", "sans-serif"],
        mono: ["JetBrains Mono", "monospace"],
      },
      boxShadow: {
        "gold-glow": "0 0 20px rgba(247, 183, 49, 0.3)",
        "gold-glow-sm": "0 0 10px rgba(247, 183, 49, 0.2)",
        "success-glow": "0 0 15px rgba(16, 185, 129, 0.3)",
        "danger-glow": "0 0 15px rgba(239, 68, 68, 0.3)",
      },
      backgroundImage: {
        "gold-gradient": "linear-gradient(135deg, #F7B731 0%, #E5A520 100%)",
        "dark-gradient": "linear-gradient(180deg, #141414 0%, #0A0A0A 100%)",
      },
    },
  },
  plugins: [],
};

export default config;
