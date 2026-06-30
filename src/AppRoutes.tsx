import { Route, Switch } from "wouter";
import App from "./App";
import LegalPage from "./pages/Legal";

/** Árvore de rotas compartilhada entre cliente (hydrate) e build (prerender). */
export function AppRoutes() {
  return (
    <Switch>
      <Route path="/" component={App} />
      <Route path="/termos">{() => <LegalPage kind="terms" />}</Route>
      <Route path="/privacidade">{() => <LegalPage kind="privacy" />}</Route>
      <Route component={App} />
    </Switch>
  );
}
