import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import logo from "@/assets/logo.png";

type LegalKind = "terms" | "privacy";

type LegalSection = {
  title: string;
  body: string[];
};

const UPDATED_AT = "12 de junho de 2026";

const termsSections: LegalSection[] = [
  {
    title: "1. Aceite e escopo",
    body: [
      "Estes Termos de Uso regulam o acesso e o uso do Operly, uma plataforma de CRM, agenda, gestão operacional e automações para lava-rápidos e estética automotiva.",
      "Ao contratar, acessar ou usar o Operly, você declara que leu, entendeu e concorda com estes termos em nome próprio ou da empresa que representa.",
    ],
  },
  {
    title: "2. Conta, acesso e responsabilidades",
    body: [
      "O usuário responsável pela conta deve manter dados cadastrais corretos, proteger suas credenciais e controlar quem tem acesso ao ambiente da empresa.",
      "Cada negócio cadastrado no Operly é tratado como um ambiente separado. Você é responsável pelas informações inseridas no sistema, inclusive dados de clientes, veículos, serviços, agendamentos, cobranças e mensagens.",
    ],
  },
  {
    title: "3. Uso permitido da plataforma",
    body: [
      "O Operly deve ser usado apenas para fins lícitos e relacionados à operação do negócio contratado.",
      "É proibido usar a plataforma para enviar spam, mensagens abusivas, conteúdo ilegal, tentativas de invasão, engenharia reversa, sobrecarga intencional dos sistemas ou qualquer atividade que prejudique outros usuários, terceiros ou a própria Operly.",
    ],
  },
  {
    title: "4. Dados de clientes e comunicações",
    body: [
      "Você deve garantir que possui base legal adequada para cadastrar clientes, registrar veículos, armazenar histórico de atendimento e enviar comunicações por WhatsApp, e-mail ou outros canais conectados ao Operly.",
      "Quando a Operly processa dados dos clientes finais do seu negócio dentro da plataforma, ela atua em nome do negócio contratante, conforme as instruções recebidas e os recursos disponíveis no sistema.",
    ],
  },
  {
    title: "5. Assinatura, cobrança e cancelamento",
    body: [
      "As condições comerciais, valores, ciclo de cobrança e eventuais períodos promocionais são os informados no momento da contratação ou em proposta comercial aceita.",
      "A falta de pagamento pode gerar limitação, suspensão ou encerramento do acesso, sem prejuízo da cobrança de valores vencidos. O cancelamento impede novas cobranças recorrentes, mas não elimina valores já devidos ou serviços já prestados.",
    ],
  },
  {
    title: "6. Integrações e disponibilidade",
    body: [
      "Alguns recursos dependem de serviços de terceiros, como provedores de WhatsApp, agenda, hospedagem, e-mail, pagamentos ou infraestrutura. Instabilidades, limites ou mudanças nesses serviços podem afetar funcionalidades do Operly.",
      "A Operly trabalha para manter a plataforma disponível e segura, mas não garante operação ininterrupta, ausência total de erros ou compatibilidade permanente com serviços externos.",
    ],
  },
  {
    title: "7. Propriedade intelectual",
    body: [
      "A marca Operly, o software, a interface, os fluxos, textos, componentes, códigos e demais elementos da plataforma pertencem à Operly ou a seus licenciadores.",
      "A contratação concede apenas uma licença limitada, revogável, não exclusiva e intransferível para uso da plataforma durante a vigência da assinatura.",
    ],
  },
  {
    title: "8. Limitação de responsabilidade",
    body: [
      "O Operly é uma ferramenta de apoio operacional. Decisões comerciais, atendimento ao consumidor, cumprimento de obrigações legais, fiscais, trabalhistas e de proteção de dados permanecem sob responsabilidade do negócio contratante.",
      "Na máxima extensão permitida pela legislação aplicável, a Operly não será responsável por lucros cessantes, perda de receita, danos indiretos, falhas de terceiros, uso indevido da conta ou dados incorretos inseridos pelos usuários.",
    ],
  },
  {
    title: "9. Alterações destes termos",
    body: [
      "A Operly pode atualizar estes termos para refletir melhorias do produto, exigências legais ou mudanças comerciais. Quando a alteração for relevante, buscaremos comunicar pelos canais disponíveis.",
      "O uso contínuo da plataforma após a atualização indica concordância com a nova versão.",
    ],
  },
  {
    title: "10. Contato",
    body: [
      "Para dúvidas sobre estes termos, fale com a Operly pelos canais oficiais disponíveis no site ou pelo Instagram @operlybr.",
    ],
  },
];

