import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { SectionHeader } from "@/components/landing/SectionHeader";

const faqs = [
  { q: "Preciso instalar alguma coisa?", a: "Não. O Operly funciona no navegador, no computador e no celular. Seus clientes também agendam pelo navegador." },
  { q: "Meus clientes precisam de aplicativo?", a: "Não. Eles abrem o link do seu negócio, escolhem serviço e horário e recebem a confirmação." },
  { q: "Já uso papel ou planilha. Dá para migrar?", a: "Sim. Você pode importar sua lista de clientes e receber ajuda na configuração inicial." },
  { q: "Como funcionam os lembretes no WhatsApp?", a: "O Operly agenda lembretes antes do atendimento usando o número conectado pelo seu negócio." },
  { q: "Tem fidelidade ou multa?", a: "Não. Você pode cancelar quando quiser e continua podendo exportar seus dados." },
  { q: "Quanto tempo leva para começar?", a: "O cadastro inicial de serviços e horários pode ser concluído em poucos minutos." },
  { q: "Quais formas de pagamento vocês aceitam?", a: "Cartão de crédito e Pix, com cobrança mensal ou anual." },
  { q: "Tenho mais de uma unidade. Funciona?", a: "Sim. Usuários são ilimitados e você pode falar com a gente na demonstração para configurar mais de uma operação." },
];

export function FAQ({ onDemoClick }: { onDemoClick: () => void }) {
  return (
    <section id="faq" className="px-4 py-24">
      <div className="mx-auto max-w-3xl">
        <SectionHeader eyebrow="FAQ" title="Perguntas frequentes" subtitle="O que os donos de lava-rápido perguntam antes de começar." className="mb-12" />
        <Accordion type="single" collapsible className="space-y-3">
          {faqs.map((faq, index) => (
            <AccordionItem key={faq.q} value={`item-${index}`} className="rounded-2xl border border-white/10 bg-card/55 px-5">
              <AccordionTrigger>{faq.q}</AccordionTrigger>
              <AccordionContent>{faq.a}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
        <p className="mt-10 text-center text-gray-300">Ainda com dúvida? <button type="button" onClick={onDemoClick} className="font-medium text-primary hover:underline">Converse com a gente na demonstração</button>.</p>
      </div>
    </section>
  );
}
