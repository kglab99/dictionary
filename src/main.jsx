import React from "react";
import ReactDOM from "react-dom/client";
import Dictionary from "./components/dictionary";
import { theme } from "./styles/theme";
import { CssVarsProvider } from "@mui/joy/styles";
import { CssBaseline } from "@mui/material";

import "./styles/index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <CssVarsProvider defaultMode="light" theme={theme}>
      <CssBaseline />

      <Dictionary />
    </CssVarsProvider>
  </React.StrictMode>
);
