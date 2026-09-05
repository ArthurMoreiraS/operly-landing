# Operly Landing v2 — Spec de Design

**Data:** 2026-07-12
**Status:** Histórico — aprovado para a v2 em julho; não rege a nova reformulação.
**Executor previsto:** Claude Opus 4.8, em sessão separada, via plano de implementação

> **Atualização de 2026-09-05:** O usuário confirmou a internacionalização do software e a landing voltada ao mercado internacional, em inglês. O foco no Brasil, os exemplos em reais e as restrições de layout abaixo documentam a versão anterior. Para o redesenho, consultar o [plano atual](../../operly-landing-redesign-plan.md) e a [direção do produto](../../../README.md#product-direction). A nova direção visual ainda é uma proposta; a mudança de mercado e idioma está confirmada.

## Contexto

A landing page do Operly (CRM para lava-rápidos e estética automotiva no Brasil) está no ar em
produção (Vite + React 19 + Tailwind 4, pré-renderizada via `entry-server.tsx` + `prerender.mjs`,
deploy na Vercel). O design atual é limpo mas genérico, e tem três problemas de conversão:

1. O screenshot do dashboard no hero mostra um painel **vazio** (R$ 0,00, agenda sem itens),
   contradizendo o headline "faturando R$ 3.200 a mais por mês".
2. A seção chamada `SocialProof` não contém prova social real — são 4 pilares de produto.
   Não existem depoimentos de clientes disponíveis ainda.
3. As funcionalidades só aparecem como lista de bullets dentro do card de preço; não há
   demonstração visual do produto (agenda, financeiro, lembretes WhatsApp).

## Objetivo

Evoluir (não redesenhar) a landing atual: manter a identidade dark slate + laranja, elevar o
acabamento visual e reestruturar a página como uma narrativa de conversão, adicionando quatro
elementos novos: comparação papel vs Operly, showcase de funcionalidades, mock de conversa
WhatsApp e calculadora de ROI.

## Não-objetivos

- Trocar paleta, fonte (Inter Variable) ou identidade visual.
- Adicionar dependências pesadas (framer-motion, bibliotecas de chart, etc.).
- Criar depoimentos falsos ou inventar números de clientes.
- Mexer no fluxo de agendamento Cal.com ou nas páginas legais (`/termos`, `/privacidade`).
- Alterar preços (R$ 397/mês, R$ 317/mês anual) ou a estrutura de plano único.

## Decisões de honestidade (obrigatórias)

- **Sem depoimentos inventados.** Enquanto não houver depoimentos reais, o bloco de confiança
  usa garantia + pilares + métricas com disclaimer.
- A métrica **"50+ operações atendidas"** (em `Results.tsx`) não é verificável pelo usuário no
  momento. **Substituir** por uma métrica de produto verificável: "R$ 0 de multa — sem
  fidelidade, cancele quando quiser". Se o usuário confirmar depois que o número 50+ é real,
  pode ser restaurado em um commit próprio.
- Manter o disclaimer existente "Valores estimados com base no uso do produto…" junto às
  métricas de resultado.
- O mock de WhatsApp usa estilo de chat genérico (bolhas verdes, fundo escuro de conversa),
  **sem** logo oficial do WhatsApp; a palavra "WhatsApp" pode aparecer no texto/copy
  normalmente (o produto de fato envia lembretes por WhatsApp).

## Sistema visual

### Tokens e fundamentos (mantidos)

- Paleta atual em `src/index.css`: background `213 21% 17%`, primary `16 68% 60%`, card
  `213 21% 22%`. Inter Variable. Dark-only (`color-scheme: dark`).
- Animações CSS existentes: `.rise` (above the fold, roda no HTML pré-renderizado),
  `.reveal`/`Reveal` (scroll-triggered), `.float`, `.hero-glow`. Reaproveitar; não introduzir
  novo sistema de animação.
- `prefers-reduced-motion` já é respeitado globalmente; qualquer animação nova deve continuar
  coberta por esse bloco.

### Novos padrões

1. **SectionHeader** — componente único para cabeçalho de seção: eyebrow (texto pequeno,
   uppercase, tracking largo, cor primary), título (`text-3xl md:text-5xl font-bold`),
   subtítulo (`text-lg text-gray-300`, max-width ~2xl, centrado). Todas as seções passam a
   usá-lo, eliminando a formatação ad-hoc atual.
2. **Cards com hover** — cards interativos ganham
   `transition` + `hover:border-primary/30 hover:-translate-y-0.5` (ou equivalente sutil).
   Cards puramente informativos não precisam.
3. **Fundo com profundidade** — manter a alternância de seções, mas trocar `bg-black/15`
   chapado por um leve gradiente vertical (`from-black/20 to-transparent` ou similar) e
   manter/reposicionar os glows radiais laranja. Adicionar textura de noise sutil no
   background global via CSS (SVG data-URI inline, opacidade ≤ 0.03) — sem request externo.
4. **Numeração/ritmo** — espaçamento vertical de seção padronizado (`py-24`, `py-16` mobile).

## Estrutura da página (ordem nova)

```
1. Navbar            (evoluída)
2. Hero              (evoluída — mockup em código no lugar do print)
3. CompareSection    (NOVA — funde ProblemSolution + comparação papel vs Operly)
4. FeaturesShowcase  (NOVA — bento grid de funcionalidades)
5. WhatsAppSection   (NOVA — mock de conversa)
6. RoiCalculator     (NOVA — interativa)
7. HowItWorks        (mantida, entra no padrão SectionHeader)
8. TrustBlock        (evoluída — funde SocialProof + Results + garantia)
9. Pricing           (evoluída)
10. FAQ              (evoluída — +2 perguntas)
11. CalEmbed         (mantida, ajuste de copy no padrão novo)
12. Footer           (evoluído — âncoras)
```

Componentes removidos ao final: `ProblemSolution.tsx`, `SocialProof.tsx`, `Results.tsx`
(conteúdo absorvido pelas seções novas).

## Especificação por seção

### 1. Navbar

- Adicionar âncoras no desktop (escondidas em `< md`): **Funcionalidades** (`#funcionalidades`),
  **Preço** (`#pricing`), **FAQ** (`#faq`), com scroll suave (já existe `scroll-behavior: smooth`).
- Manter logo, "Entrar" e CTA "Agendar demonstração" exatamente como estão.

### 2. Hero

- **Headline e sub mantidos** ("Seu lava-rápido faturando / R$ 3.200 a mais por mês").
- **Sai** o `<picture>` com `dashboard.png`; **entra** `DashboardMockup`, um componente
  React/Tailwind puro (sem imagens) que imita o painel real do Operly (referência visual:
  `src/assets/dashboard.png` — sidebar escura com itens Dashboard/Agendamentos/Pátio/Clientes/
  Serviços/Finanças, cards de KPI no topo, gráfico "Receita Semanal", card "Agenda Hoje"),
  porém **com dados saudáveis**:
  - KPIs: Faturamento Hoje `R$ 1.250,00`, Agendamentos `14`, Ticket Médio `R$ 89,00`.
  - Gráfico de barras CSS (divs com alturas variadas, cor primary) com 7 dias e valores
    crescentes — sem biblioteca de chart.
  - "Agenda Hoje" com 3 itens (ex.: "09:00 · Lavagem completa · Gol prata",
    "10:30 · Polimento · Corolla preto", "13:00 · Higienização interna · HB20 branco").
  - Escala/tipografia reduzidas (é uma vinheta, não um app funcional); `aria-hidden="true"`
    no mockup inteiro, com um `<span class="sr-only">` descrevendo o painel.
  - No mobile, o mockup simplifica (esconde sidebar, mostra KPIs + agenda).
- Manter o card flutuante "Faturamento hoje R$ 1.250,00" (`.float`) e **adicionar** um segundo
  card flutuante estilo toast: ícone de check verde + "Lembrete enviado via WhatsApp" —
  posicionado no lado oposto, também `hidden md:block`.
- Animações `.rise` mantidas com os mesmos delays escalonados.
- O mockup deve renderizar no HTML pré-renderizado (é estático — sem estado).

### 3. CompareSection (nova — substitui ProblemSolution)

- ID de âncora: nenhum (seção narrativa).
- SectionHeader: eyebrow "O CUSTO DO IMPROVISO", título "Quanto custa continuar no caderno?",
  sub "Compare a rotina de quem opera no papel com a de quem opera no Operly."
- **Desktop (`md+`)**: tabela comparativa com 3 colunas — "Papel e caderno",
  "WhatsApp + planilha", "Operly" (coluna Operly com destaque: borda primary, fundo
  `bg-primary/[0.06]`). Linhas:

  | Critério | Papel e caderno | WhatsApp + planilha | Operly |
  |---|---|---|---|
  | Agendamento | Anotado à mão, sujeito a rasura | Cliente espera resposta no chat | Cliente agenda sozinho pelo link, 24h |
  | Lembretes | Não existem | Manuais, quando dá tempo | Automáticos antes de cada serviço |
  | Faltas (no-show) | Frequentes e invisíveis | Percebidas tarde demais | Reduzidas com confirmação automática |
  | Faturamento | Conferido no fim do dia | Planilha desatualizada | Painel em tempo real |
  | Histórico do cliente | Espalhado ou inexistente | Buscar no chat | Ficha completa: veículos e serviços |

  Células das colunas "papel" e "planilha" com ícone `X` vermelho discreto; coluna Operly com
  `Check` primary.
- **Mobile (`< md`)**: colunas viram cards empilhados (Operly por último, com destaque), ou
  a tabela vira lista por critério — o implementador escolhe o que ficar mais legível, sem
  scroll horizontal da página.
- CTA discreto ao final (link-button "Agendar demonstração →" chamando `onDemoClick`), como o
  atual do ProblemSolution.

### 4. FeaturesShowcase (nova)

- ID de âncora: `funcionalidades`.
- SectionHeader: eyebrow "FUNCIONALIDADES", título "Tudo que a operação precisa, num painel só",
  sub curta.
- **Bento grid**: `md:grid-cols-3` com células de tamanhos variados (2 grandes + 3 menores,
  usando `md:col-span-2` etc.). Células:
  1. **Agenda online** (grande) — vinheta: mini-calendário/lista de horários com slots
     ocupados em primary.
  2. **Painel financeiro** (grande) — vinheta: número grande de faturamento + mini gráfico
     de barras CSS.
  3. **Ordens de serviço** (pequena) — vinheta: card de OS com status "Em andamento".
  4. **Planos recorrentes** (pequena) — vinheta: badge "Mensalista · Lavagem semanal".
  5. **Lembretes automáticos** (pequena) — vinheta: bolha de chat pequena; texto termina com
     "veja como funciona ↓" apontando para a seção WhatsApp.
- Cada célula: ícone lucide + título + 1 frase + vinheta visual codada (Tailwind puro,
  `aria-hidden`). Hover conforme padrão de cards.
- Entrada com `Reveal` escalonado (delays como em HowItWorks).

### 5. WhatsAppSection (nova)

- SectionHeader alinhado à esquerda na coluna de copy (grid 2 colunas em `md+`).
- **Coluna copy**: eyebrow "LEMBRETES AUTOMÁTICOS", título "Cliente que recebe lembrete,
  aparece", sub explicando o fluxo + 3 bullets (lembrete na véspera, confirmação com um
  toque, aviso de atraso para você). Reforço da métrica: "operações com lembrete automático
  reduzem faltas em até 50%" com o mesmo tom de disclaimer das métricas.
