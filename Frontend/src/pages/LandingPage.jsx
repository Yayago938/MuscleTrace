import { NavLink } from "react-router-dom";
import { PublicLayout } from "../components/PublicLayout";

export function LandingPage() {
  return (
    <PublicLayout>
      <section className="relative min-h-[calc(100vh-5rem)] overflow-hidden px-6 py-16 md:px-8">
        <div className="absolute inset-x-0 top-0 h-[36rem] bg-haze opacity-90" />
        <div className="mx-auto max-w-5xl">
          <div className="relative z-10 py-8">
            <p className="text-xs font-bold uppercase tracking-[0.35em] text-primary">The Digital Atelier</p>
            <h1 className="mt-6 max-w-3xl font-headline text-6xl font-bold leading-[1.04] md:text-8xl">
              Visualize Your <span className="italic text-primary">Strength</span>
            </h1>
            <p className="mt-8 max-w-2xl text-lg leading-8 text-on-surface-variant md:text-2xl">
              Track training, connect with friends, and grow stronger together.
            </p>
            <div className="mt-10 flex flex-col gap-4 sm:flex-row">
              <NavLink className="ember-button justify-center text-center" to="/signup">
                Sign up
              </NavLink>
              <NavLink className="rounded-full bg-surface-container-highest px-8 py-4 text-center text-xs font-bold uppercase tracking-[0.2em] transition hover:bg-surface-variant" to="/login">
                Log in
              </NavLink>
            </div>
          </div>
          <ul className="relative z-10 mt-12 grid gap-4 sm:grid-cols-3">
            {["Track workouts", "Connect with friends", "Join fitness clubs"].map((feature) => <li className="rounded-[1.5rem] bg-surface-container-low p-5 text-on-surface-variant" key={feature}>{feature}</li>)}
          </ul>
        </div>
      </section>
    </PublicLayout>
  );
}

