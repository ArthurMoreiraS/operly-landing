import { ArrowRight, Check, X } from "lucide-react";
import { Reveal } from "@/components/Reveal";
import { SectionHeader } from "@/components/landing/SectionHeader";

type Row = { label: string; paper: string; chat: string; operly: string };

const rows: Row[] = [
  { label: "Agendamento", paper: "Anotado à mão, sujeito a rasura", chat: "Cliente espera resposta no chat", operly: "Cliente agenda sozinho pelo link, 24h por dia" },
  { label: "Lembretes", paper: "Não existem", chat: "Manuais, quando dá tempo", operly: "Automáticos antes de cada serviço" },
  { label: "Faltas (no-show)", paper: "Frequentes e invisíveis", chat: "Percebidas tarde demais", operly: "Reduzidas com confirmação automática" },
  { label: "Faturamento", paper: "Conferido só no fim do dia", chat: "Planilha desatualizada", operly: "Painel em tempo real" },
  { label: "Histórico do cliente", paper: "Espalhado ou inexistente", chat: "Perdido na conversa", operly: "Ficha completa: veículos e serviços" },
];

const columns = [
  { key: "paper" as const, title: "Papel e caderno", highlight: false },
  { key: "chat" as const, title: "WhatsApp + planilha", highlight: false },
  { key: "operly" as const, title: "Operly", highlight: true },
];

export function CompareSection({ onDemoClick }: { onDemoClick: () => void }) {
  return (
    <section className="section-alt px-4 py-24">
      <div className="mx-auto max-w-6xl">
        <SectionHeader
          eyebrow="O custo do improviso"
          title="Quanto custa continuar no caderno?"
          subtitle="Compare a rotina de quem opera no papel com a de quem opera no Operly."
        />

        {/* Desktop: tabela comparativa */}
        <Reveal className="hidden overflow-hidden rounded-3xl border border-white/10 md:block">
          <table className="w-full border-collapse text-sm">
            <thead>
              <tr className="border-b border-white/10 bg-white/[0.03]">
                <th className="p-4 text-left font-semibold text-gray-400">Como você opera</th>
                {columns.map((column) => (
                  <th
                    key={column.key}
                    className={`p-4 text-left font-semibold ${column.highlight ? "bg-primary/[0.08] text-primary" : "text-white"}`}
                  >
                    {column.title}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {rows.map((row) => (
                <tr key={row.label} className="border-b border-white/5 last:border-0">
                  <td className="p-4 font-medium text-white">{row.label}</td>
                  {columns.map((column) => (
                    <td key={column.key} className={`p-4 ${column.highlight ? "bg-primary/[0.08] text-white" : "text-gray-300"}`}>
                      <span className="flex items-start gap-2">
                        {column.highlight ? (
                          <Check className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                        ) : (
                          <X className="mt-0.5 h-4 w-4 shrink-0 text-red-400/70" />
                        )}
                        {row[column.key]}
                      </span>
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </Reveal>

        {/* Mobile: cards empilhados (Operly por último, com destaque) */}
        <div className="space-y-4 md:hidden">
          {columns.map((column) => (
            <Reveal
              key={column.key}
              className={`rounded-3xl border p-6 ${column.highlight ? "border-primary/40 bg-primary/[0.06]" : "border-white/10 bg-card/60"}`}
            >
              <h3 className={`mb-4 text-lg font-semibold ${column.highlight ? "text-primary" : "text-white"}`}>{column.title}</h3>
              <ul className="space-y-3">
                {rows.map((row) => (
                  <li key={row.label} className="flex items-start gap-3 text-sm">
                    {column.highlight ? (
                      <Check className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                    ) : (
                      <X className="mt-0.5 h-4 w-4 shrink-0 text-red-400/70" />
                    )}
                    <span>
                      <span className="font-medium text-white">{row.label}: </span>
                      <span className={column.highlight ? "text-white" : "text-gray-300"}>{row[column.key]}</span>
                    </span>
                  </li>
                ))}
              </ul>
            </Reveal>
          ))}
        </div>

        <div className="mt-10 text-center">
          <button type="button" onClick={onDemoClick} className="inline-flex items-center gap-2 text-sm font-medium text-primary hover:underline">
            Agendar demonstração <ArrowRight size={16} />
          </button>
        </div>
      </div>
    </section>
  );
}
