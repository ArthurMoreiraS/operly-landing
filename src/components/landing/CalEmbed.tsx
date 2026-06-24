import { useEffect, useMemo } from "react";
import Cal, { getCalApi } from "@calcom/embed-react";
import { Check } from "lucide-react";

function normalizeCalLink(value: string) {
  return value.replace(/^https?:\/\/(app\.)?cal\.com\//, "").replace(/^\/+/, "").replace(/\/+$/, "");
}

export function CalEmbed() {
  const calLink = normalizeCalLink(import.meta.env.VITE_CALCOM_EMBED_LINK || "operly-eeqtsh/30min");
  const namespace = useMemo(() => calLink.split("/").filter(Boolean).at(-1) || "demo", [calLink]);

  useEffect(() => {
    void (async () => {
      const cal = await getCalApi({ namespace });
      cal("ui", {
        theme: "dark",
        cssVarsPerTheme: {
          light: { "cal-brand": "#e0734c" },
          dark: { "cal-brand": "#e0734c" },
        },
        hideEventTypeDetails: false,
        layout: "month_view",
      });
    })();
  }, [namespace]);

  return (
    <section id="demo-scheduler" className="relative overflow-hidden px-3 py-16 md:px-4 md:py-24">
      <div className="pointer-events-none absolute bottom-0 right-0 -z-10 h-[600px] w-[600px] rounded-full bg-primary/10 blur-[100px]" />
      <div className="mx-auto max-w-6xl rounded-3xl border border-white/10 bg-card/65 p-4 shadow-2xl sm:p-6 md:p-10">
        <div className="grid items-center gap-8 md:grid-cols-[0.8fr_1.2fr]">
          <div className="text-center md:text-left">
            <h2 className="mb-4 text-3xl font-bold text-white md:text-4xl">Veja o Operly funcionando no seu cenário</h2>
            <p className="mb-8 leading-7 text-gray-300">Escolha um horário. Em 30 minutos mostramos como organizar agenda, clientes e faturamento.</p>
            <ul className="mx-auto max-w-sm space-y-4 text-left md:mx-0">
              {["Configuração inicial orientada", "Demonstração baseada na sua rotina", "Sem compromisso de contratação"].map((benefit) => (
                <li key={benefit} className="flex items-center gap-3 text-sm text-white"><span className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/15 text-primary"><Check className="h-4 w-4" /></span>{benefit}</li>
              ))}
            </ul>
          </div>
          <div className="cal-shell overflow-hidden rounded-2xl border border-white/10 bg-background p-2 sm:p-4">
            <Cal namespace={namespace} calLink={calLink} style={{ width: "100%", height: "640px", overflow: "auto" }} config={{ layout: "month_view", theme: "dark" }} />
          </div>
        </div>
      </div>
    </section>
  );
}
