import { BarChart3, CalendarDays, Car, CircleDollarSign, LayoutDashboard, Settings, Users } from "lucide-react";

const navItems = [
  { icon: LayoutDashboard, label: "Dashboard", active: true },
  { icon: CalendarDays, label: "Agendamentos", active: false },
  { icon: Car, label: "Pátio", active: false },
  { icon: Users, label: "Clientes", active: false },
  { icon: CircleDollarSign, label: "Finanças", active: false },
  { icon: Settings, label: "Configurações", active: false },
];

const kpis = [
  { label: "Faturamento hoje", value: "R$ 1.250,00", hint: "+18% vs ontem" },
  { label: "Agendamentos", value: "14", hint: "3 em andamento" },
  { label: "Ticket médio", value: "R$ 89,00", hint: "média por serviço" },
];

const bars = [38, 52, 44, 68, 58, 84, 100];
const days = ["Seg", "Ter", "Qua", "Qui", "Sex", "Sáb", "Dom"];

const agenda = [
  { time: "09:00", service: "Lavagem completa", vehicle: "Gol prata" },
  { time: "10:30", service: "Polimento", vehicle: "Corolla preto" },
  { time: "13:00", service: "Higienização interna", vehicle: "HB20 branco" },
];

/**
 * Vinheta do painel construída em código (substitui o screenshot vazio do app).
 * Puramente decorativa: aria-hidden, com descrição sr-only para leitores de tela.
 */
export function DashboardMockup() {
  return (
    <>
      <span className="sr-only">
        Painel do Operly mostrando faturamento do dia de R$ 1.250,00, 14 agendamentos, gráfico de receita semanal e a
        agenda de hoje com três serviços marcados.
      </span>
      <div aria-hidden="true" className="flex overflow-hidden rounded-2xl border border-white/5 bg-[hsl(213_25%_13%)] text-left">
        {/* Sidebar (some em telas menores) */}
        <div className="hidden w-44 shrink-0 flex-col gap-1 border-r border-white/5 p-4 lg:flex">
          <p className="mb-3 px-2 text-sm font-bold text-white">Operly</p>
          {navItems.map((item) => (
            <div
              key={item.label}
              className={`flex items-center gap-2 rounded-lg px-2 py-1.5 text-xs ${
                item.active ? "bg-primary/90 font-semibold text-white" : "text-gray-400"
              }`}
            >
              <item.icon className="h-3.5 w-3.5" />
              {item.label}
            </div>
          ))}
        </div>
        {/* Conteúdo principal */}
        <div className="min-w-0 flex-1 p-4 md:p-6">
          <div className="mb-4 flex items-center justify-between">
            <div>
              <p className="text-sm font-bold text-white md:text-base">Bom dia! 👋</p>
              <p className="text-[11px] text-gray-400">Aqui está o resumo da sua operação hoje.</p>
            </div>
            <div className="hidden rounded-lg bg-primary px-3 py-1.5 text-[11px] font-semibold text-white sm:block">
              Novo agendamento
            </div>
          </div>
          <div className="mb-4 grid grid-cols-3 gap-2 md:gap-3">
            {kpis.map((kpi) => (
              <div key={kpi.label} className="rounded-xl border border-white/5 bg-white/[0.03] p-2.5 md:p-3">
                <p className="truncate text-[10px] text-gray-400">{kpi.label}</p>
                <p className="text-sm font-bold text-white md:text-lg">{kpi.value}</p>
                <p className="truncate text-[10px] text-primary">{kpi.hint}</p>
              </div>
            ))}
          </div>
          <div className="grid gap-2 md:grid-cols-[1.4fr_1fr] md:gap-3">
            <div className="rounded-xl border border-white/5 bg-white/[0.03] p-3">
              <div className="mb-3 flex items-center gap-2 text-[11px] font-semibold text-white">
                <BarChart3 className="h-3.5 w-3.5 text-primary" />
                Receita semanal
              </div>
              <div className="flex h-28 items-end gap-1.5 md:gap-2">
                {bars.map((height, index) => (
                  <div key={days[index]} className="flex h-full flex-1 flex-col justify-end gap-1">
                    <div className="w-full rounded-t bg-primary/70" style={{ height: `${height}%` }} />
                    <span className="text-center text-[9px] text-gray-500">{days[index]}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="rounded-xl border border-white/5 bg-white/[0.03] p-3">
              <p className="mb-3 text-[11px] font-semibold text-white">Agenda hoje</p>
              <div className="space-y-2">
                {agenda.map((item) => (
                  <div key={item.time} className="flex items-center gap-2 rounded-lg bg-white/[0.04] p-2">
                    <span className="rounded bg-primary/15 px-1.5 py-0.5 text-[10px] font-semibold text-primary">
                      {item.time}
                    </span>
                    <div className="min-w-0">
                      <p className="truncate text-[11px] font-medium text-white">{item.service}</p>
                      <p className="truncate text-[10px] text-gray-500">{item.vehicle}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
