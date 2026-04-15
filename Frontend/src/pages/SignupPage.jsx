import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const goals = [
  "Hypertrophy & Aesthetics",
  "Endurance & Performance",
  "Rehabilitation & Longevity",
  "Functional Strength",
];

export function SignupPage() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    goal: goals[0],
  });

  function updateField(key, value) {
    setForm((current) => ({ ...current, [key]: value }));
  }

  function handleSubmit(event) {
    event.preventDefault();
    navigate("/dashboard");
  }

  return (
    <main className="relative min-h-screen overflow-hidden bg-background px-6 py-10">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_rgba(230,126,34,0.16),_transparent_35%),radial-gradient(circle_at_bottom_left,_rgba(176,45,33,0.1),_transparent_30%)]" />
      <div className="relative z-10 mx-auto grid min-h-[calc(100vh-5rem)] max-w-7xl items-center gap-12 lg:grid-cols-2">
        <section className="hidden lg:block">
          <p className="font-headline text-4xl font-bold italic text-primary">MuscleTrace</p>
          <h1 className="mt-10 font-headline text-7xl font-bold leading-[1.05]">
            Refine Your <span className="italic text-primary">Physical Masterpiece</span>
          </h1>
          <p className="mt-8 max-w-xl text-xl leading-8 text-on-surface-variant">
            Join an elite community where biometric data meets editorial elegance.
          </p>
        </section>

        <section className="glass-panel rounded-[2.5rem] border border-white/40 p-8 shadow-ambient md:p-12">
          <h2 className="font-headline text-4xl font-bold">Create Your Account</h2>
          <p className="mt-3 text-sm uppercase tracking-[0.24em] text-on-surface-variant">Step into the Digital Atelier</p>
          <form className="mt-10 space-y-5" onSubmit={handleSubmit}>
            <label className="block">
              <span className="ml-1 text-[11px] font-bold uppercase tracking-[0.2em] text-on-surface-variant">Full Name</span>
              <input className="mt-3 w-full rounded-[1.5rem] bg-surface-container-low px-5 py-4 outline-none transition focus:bg-white focus:ring-2 focus:ring-primary/15" onChange={(event) => updateField("name", event.target.value)} value={form.name} />
            </label>
            <label className="block">
              <span className="ml-1 text-[11px] font-bold uppercase tracking-[0.2em] text-on-surface-variant">Email Address</span>
              <input className="mt-3 w-full rounded-[1.5rem] bg-surface-container-low px-5 py-4 outline-none transition focus:bg-white focus:ring-2 focus:ring-primary/15" onChange={(event) => updateField("email", event.target.value)} type="email" value={form.email} />
            </label>
            <label className="block">
              <span className="ml-1 text-[11px] font-bold uppercase tracking-[0.2em] text-on-surface-variant">Password</span>
              <input className="mt-3 w-full rounded-[1.5rem] bg-surface-container-low px-5 py-4 outline-none transition focus:bg-white focus:ring-2 focus:ring-primary/15" onChange={(event) => updateField("password", event.target.value)} type="password" value={form.password} />
            </label>
            <label className="block">
              <span className="ml-1 text-[11px] font-bold uppercase tracking-[0.2em] text-on-surface-variant">Fitness Goals</span>
              <select className="mt-3 w-full rounded-[1.5rem] bg-surface-container-low px-5 py-4 outline-none transition focus:bg-white focus:ring-2 focus:ring-primary/15" onChange={(event) => updateField("goal", event.target.value)} value={form.goal}>
                {goals.map((goal) => (
                  <option key={goal}>{goal}</option>
                ))}
              </select>
            </label>
            <button className="ember-button mt-2 w-full justify-center" type="submit">
              Begin Transformation
            </button>
            <p className="text-center text-sm text-on-surface-variant">
              Already have an account?{" "}
              <Link className="font-semibold text-primary" to="/login">
                Log in
              </Link>
            </p>
          </form>
        </section>
      </div>
    </main>
  );
}
