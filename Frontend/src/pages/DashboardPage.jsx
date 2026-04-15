import { AppShell } from "../components/AppShell";
import { sessions, weeklyLoad } from "../data/siteData";

export function DashboardPage() {
  return (
    <AppShell
      eyebrow="Weekly progression of the Vitruvian form"
      title="Anatomical Overview"
      toolbar={
        <div className="rounded-[1.5rem] bg-surface-container-low px-5 py-4 text-right shadow-soft">
          <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-on-surface-variant">Readiness Score</p>
          <p className="mt-2 font-headline text-4xl font-bold text-secondary">94%</p>
        </div>
      }
    >
      <div className="mx-auto max-w-7xl">
        <section className="grid gap-8 xl:grid-cols-[1.35fr_0.9fr]">
          <article className="relative overflow-hidden rounded-[2.5rem] bg-surface-container-low p-8 shadow-ambient">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(230,126,34,0.18),_transparent_45%)] opacity-90" />
            <div className="relative flex min-h-[36rem] items-center justify-center">
              <img
                alt="Muscle heatmap"
                className="h-full max-h-[34rem] object-contain drop-shadow-[0_0_18px_rgba(230,126,34,0.32)]"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuAUP7o6PZUM_lto3-VI3yBr4ii9v7QRYRVBIme8rrUSkojgLbsXqwdC__5DPPPBhGUIW3ElkWZQ9v-JD2K2qYvfgBovoNlmEjFektHvLxsc2qXAbguJ617ZdqQ5ZgUw2GXEEPprqOvydzTognKGJ8YST-zEJfYALftjuzuTWFeRdma0TQ2L4LQDOieoqsjVCQAYBxjyS2UGaBEjCEW27HfVpd5YdSAlx0eN7bWi0B26dlTQiXf7xe-Rjf2tQ-zFDbume22dwZg2nAE"
              />
              <div className="glass-panel absolute left-4 top-4 rounded-[1.75rem] border border-white/40 p-4 md:left-8 md:top-8">
                <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-on-surface-variant">Primary Peak</p>
                <p className="mt-2 font-headline text-2xl font-bold">Latissimus Dorsi</p>
                <div className="mt-3 h-1.5 w-24 rounded-full bg-ember" />
              </div>
              <div className="absolute bottom-6 right-6 text-right">
                <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-on-surface-variant">System Calibration</p>
                <p className="mt-2 font-headline text-lg italic text-primary">Atelier v2.4 Active</p>
              </div>
            </div>
          </article>

          <div className="grid gap-8">
            <div className="grid gap-8 sm:grid-cols-2">
              <article className="editorial-card border-b-4 border-primary p-8">
                <span className="material-symbols-outlined text-3xl text-primary">bolt</span>
                <p className="mt-4 text-[10px] font-bold uppercase tracking-[0.22em] text-on-surface-variant">Total Workouts</p>
                <div className="mt-3 flex items-end gap-2">
                  <span className="font-headline text-5xl font-bold">142</span>
                  <span className="pb-1 text-sm font-bold text-secondary">+12%</span>
                </div>
              </article>
              <article className="editorial-card p-8">
                <span className="material-symbols-outlined text-3xl text-secondary">local_fire_department</span>
                <p className="mt-4 text-[10px] font-bold uppercase tracking-[0.22em] text-on-surface-variant">Current Streak</p>
                <div className="mt-3 flex items-end gap-2">
                  <span className="font-headline text-5xl font-bold">18</span>
                  <span className="pb-1 text-sm italic text-on-surface-variant">days</span>
                </div>
              </article>
            </div>

            <article className="rounded-[2rem] bg-surface-container-low p-8 shadow-ambient">
              <div className="flex items-center justify-between">
                <h3 className="text-[10px] font-bold uppercase tracking-[0.24em] text-on-surface-variant">Weekly Volumetric Load</h3>
                <span className="material-symbols-outlined text-on-surface-variant">info</span>
              </div>
              <div className="mt-8 flex h-44 items-end gap-3">
                {weeklyLoad.map((height, index) => (
                  <div
                    className={`flex-1 rounded-t-full ${
                      index === 4 ? "bg-secondary shadow-soft" : index === 2 ? "bg-primary-container" : "bg-surface-variant"
                    }`}
                    key={`${height}-${index}`}
                    style={{ height: `${height}%` }}
                  />
                ))}
              </div>
              <div className="mt-4 flex justify-between text-[10px] font-bold uppercase tracking-[0.22em] text-on-surface-variant">
                {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map((day) => (
                  <span key={day}>{day}</span>
                ))}
              </div>
            </article>

            <article className="editorial-card flex flex-col gap-6 p-8 md:flex-row md:items-center">
              <div className="relative h-32 w-32 shrink-0">
                <svg className="h-full w-full -rotate-90" viewBox="0 0 36 36">
                  <circle cx="18" cy="18" r="16" fill="transparent" stroke="#f5f3ef" strokeWidth="4" />
                  <circle cx="18" cy="18" r="16" fill="transparent" stroke="#b02d21" strokeDasharray="70 100" strokeWidth="4" />
                  <circle cx="18" cy="18" r="16" fill="transparent" stroke="#e67e22" strokeDasharray="30 100" strokeDashoffset="-70" strokeWidth="4" />
                </svg>
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="material-symbols-outlined text-primary">donut_large</span>
                </div>
              </div>
              <div>
                <h3 className="text-[10px] font-bold uppercase tracking-[0.22em] text-on-surface-variant">Muscle Focus</h3>
                <div className="mt-5 space-y-3 text-sm font-semibold">
                  <div className="flex items-center gap-3">
                    <span className="h-2.5 w-2.5 rounded-full bg-secondary" />
                    <span>Posterior Chain (70%)</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="h-2.5 w-2.5 rounded-full bg-primary-container" />
                    <span>Anterior Core (30%)</span>
                  </div>
                </div>
              </div>
            </article>
          </div>
        </section>

        <section className="mt-16">
          <h3 className="font-headline text-3xl font-bold">Recent Atelier Sessions</h3>
          <div className="mt-8 grid gap-6 md:grid-cols-3">
            {sessions.map((session) => (
              <article className="rounded-[2rem] bg-surface-container-low p-6 shadow-ambient transition hover:-translate-y-1 hover:bg-surface-container-lowest" key={session.title}>
                <div className="flex items-center justify-between">
                  <span className="rounded-full bg-primary/10 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.2em] text-primary">{session.type}</span>
                  <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-on-surface-variant">{session.date}</span>
                </div>
                <h4 className="mt-6 font-headline text-2xl font-bold">{session.title}</h4>
                <p className="mt-2 text-sm italic text-on-surface-variant">{session.meta}</p>
                <div className="mt-6 h-1.5 rounded-full bg-surface-variant">
                  <div className="h-full rounded-full bg-ember" style={{ width: `${session.progress}%` }} />
                </div>
              </article>
            ))}
          </div>
        </section>
      </div>
    </AppShell>
  );
}
