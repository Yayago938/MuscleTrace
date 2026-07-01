import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { loginUser } from "../api/authService";

function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function getAuthErrorMessage(error, fallbackMessage) {
  const status = error?.response?.status;
  const backendMessage = error?.response?.data?.message || error?.response?.data?.error;

  if (backendMessage) return backendMessage;
  if (status === 400 || status === 422) return "Please check your details and try again.";
  if (status === 401) return "Invalid email or password. Please try again.";
  if (status === 403) return "You do not have permission to sign in.";
  if (status === 404) return "User not found.";
  if (status === 409) return "This account has a conflict. Please try another email.";
  if (status >= 500) return "The server is having trouble. Please try again later.";

  return fallbackMessage;
}

export function LoginPage() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  function updateField(key, value) {
    setForm((current) => ({ ...current, [key]: value }));
    setError("");
  }

  async function handleSubmit(event) {
    event.preventDefault();
    if (loading) return;

    const email = form.email.trim();
    const password = form.password;

    if (!email || !password) {
      setError("Email and password are required.");
      return;
    }

    if (!isValidEmail(email)) {
      setError("Enter a valid email address.");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const res = await loginUser({ email, password });
      const token = res.data?.token;

      if (!token) {
        throw new Error("Login succeeded but no token was returned.");
      }

      localStorage.setItem("token", token);
      navigate("/dashboard", { replace: true });
    } catch (err) {
      setError(getAuthErrorMessage(err, "Invalid email or password. Please try again."));
    } finally {
      setLoading(false);
    }
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
                onChange={(event) => updateField("email", event.target.value)}
                placeholder="artist@muscletrace.com"
                required
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
                onChange={(event) => updateField("password", event.target.value)}
                placeholder="Password"
                required
                type="password"
                value={form.password}
              />
            </label>

            {error && (
              <p className="rounded-[1.5rem] bg-secondary/10 px-4 py-3 text-sm font-semibold text-secondary" role="alert">
                {error}
              </p>
            )}

            <button className="ember-button w-full justify-center disabled:cursor-not-allowed disabled:opacity-60" disabled={loading} type="submit">
              {loading ? "Signing In..." : "Continue to Dashboard"}
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