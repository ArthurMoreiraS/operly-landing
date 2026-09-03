import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { SectionHeader } from "@/components/landing/SectionHeader";

const faqs = [
  { q: "Do I need to install anything?", a: "No. Operly runs in your browser on desktop and mobile, and customers book through their browser too." },
  { q: "Do my customers need an app?", a: "No. They open your booking link, choose a service and time, and receive a confirmation." },
  { q: "I use paper or spreadsheets today. Can I migrate?", a: "Yes. You can import your customer list and get help with the initial setup." },
  { q: "How do WhatsApp reminders work?", a: "Operly schedules reminders before each appointment using the number connected by your business." },
  { q: "Is there a contract or cancellation fee?", a: "No. You can cancel anytime and continue to export your data." },
  { q: "How long does setup take?", a: "You can add your first services and business hours in just a few minutes." },
  { q: "Which payment methods do you accept?", a: "Monthly and annual billing are available. We’ll confirm the payment options available to your business during the demo." },
  { q: "I have more than one location. Will it work?", a: "Yes. Users are unlimited, and we can discuss the best setup for multiple locations during your demo." },
];

export function FAQ({ onDemoClick }: { onDemoClick: () => void }) {
  return (
    <section id="faq" className="px-4 py-24">
      <div className="mx-auto max-w-3xl">
        <SectionHeader eyebrow="FAQ" title="Frequently asked questions" subtitle="What car wash and auto detailing owners ask before getting started." className="mb-12" />
        <Accordion type="single" collapsible className="space-y-3">
          {faqs.map((faq, index) => (
            <AccordionItem key={faq.q} value={`item-${index}`} className="rounded-2xl border border-white/10 bg-card/55 px-5">
              <AccordionTrigger>{faq.q}</AccordionTrigger>
              <AccordionContent>{faq.a}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
        <p className="mt-10 text-center text-gray-300">Still have questions? <button type="button" onClick={onDemoClick} className="font-medium text-primary hover:underline">Talk to us during a demo</button>.</p>
      </div>
    </section>
  );
}
