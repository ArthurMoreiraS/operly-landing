import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Route, Switch } from "wouter";
import App from "./App";
import LegalPage from "./pages/Legal";
import "@fontsource-variable/inter";
import "./index.css";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Switch>
      <Route path="/" component={App} />
      <Route path="/termos"><LegalPage kind="terms" /></Route>
      <Route path="/privacidade"><LegalPage kind="privacy" /></Route>
      <Route component={App} />
    </Switch>
  </StrictMode>,
);