- **Coluna visual**: moldura de celular (div arredondada com borda, notch simples) contendo
  conversa estilo chat: fundo escuro, header do chat com avatar genérico ("Lava-Rápido do
  Bairro") e três mensagens:
  1. Recebida (bolha escura): "Oi, Carlos! Lembrete: sua Lavagem completa é amanhã às 09:00.
     Confirma presença?" + horário.
  2. Enviada (bolha verde escura, alinhada à direita): "Confirmado ✅"
  3. Recebida: "Perfeito! Te esperamos amanhã. 🚗"
- Bolhas entram com `Reveal` escalonado (uma após a outra). `aria-hidden` no mock,
  `sr-only` descrevendo a conversa.
- Sem logo do WhatsApp; ícone `MessageCircle` do lucide é aceitável.

### 6. RoiCalculator (nova, interativa)

- SectionHeader: eyebrow "FAÇA AS CONTAS", título "Quanto você está deixando na mesa?",
  sub "Estimativa rápida com base na sua operação hoje."
- Card central (max-w-3xl) com **3 sliders** (inputs `type="range"` estilizados com accent
  primary + valor numérico visível e editável ao lado):
  - Carros por dia: 1–60, default 15.
  - Ticket médio (R$): 30–300 (passo 5), default 80.
  - Faltas por semana: 0–20, default 4.
- **Cálculo** (client-side, sem persistência):
  - `perdaMensal = faltasPorSemana × ticketMedio × 4.33`
  - `recuperacaoEstimada = perdaMensal × 0.5` (metade das faltas recuperadas — coerente com
    a métrica "−50% de faltas").
  - Exibir: "Faltas custam ~**R$ {perdaMensal}** por mês" e "Com lembretes automáticos você
    recupera ~**R$ {recuperacaoEstimada}/mês** — {múltiplo}× a mensalidade do Operly"
    (múltiplo = recuperacaoEstimada / 397, 1 casa decimal; se < 1, omitir a frase do múltiplo
    e mostrar apenas o valor recuperado).
  - Valores formatados com `Intl.NumberFormat("pt-BR")`, sem centavos.
- Disclaimer pequeno: "Estimativa ilustrativa. Resultados variam conforme a operação."
- CTA primário abaixo do resultado: "Agendar demonstração" (`onDemoClick`).
- Componente com estado (useState); **não** precisa aparecer com valores calculados no HTML
  pré-renderizado — o estado default renderiza igual no servidor e no cliente (sem
  `Math.random`/`Date.now`), evitando mismatch de hidratação.
- Acessibilidade: cada slider com `<label>` associado e `aria-valuetext` legível.

### 7. HowItWorks (mantida)

- Conteúdo dos 3 passos inalterado; apenas adota SectionHeader (eyebrow "COMO FUNCIONA")
  e permanece na posição 7.

### 8. TrustBlock (nova — funde SocialProof + Results)

- SectionHeader: eyebrow "POR QUE CONFIAR", título "Risco zero para testar",
  sub "Sem fidelidade, com garantia e com seus dados sempre exportáveis."
- **Herói do bloco: garantia de 14 dias** — card em destaque (borda primary, ícone Shield
  maior), texto atual mantido.
- Abaixo, os **4 pilares** atuais (Setup rápido, Suporte humano, Sem fidelidade, Dados
  exportáveis) no grid de células com divisórias (`gap-px` como hoje).
- Abaixo, a **faixa de métricas** (grid 2×2 / 4 col) com os valores atuais, exceto:
  - "50+ operações atendidas" → **substituída** por "R$ 0 · de multa para cancelar ·
    sem fidelidade" (ver Decisões de honestidade).
  - Disclaimer atual mantido.

### 9. Pricing (evoluída)

- Mantém: plano único, toggle mensal/anual (R$ 397 / R$ 317), features, botão, microcopy.
- Adota SectionHeader (eyebrow "PREÇO").
- **Adiciona** linha de ancoragem de valor logo abaixo do preço:
  "Se paga recuperando ~5 lavagens no mês." (estático; não depende da calculadora).
- Card ganha o hover/acabamento do padrão novo.

### 10. FAQ (evoluída)

- ID de âncora: `faq`.
- Mantém as 6 perguntas atuais e **adiciona 2**:
  - "Quais formas de pagamento vocês aceitam?" → "Cartão de crédito e Pix, com cobrança
    mensal ou anual." *(o implementador deve manter a resposta genérica se não houver
    confirmação; não inventar bandeiras/condições específicas)*
  - "Tenho mais de uma unidade. Funciona?" → "Sim. Usuários são ilimitados e você pode
    falar com a gente na demonstração para configurar mais de uma operação."