const privacySections: LegalSection[] = [
  {
    title: "1. Visão geral",
    body: [
      "Esta Política de Privacidade explica como a Operly trata dados pessoais ao oferecer sua landing page, demonstrações, contas de acesso e a plataforma SaaS usada por negócios automotivos.",
      "A Operly observa a Lei Geral de Proteção de Dados Pessoais (LGPD) e aplica medidas razoáveis para proteger informações pessoais tratadas em seus sistemas.",
    ],
  },
  {
    title: "2. Papel da Operly no tratamento de dados",
    body: [
      "Para dados de visitantes do site, leads, contratantes e usuários da conta, a Operly atua como controladora, definindo finalidades e meios do tratamento.",
      "Para dados de clientes finais cadastrados por lava-rápidos e estéticas automotivas dentro da plataforma, como nome, telefone, e-mail, veículo, histórico de serviços e agendamentos, a Operly atua, em regra, como operadora em nome do negócio contratante.",
    ],
  },
  {
    title: "3. Dados que podemos coletar",
    body: [
      "Podemos tratar dados cadastrais e de contato, como nome, e-mail, telefone, empresa, cargo, dados de login e informações fornecidas ao solicitar uma demonstração.",
      "Também podemos tratar dados operacionais inseridos na plataforma, como clientes, veículos, serviços, ordens de serviço, agendamentos, preferências de comunicação, mensagens, cobranças e registros de uso.",
      "Coletamos ainda dados técnicos, como endereço IP, identificadores de sessão, dispositivo, navegador, logs de acesso, páginas visitadas e eventos necessários para segurança, diagnóstico e melhoria do produto.",
    ],
  },
  {
    title: "4. Finalidades de uso",
    body: [
      "Usamos dados pessoais para criar e administrar contas, prestar suporte, operar funcionalidades do CRM, permitir agendamentos, enviar lembretes e comunicações operacionais, processar solicitações e melhorar a plataforma.",
      "Também podemos usar dados para segurança, prevenção a fraude, cumprimento de obrigações legais, análise de desempenho, relacionamento comercial e envio de comunicações sobre a Operly quando permitido pela legislação aplicável.",
    ],
  },
  {
    title: "5. Compartilhamento com terceiros",
    body: [
      "Podemos compartilhar dados com fornecedores que ajudam a operar o serviço, como hospedagem, banco de dados, autenticação, e-mail, agenda, WhatsApp, análise de uso, atendimento, cobrança e ferramentas administrativas.",
      "Esses fornecedores devem tratar os dados conforme contratos, instruções aplicáveis e medidas de segurança compatíveis com a natureza do serviço.",
      "Também poderemos compartilhar dados quando necessário para cumprir lei, ordem de autoridade competente, defesa de direitos ou proteção da segurança da plataforma e de seus usuários.",
    ],
  },
  {
    title: "6. WhatsApp, mensagens e clientes finais",
    body: [
      "Quando o negócio contratante conecta recursos de WhatsApp ou mensagens, a Operly pode tratar números de telefone, conteúdo de mensagens, status de envio e informações necessárias para executar lembretes, confirmações e comunicações operacionais.",
      "O negócio contratante é responsável por informar seus clientes finais e obter as autorizações ou bases legais necessárias para essas comunicações.",
    ],
  },
  {
    title: "7. Cookies e tecnologias semelhantes",
    body: [
      "Podemos usar cookies, armazenamento local e tecnologias semelhantes para manter sessões, lembrar preferências, medir desempenho, entender navegação e proteger a plataforma.",
      "Você pode gerenciar cookies pelo navegador, mas a desativação de certos recursos pode afetar login, segurança ou funcionalidades essenciais.",
    ],
  },
  {
    title: "8. Retenção e exclusão",
    body: [
      "Mantemos dados pessoais pelo tempo necessário para cumprir as finalidades descritas nesta política, executar contratos, resolver disputas, preservar registros de segurança e cumprir obrigações legais.",
      "Quando uma conta é encerrada, dados podem ser excluídos, anonimizados ou retidos por prazo razoável quando houver obrigação legal, prevenção a fraude, auditoria, backup ou defesa de direitos.",
    ],
  },
  {
    title: "9. Segurança da informação",
    body: [
      "Adotamos medidas técnicas e administrativas para proteger dados contra acesso não autorizado, perda, alteração indevida, divulgação ou destruição.",
      "Nenhum sistema é totalmente imune a riscos. Por isso, usuários também devem proteger senhas, limitar acessos internos e manter dados da conta atualizados.",
    ],
  },
  {
    title: "10. Direitos dos titulares",
    body: [
      "Nos termos da LGPD, titulares podem solicitar confirmação de tratamento, acesso, correção, anonimização, bloqueio, eliminação, portabilidade, informação sobre compartilhamento e revisão de decisões automatizadas, quando aplicável.",
      "Quando a solicitação envolver dados cadastrados por um negócio contratante sobre seus próprios clientes, poderemos orientar o titular a procurar diretamente esse negócio, que é o controlador desses dados.",
    ],
  },
  {
    title: "11. Transferências internacionais",
    body: [
      "Alguns fornecedores de tecnologia podem processar ou armazenar dados fora do Brasil. Nesses casos, buscamos utilizar fornecedores e mecanismos compatíveis com a legislação aplicável de proteção de dados.",
    ],
  },
  {
    title: "12. Atualizações e contato",
    body: [
      "Esta política pode ser atualizada para refletir mudanças legais, operacionais ou de produto. A versão vigente ficará disponível nesta página.",
      "Para dúvidas ou solicitações sobre privacidade, fale com a Operly pelos canais oficiais disponíveis no site ou pelo Instagram @operlybr.",
    ],
  },
];

