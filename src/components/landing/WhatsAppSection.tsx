import { Check } from "lucide-react";
import { Reveal } from "@/components/Reveal";
import { SectionHeader } from "@/components/landing/SectionHeader";

const bullets = [
  "Automatic reminders before every appointment",
  "Customers confirm with one tap",
  "Confirmations and no-shows appear in your dashboard",
];

const messages = [
  { from: "business", text: "Hi Carlos! A quick reminder: your Full Wash is tomorrow at 9:00 AM. Can you confirm?", time: "6:02 PM" },
  { from: "client", text: "Confirmed ✅", time: "6:05 PM" },
  { from: "business", text: "Perfect! See you tomorrow. 🚗", time: "6:05 PM" },
] as const;

export function WhatsAppSection() {
  return (
    <section id="reminders" className="px-4 py-24">
      <div className="mx-auto grid max-w-6xl items-center gap-12 md:grid-cols-2">
        <div>
          <SectionHeader
            align="left"
            className="mb-8"
            eyebrow="Automated reminders"
            title="Remind customers before every appointment"
            subtitle="Operly sends WhatsApp reminders before each service, so you can focus on the confirmations."
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
            Automated reminders can help businesses record <span className="font-semibold text-primary">up to 50% fewer no-shows</span>.*
          </p>
          <p className="mt-2 text-center text-xs text-gray-500 md:text-left">
            *Illustrative estimate based on product usage. Results vary by business.
          </p>
        </div>

        <div className="mx-auto w-full max-w-[340px]">
          <span className="sr-only">
            Sample conversation: Operly sends an appointment reminder, the customer confirms, and receives a final reply.
          </span>
          {/* Generic chat mockup without WhatsApp brand assets. */}
          <div aria-hidden="true" className="rounded-[2.5rem] border border-white/15 bg-[hsl(213_25%_12%)] p-3 shadow-2xl">
            <div className="overflow-hidden rounded-[2rem] bg-[hsl(213_25%_10%)]">
              <div className="flex items-center gap-3 border-b border-white/5 bg-white/[0.04] px-4 py-3">
                <div className="flex h-9 w-9 items-center justify-center rounded-full bg-primary/20 text-sm font-bold text-primary">LB</div>
                <div>
                  <p className="text-sm font-semibold text-white">Neighbourhood Auto Spa</p>
                  <p className="text-[11px] text-emerald-400">Online</p>
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
