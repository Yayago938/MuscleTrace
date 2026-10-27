import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { updateProfile } from "../api/profileService";

const inputClass = "mt-3 w-full rounded-[1.5rem] bg-surface-container-low px-5 py-4 outline-none transition focus:bg-white focus:ring-2 focus:ring-primary/15";

export function ProfileSetupPage() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ weight: "", height: "", dateOfBirth: "", gender: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  function updateField(field, value) {
    setForm((current) => ({ ...current, [field]: value }));
    setError("");
  }

  async function handleSubmit(event) {
    event.preventDefault();
    if (loading) return;

    if (!form.weight || !form.height || !form.dateOfBirth || !form.gender) {
      setError("Please complete every field.");
      return;
    }

    const age = (Date.now() - new Date(form.dateOfBirth).getTime()) / 31557600000;
    if (Number(form.weight) < 20 || Number(form.weight) > 500 || Number(form.height) < 50 || Number(form.height) > 300 || age < 13 || age > 120) {
      setError("Enter a weight of 20–500 kg, height of 50–300 cm, and an age between 13 and 120.");
      return;
    }

    setLoading(true);
    try {
      await updateProfile({ ...form, weight: Number(form.weight), height: Number(form.height) });
      navigate("/dashboard", { replace: true });
    } catch (requestError) {
      setError(requestError?.response?.data?.error || "Unable to save your profile. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-background px-6 py-12">
      <div className="absolute inset-0 bg-haze opacity-90" />
      <section className="relative z-10 w-full max-w-lg editorial-card p-8 md:p-12">
        <p className="text-xs font-bold uppercase tracking-[0.3em] text-primary">One last step</p>
        <h1 className="mt-4 font-headline text-4xl font-bold">Set up your profile</h1>
        <p className="mt-3 text-sm leading-6 text-on-surface-variant">This helps MuscleTrace personalize your training record.</p>
        <form className="mt-8 space-y-5" onSubmit={handleSubmit}>
          <label className="block"><span className="ml-1 text-[11px] font-bold uppercase tracking-[0.2em] text-on-surface-variant">Weight (kg)</span><input className={inputClass} min="1" onChange={(event) => updateField("weight", event.target.value)} required step="0.1" type="number" value={form.weight} /></label>
          <label className="block"><span className="ml-1 text-[11px] font-bold uppercase tracking-[0.2em] text-on-surface-variant">Height (cm)</span><input className={inputClass} min="1" onChange={(event) => updateField("height", event.target.value)} required step="0.1" type="number" value={form.height} /></label>
          <label className="block"><span className="ml-1 text-[11px] font-bold uppercase tracking-[0.2em] text-on-surface-variant">Date of birth</span><input className={inputClass} onChange={(event) => updateField("dateOfBirth", event.target.value)} required type="date" value={form.dateOfBirth} /></label>
          <label className="block"><span className="ml-1 text-[11px] font-bold uppercase tracking-[0.2em] text-on-surface-variant">Gender</span><select className={inputClass} onChange={(event) => updateField("gender", event.target.value)} required value={form.gender}><option disabled value="">Select gender</option><option value="male">Male</option><option value="female">Female</option><option value="other">Other</option><option value="prefer_not_to_say">Prefer not to say</option></select></label>
          {error && <p className="rounded-[1.5rem] bg-secondary/10 px-4 py-3 text-sm font-semibold text-secondary" role="alert">{error}</p>}
          <button className="ember-button w-full justify-center disabled:cursor-not-allowed disabled:opacity-60" disabled={loading} type="submit">{loading ? "Saving..." : "Save and continue"}</button>
        </form>
      </section>
    </main>
  );
}
