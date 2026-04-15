import { useState } from "react";
import { AppShell } from "../components/AppShell";
import { activityFeed, leaderboardPeople } from "../data/siteData";

export function CommunityPage() {
  const [scope, setScope] = useState("Weekly");

  return (
    <AppShell
      eyebrow="Peak Humanity"
      title="Community Hub"
      toolbar={
        <div className="glass-panel rounded-[1.75rem] border border-white/50 px-5 py-4 shadow-ambient">
          <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-on-surface-variant">Current Rank</p>
          <p className="mt-2 font-headline text-3xl font-bold text-primary">#14 Elite</p>
        </div>
      }
    >
      <div className="mx-auto max-w-7xl">
        <section className="mb-12">
          <h2 className="max-w-3xl font-headline text-5xl font-bold leading-tight md:text-7xl">
            Peak <span className="italic text-primary">Humanity</span>
          </h2>
          <p className="mt-5 max-w-2xl text-xl leading-8 text-on-surface-variant">
            A curated circle of performance. Compare your progress against the global atelier and earn your mark of excellence.
          </p>
        </section>

        <div className="grid gap-8 xl:grid-cols-[1.25fr_0.75fr]">
          <section className="rounded-[2rem] bg-surface-container-low p-8 shadow-ambient">
            <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
              <h3 className="font-headline text-3xl font-bold">Friend Leaderboard</h3>
              <div className="flex gap-2">
                {["Weekly", "All-Time"].map((label) => (
                  <button
                    className={`rounded-full px-4 py-2 text-xs font-bold uppercase tracking-[0.2em] transition ${
                      scope === label ? "bg-surface-container-lowest text-primary shadow-soft" : "text-on-surface-variant hover:bg-surface-container-high"
                    }`}
                    key={label}
                    onClick={() => setScope(label)}
                    type="button"
                  >
                    {label}
                  </button>
                ))}
              </div>
            </div>

            <div className="mt-8 space-y-5">
              {leaderboardPeople.map((person) => (
                <article
                  className={`flex flex-col gap-4 rounded-[1.75rem] p-5 md:flex-row md:items-center md:justify-between ${
                    person.active
                      ? "border-l-4 border-primary bg-gradient-to-r from-primary/5 to-primary-container/10 shadow-soft"
                      : "bg-surface transition hover:-translate-y-1 hover:shadow-ambient"
                  }`}
                  key={person.name}
                >
                  <div className="flex items-center gap-5">
                    <span className={`font-headline text-3xl font-bold italic ${person.active ? "text-primary" : "text-on-surface-variant/50"}`}>
                      {person.rank}
                    </span>
                    <div className="flex h-14 w-14 items-center justify-center rounded-full bg-surface-container-high text-primary shadow-inner">
                      <span className="material-symbols-outlined">person</span>
                    </div>
                    <div>
                      <h4 className="text-lg font-bold">{person.name}</h4>
                      <p className="mt-1 text-sm text-on-surface-variant">{person.streak}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-headline text-2xl font-bold text-primary">{person.score}</p>
                    <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-on-surface-variant">
                      {scope === "Weekly" ? "Lifted This Week" : "Lifetime Volume"}
                    </p>
                  </div>
                </article>
              ))}
            </div>
          </section>

          <section className="rounded-[2rem] bg-surface-container p-8 shadow-ambient">
            <h3 className="font-headline text-3xl font-bold">Achievements</h3>
            <div className="mt-8 grid grid-cols-2 gap-4">
              {[
                ["30 Day Streak", "military_tech", "Unlocked", "bg-primary-fixed text-primary"],
                ["100 Tons Lifted", "weight", "Unlocked", "bg-secondary-fixed text-secondary"],
                ["Sonic Lifter", "bolt", "80% Progress", "bg-surface-variant text-on-surface-variant opacity-70"],
                ["Group Titan", "groups", "2/5 Done", "bg-surface-variant text-on-surface-variant opacity-70"],
              ].map(([title, icon, status, tone]) => (
                <article className="rounded-[1.5rem] bg-surface-container-lowest p-4 text-center" key={title}>
                  <div className={`mx-auto flex h-16 w-16 items-center justify-center rounded-full ${tone}`}>
                    <span className="material-symbols-outlined text-3xl">{icon}</span>
                  </div>
                  <p className="mt-4 text-sm font-bold leading-tight">{title}</p>
                  <p className="mt-2 text-[10px] font-bold uppercase tracking-[0.22em] text-on-surface-variant">{status}</p>
                </article>
              ))}
            </div>
            <div className="mt-8 rounded-[1.75rem] bg-gradient-to-br from-primary to-secondary px-6 py-7 text-white">
              <p className="text-[10px] font-bold uppercase tracking-[0.22em] opacity-80">Next Milestone</p>
              <h4 className="mt-2 font-headline text-xl font-bold">200 Workout Club</h4>
              <div className="mt-5 h-1.5 rounded-full bg-white/20">
                <div className="h-full w-[65%] rounded-full bg-white" />
              </div>
              <p className="mt-2 text-[10px] uppercase tracking-[0.22em] opacity-80">130 / 200 completed</p>
            </div>
          </section>
        </div>

        <section className="mt-8 rounded-[2rem] bg-surface-container-low p-8 shadow-ambient">
          <h3 className="font-headline text-3xl font-bold">Atelier Activity</h3>
          <div className="mt-8 space-y-6">
            {activityFeed.map((item, index) => (
              <article className="flex gap-4" key={item}>
                <div className={`flex h-11 w-11 items-center justify-center rounded-full ${
                  index === 1 ? "bg-secondary text-white" : "bg-surface-container-high text-primary"
                }`}>
                  <span className="material-symbols-outlined">{index === 1 ? "celebration" : "person"}</span>
                </div>
                <div className="flex-1">
                  <p className="text-sm leading-7">{item}</p>
                  <p className="mt-2 text-[10px] font-bold uppercase tracking-[0.22em] text-on-surface-variant">
                    {index === 0 ? "2 hours ago" : index === 1 ? "5 hours ago" : "Yesterday"}
                  </p>
                  {index === 2 ? (
                    <blockquote className="mt-4 rounded-[1.5rem] bg-surface-container-highest p-4 text-sm italic text-on-surface-variant">
                      Precision is everything. The iron does not lie.
                    </blockquote>
                  ) : null}
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="mt-12 overflow-hidden rounded-[2.5rem] bg-stone-950 px-8 py-16 text-white shadow-ambient md:px-12">
          <h3 className="font-headline text-4xl font-bold">Forge Your Legend</h3>
          <p className="mt-5 max-w-2xl text-lg leading-8 text-white/75">
            Join exclusive clubs, participate in global challenges, and turn biometric data into artistic excellence.
          </p>
          <div className="mt-8 flex flex-col gap-4 sm:flex-row">
            <button className="rounded-full bg-primary px-8 py-4 text-xs font-bold uppercase tracking-[0.2em]" type="button">
              Create a Club
            </button>
            <button className="rounded-full border border-white/20 bg-white/10 px-8 py-4 text-xs font-bold uppercase tracking-[0.2em]" type="button">
              Join Challenge
            </button>
          </div>
        </section>
      </div>
    </AppShell>
  );
}
