import { motion } from "framer-motion";

const metrics = [
  { value: "−50%", label: "em faltas", context: "com lembretes automáticos" },
  { value: "+R$ 3.200", label: "por mês, em média", context: "com mais recorrência e controle" },
  { value: "50+", label: "operações atendidas", context: "entre lava-rápidos e estética" },
  { value: "< 10 min", label: "para começar", context: "do cadastro à agenda online" },
];

export function Results() {
  return (
    <section className="px-4 py-24">
      <div className="mx-auto max-w-6xl">
        <div className="mb-12 text-center">
          <h2 className="mb-4 text-3xl font-bold text-white md:text-5xl">Resultado que aparece na rotina</h2>
          <p className="text-lg text-gray-300">Menos tempo conferindo agenda, menos faltas e mais visibilidade do faturamento.</p>
        </div>
        <motion.div initial={{ opacity: 0, y: 18 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="grid grid-cols-2 gap-px overflow-hidden rounded-3xl border border-white/10 bg-white/10 lg:grid-cols-4">
          {metrics.map((metric) => (
            <div key={metric.label} className="bg-card p-6 text-center md:p-8">
              <div className="mb-2 text-3xl font-bold tabular-nums text-primary md:text-4xl">{metric.value}</div>
              <div className="mb-1 text-sm font-semibold text-white">{metric.label}</div>
              <div className="text-xs leading-5 text-gray-400">{metric.context}</div>
            </div>
          ))}
        </motion.div>
        <p className="mt-6 text-center text-xs text-gray-400">Valores estimados com base no uso do produto. Resultados variam conforme a operação.</p>
      </div>
    </section>
  );
}
