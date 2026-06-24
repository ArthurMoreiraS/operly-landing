import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import dashboardImg from "@/assets/dashboard.png";

export function Hero({ onDemoClick }: { onDemoClick: () => void }) {
  return (
    <section className="relative px-4 pb-20 pt-32">
      <div className="pointer-events-none absolute left-1/2 top-0 -z-10 h-[500px] w-[800px] max-w-[100vw] -translate-x-1/2 rounded-full bg-primary/20 opacity-50 blur-[120px]" />
      <div className="relative z-10 mx-auto max-w-6xl text-center">
        <motion.div initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.55 }}>
          <div className="mb-6 inline-flex items-center rounded-full border border-primary/25 bg-primary/10 px-3 py-1.5 text-sm font-medium text-primary">
            <span className="mr-2 h-2 w-2 rounded-full bg-primary" />
            Feito para lava-rápidos e estética automotiva
          </div>
          <h1 className="mb-6 text-4xl font-extrabold leading-[1.08] tracking-[-0.035em] text-white md:text-6xl lg:text-7xl">
            Seu lava-rápido faturando
            <span className="mt-2 block text-primary">R$ 3.200 a mais por mês</span>
          </h1>
          <p className="mx-auto mb-10 max-w-2xl text-lg leading-8 text-gray-300 md:text-xl">
            Agendamentos, cobranças e lembretes via WhatsApp em um só lugar. Menos papel, menos faltas e mais clientes voltando.
          </p>
          <div className="mb-16 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Button size="lg" className="w-full rounded-full shadow-lg shadow-primary/20 sm:w-auto" onClick={onDemoClick}>
              Agendar demonstração
            </Button>
            <Button variant="outline" size="lg" className="w-full rounded-full sm:w-auto" onClick={() => document.getElementById("pricing")?.scrollIntoView({ behavior: "smooth" })}>
              Ver planos e preços
            </Button>
          </div>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.15 }} className="relative mx-auto max-w-5xl">
          <div className="rounded-3xl border border-white/10 bg-black/15 p-2 shadow-2xl">
            <img src={dashboardImg} alt="Painel do Operly com agenda, faturamento e indicadores da operação" className="h-auto w-full rounded-2xl border border-white/5" />
          </div>
          <div className="surface absolute -bottom-7 right-6 hidden rounded-2xl p-4 text-left md:block lg:-right-10 lg:bottom-12">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/15 text-primary"><ArrowUpRight className="h-5 w-5" /></div>
              <div><p className="text-xs text-gray-400">Faturamento hoje</p><p className="text-lg font-bold text-white">R$ 1.250,00</p></div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
