# Operly Landing v2 — Implementation Plan

> **Historical plan — superseded for the new redesign on 2026-09-05.** Operly now targets international markets, with English as the primary landing-page language, as confirmed by the user. The Portuguese copy requirement, BRL assumptions, and layout tasks below describe the previous v2 project. Follow the [current redesign proposal](../../operly-landing-redesign-plan.md) and [product direction](../../../README.md#product-direction) for new work. Visual selection is still pending; market and language are confirmed.

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Evoluir a landing page do Operly para a estrutura de narrativa de conversão definida na spec `docs/superpowers/specs/2026-07-12-operly-landing-v2-design.md`, substituindo o screenshot vazio por um mockup em código e adicionando comparação, showcase, mock de WhatsApp e calculadora de ROI.

**Architecture:** SPA React 19 pré-renderizada (Vite + `entry-server.tsx` + `prerender.mjs`), Tailwind 4 com tokens em `src/index.css`, seções como componentes independentes em `src/components/landing/` compostos em `src/App.tsx`. Todas as seções novas são estáticas (pré-renderizáveis) exceto a calculadora, que renderiza estado default determinístico.

**Tech Stack:** React 19, TypeScript 5.6, Tailwind CSS 4 (`@theme inline`), lucide-react, Radix (accordion), wouter, pnpm.

## Global Constraints

- **Nenhuma dependência nova** (nem dev). Sem framer-motion, sem lib de chart, sem test runner.
- **Sem test runner no projeto**: o ciclo de verificação de cada tarefa é `pnpm check` (tsc), `pnpm build` (inclui prerender) e greps em `dist/index.html`. Rode os comandos a partir da raiz do repo.
- **Preços intocados**: R$ 397/mês, R$ 317/mês no anual (passam a viver em `src/lib/plans.ts`).
- **Honestidade**: proibido inventar depoimentos, nomes de clientes ou números. O claim "50+ operações atendidas" é REMOVIDO (substituído por "R$ 0 de multa para cancelar"). Manter disclaimers de estimativa.
- **Identidade visual mantida**: paleta atual (`--primary: 16 68% 60%`, background `213 21% 17%`), Inter Variable, dark-only.
- **Copy em pt-BR**; identificadores de código em inglês; comentários em pt-BR (padrão do repo).
- **Responsivo**: nenhuma seção pode causar scroll horizontal em viewport de 320px.
- **Acessibilidade**: vinhetas visuais com `aria-hidden="true"` + `<span className="sr-only">` descritivo; sliders com `<label htmlFor>`; animações novas continuam cobertas pelo bloco `prefers-reduced-motion` existente em `src/index.css` (não mexer nele).
- **Prerender**: above the fold (navbar + hero + mockup) precisa aparecer em `dist/index.html` após `pnpm build`.
- **Imports**: alias `@` → `src/` (já configurado no `vite.config.ts` e `tsconfig.json`).
- Commits pequenos, um por tarefa, mensagens em inglês no padrão `feat:`/`refactor:`/`chore:` do histórico.

---

### Task 1: Fundações — SectionHeader + utilitários CSS

**Files:**
- Create: `src/components/landing/SectionHeader.tsx`
- Modify: `src/index.css`

**Interfaces:**
- Produces: `SectionHeader({ eyebrow: string; title: string; subtitle?: string; align?: "center" | "left"; className?: string })` — usado por quase todas as tarefas seguintes.
- Produces: classes CSS globais `.section-alt` (fundo gradiente de seção alternada) e `.card-hover` (hover sutil de card), e grain global no `body::after`.

- [ ] **Step 1: Criar o componente SectionHeader**

Criar `src/components/landing/SectionHeader.tsx` com exatamente:

```tsx
import { cn } from "@/lib/utils";

type SectionHeaderProps = {
  eyebrow: string;
  title: string;
  subtitle?: string;
  /** "center" (padrão) ou "left" para seções em duas colunas. */
  align?: "center" | "left";
  className?: string;
};

/** Cabeçalho padrão de seção: eyebrow + título + subtítulo. */
export function SectionHeader({ eyebrow, title, subtitle, align = "center", className }: SectionHeaderProps) {
  return (
    <div className={cn("mb-14", align === "center" ? "text-center" : "text-center md:text-left", className)}>
      <p className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-primary">{eyebrow}</p>
      <h2 className="mb-4 text-3xl font-bold text-white md:text-5xl">{title}</h2>
      {subtitle && (
        <p className={cn("text-lg leading-8 text-gray-300", align === "center" && "mx-auto max-w-2xl")}>{subtitle}</p>
      )}
    </div>
  );
}
```

- [ ] **Step 2: Adicionar utilitários no index.css**

Em `src/index.css`, logo APÓS o bloco `.surface { ... }` (por volta da linha 66), inserir:

```css
/* Fundo de seção alternada — troca o bg-black/15 chapado por gradiente sutil. */
.section-alt {
  background: linear-gradient(180deg, rgb(0 0 0 / 0.2) 0%, rgb(0 0 0 / 0.05) 100%);
}

/* Hover sutil para cards interativos. */
.card-hover {
  transition:
    transform 0.25s ease,
    border-color 0.25s ease,
    box-shadow 0.25s ease;
}

.card-hover:hover {
  transform: translateY(-2px);
  border-color: hsl(var(--primary) / 0.35);
  box-shadow: 0 12px 40px rgb(0 0 0 / 0.25);
}

/* Grão de filme sutil sobre a página (SVG inline, sem request externo). */
body::after {
  content: "";
  position: fixed;
  inset: 0;
  z-index: 2147483647;
  pointer-events: none;
  opacity: 0.02;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='160' height='160'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E");
}
```

- [ ] **Step 3: Verificar typecheck**

Run: `pnpm check`
Expected: sai com código 0, sem erros.

- [ ] **Step 4: Commit**

```bash
git add src/components/landing/SectionHeader.tsx src/index.css
git commit -m "feat: add SectionHeader and section-alt/card-hover/grain utilities"
```

---

### Task 2: DashboardMockup (vinheta do painel em código)

**Files:**
- Create: `src/components/landing/DashboardMockup.tsx`

**Interfaces:**
- Produces: `DashboardMockup()` — componente sem props, estático (sem estado), usado pelo Hero na Task 3.

- [ ] **Step 1: Criar o componente**

Criar `src/components/landing/DashboardMockup.tsx` com exatamente:

```tsx
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
```

- [ ] **Step 2: Verificar typecheck**

Run: `pnpm check`
Expected: sai com código 0. (O componente ainda não é usado; tsc compila arquivos soltos do `src` normalmente.)

- [ ] **Step 3: Commit**

```bash
git add src/components/landing/DashboardMockup.tsx
git commit -m "feat: add coded DashboardMockup vignette"
```

---

### Task 3: Hero — mockup no lugar do screenshot + toast de WhatsApp

**Files:**
- Modify: `src/components/landing/Hero.tsx` (arquivo inteiro substituído)

**Interfaces:**
- Consumes: `DashboardMockup()` da Task 2.
- Produces: `Hero({ onDemoClick: () => void })` — assinatura inalterada; `App.tsx` não muda nesta tarefa.

- [ ] **Step 1: Substituir o conteúdo de Hero.tsx**

Substituir TODO o conteúdo de `src/components/landing/Hero.tsx` por:

```tsx
import { ArrowUpRight, CheckCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { DashboardMockup } from "@/components/landing/DashboardMockup";

export function Hero({ onDemoClick }: { onDemoClick: () => void }) {
  return (
    <section className="relative px-4 pb-20 pt-32">
      <div className="hero-glow pointer-events-none absolute left-1/2 top-0 -z-10 h-[500px] w-[800px] max-w-[100vw] -translate-x-1/2 rounded-full bg-primary/20 opacity-50 blur-[120px]" />
      <div className="relative z-10 mx-auto max-w-6xl text-center">
        {/* Animação de entrada via CSS (roda no HTML pré-renderizado, sem esperar o JS). */}
        <div className="rise mb-6 inline-flex items-center rounded-full border border-primary/25 bg-primary/10 px-3 py-1.5 text-sm font-medium text-primary">
          <span className="mr-2 h-2 w-2 animate-pulse rounded-full bg-primary" />
          Feito para lava-rápidos e estética automotiva
        </div>
        <h1 className="rise mb-6 text-4xl font-extrabold leading-[1.08] tracking-[-0.035em] text-white md:text-6xl lg:text-7xl" style={{ animationDelay: "60ms" }}>
          Seu lava-rápido faturando
          <span className="mt-2 block text-primary">R$ 3.200 a mais por mês</span>
        </h1>
        <p className="rise mx-auto mb-10 max-w-2xl text-lg leading-8 text-gray-300 md:text-xl" style={{ animationDelay: "120ms" }}>
          Agendamentos, cobranças e lembretes via WhatsApp em um só lugar. Menos papel, menos faltas e mais clientes voltando.
        </p>
        <div className="rise mb-16 flex flex-col items-center justify-center gap-4 sm:flex-row" style={{ animationDelay: "180ms" }}>
          <Button size="lg" className="w-full rounded-full shadow-lg shadow-primary/20 sm:w-auto" onClick={onDemoClick}>
            Agendar demonstração
          </Button>
          <Button variant="outline" size="lg" className="w-full rounded-full sm:w-auto" onClick={() => document.getElementById("pricing")?.scrollIntoView({ behavior: "smooth" })}>
            Ver planos e preços
          </Button>
        </div>

        <div className="rise relative mx-auto max-w-5xl" style={{ animationDelay: "260ms" }}>
          <div className="rounded-3xl border border-white/10 bg-black/15 p-2 shadow-2xl">
            <DashboardMockup />
          </div>
          <div className="surface float absolute -bottom-7 right-6 hidden rounded-2xl p-4 text-left md:block lg:-right-10 lg:bottom-12">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/15 text-primary"><ArrowUpRight className="h-5 w-5" /></div>
              <div><p className="text-xs text-gray-400">Faturamento hoje</p><p className="text-lg font-bold text-white">R$ 1.250,00</p></div>
            </div>
          </div>
          {/* Toast de lembrete — desincronizado do outro card via animation-delay. */}
          <div className="surface float absolute -top-6 left-6 hidden rounded-2xl p-4 text-left md:block lg:-left-10 lg:top-16" style={{ animationDelay: "2.5s" }}>
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-emerald-500/15 text-emerald-400"><CheckCheck className="h-5 w-5" /></div>
              <div><p className="text-xs text-gray-400">WhatsApp</p><p className="text-sm font-bold text-white">Lembrete enviado</p></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
```

(Nota: os imports de `dashboard.png` via vite-imagetools saem daqui; o arquivo `.png` é deletado na Task 13.)

- [ ] **Step 2: Verificar typecheck e build**

Run: `pnpm check`
Expected: código 0.

Run: `pnpm build`
Expected: build completo (client + SSR + prerender) sem erros.

- [ ] **Step 3: Verificar o prerender do mockup**

Run (Git Bash): `grep -c "Lavagem completa" dist/index.html`
Expected: `1` ou mais (o mockup está no HTML pré-renderizado).

Run (Git Bash): `grep -c "dashboard" dist/index.html`
Expected: `0` (nenhuma referência à imagem antiga no HTML).

- [ ] **Step 4: Commit**

```bash
git add src/components/landing/Hero.tsx
git commit -m "feat: replace empty dashboard screenshot with coded mockup in hero"
```

---

### Task 4: CompareSection (substitui ProblemSolution)

**Files:**
- Create: `src/components/landing/CompareSection.tsx`
- Modify: `src/App.tsx` (troca de import e de JSX)
- Delete: `src/components/landing/ProblemSolution.tsx`

**Interfaces:**
- Consumes: `SectionHeader` (Task 1), `Reveal` (existente em `src/components/Reveal.tsx`).
- Produces: `CompareSection({ onDemoClick: () => void })`.

- [ ] **Step 1: Criar o componente**

Criar `src/components/landing/CompareSection.tsx` com exatamente:

```tsx
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
```

- [ ] **Step 2: Trocar ProblemSolution por CompareSection no App**

Em `src/App.tsx`:

Trocar a linha de import:
```tsx
import { ProblemSolution } from "@/components/landing/ProblemSolution";
```
por:
```tsx
import { CompareSection } from "@/components/landing/CompareSection";
```

E no JSX de `App()`, trocar:
```tsx
<ProblemSolution onDemoClick={scrollToDemo} />
```
por:
```tsx
<CompareSection onDemoClick={scrollToDemo} />
```

- [ ] **Step 3: Deletar o componente antigo**

```bash
git rm src/components/landing/ProblemSolution.tsx
```

- [ ] **Step 4: Verificar typecheck**

Run: `pnpm check`
Expected: código 0 (nenhum import pendurado de ProblemSolution).

- [ ] **Step 5: Commit**

```bash
git add src/components/landing/CompareSection.tsx src/App.tsx
git commit -m "feat: replace ProblemSolution with paper-vs-Operly CompareSection"
```

---

### Task 5: FeaturesShowcase (bento grid)

**Files:**
- Create: `src/components/landing/FeaturesShowcase.tsx`
- Modify: `src/App.tsx` (novo import + inserção no JSX)

**Interfaces:**
- Consumes: `SectionHeader`, `Reveal`.
- Produces: `FeaturesShowcase()` sem props, com âncora `id="funcionalidades"`. Linka para `#lembretes` (criado na Task 6 — o link fica inerte até lá, sem erro).

- [ ] **Step 1: Criar o componente**

Criar `src/components/landing/FeaturesShowcase.tsx` com exatamente:

```tsx
import { ArrowDown, BarChart3, CalendarDays, Check, ClipboardCheck, MessageCircle, Repeat } from "lucide-react";
import { Reveal } from "@/components/Reveal";
import { SectionHeader } from "@/components/landing/SectionHeader";

export function FeaturesShowcase() {
  return (
    <section id="funcionalidades" className="px-4 py-24">
      <div className="mx-auto max-w-6xl">
        <SectionHeader
          eyebrow="Funcionalidades"
          title="Tudo que a operação precisa, num painel só"
          subtitle="Agenda, financeiro e clientes conectados — sem planilha paralela."
        />
        <div className="grid gap-4 md:grid-cols-3">
          {/* Agenda online (grande) */}
          <Reveal className="card-hover rounded-3xl border border-white/10 bg-card/60 p-6 md:col-span-2">
            <CalendarDays className="mb-4 h-6 w-6 text-primary" />
            <h3 className="mb-2 text-xl font-semibold text-white">Agenda online</h3>
            <p className="mb-6 text-sm leading-6 text-gray-300">Seus clientes agendam pelo link, e cada horário entra direto no painel.</p>
            <div aria-hidden="true" className="space-y-2">
              {[
                { time: "09:00", label: "Lavagem completa · Gol prata", busy: true },
                { time: "10:30", label: "Polimento · Corolla preto", busy: true },
                { time: "11:30", label: "Horário livre", busy: false },
              ].map((slot) => (
                <div
                  key={slot.time}
                  className={`flex items-center gap-3 rounded-xl border p-3 text-sm ${
                    slot.busy ? "border-primary/25 bg-primary/[0.07] text-white" : "border-dashed border-white/15 text-gray-500"
                  }`}
                >
                  <span className={`rounded px-1.5 py-0.5 text-xs font-semibold ${slot.busy ? "bg-primary/15 text-primary" : "bg-white/5 text-gray-500"}`}>
                    {slot.time}
                  </span>
                  {slot.label}
                </div>
              ))}
            </div>
          </Reveal>

          {/* Ordens de serviço (pequena) */}
          <Reveal delay={80} className="card-hover rounded-3xl border border-white/10 bg-card/60 p-6">
            <ClipboardCheck className="mb-4 h-6 w-6 text-primary" />
            <h3 className="mb-2 text-xl font-semibold text-white">Ordens de serviço</h3>
            <p className="mb-6 text-sm leading-6 text-gray-300">Cada carro no pátio com status e responsável.</p>
            <div aria-hidden="true" className="rounded-xl border border-white/10 bg-white/[0.03] p-3 text-sm">
              <p className="mb-2 font-medium text-white">OS #482 · HB20 branco</p>
              <span className="inline-flex rounded-full bg-amber-400/15 px-2 py-0.5 text-xs font-semibold text-amber-300">Em andamento</span>
            </div>
          </Reveal>

          {/* Planos recorrentes (pequena) */}
          <Reveal className="card-hover rounded-3xl border border-white/10 bg-card/60 p-6">
            <Repeat className="mb-4 h-6 w-6 text-primary" />
            <h3 className="mb-2 text-xl font-semibold text-white">Planos recorrentes</h3>
            <p className="mb-6 text-sm leading-6 text-gray-300">Transforme clientes avulsos em mensalistas.</p>
            <div aria-hidden="true" className="inline-flex items-center gap-2 rounded-full border border-primary/25 bg-primary/[0.07] px-3 py-1.5 text-xs font-semibold text-primary">
              <Check className="h-3.5 w-3.5" /> Mensalista · Lavagem semanal
            </div>
          </Reveal>

          {/* Painel financeiro (grande) */}
          <Reveal delay={80} className="card-hover rounded-3xl border border-white/10 bg-card/60 p-6 md:col-span-2">
            <BarChart3 className="mb-4 h-6 w-6 text-primary" />
            <h3 className="mb-2 text-xl font-semibold text-white">Painel financeiro</h3>
            <p className="mb-6 text-sm leading-6 text-gray-300">Faturamento do dia, da semana e do mês sem calculadora na mão.</p>
            <div aria-hidden="true" className="flex items-end justify-between gap-6">
              <div>
                <p className="text-xs text-gray-400">Faturamento do mês</p>
                <p className="text-3xl font-bold tabular-nums text-white">R$ 18.400</p>
                <p className="text-xs font-semibold text-primary">+12% vs mês passado</p>
              </div>
              <div className="flex h-16 max-w-40 flex-1 items-end gap-1.5">
                {[40, 65, 50, 80, 70, 100].map((height, index) => (
                  <div key={index} className="flex-1 rounded-t bg-primary/60" style={{ height: `${height}%` }} />
                ))}
              </div>
            </div>
          </Reveal>

          {/* Lembretes (banner de largura total, aponta para a seção WhatsApp) */}
          <Reveal className="card-hover rounded-3xl border border-white/10 bg-card/60 p-6 md:col-span-3">
            <a href="#lembretes" className="flex flex-col items-start gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex items-start gap-4">
                <MessageCircle className="mt-1 h-6 w-6 shrink-0 text-primary" />
                <div>
                  <h3 className="mb-1 text-xl font-semibold text-white">Lembretes automáticos no WhatsApp</h3>
                  <p className="text-sm leading-6 text-gray-300">O recurso que mais reduz faltas.</p>
                </div>
              </div>
              <span className="inline-flex items-center gap-1 text-sm font-medium text-primary">
                Veja como funciona <ArrowDown className="h-4 w-4" />
              </span>
            </a>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Inserir no App**

Em `src/App.tsx`, adicionar o import (em ordem alfabética junto aos outros de `landing/`):
```tsx
import { FeaturesShowcase } from "@/components/landing/FeaturesShowcase";
```

E no JSX, inserir logo APÓS `<CompareSection onDemoClick={scrollToDemo} />`:
```tsx
<FeaturesShowcase />
```

- [ ] **Step 3: Verificar typecheck**

Run: `pnpm check`
Expected: código 0.

- [ ] **Step 4: Commit**

```bash
git add src/components/landing/FeaturesShowcase.tsx src/App.tsx
git commit -m "feat: add FeaturesShowcase bento grid section"
```

---

### Task 6: WhatsAppSection (mock de conversa)

**Files:**
- Create: `src/components/landing/WhatsAppSection.tsx`
- Modify: `src/App.tsx` (novo import + inserção no JSX)

**Interfaces:**
- Consumes: `SectionHeader` (com `align="left"`), `Reveal`.
- Produces: `WhatsAppSection()` sem props, com âncora `id="lembretes"` (alvo do link da Task 5).

- [ ] **Step 1: Criar o componente**

Criar `src/components/landing/WhatsAppSection.tsx` com exatamente:

```tsx
import { Check } from "lucide-react";
import { Reveal } from "@/components/Reveal";
import { SectionHeader } from "@/components/landing/SectionHeader";

const bullets = [
  "Lembrete automático na véspera e no dia do serviço",
  "Cliente confirma presença com um toque",
  "Confirmações e faltas aparecem no seu painel",
];

const messages = [
  { from: "business", text: "Oi, Carlos! Lembrete: sua Lavagem completa é amanhã às 09:00. Confirma presença?", time: "18:02" },
  { from: "client", text: "Confirmado ✅", time: "18:05" },
  { from: "business", text: "Perfeito! Te esperamos amanhã. 🚗", time: "18:05" },
] as const;

export function WhatsAppSection() {
  return (
    <section id="lembretes" className="section-alt px-4 py-24">
      <div className="mx-auto grid max-w-6xl items-center gap-12 md:grid-cols-2">
        <div>
          <SectionHeader
            align="left"
            className="mb-8"
            eyebrow="Lembretes automáticos"
            title="Cliente que recebe lembrete, aparece"
            subtitle="O Operly avisa seus clientes pelo WhatsApp antes de cada serviço — e você só acompanha as confirmações."
          />
          <ul className="mx-auto max-w-md space-y-4 md:mx-0">
            {bullets.map((bullet) => (
              <li key={bullet} className="flex items-center gap-3 text-sm text-white">
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary/15 text-primary">
                  <Check className="h-4 w-4" />
                </span>
                {bullet}
              </li>
            ))}
          </ul>
          <p className="mt-8 text-center text-sm text-gray-400 md:text-left">
            Operações com lembrete automático registram <span className="font-semibold text-primary">até 50% menos faltas</span>.*
          </p>
          <p className="mt-2 text-center text-xs text-gray-500 md:text-left">
            *Estimativa com base no uso do produto. Resultados variam conforme a operação.
          </p>
        </div>

        <div className="mx-auto w-full max-w-[340px]">
          <span className="sr-only">
            Simulação de conversa: o Operly envia um lembrete do serviço agendado, o cliente responde confirmando e recebe
            a confirmação final.
          </span>
          {/* Moldura de celular com conversa estilo chat (sem logo do WhatsApp). */}
          <div aria-hidden="true" className="rounded-[2.5rem] border border-white/15 bg-[hsl(213_25%_12%)] p-3 shadow-2xl">
            <div className="overflow-hidden rounded-[2rem] bg-[hsl(213_25%_10%)]">
              <div className="flex items-center gap-3 border-b border-white/5 bg-white/[0.04] px-4 py-3">
                <div className="flex h-9 w-9 items-center justify-center rounded-full bg-primary/20 text-sm font-bold text-primary">LB</div>
                <div>
                  <p className="text-sm font-semibold text-white">Lava-Rápido do Bairro</p>
                  <p className="text-[11px] text-emerald-400">online</p>
                </div>
              </div>
              <div className="space-y-3 px-3 py-5">
                {messages.map((message, index) => (
                  <Reveal
                    key={index}
                    delay={index * 150}
                    from={message.from === "client" ? "right" : "left"}
                    className={`flex ${message.from === "client" ? "justify-end" : "justify-start"}`}
                  >
                    <div
                      className={`max-w-[85%] rounded-2xl px-3.5 py-2.5 text-sm leading-5 ${
                        message.from === "client" ? "rounded-br-sm bg-emerald-700/80 text-white" : "rounded-bl-sm bg-white/10 text-gray-100"
                      }`}
                    >
                      {message.text}
                      <span className="mt-1 block text-right text-[10px] text-white/50">{message.time}</span>
                    </div>
                  </Reveal>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Inserir no App**

Em `src/App.tsx`, adicionar o import:
```tsx
import { WhatsAppSection } from "@/components/landing/WhatsAppSection";
```

E no JSX, inserir logo APÓS `<FeaturesShowcase />`:
```tsx
<WhatsAppSection />
```

- [ ] **Step 3: Verificar typecheck**

Run: `pnpm check`
Expected: código 0.

- [ ] **Step 4: Commit**

```bash
git add src/components/landing/WhatsAppSection.tsx src/App.tsx
git commit -m "feat: add WhatsApp reminder conversation section"
```

---

### Task 7: RoiCalculator (interativa) + fonte única de preço

**Files:**
- Create: `src/lib/plans.ts`
- Create: `src/components/landing/RoiCalculator.tsx`
- Modify: `src/App.tsx` (novo import + inserção no JSX)

**Interfaces:**
- Consumes: `SectionHeader`, `Reveal`, `Button`.
- Produces: `MONTHLY_PRICE = 397` e `ANNUAL_PRICE = 317` em `src/lib/plans.ts` (a Task 10 muda `Pricing.tsx` para importar daqui). Produces: `RoiCalculator({ onDemoClick: () => void })`.
- Nota de hidratação: o estado default é fixo (15 / 80 / 4) — o HTML pré-renderizado bate com o primeiro render do cliente. Não usar `Math.random`/`Date.now`.

- [ ] **Step 1: Criar a fonte única de preço**

Criar `src/lib/plans.ts` com exatamente:

```ts
/** Preços do plano único (fonte de verdade para Pricing e RoiCalculator). */
export const MONTHLY_PRICE = 397;
export const ANNUAL_PRICE = 317;
```

- [ ] **Step 2: Criar o componente da calculadora**

Criar `src/components/landing/RoiCalculator.tsx` com exatamente:

```tsx
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Reveal } from "@/components/Reveal";
import { SectionHeader } from "@/components/landing/SectionHeader";
import { MONTHLY_PRICE } from "@/lib/plans";

// minimumFractionDigits é obrigatório junto do maximum: currency assume mínimo 2 e o Intl lança RangeError.
const brl = new Intl.NumberFormat("pt-BR", {
  style: "currency",
  currency: "BRL",
  minimumFractionDigits: 0,
  maximumFractionDigits: 0,
});

const WEEKS_PER_MONTH = 4.33;
/** Fração das faltas recuperadas com lembretes — coerente com a métrica "−50% de faltas". */
const RECOVERY_RATE = 0.5;
/** Dias úteis médios de operação por mês, para a linha de contexto de faturamento. */
const WORKING_DAYS_PER_MONTH = 26;

type SliderFieldProps = {
  id: string;
  label: string;
  min: number;
  max: number;
  step?: number;
  value: number;
  format: (value: number) => string;
  onChange: (value: number) => void;
};

function SliderField({ id, label, min, max, step = 1, value, format, onChange }: SliderFieldProps) {
  return (
    <div>
      <div className="mb-2 flex items-center justify-between">
        <label htmlFor={id} className="text-sm font-medium text-gray-300">{label}</label>
        <span className="rounded-lg bg-white/5 px-2 py-1 text-sm font-semibold tabular-nums text-white">{format(value)}</span>
      </div>
      <input
        id={id}
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        aria-valuetext={format(value)}
        onChange={(event) => onChange(Number(event.target.value))}
        className="w-full cursor-pointer accent-primary"
      />
    </div>
  );
}

export function RoiCalculator({ onDemoClick }: { onDemoClick: () => void }) {
  const [carsPerDay, setCarsPerDay] = useState(15);
  const [ticket, setTicket] = useState(80);
  const [noShowsPerWeek, setNoShowsPerWeek] = useState(4);

  const monthlyLoss = Math.round(noShowsPerWeek * ticket * WEEKS_PER_MONTH);
  const recovered = Math.round(monthlyLoss * RECOVERY_RATE);
  const monthlyRevenue = Math.round(carsPerDay * ticket * WORKING_DAYS_PER_MONTH);
  const multiple = recovered / MONTHLY_PRICE;

  return (
    <section className="px-4 py-24">
      <div className="mx-auto max-w-6xl">
        <SectionHeader
          eyebrow="Faça as contas"
          title="Quanto você está deixando na mesa?"
          subtitle="Estimativa rápida com base na sua operação hoje."
        />
        <Reveal className="mx-auto max-w-3xl rounded-3xl border border-white/10 bg-card/60 p-6 md:p-10">
          <div className="space-y-6">
            <SliderField id="roi-cars" label="Carros por dia" min={1} max={60} value={carsPerDay} format={(value) => `${value}`} onChange={setCarsPerDay} />
            <SliderField id="roi-ticket" label="Ticket médio" min={30} max={300} step={5} value={ticket} format={(value) => brl.format(value)} onChange={setTicket} />
            <SliderField id="roi-noshows" label="Faltas por semana" min={0} max={20} value={noShowsPerWeek} format={(value) => `${value}`} onChange={setNoShowsPerWeek} />
          </div>
          <div className="mt-8 rounded-2xl border border-primary/25 bg-primary/[0.06] p-6 text-center">
            <p className="text-sm text-gray-300">Com um faturamento de ~{brl.format(monthlyRevenue)}/mês, as faltas custam</p>
            <p className="my-2 text-4xl font-bold text-primary md:text-5xl">
              {brl.format(monthlyLoss)}
              <span className="text-lg font-semibold text-gray-300">/mês</span>
            </p>
            <p className="text-sm text-gray-300">
              Com lembretes automáticos você recupera ~<span className="font-semibold text-white">{brl.format(recovered)}/mês</span>
              {multiple >= 1 && <> — {multiple.toFixed(1).replace(".", ",")}× a mensalidade do Operly</>}
            </p>
          </div>
          <div className="mt-6 flex flex-col items-center gap-3">
            <Button size="lg" className="w-full rounded-full sm:w-auto sm:px-10" onClick={onDemoClick}>Agendar demonstração</Button>
            <p className="text-xs text-gray-500">Estimativa ilustrativa. Resultados variam conforme a operação.</p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
```

- [ ] **Step 3: Inserir no App**

Em `src/App.tsx`, adicionar o import:
```tsx
import { RoiCalculator } from "@/components/landing/RoiCalculator";
```

E no JSX, inserir logo APÓS `<WhatsAppSection />` (e ANTES de `<HowItWorks />`):
```tsx
<RoiCalculator onDemoClick={scrollToDemo} />
```

- [ ] **Step 4: Verificar typecheck e cálculo default**

Run: `pnpm check`
Expected: código 0.

Verificação manual do cálculo default (deve bater com a spec): `4 × 80 × 4.33 = 1385,6 → R$ 1.386` de perda; recuperação `R$ 693`; múltiplo `1,7×`. Inicie `pnpm dev`, abra a seção e confirme que aparece "R$ 1.386/mês", "R$ 693/mês" e "1,7× a mensalidade". Mova cada slider e confirme que os três valores reagem. Com faltas = 0, a frase do múltiplo some e a perda mostra R$ 0.

- [ ] **Step 5: Commit**

```bash
git add src/lib/plans.ts src/components/landing/RoiCalculator.tsx src/App.tsx
git commit -m "feat: add interactive ROI calculator with shared plan pricing"
```

---

### Task 8: HowItWorks adota o padrão novo

**Files:**
- Modify: `src/components/landing/HowItWorks.tsx`

**Interfaces:**
- Consumes: `SectionHeader`.
- Produces: `HowItWorks()` — assinatura inalterada.

- [ ] **Step 1: Aplicar SectionHeader e fundo alternado**

Em `src/components/landing/HowItWorks.tsx`:

Adicionar o import no topo:
```tsx
import { SectionHeader } from "@/components/landing/SectionHeader";
```

Trocar:
```tsx
    <section className="px-4 py-24">
```
por:
```tsx
    <section className="section-alt px-4 py-24">
```

E trocar o bloco do cabeçalho:
```tsx
        <div className="mb-16 text-center">
          <h2 className="mb-4 text-3xl font-bold text-white md:text-5xl">Da configuração ao primeiro agendamento</h2>
          <p className="mx-auto max-w-2xl text-lg text-gray-300">Três passos que refletem o fluxo real do seu negócio.</p>
        </div>
```
por:
```tsx
        <SectionHeader
          eyebrow="Como funciona"
          title="Da configuração ao primeiro agendamento"
          subtitle="Três passos que refletem o fluxo real do seu negócio."
        />
```

- [ ] **Step 2: Verificar typecheck**

Run: `pnpm check`
Expected: código 0.

- [ ] **Step 3: Commit**

```bash
git add src/components/landing/HowItWorks.tsx
git commit -m "refactor: adopt SectionHeader in HowItWorks"
```

---

### Task 9: TrustBlock (funde SocialProof + Results)

**Files:**
- Create: `src/components/landing/TrustBlock.tsx`
- Modify: `src/App.tsx` (troca de imports e JSX)
- Delete: `src/components/landing/SocialProof.tsx`, `src/components/landing/Results.tsx`

**Interfaces:**
- Consumes: `SectionHeader`, `Reveal`.
- Produces: `TrustBlock()` sem props.
- Regra de conteúdo: a métrica "50+ operações atendidas" NÃO entra — substituída por "R$ 0 / de multa para cancelar / sem fidelidade ou carência".

- [ ] **Step 1: Criar o componente**

Criar `src/components/landing/TrustBlock.tsx` com exatamente:

```tsx
import { Headphones, Lock, Shield, Zap } from "lucide-react";
import { Reveal } from "@/components/Reveal";
import { SectionHeader } from "@/components/landing/SectionHeader";

const pillars = [
  { icon: Zap, title: "Setup rápido", description: "Cadastre serviços e abra a agenda sem projeto longo de implantação." },
  { icon: Headphones, title: "Suporte humano", description: "Fale com uma pessoa quando precisar configurar ou tirar uma dúvida." },
  { icon: Lock, title: "Sem fidelidade", description: "Cancele quando quiser, sem multa ou carência escondida." },
  { icon: Shield, title: "Dados exportáveis", description: "Clientes, histórico e faturamento continuam pertencendo ao seu negócio." },
];

const metrics = [
  { value: "−50%", label: "em faltas", context: "com lembretes automáticos" },
  { value: "+R$ 3.200", label: "por mês, em média", context: "com mais recorrência e controle" },
  { value: "R$ 0", label: "de multa para cancelar", context: "sem fidelidade ou carência" },
  { value: "< 10 min", label: "para começar", context: "do cadastro à agenda online" },
];

export function TrustBlock() {
  return (
    <section className="px-4 py-24">
      <div className="mx-auto max-w-6xl">
        <SectionHeader
          eyebrow="Por que confiar"
          title="Risco zero para testar"
          subtitle="Sem fidelidade, com garantia e com seus dados sempre exportáveis."
        />

        {/* Herói do bloco: garantia de 14 dias */}
        <Reveal className="mb-12 flex flex-col items-center gap-5 rounded-3xl border border-primary/40 bg-primary/[0.06] p-8 text-center md:flex-row md:text-left">
          <Shield className="h-12 w-12 shrink-0 text-primary" />
          <div>
            <h3 className="text-xl font-bold text-white">Garantia de 14 dias</h3>
            <p className="mt-1 leading-7 text-gray-300">
              Teste o Operly completo. Se não fizer sentido para sua operação, solicite o reembolso dentro do período.
            </p>
          </div>
        </Reveal>

        {/* Pilares */}
        <div className="mb-12 grid gap-px overflow-hidden rounded-3xl border border-white/10 bg-white/10 sm:grid-cols-2 lg:grid-cols-4">
          {pillars.map((pillar) => (
            <article key={pillar.title} className="bg-card p-6">
              <pillar.icon className="mb-5 h-6 w-6 text-primary" />
              <h3 className="mb-2 font-semibold text-white">{pillar.title}</h3>
              <p className="text-sm leading-6 text-gray-300">{pillar.description}</p>
            </article>
          ))}
        </div>

        {/* Métricas */}
        <Reveal className="grid grid-cols-2 gap-px overflow-hidden rounded-3xl border border-white/10 bg-white/10 lg:grid-cols-4">
          {metrics.map((metric) => (
            <div key={metric.label} className="bg-card p-6 text-center md:p-8">
              <div className="mb-2 text-3xl font-bold tabular-nums text-primary md:text-4xl">{metric.value}</div>
              <div className="mb-1 text-sm font-semibold text-white">{metric.label}</div>
              <div className="text-xs leading-5 text-gray-400">{metric.context}</div>
            </div>
          ))}
        </Reveal>
        <p className="mt-6 text-center text-xs text-gray-400">Valores estimados com base no uso do produto. Resultados variam conforme a operação.</p>
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Trocar SocialProof + Results por TrustBlock no App**

Em `src/App.tsx`:

Remover os imports:
```tsx
import { Results } from "@/components/landing/Results";
import { SocialProof } from "@/components/landing/SocialProof";
```
Adicionar:
```tsx
import { TrustBlock } from "@/components/landing/TrustBlock";
```

No JSX, trocar as duas linhas:
```tsx
<SocialProof />
<Results />
```
por:
```tsx
<TrustBlock />
```

- [ ] **Step 3: Deletar os componentes antigos**

```bash
git rm src/components/landing/SocialProof.tsx src/components/landing/Results.tsx
```

- [ ] **Step 4: Verificar typecheck e ausência do claim**

Run: `pnpm check`
Expected: código 0.

Run (Git Bash): `grep -rn "50+" src/ --include="*.tsx"`
Expected: nenhum resultado contendo "operações atendidas" (o único "50" permitido é o "−50% em faltas" / "50% menos faltas").

- [ ] **Step 5: Commit**

```bash
git add src/components/landing/TrustBlock.tsx src/App.tsx
git commit -m "feat: merge SocialProof and Results into honest TrustBlock"
```

---

### Task 10: Pricing — SectionHeader, preço compartilhado e ancoragem de valor

**Files:**
- Modify: `src/components/landing/Pricing.tsx`

**Interfaces:**
- Consumes: `SectionHeader`; `MONTHLY_PRICE`/`ANNUAL_PRICE` de `src/lib/plans.ts` (Task 7).
- Produces: `Pricing({ onDemoClick: () => void })` — assinatura inalterada; toggle mensal/anual preservado.

- [ ] **Step 1: Aplicar as mudanças**

Em `src/components/landing/Pricing.tsx`:

1. Adicionar imports:
```tsx
import { SectionHeader } from "@/components/landing/SectionHeader";
import { ANNUAL_PRICE, MONTHLY_PRICE } from "@/lib/plans";
```

2. Remover as duas linhas de constantes locais:
```tsx
const MONTHLY_PRICE = 397;
const ANNUAL_PRICE = 317;
```

3. Trocar o `<section ...>` de abertura:
```tsx
    <section id="pricing" className="bg-black/15 px-4 py-24">
```
por:
```tsx
    <section id="pricing" className="section-alt px-4 py-24">
```

4. Trocar o bloco do cabeçalho:
```tsx
        <div className="mb-12 text-center">
          <h2 className="mb-4 text-3xl font-bold text-white md:text-5xl">Um plano com acesso completo</h2>
          <p className="text-lg text-gray-300">Escolha cobrança mensal ou anual.</p>
        </div>
```
por:
```tsx
        <SectionHeader eyebrow="Preço" title="Um plano com acesso completo" subtitle="Escolha cobrança mensal ou anual." className="mb-12" />
```

5. Logo APÓS a linha existente:
```tsx
            <p className="mt-3 text-sm text-gray-400">{annual ? `Cobrado anualmente, R$ ${price * 12}/ano` : `Ou R$ ${ANNUAL_PRICE}/mês no plano anual`}</p>
```
adicionar:
```tsx
            <p className="mt-1 text-xs text-gray-400">Se paga recuperando ~5 lavagens no mês.</p>
```

6. No `<Reveal ...>` do card, adicionar `card-hover` no início da className:
```tsx
        <Reveal immediate key={annual ? "annual" : "monthly"} className="card-hover mx-auto max-w-md rounded-3xl border border-primary/60 bg-primary/[0.06] p-8 shadow-xl shadow-primary/10">
```

- [ ] **Step 2: Verificar typecheck e toggle**

Run: `pnpm check`
Expected: código 0.

Com `pnpm dev`: alternar o toggle mensal/anual e confirmar que os valores R$ 397 ↔ R$ 317 e o texto de economia continuam funcionando.

- [ ] **Step 3: Commit**

```bash
git add src/components/landing/Pricing.tsx
git commit -m "refactor: pricing uses shared plan constants and new section pattern"
```

---

### Task 11: FAQ — âncora, SectionHeader e novas perguntas

**Files:**
- Modify: `src/components/landing/FAQ.tsx`

**Interfaces:**
- Consumes: `SectionHeader`.
- Produces: `FAQ({ onDemoClick: () => void })` — assinatura inalterada; âncora `id="faq"`.

- [ ] **Step 1: Aplicar as mudanças**

Em `src/components/landing/FAQ.tsx`:

1. Adicionar import:
```tsx
import { SectionHeader } from "@/components/landing/SectionHeader";
```

2. No array `faqs`, adicionar ao FINAL estes dois itens:
```tsx
  { q: "Quais formas de pagamento vocês aceitam?", a: "Cartão de crédito e Pix, com cobrança mensal ou anual." },
  { q: "Tenho mais de uma unidade. Funciona?", a: "Sim. Usuários são ilimitados e você pode falar com a gente na demonstração para configurar mais de uma operação." },
```

3. Trocar o `<section>` de abertura:
```tsx
    <section className="px-4 py-24">
```
por:
```tsx
    <section id="faq" className="px-4 py-24">
```

4. Trocar o bloco do cabeçalho:
```tsx
        <div className="mb-12 text-center">
          <h2 className="mb-4 text-3xl font-bold text-white md:text-5xl">Perguntas frequentes</h2>
          <p className="text-lg text-gray-300">O que os donos de lava-rápido perguntam antes de começar.</p>
        </div>
```
por:
```tsx
        <SectionHeader eyebrow="FAQ" title="Perguntas frequentes" subtitle="O que os donos de lava-rápido perguntam antes de começar." className="mb-12" />
```

- [ ] **Step 2: Verificar typecheck**

Run: `pnpm check`
Expected: código 0.

- [ ] **Step 3: Commit**

```bash
git add src/components/landing/FAQ.tsx
git commit -m "feat: add payment and multi-unit FAQs, faq anchor"
```

---

### Task 12: Navbar com âncoras, Footer e eyebrow do CalEmbed

**Files:**
- Modify: `src/App.tsx` (arquivo inteiro substituído — versão final)
- Modify: `src/components/landing/CalEmbed.tsx` (uma inserção)

**Interfaces:**
- Consumes: todos os componentes das tarefas anteriores.
- Produces: ordem final da página e âncoras `#funcionalidades`, `#pricing`, `#faq` na navbar e no footer.

- [ ] **Step 1: Substituir App.tsx pela versão final**

Substituir TODO o conteúdo de `src/App.tsx` por:

```tsx
import { Button } from "@/components/ui/button";
import { CalEmbed } from "@/components/landing/CalEmbed";
import { CompareSection } from "@/components/landing/CompareSection";
import { FAQ } from "@/components/landing/FAQ";
import { FeaturesShowcase } from "@/components/landing/FeaturesShowcase";
import { Hero } from "@/components/landing/Hero";
import { HowItWorks } from "@/components/landing/HowItWorks";
import { Pricing } from "@/components/landing/Pricing";
import { RoiCalculator } from "@/components/landing/RoiCalculator";
import { TrustBlock } from "@/components/landing/TrustBlock";
import { WhatsAppSection } from "@/components/landing/WhatsAppSection";
import logo from "@/assets/logo.png";

const APP_URL = import.meta.env.VITE_APP_URL || "https://app.operlyapp.com";

const navAnchors = [
  { href: "#funcionalidades", label: "Funcionalidades" },
  { href: "#pricing", label: "Preço" },
  { href: "#faq", label: "FAQ" },
];

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
        <div className="hidden items-center gap-6 md:flex">
          {navAnchors.map((anchor) => (
            <a key={anchor.href} href={anchor.href} className="text-sm font-medium text-gray-300 transition-colors hover:text-white">
              {anchor.label}
            </a>
          ))}
        </div>
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
          {navAnchors.map((anchor) => (
            <a key={anchor.href} href={anchor.href} className="hover:text-white">{anchor.label}</a>
          ))}
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
      <CompareSection onDemoClick={scrollToDemo} />
      <FeaturesShowcase />
      <WhatsAppSection />
      <RoiCalculator onDemoClick={scrollToDemo} />
      <HowItWorks />
      <TrustBlock />
      <Pricing onDemoClick={scrollToDemo} />
      <FAQ onDemoClick={scrollToDemo} />
      <CalEmbed />
      <Footer />
    </div>
  );
}
```

(Se as Tasks 4–9 foram executadas corretamente, a única diferença real deste passo são `navAnchors`, o bloco de âncoras na navbar e no footer — o resto deve bater com o estado atual do arquivo. Se algo divergir, o estado acima é o canônico.)

- [ ] **Step 2: Adicionar eyebrow no CalEmbed**

Em `src/components/landing/CalEmbed.tsx`, dentro do `<div className="text-center md:text-left">`, ANTES da linha:
```tsx
            <h2 className="mb-4 text-3xl font-bold text-white md:text-4xl">Veja o Operly funcionando no seu cenário</h2>
```
inserir:
```tsx
            <p className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-primary">Demonstração</p>
```

- [ ] **Step 3: Verificar typecheck**

Run: `pnpm check`
Expected: código 0.

- [ ] **Step 4: Verificar âncoras no navegador**

Com `pnpm dev`: clicar em Funcionalidades, Preço e FAQ na navbar — cada um rola suavemente até a seção certa. Repetir nos links do footer. Clicar em "Veja como funciona ↓" no banner de lembretes — rola até a conversa de WhatsApp.

- [ ] **Step 5: Commit**

```bash
git add src/App.tsx src/components/landing/CalEmbed.tsx
git commit -m "feat: navbar/footer anchors and demo eyebrow"
```

---

### Task 13: Limpeza final + verificação de aceite

**Files:**
- Delete: `src/assets/dashboard.png`

**Interfaces:**
- Consumes: tudo das tarefas anteriores.
- Produces: estado final validado contra os critérios de aceite da spec.

- [ ] **Step 1: Remover o screenshot antigo**

Run (Git Bash): `grep -rn "dashboard.png" src/`
Expected: nenhum resultado.

```bash
git rm src/assets/dashboard.png
```

(Não remover `vite-imagetools` do `vite.config.ts`/`package.json` — fica para um cleanup futuro; a spec pede stack intacta.)

- [ ] **Step 2: Build completo**

Run: `pnpm check`
Expected: código 0.

Run: `pnpm build`
Expected: build client + SSR + prerender sem erros.

- [ ] **Step 3: Greps de aceite no HTML pré-renderizado (Git Bash)**

```bash
grep -c "R\$ 3.200" dist/index.html            # ≥ 1 (headline)
grep -c "Lavagem completa" dist/index.html      # ≥ 1 (mockup do hero)
grep -c "Quanto custa continuar no caderno?" dist/index.html   # ≥ 1
grep -c 'id="funcionalidades"' dist/index.html  # 1
grep -c 'id="lembretes"' dist/index.html        # 1
grep -c 'id="faq"' dist/index.html              # 1
grep -c "operações atendidas" dist/index.html   # 0 (claim removido)
grep -c "dashboard" dist/index.html             # 0 (imagem antiga fora)
```

- [ ] **Step 4: Checklist visual (pnpm dev ou preview do build)**

- 320px, 375px, 768px e 1280px: sem scroll horizontal, sem sobreposição (atenção à tabela comparativa em 768px e ao bento em 320px).
- Calculadora: sliders reagem; default mostra R$ 1.386 / R$ 693 / 1,7×; faltas = 0 esconde o múltiplo.
- Toggle de preço mensal ↔ anual funciona.
- Emular `prefers-reduced-motion: reduce` (DevTools → Rendering): todo o conteúdo visível, sem animação.
- Seção de demo (Cal.com) carrega ao se aproximar do fim da página.

- [ ] **Step 5: Commit final**

```bash
git add -A
git commit -m "chore: remove unused dashboard screenshot"
```
