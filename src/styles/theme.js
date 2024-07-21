import { extendTheme } from "@mui/joy/styles";

export const theme = extendTheme({
  colorSchemes: {
    light: {
      palette: {
        primary: {
          50: "#f8fafc",
          100: "#f1f5f9",
          200: "#e2e8f0",
          300: "#cbd5e1",
          400: "#94a3b8",
          500: "#64748b",
          600: "#475569",
          700: "#334155",
          800: "#1e293b",
          900: "#0f172a",
        },
        background: {
          default: "var(--joy-palette-background-surface)",
        },
      },
    },
  },
  fontFamily: {
    display: "Lora", // applies to `h1`–`h4`
    body: "Lora", // applies to `title-*` and `body-*`
    input: "Inter", // Specify the font for input fields
  },
  components: {
    JoyInput: {
      styleOverrides: {
        input: {
          fontFamily: "Inter", // Apply the Inter font to Input component
        },
      },
    },
  },
});

export default theme;