- Adota SectionHeader.

### 11. CalEmbed (mantida)

- Estrutura e lazy-loading intactos. Apenas ajustar o cabeçalho interno ao padrão
  (eyebrow "DEMONSTRAÇÃO").

### 12. Footer

- Adicionar coluna/linha de âncoras (Funcionalidades, Preço, FAQ) junto aos links atuais.
- Resto inalterado.

## Restrições técnicas

- **Stack intacta**: React 19, Tailwind 4 (tokens em `@theme inline`), lucide-react, wouter,
  Radix accordion. Nenhuma dependência nova.
- **Prerender**: `pnpm build` roda tsc + build client + build SSR + `prerender.mjs`. Todas as
  seções novas exceto a calculadora são estáticas; a calculadora renderiza estado default de
  forma determinística. Above the fold (navbar + hero + mockup) deve estar visível no HTML
  pré-renderizado com animação `.rise` CSS-only.
- **Performance**: a troca do print (1918px) pelo mockup em DOM deve **reduzir** o peso da
  página. Não adicionar imagens novas; vinhetas 100% CSS. `dashboard.png` e os imports
  `vite-imagetools` do Hero podem ser removidos se nada mais os usar.
- **Responsivo**: nenhuma seção pode causar scroll horizontal em 320px. Tabela comparativa e
  bento têm layout mobile próprio.
- **Acessibilidade**: mocks visuais com `aria-hidden` + `sr-only`; sliders com labels;
  contraste mínimo AA para texto (gray-300 sobre background atual já passa; manter).
- **Motion**: tudo coberto pelo bloco `prefers-reduced-motion` existente.

## Verificação (critérios de aceite)

1. `pnpm check` (tsc) sem erros.
2. `pnpm build` completo (incl. prerender) sem erros; `dist/index.html` contém o headline e
   o mockup do hero.
3. Dev server: página inteira renderiza em 320px, 375px, 768px e 1280px sem scroll
   horizontal e sem sobreposição.
4. Calculadora: mover sliders atualiza os valores; valores formatados em pt-BR; default
   (15 carros, R$ 80, 4 faltas) exibe perda ≈ R$ 1.386/mês.
5. Âncoras da navbar e do footer levam às seções corretas.
6. Toggle de preço continua funcionando (mensal ↔ anual).
7. Nenhuma menção a depoimentos/clientes inventados; claim "50+" removido.
8. Com `prefers-reduced-motion`, todo o conteúdo fica visível sem animação.
