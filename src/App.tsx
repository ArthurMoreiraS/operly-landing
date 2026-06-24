import { Button } from "@/components/ui/button";
import { CalEmbed } from "@/components/landing/CalEmbed";
import { FAQ } from "@/components/landing/FAQ";
import { Hero } from "@/components/landing/Hero";
import { HowItWorks } from "@/components/landing/HowItWorks";
import { Pricing } from "@/components/landing/Pricing";
import { ProblemSolution } from "@/components/landing/ProblemSolution";
import { Results } from "@/components/landing/Results";
import { SocialProof } from "@/components/landing/SocialProof";
import logo from "@/assets/logo.png";

const APP_URL = import.meta.env.VITE_APP_URL || "https://app.operlyapp.com";

function scrollToDemo() {
  document.getElementById("demo-scheduler")?.scrollIntoView({ behavior: "smooth" });
}

function Navbar() {
  return (
    <nav className="fixed inset-x-0 top-0 z-50 border-b border-white/10 bg-background/90 px-4 py-4 backdrop-blur-xl">
      <div className="mx-auto flex max-w-6xl items-center justify-between">
        <a href="#top" className="flex items-center gap-2 rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary">
          <img src={logo} alt="" className="h-8 w-8 object-contain" />
          <span className="text-xl font-bold tracking-tight text-white">Operly</span>
        </a>
        <div className="flex items-center gap-2 sm:gap-3">
          <Button variant="ghost" size="sm" asChild>
            <a href={APP_URL}>Entrar</a>
          </Button>
          <Button size="sm" className="rounded-full px-4 sm:px-6" onClick={scrollToDemo}>
            <span className="hidden sm:inline">Agendar demonstração</span>
            <span className="sm:hidden">Agendar demo</span>
          </Button>
        </div>
      </div>
    </nav>
  );
}

function Footer() {
  return (
    <footer className="border-t border-white/10 bg-black/15 px-4 py-12">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-6 text-center md:flex-row md:text-left">
        <a href="#top" className="flex items-center gap-2 text-white">
          <img src={logo} alt="" className="h-6 w-6 object-contain" />
          <span className="text-lg font-bold">Operly</span>
        </a>
        <p className="text-sm text-gray-400">© 2026 Operly. Todos os direitos reservados.</p>
        <div className="flex flex-wrap justify-center gap-6 text-sm text-gray-300">
          <a href="/termos" className="hover:text-white">Termos</a>
          <a href="/privacidade" className="hover:text-white">Privacidade</a>
          <a href="https://instagram.com/operlybr" target="_blank" rel="noreferrer" className="hover:text-white">Instagram</a>
          <a href={APP_URL} className="hover:text-white">Entrar no app</a>
        </div>
      </div>
    </footer>
  );
}

export default function App() {
  return (
    <div id="top" className="min-h-screen overflow-hidden bg-background text-foreground selection:bg-primary/30">
      <Navbar />
      <Hero onDemoClick={scrollToDemo} />
      <ProblemSolution onDemoClick={scrollToDemo} />
      <HowItWorks />
      <SocialProof />
      <Results />
      <Pricing onDemoClick={scrollToDemo} />
      <FAQ onDemoClick={scrollToDemo} />
      <CalEmbed />
      <Footer />
    </div>
  );
}
