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

// Production hydrates the prerendered HTML; development renders into an empty root.
if (rootEl.hasChildNodes()) {
  hydrateRoot(rootEl, app);
} else {
  createRoot(rootEl).render(app);
}
