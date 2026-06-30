import { StrictMode } from "react";
import { renderToString } from "react-dom/server";
import { Router } from "wouter";
import { AppRoutes } from "./AppRoutes";

/** Renderiza uma rota para HTML estático no momento do build (SSG). */
export function render(url: string) {
  return renderToString(
    <StrictMode>
      <Router ssrPath={url}>
        <AppRoutes />
      </Router>
    </StrictMode>,
  );
}
