import { StrictMode } from "react";
import { renderToString } from "react-dom/server";
import { Router } from "wouter";
import { AppRoutes } from "./AppRoutes";

/** Render a route to static HTML during the SSG build. */
export function render(url: string) {
  return renderToString(
    <StrictMode>
      <Router ssrPath={url}>
        <AppRoutes />
      </Router>
    </StrictMode>,
  );
}
