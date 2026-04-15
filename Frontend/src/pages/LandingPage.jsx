import { NavLink } from "react-router-dom";
import { PublicLayout } from "../components/PublicLayout";
import { landingFeatures } from "../data/siteData";

export function LandingPage() {
  return (
    <PublicLayout>
      <section className="relative overflow-hidden px-6 pb-24 pt-16 md:px-8">
        <div className="absolute inset-x-0 top-0 h-[36rem] bg-haze opacity-90" />
        <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-2">
          <div className="relative z-10 py-8">
            <p className="text-xs font-bold uppercase tracking-[0.35em] text-primary">The Digital Atelier</p>
            <h1 className="mt-6 max-w-3xl font-headline text-6xl font-bold leading-[1.04] md:text-8xl">
              Visualize Your <span className="italic text-primary">Strength</span>
            </h1>
            <p className="mt-8 max-w-2xl text-lg leading-8 text-on-surface-variant md:text-2xl">
              Track workouts, map muscles, and see your progress like a carefully curated body of work.
            </p>
            <div className="mt-10 flex flex-col gap-4 sm:flex-row">
              <NavLink className="ember-button justify-center text-center" to="/signup">
                Start Session
              </NavLink>
              <NavLink className="rounded-full bg-surface-container-highest px-8 py-4 text-center text-xs font-bold uppercase tracking-[0.2em] transition hover:bg-surface-variant" to="/analytics">
                Explore Heatmaps
              </NavLink>
            </div>
          </div>
          <div className="editorial-card relative overflow-hidden p-6">
            <div className="rounded-[2rem] bg-ember p-8 text-on-primary shadow-soft">
              <p className="text-xs uppercase tracking-[0.28em] opacity-80">Peak Activation</p>
              <div className="mt-8 flex items-end justify-between gap-6">
                <div>
                  <p className="font-headline text-6xl font-bold">94%</p>
                  <p className="mt-2 text-sm uppercase tracking-[0.2em]">Latissimus Dorsi</p>
                </div>
                <div className="h-44 w-32 rounded-[2rem] bg-white/15" />
              </div>
            </div>
            <div className="mt-6 grid grid-cols-2 gap-4">
              <div className="rounded-[2rem] bg-surface-container-low p-6">
                <p className="text-xs uppercase tracking-[0.25em] text-on-surface-variant">Weekly Load</p>
                <div className="mt-6 flex h-24 items-end gap-3">
                  {[40, 58, 76, 54, 90, 62].map((height) => (
                    <div className="flex-1 rounded-t-full bg-primary/80" key={height} style={{ height: `${height}%` }} />
                  ))}
                </div>
              </div>
              <div className="rounded-[2rem] bg-surface-container-lowest p-6 shadow-ambient">
                <p className="text-xs uppercase tracking-[0.25em] text-on-surface-variant">Recovery Score</p>
                <p className="mt-8 font-headline text-5xl font-bold text-secondary">72</p>
                <p className="mt-2 text-sm text-on-surface-variant">Optimized for progressive overload.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-surface-container-low px-6 py-24 md:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="max-w-3xl">
            <h2 className="font-headline text-4xl font-bold md:text-5xl">Precision Performance</h2>
            <p className="mt-5 text-lg text-on-surface-variant">
              Every route in the old static prototype is now represented as a reusable React screen in a single routed application.
            </p>
          </div>
          <div className="mt-12 grid gap-6 lg:grid-cols-3">
            {landingFeatures.map((feature) => (
              <article
                className={`rounded-[2rem] p-8 ${
                  feature.tone === "accent"
                    ? "bg-secondary-container text-white"
                    : feature.tone === "neutral"
                      ? "bg-surface-container-highest"
                      : "bg-surface-container-lowest"
                }`}
                key={feature.title}
              >
                <span className="material-symbols-outlined text-4xl">{feature.icon}</span>
                <h3 className="mt-8 font-headline text-3xl font-bold">{feature.title}</h3>
                <p className={`mt-4 leading-7 ${feature.tone === "accent" ? "text-white/80" : "text-on-surface-variant"}`}>{feature.body}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="px-6 py-24 md:px-8">
        <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[1.2fr_0.8fr]">
          <div className="grid gap-6 md:grid-cols-2">
            <div className="h-80 rounded-[2rem] bg-surface-container-high bg-[radial-gradient(circle_at_top,_rgba(230,126,34,0.3),_transparent_55%)]" />
            <div className="h-80 rounded-[2rem] bg-surface-container-lowest shadow-ambient" />
          </div>
          <div className="self-center">
            <h2 className="font-headline text-5xl font-bold leading-tight">
              The Human Body as a <span className="italic text-primary">Masterpiece</span>
            </h2>
            <p className="mt-6 text-lg leading-8 text-on-surface-variant">
              The React version keeps the original editorial mood while replacing static markup with maintainable components, route-driven navigation, and Tailwind utilities.
            </p>
            <ul className="mt-8 space-y-5">
              {["Scientific foundation", "Premium interface", "Reusable route system"].map((item) => (
                <li className="flex items-start gap-4" key={item}>
                  <span className="material-symbols-outlined text-primary">check_circle</span>
                  <span className="text-on-surface-variant">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className="px-6 pb-24 md:px-8">
        <div className="mx-auto max-w-7xl rounded-[2.5rem] bg-ember px-8 py-16 text-center text-white md:px-16">
          <h2 className="font-headline text-4xl font-bold md:text-6xl">Ready to see what you&apos;re made of?</h2>
          <p className="mx-auto mt-6 max-w-2xl text-lg text-white/80">
            Join the athletes using MuscleTrace to optimize every fiber of performance.
          </p>
          <NavLink className="mt-10 inline-flex rounded-full bg-white px-10 py-5 text-xs font-bold uppercase tracking-[0.2em] text-primary transition hover:scale-[1.02]" to="/signup">
            Start Your Free Trial
          </NavLink>
        </div>
      </section>
    </PublicLayout>
  );
}
