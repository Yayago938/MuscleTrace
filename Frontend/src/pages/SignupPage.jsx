import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { registerUser } from "../api/authService";

const goals = [
  "Hypertrophy & Aesthetics",
  "Endurance & Performance",
  "Rehabilitation & Longevity",
  "Functional Strength",
];

function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function getAuthErrorMessage(error, fallbackMessage) {
  const status = error?.response?.status;
  const backendMessage = error?.response?.data?.message || error?.response?.data?.error;

  if (backendMessage) return backendMessage;
  if (status === 400 || status === 422) return "Please check your details and try again.";
  if (status === 401) return "Please log in to continue.";
  if (status === 403) return "You do not have permission to create this account.";
  if (status === 404) return "The signup endpoint could not be found.";
  if (status === 409) return "An account with this email already exists.";
  if (status >= 500) return "The server is having trouble. Please try again later.";

  return fallbackMessage;
}

export function SignupPage() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    goal: goals[0],
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  function updateField(key, value) {
    setForm((current) => ({ ...current, [key]: value }));
    setError("");
  }

  async function handleSubmit(event) {
    event.preventDefault();
    if (loading) return;

    const name = form.name.trim();
    const email = form.email.trim();
    const password = form.password;

    if (!name || !email || !password || !form.confirmPassword) {
      setError("Name, email, password, and confirm password are required.");
      return;
    }

    if (!isValidEmail(email)) {
      setError("Enter a valid email address.");
      return;
    }

    if (password !== form.confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const res = await registerUser({ name, email, password });
      const token = res.data?.token;

      if (token) {
        localStorage.setItem("token", token);
        navigate("/dashboard", { replace: true });
        return;
      }

      navigate("/login", { replace: true });
    } catch (err) {
      setError(getAuthErrorMessage(err, "Unable to create your account. Please try again."));
    } finally {
      setLoading(false);
    }
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
              <input className="mt-3 w-full rounded-[1.5rem] bg-surface-container-low px-5 py-4 outline-none transition focus:bg-white focus:ring-2 focus:ring-primary/15" onChange={(event) => updateField("name", event.target.value)} required value={form.name} />
            </label>
            <label className="block">
              <span className="ml-1 text-[11px] font-bold uppercase tracking-[0.2em] text-on-surface-variant">Email Address</span>
              <input className="mt-3 w-full rounded-[1.5rem] bg-surface-container-low px-5 py-4 outline-none transition focus:bg-white focus:ring-2 focus:ring-primary/15" onChange={(event) => updateField("email", event.target.value)} required type="email" value={form.email} />
            </label>
            <label className="block">
              <span className="ml-1 text-[11px] font-bold uppercase tracking-[0.2em] text-on-surface-variant">Password</span>
              <input className="mt-3 w-full rounded-[1.5rem] bg-surface-container-low px-5 py-4 outline-none transition focus:bg-white focus:ring-2 focus:ring-primary/15" onChange={(event) => updateField("password", event.target.value)} required type="password" value={form.password} />
            </label>
            <label className="block">
              <span className="ml-1 text-[11px] font-bold uppercase tracking-[0.2em] text-on-surface-variant">Confirm Password</span>
              <input className="mt-3 w-full rounded-[1.5rem] bg-surface-container-low px-5 py-4 outline-none transition focus:bg-white focus:ring-2 focus:ring-primary/15" onChange={(event) => updateField("confirmPassword", event.target.value)} required type="password" value={form.confirmPassword} />
            </label>
            <label className="block">
              <span className="ml-1 text-[11px] font-bold uppercase tracking-[0.2em] text-on-surface-variant">Fitness Goals</span>
              <select className="mt-3 w-full rounded-[1.5rem] bg-surface-container-low px-5 py-4 outline-none transition focus:bg-white focus:ring-2 focus:ring-primary/15" onChange={(event) => updateField("goal", event.target.value)} value={form.goal}>
                {goals.map((goal) => (
                  <option key={goal}>{goal}</option>
                ))}
              </select>
            </label>

            {error && (
              <p className="rounded-[1.5rem] bg-secondary/10 px-4 py-3 text-sm font-semibold text-secondary" role="alert">
                {error}
              </p>
            )}

            <button className="ember-button mt-2 w-full justify-center disabled:cursor-not-allowed disabled:opacity-60" disabled={loading} type="submit">
              {loading ? "Creating Account..." : "Begin Transformation"}
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