import { BarChart3, CalendarDays, Check, ClipboardCheck, MessageCircle, Repeat } from "lucide-react";
import { Reveal } from "@/components/Reveal";
import { SectionHeader } from "@/components/landing/SectionHeader";

export function FeaturesShowcase() {
  return (
    <section id="features" className="section-alt px-4 py-24">
      <div className="mx-auto max-w-6xl">
        <SectionHeader
          eyebrow="Features"
          title="Everything your operation needs, in one dashboard"
          subtitle="Appointments, finances, and customers stay connected—without a separate spreadsheet."
        />
        <div className="grid gap-4 md:grid-cols-3">
          {/* Online booking. */}
          <Reveal className="card-hover rounded-3xl border border-white/10 bg-card/60 p-6 md:col-span-2">
            <CalendarDays className="mb-4 h-6 w-6 text-primary" />
            <h3 className="mb-2 text-xl font-semibold text-white">Online booking</h3>
            <p className="mb-6 text-sm leading-6 text-gray-300">Customers book through your link, and every appointment appears in your dashboard.</p>
            <div aria-hidden="true" className="space-y-2">
              {[
                { time: "9:00", label: "Full wash · silver Civic", busy: true },
                { time: "10:30", label: "Polish · black Corolla", busy: true },
                { time: "11:30", label: "Available", busy: false },
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

          {/* Work orders. */}
          <Reveal delay={80} className="card-hover rounded-3xl border border-white/10 bg-card/60 p-6">
            <ClipboardCheck className="mb-4 h-6 w-6 text-primary" />
            <h3 className="mb-2 text-xl font-semibold text-white">Work orders</h3>
            <p className="mb-6 text-sm leading-6 text-gray-300">Track every vehicle, its status, and the team member responsible.</p>
            <div aria-hidden="true" className="rounded-xl border border-white/10 bg-white/[0.03] p-3 text-sm">
              <p className="mb-2 font-medium text-white">WO #482 · white Elantra</p>
              <span className="inline-flex rounded-full bg-amber-400/15 px-2 py-0.5 text-xs font-semibold text-amber-300">In progress</span>
            </div>
          </Reveal>

          {/* Recurring memberships. */}
          <Reveal className="card-hover rounded-3xl border border-white/10 bg-card/60 p-6">
            <Repeat className="mb-4 h-6 w-6 text-primary" />
            <h3 className="mb-2 text-xl font-semibold text-white">Recurring memberships</h3>
            <p className="mb-6 text-sm leading-6 text-gray-300">Turn one-time visitors into recurring customers.</p>
            <div aria-hidden="true" className="inline-flex items-center gap-2 rounded-full border border-primary/25 bg-primary/[0.07] px-3 py-1.5 text-xs font-semibold text-primary">
              <Check className="h-3.5 w-3.5" /> Member · Weekly wash
            </div>
          </Reveal>

          {/* Financial dashboard. */}
          <Reveal delay={80} className="card-hover rounded-3xl border border-white/10 bg-card/60 p-6 md:col-span-2">
            <BarChart3 className="mb-4 h-6 w-6 text-primary" />
            <h3 className="mb-2 text-xl font-semibold text-white">Financial dashboard</h3>
            <p className="mb-6 text-sm leading-6 text-gray-300">See daily, weekly, and monthly revenue without doing the math by hand.</p>
            <div aria-hidden="true" className="flex items-end justify-between gap-6">
              <div>
                <p className="text-xs text-gray-400">Revenue this month</p>
                <p className="text-3xl font-bold tabular-nums text-white">CA&#36;18,400</p>
                <p className="text-xs font-semibold text-primary">+12% vs last month</p>
              </div>
              <div className="flex h-16 max-w-40 flex-1 items-end gap-1.5">
                {[40, 65, 50, 80, 70, 100].map((height, index) => (
                  <div key={index} className="flex-1 rounded-t bg-primary/60" style={{ height: `${height}%` }} />
                ))}
              </div>
            </div>
          </Reveal>

          {/* Reminder banner. */}
          <Reveal className="card-hover rounded-3xl border border-white/10 bg-card/60 p-6 md:col-span-3">
            <div className="flex flex-col items-start gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex items-start gap-4">
                <MessageCircle className="mt-1 h-6 w-6 shrink-0 text-primary" />
                <div>
                  <h3 className="mb-1 text-xl font-semibold text-white">Automated WhatsApp reminders</h3>
                  <p className="text-sm leading-6 text-gray-300">Help reduce no-shows with reminders before every appointment.</p>
                </div>
              </div>
              <span className="inline-flex shrink-0 items-center gap-2 rounded-full border border-primary/25 bg-primary/[0.07] px-3 py-1.5 text-xs font-semibold text-primary">
                <Check className="h-3.5 w-3.5" /> Included in your plan
              </span>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
