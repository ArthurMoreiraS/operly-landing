import { useEffect, useMemo } from "react";
import Cal, { getCalApi } from "@calcom/embed-react";

function normalizeCalLink(value: string) {
  return value.replace(/^https?:\/\/(app\.)?cal\.com\//, "").replace(/^\/+/, "").replace(/\/+$/, "");
}

/**
 * Embed do Cal.com isolado em seu próprio chunk.
 * Carregado via React.lazy só quando a seção entra na viewport,
 * mantendo o @calcom/embed-react fora do bundle inicial.
 */
export default function CalScheduler() {
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
    <Cal
      namespace={namespace}
      calLink={calLink}
      style={{ width: "100%", height: "640px", overflow: "auto" }}
      config={{ layout: "month_view", theme: "dark" }}
    />
  );
}
