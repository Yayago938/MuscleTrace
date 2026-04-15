import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export function LoginPage() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: "", password: "" });

  function handleSubmit(event) {
    event.preventDefault();
    navigate("/dashboard");
  }

  return (
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-background px-6 py-12">
      <div className="absolute inset-0 bg-haze opacity-90" />
      <div className="relative z-10 w-full max-w-lg">
        <div className="mb-12 text-center">
          <Link className="font-headline text-5xl font-bold italic" to="/">
            MuscleTrace
          </Link>
          <p className="mt-3 text-xs uppercase tracking-[0.3em] text-on-surface-variant">Digital Atelier for Human Performance</p>
        </div>
        <div className="editorial-card overflow-hidden p-8 md:p-12">
          <h1 className="font-headline text-4xl font-bold">Enter the Studio</h1>
          <p className="mt-3 text-sm leading-6 text-on-surface-variant">Refine your form. Track your biology. Curate your progress.</p>
          <form className="mt-10 space-y-6" onSubmit={handleSubmit}>
            <label className="block">
              <span className="ml-1 text-[11px] font-bold uppercase tracking-[0.25em] text-on-surface-variant">Email Address</span>
              <input
                className="mt-3 w-full rounded-[1.5rem] bg-surface-container-low px-5 py-4 outline-none ring-0 transition focus:bg-white focus:ring-2 focus:ring-primary/15"
                onChange={(event) => setForm((current) => ({ ...current, email: event.target.value }))}
                placeholder="artist@muscletrace.com"
                type="email"
                value={form.email}
              />
            </label>
            <label className="block">
              <div className="flex items-center justify-between">
                <span className="ml-1 text-[11px] font-bold uppercase tracking-[0.25em] text-on-surface-variant">Password</span>
                <button className="text-[10px] font-bold uppercase tracking-[0.22em] text-primary" type="button">
                  Forgot?
                </button>
              </div>
              <input
                className="mt-3 w-full rounded-[1.5rem] bg-surface-container-low px-5 py-4 outline-none ring-0 transition focus:bg-white focus:ring-2 focus:ring-primary/15"
                onChange={(event) => setForm((current) => ({ ...current, password: event.target.value }))}
                placeholder="••••••••"
                type="password"
                value={form.password}
              />
            </label>
            <button className="ember-button w-full justify-center" type="submit">
              Continue to Dashboard
            </button>
            <div className="flex items-center gap-4 text-[10px] uppercase tracking-[0.22em] text-on-surface-variant">
              <div className="h-px flex-1 bg-outline-variant/30" />
              <span>or register</span>
              <div className="h-px flex-1 bg-outline-variant/30" />
            </div>
            <Link className="block rounded-full bg-surface-container-highest px-6 py-4 text-center text-xs font-bold uppercase tracking-[0.2em] transition hover:bg-surface-container-high" to="/signup">
              Begin Your Membership
            </Link>
          </form>
        </div>
      </div>
    </main>
  );
}
