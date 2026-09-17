/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Ivory + Charcoal + Vermilion Visual System
        ivory: {
          bg: "#F5F1E8",
          secondary: "#EDE8DD",
          tertiary: "#E4DED1",
          surface: "#FFFFFF",
          hover: "#FAF8F4",
          selected: "#FFFDFC",
        },
        charcoal: {
          DEFAULT: "#1C1C1A",
          graphite: "#292824",
          soft: "#45433E",
          muted: "#5E5B55",
          disabled: "#858078",
        },
        vermilion: {
          DEFAULT: "#C74634",
          dark: "#9F2F24",
          light: "#F5D8D2",
          soft: "#FBEDEA",
        },
        status: {
          danger: "#C74634",
          'danger-dark': "#9F2F24",
          'danger-bg': "#FBEDEA",
          warning: "#B7791F",
          'warning-bg': "#FBF2DD",
          success: "#39704D",
          'success-bg': "#EAF3ED",
          info: "#46627A",
          'info-bg': "#EDF2F5",
        },
        border: {
          subtle: "#E1DCD2",
          default: "#D4CEC2",
          strong: "#B9B1A3",
        },
        // Backwards compatibility mappings for titanium classes
        titanium: {
          bg: "#F5F1E8",
          card: "#FFFFFF",
          border: "#D4CEC2",
          hover: "#FAF8F4",
          muted: "#5E5B55",
        },
      },
      fontFamily: {
        mono: ['"JetBrains Mono"', 'Inter', 'Menlo', 'monospace'],
        sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
      },
      boxShadow: {
        'subtle': '0 2px 8px rgba(28, 28, 26, 0.06)',
        'card': '0 1px 3px rgba(28, 28, 26, 0.05)',
        'cyan-glow': '0 2px 8px rgba(199, 70, 52, 0.15)', // Alias mapped to subtle vermilion accent
      }
    },
  },
  plugins: [],
}