const contentByKind: Record<
  LegalKind,
  {
    title: string;
    subtitle: string;
    pageTitle: string;
    sections: LegalSection[];
  }
> = {
  terms: {
    title: "Termos de Uso",
    subtitle: "Regras comerciais e operacionais para uso do Operly.",
    pageTitle: "Termos de Uso",
    sections: termsSections,
  },
  privacy: {
    title: "Política de Privacidade",
    subtitle: "Como tratamos dados pessoais na landing page, nas demonstrações e na plataforma.",
    pageTitle: "Política de Privacidade",
    sections: privacySections,
  },
};

export default function LegalPage({ kind }: { kind: LegalKind }) {
  const content = contentByKind[kind];

  return (
    <main className="min-h-screen bg-background text-foreground">
      <header className="border-b border-white/5 bg-background/80 backdrop-blur-md">
        <div className="container mx-auto max-w-4xl px-4 py-5 flex items-center justify-between gap-4">
          <a href="/" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
            <img src={logo} alt="Operly" className="h-8 w-8 object-contain" />
            <span className="text-xl font-bold tracking-tight text-white">Operly</span>
          </a>
          <Button
            asChild
            variant="ghost"
            className="text-muted-foreground hover:text-white"
          >
            <a href="/">
              <ArrowLeft className="h-4 w-4" />
              Voltar
            </a>
          </Button>
        </div>
      </header>

      <section className="px-4 py-14 md:py-20">
        <div className="container mx-auto max-w-4xl">
          <div className="mb-10">
            <p className="text-sm font-medium text-primary mb-3">
              Última atualização: {UPDATED_AT}
            </p>
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-white mb-4">
              {content.title}
            </h1>
            <p className="text-lg text-muted-foreground leading-relaxed max-w-2xl">
              {content.subtitle}
            </p>
          </div>

          <div className="rounded-2xl border border-white/10 bg-white/5 p-5 md:p-8 shadow-xl shadow-black/20">
            <div className="space-y-9">
              {content.sections.map((section) => (
                <section key={section.title}>
                  <h2 className="text-xl font-semibold text-white mb-3">
                    {section.title}
                  </h2>
                  <div className="space-y-3 text-sm md:text-base leading-7 text-muted-foreground">
                    {section.body.map((paragraph) => (
                      <p key={paragraph}>{paragraph}</p>
                    ))}
                  </div>
                </section>
              ))}
            </div>
          </div>

          <div className="mt-10 flex flex-col sm:flex-row gap-3 sm:items-center sm:justify-between text-sm text-muted-foreground">
            <p>© 2026 Operly. Todos os direitos reservados.</p>
            <div className="flex gap-5">
              <a href="/termos" className="hover:text-white transition-colors">
                Termos
              </a>
              <a href="/privacidade" className="hover:text-white transition-colors">
                Privacidade
              </a>
              <a
                href="https://instagram.com/operlybr"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-white transition-colors"
              >
                Instagram
              </a>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
