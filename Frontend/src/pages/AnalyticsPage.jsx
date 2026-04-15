import { AppShell } from "../components/AppShell";
import { analyticsMetrics } from "../data/siteData";

export function AnalyticsPage() {
  return (
    <AppShell
      eyebrow="Performance Analytics • Week 42"
      title="Biometric Intelligence"
      toolbar={
        <div className="flex items-center gap-4">
          <button className="rounded-full bg-surface-container-highest p-3 text-primary transition hover:bg-surface-container-high" type="button">
            <span className="material-symbols-outlined">notifications</span>
          </button>
          <div className="flex h-11 w-11 items-center justify-center rounded-full bg-surface-container-lowest shadow-soft">
            <span className="material-symbols-outlined text-primary">person</span>
          </div>
        </div>
      }
    >
      <div className="mx-auto max-w-7xl">
        <section className="grid gap-8 xl:grid-cols-[1.35fr_0.9fr]">
          <article className="editorial-card p-8">
            <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
              <div>
                <h3 className="font-headline text-3xl font-bold">Strength Trajectory</h3>
                <p className="mt-2 text-[10px] font-bold uppercase tracking-[0.24em] text-on-surface-variant">Composite Power Output (lbs)</p>
              </div>
              <div className="flex flex-wrap gap-2">
                <span className="rounded-full bg-primary-container/10 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.2em] text-primary">High Velocity</span>
                <span className="rounded-full bg-secondary-container/10 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.2em] text-secondary">+12.4%</span>
              </div>
            </div>
            <div className="mt-12 h-80">
              <svg className="h-full w-full overflow-visible" viewBox="0 0 800 300">
                <defs>
                  <linearGradient id="line-grad" x1="0%" x2="0%" y1="0%" y2="100%">
                    <stop offset="0%" style={{ stopColor: "#b02d21", stopOpacity: 0.2 }} />
                    <stop offset="100%" style={{ stopColor: "#b02d21", stopOpacity: 0 }} />
                  </linearGradient>
                </defs>
                {[50, 150, 250].map((y) => (
                  <line key={y} stroke="#efeeea" strokeWidth="1" x1="0" x2="800" y1={y} y2={y} />
                ))}
                <path d="M0,250 L100,220 L200,240 L300,180 L400,160 L500,190 L600,120 L700,90 L800,40 L800,300 L0,300 Z" fill="url(#line-grad)" />
                <path d="M0,250 L100,220 L200,240 L300,180 L400,160 L500,190 L600,120 L700,90 L800,40" fill="none" stroke="#b02d21" strokeLinecap="round" strokeLinejoin="round" strokeWidth="4" />
                <circle cx="300" cy="180" fill="#b02d21" r="6" />
                <circle cx="800" cy="40" fill="#b02d21" r="6" />
              </svg>
              <div className="mt-4 flex justify-between border-t border-outline-variant/20 pt-4 text-[10px] font-bold uppercase tracking-[0.22em] text-on-surface-variant">
                {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map((day) => (
                  <span key={day}>{day}</span>
                ))}
              </div>
            </div>
          </article>

          <div className="grid gap-8">
            <article className="rounded-[2rem] bg-surface-container-high p-6 shadow-ambient">
              <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-on-surface-variant">Physiological State</p>
              <div className="mt-4 flex items-center justify-between gap-4">
                <h3 className="font-headline text-2xl font-bold text-secondary">Peak Overreach</h3>
                <div className="rounded-full bg-secondary-container/20 p-3">
                  <span className="material-symbols-outlined text-3xl text-secondary">warning</span>
                </div>
              </div>
            </article>
            <article className="editorial-card border-l-4 border-primary p-6">
              <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-on-surface-variant">HRV / Recovery</p>
              <div className="mt-4 flex items-end gap-2">
                <span className="font-headline text-5xl font-bold">72</span>
                <span className="pb-1 text-sm text-on-surface-variant">ms</span>
                <span className="ml-auto text-sm font-bold text-primary">+4%</span>
              </div>
              <div className="mt-5 h-2 rounded-full bg-surface-variant">
                <div className="h-full w-[72%] rounded-full bg-primary" />
              </div>
            </article>
            <article className="relative overflow-hidden rounded-[2rem] bg-stone-950 p-6 text-white shadow-ambient">
              <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-white/50">Primary Driver</p>
              <h3 className="mt-4 font-headline text-3xl font-bold">Pectoralis Major</h3>
              <div className="mt-4 flex items-center gap-2 text-xs font-bold uppercase tracking-[0.2em] text-white/80">
                <span className="h-2.5 w-2.5 rounded-full bg-primary-container shadow-[0_0_12px_#e67e22]" />
                94% Activation
              </div>
              <span className="material-symbols-outlined absolute -bottom-5 -right-4 text-[8rem] text-white/10">fitness_center</span>
            </article>
          </div>
        </section>

        <section className="mt-8 grid gap-8 lg:grid-cols-4">
          <article className="rounded-[2rem] bg-surface-container-low p-8 shadow-ambient">
            <h4 className="font-headline text-2xl font-bold">Upper Anterior</h4>
            <div className="mt-8 space-y-5">
              {[
                ["Deltoids", 82, "bg-ember"],
                ["Biceps", 45, "bg-stone-400"],
              ].map(([name, value, tone]) => (
                <div key={name}>
                  <div className="flex justify-between text-[10px] font-bold uppercase tracking-[0.22em] text-on-surface-variant">
                    <span>{name}</span>
                    <span className="text-on-surface">{value}%</span>
                  </div>
                  <div className="mt-2 h-3 rounded-full bg-surface-variant">
                    <div className={`h-full rounded-full ${tone}`} style={{ width: `${value}%` }} />
                  </div>
                </div>
              ))}
            </div>
          </article>
          <article className="rounded-[2rem] bg-surface-container-low p-8 shadow-ambient">
            <h4 className="font-headline text-2xl font-bold">Lower Posterior</h4>
            <div className="mt-8 space-y-5">
              {[
                ["Gluteus", 98, "bg-secondary"],
                ["Hamstrings", 62, "bg-ember"],
              ].map(([name, value, tone]) => (
                <div key={name}>
                  <div className="flex justify-between text-[10px] font-bold uppercase tracking-[0.22em] text-on-surface-variant">
                    <span>{name}</span>
                    <span className="text-on-surface">{value}%</span>
                  </div>
                  <div className="mt-2 h-3 rounded-full bg-surface-variant">
                    <div className={`h-full rounded-full ${tone}`} style={{ width: `${value}%` }} />
                  </div>
                </div>
              ))}
            </div>
          </article>
          <article className="rounded-[2rem] bg-primary/5 p-8 shadow-ambient lg:col-span-2">
            <h4 className="font-headline text-3xl font-bold">Neural Drive Analysis</h4>
            <p className="mt-5 max-w-2xl text-sm italic leading-7 text-on-surface-variant">
              Evidence of peripheral fatigue detected in the kinetic chain. Recommend a 48hr deload for the posterior chain to optimize recovery.
            </p>
            <button className="mt-8 inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.2em] text-primary" type="button">
              Read Detailed Report
              <span className="material-symbols-outlined text-base">arrow_forward</span>
            </button>
          </article>
        </section>

        <section className="mt-8 grid gap-8 lg:grid-cols-3">
          {analyticsMetrics.map((metric) => (
            <article className="editorial-card flex h-64 flex-col justify-between p-8" key={metric.label}>
              <div className="flex items-center justify-between">
                <span className="material-symbols-outlined text-on-surface-variant">{metric.icon}</span>
                <span className="text-[10px] font-bold uppercase tracking-[0.22em] text-on-surface-variant">{metric.label}</span>
              </div>
              <div>
                <p className="font-headline text-5xl font-bold">
                  {metric.value} <span className="font-body text-xl font-medium text-on-surface-variant">{metric.unit}</span>
                </p>
                <p className={`mt-3 text-[10px] font-bold uppercase tracking-[0.22em] ${metric.tone}`}>{metric.note}</p>
              </div>
            </article>
          ))}
        </section>
      </div>
    </AppShell>
  );
}
