import { StrictMode } from "react";
import { createRoot, hydrateRoot } from "react-dom/client";
import { Router } from "wouter";
import { AppRoutes } from "./AppRoutes";
import "@fontsource-variable/inter";
import "./index.css";

const rootEl = document.getElementById("root")!;
const app = (
  <StrictMode>
    <Router>
      <AppRoutes />
    </Router>
  </StrictMode>
);

// Produção: hidrata o HTML pré-renderizado (SSG).
// Dev: #root vem vazio, então cria do zero.
if (rootEl.hasChildNodes()) {
  hydrateRoot(rootEl, app);
} else {
  createRoot(rootEl).render(app);
}
