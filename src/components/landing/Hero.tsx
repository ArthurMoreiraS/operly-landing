import { ArrowUpRight, CalendarDays, CheckCheck, DollarSign, Users } from "lucide-react";
import { Button } from "@/components/ui/button";

const appointments = [
  { time: "9:00 AM", service: "Full Wash", vehicle: "Silver Civic" },
  { time: "10:30 AM", service: "Paint Polish", vehicle: "Black Corolla" },
  { time: "1:00 PM", service: "Interior Detail", vehicle: "White Elantra" },
];

function DashboardMockup() {
  return (
    <div className="overflow-hidden rounded-2xl border border-white/10 bg-[hsl(213_25%_13%)] text-left">
      <span className="sr-only">Operly dashboard showing revenue, appointments, customers, and today’s schedule.</span>
      <div aria-hidden="true">
        <div className="flex items-center justify-between border-b border-white/10 px-4 py-3 sm:px-6">
          <div>
            <p className="text-sm font-semibold text-white">Good morning!</p>
            <p className="text-xs text-gray-400">Here’s your business at a glance.</p>
          </div>
          <span className="rounded-lg bg-primary px-3 py-2 text-xs font-semibold text-white">New appointment</span>
        </div>
        <div className="grid gap-3 p-4 sm:grid-cols-3 sm:p-6">
          {[
            { icon: DollarSign, label: "Revenue today", value: "CA$1,250" },
            { icon: CalendarDays, label: "Appointments", value: "14" },
            { icon: Users, label: "Average ticket", value: "CA$89" },
          ].map((metric) => (
            <div key={metric.label} className="rounded-xl border border-white/10 bg-white/[0.04] p-4">
              <div className="mb-3 flex items-center justify-between text-gray-400">
                <span className="text-xs">{metric.label}</span>
                <metric.icon className="h-4 w-4 text-primary" />
              </div>
              <p className="text-xl font-bold text-white">{metric.value}</p>
            </div>
          ))}
        </div>
        <div className="grid gap-3 px-4 pb-4 sm:grid-cols-[1.2fr_0.8fr] sm:px-6 sm:pb-6">
          <div className="hidden rounded-xl border border-white/10 bg-white/[0.04] p-4 sm:block">
            <div className="mb-5 flex items-center justify-between">
              <p className="text-sm font-semibold text-white">Weekly revenue</p>
              <span className="text-xs font-semibold text-primary">+12%</span>
            </div>
            <div className="flex h-28 items-end gap-2">
              {[38, 55, 46, 72, 65, 88, 100].map((height, index) => (
                <div key={index} className="flex-1 rounded-t bg-primary/70" style={{ height: `${height}%` }} />
              ))}
            </div>
          </div>
          <div className="rounded-xl border border-white/10 bg-white/[0.04] p-4">
            <p className="mb-4 text-sm font-semibold text-white">Today’s schedule</p>
            <div className="space-y-2">
              {appointments.map((appointment) => (
                <div key={appointment.time} className="rounded-lg border border-white/5 bg-black/10 p-2.5">
                  <p className="text-xs font-semibold text-primary">{appointment.time}</p>
                  <p className="text-xs font-medium text-white">{appointment.service}</p>
                  <p className="text-[11px] text-gray-400">{appointment.vehicle}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export function Hero({ onDemoClick }: { onDemoClick: () => void }) {
  return (
    <section className="relative px-4 pb-20 pt-32">
      <div className="hero-glow pointer-events-none absolute left-1/2 top-0 -z-10 h-[500px] w-[800px] max-w-[100vw] -translate-x-1/2 rounded-full bg-primary/20 opacity-50 blur-[120px]" />
      <div className="relative z-10 mx-auto max-w-6xl text-center">
        {/* CSS entry animation works in prerendered HTML without waiting for JavaScript. */}
        <div className="rise mb-6 inline-flex items-center rounded-full border border-primary/25 bg-primary/10 px-3 py-1.5 text-sm font-medium text-primary">
          <span className="mr-2 h-2 w-2 animate-pulse rounded-full bg-primary" />
          Built for car washes and auto detailers
        </div>
        <h1 className="rise mb-6 text-4xl font-extrabold leading-[1.08] tracking-[-0.035em] text-white md:text-6xl lg:text-7xl" style={{ animationDelay: "60ms" }}>
          Your customers forget.
          <span className="mt-2 block text-primary">Operly remembers.</span>
        </h1>
        <p className="rise mx-auto mb-10 max-w-2xl text-lg leading-8 text-gray-300 md:text-xl" style={{ animationDelay: "120ms" }}>
          Online booking, work orders, and automated WhatsApp reminders in one place. Less paperwork, fewer no-shows, and more repeat customers.
        </p>
        <div className="rise mb-4 flex flex-col items-center justify-center gap-4 sm:flex-row" style={{ animationDelay: "180ms" }}>
          <Button size="lg" className="w-full rounded-full shadow-lg shadow-primary/20 sm:w-auto" onClick={onDemoClick}>
            See Operly in action
          </Button>
          <Button variant="outline" size="lg" className="w-full rounded-full sm:w-auto" onClick={() => document.getElementById("pricing")?.scrollIntoView({ behavior: "smooth" })}>
            View plans and pricing
          </Button>
        </div>
        <p className="rise mb-16 text-sm text-gray-400" style={{ animationDelay: "200ms" }}>
          30-minute video call · no obligation to subscribe
        </p>

        <div className="rise relative mx-auto max-w-5xl" style={{ animationDelay: "260ms" }}>
          <div className="rounded-3xl border border-white/10 bg-black/15 p-2 shadow-2xl">
            <DashboardMockup />
          </div>
          <div className="surface float absolute -bottom-7 right-6 hidden rounded-2xl p-4 text-left md:block lg:-right-10 lg:bottom-12">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/15 text-primary"><ArrowUpRight className="h-5 w-5" /></div>
              <div><p className="text-xs text-gray-400">Revenue today</p><p className="text-lg font-bold text-white">CA&#36;1,250</p></div>
            </div>
          </div>
          {/* Offset reminder toast animation from the revenue card. */}
          <div className="surface float absolute -top-6 left-6 hidden rounded-2xl p-4 text-left md:block lg:-left-10 lg:top-16" style={{ animationDelay: "2.5s" }}>
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-emerald-500/15 text-emerald-400"><CheckCheck className="h-5 w-5" /></div>
              <div><p className="text-xs text-gray-400">WhatsApp</p><p className="text-sm font-bold text-white">Reminder sent</p></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
