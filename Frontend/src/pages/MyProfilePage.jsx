import { useEffect, useState } from "react";
import { AppShell } from "../components/AppShell";
import { getProfile, updateProfile } from "../api/profileService";

const emptyForm = { weight: "", height: "", dateOfBirth: "", gender: "" };
const inputClass = "mt-2 w-full rounded-xl bg-surface-container-low px-4 py-3 outline-none focus:ring-2 focus:ring-primary/30";

function ageFrom(date) {
  if (!date) return null;
  const birthday = new Date(date);
  const years = new Date().getFullYear() - birthday.getFullYear();
  return new Date() < new Date(birthday.setFullYear(birthday.getFullYear() + years)) ? years - 1 : years;
}

export function MyProfilePage() {
  const [profile, setProfile] = useState(null);
  const [editing, setEditing] = useState(false);
  const [form, setForm] = useState(emptyForm);
  const [error, setError] = useState("");
  const [saving, setSaving] = useState(false);

  const load = () => { setError(""); getProfile().then(({ data }) => { setProfile(data); setForm({ weight: data.weight ?? "", height: data.height ?? "", dateOfBirth: data.dateOfBirth?.slice(0, 10) ?? "", gender: data.gender ?? "" }); }).catch(() => setError("Unable to load your profile.")); };
  useEffect(() => { load(); }, []);

  async function save(event) {
    event.preventDefault();
    const age = ageFrom(form.dateOfBirth);
    if (Number(form.weight) < 20 || Number(form.weight) > 500 || Number(form.height) < 50 || Number(form.height) > 300 || age < 13 || age > 120 || !form.gender) { setError("Enter a weight of 20–500 kg, height of 50–300 cm, age 13–120, and gender."); return; }
    setSaving(true); setError("");
    try { const { data } = await updateProfile({ ...form, weight: Number(form.weight), height: Number(form.height) }); setProfile(data); setEditing(false); } catch (requestError) { setError(requestError?.response?.data?.error || "Unable to save your profile."); } finally { setSaving(false); }
  }

  if (!profile && !error) return <AppShell eyebrow="Profile" title="My Profile"><p className="text-on-surface-variant">Loading profile...</p></AppShell>;
  return <AppShell eyebrow="Profile" title="My Profile"><div className="mx-auto max-w-3xl rounded-[2rem] bg-surface-container-low p-6 shadow-ambient md:p-8">{error && <p className="mb-5 rounded-xl bg-secondary/10 p-4 text-secondary" role="alert">{error} {!profile && <button className="ml-2 font-semibold underline" onClick={load} type="button">Retry</button>}</p>}{editing ? <form className="grid gap-5 sm:grid-cols-2" onSubmit={save}><label>Weight (kg)<input className={inputClass} min="20" onChange={(event) => setForm({ ...form, weight: event.target.value })} required step="0.1" type="number" value={form.weight} /></label><label>Height (cm)<input className={inputClass} min="50" onChange={(event) => setForm({ ...form, height: event.target.value })} required step="0.1" type="number" value={form.height} /></label><label>Date of birth<input className={inputClass} onChange={(event) => setForm({ ...form, dateOfBirth: event.target.value })} required type="date" value={form.dateOfBirth} /></label><label>Gender<select className={inputClass} onChange={(event) => setForm({ ...form, gender: event.target.value })} required value={form.gender}><option value="">Select gender</option><option value="male">Male</option><option value="female">Female</option><option value="other">Other</option><option value="prefer_not_to_say">Prefer not to say</option></select></label><div className="flex gap-3 sm:col-span-2"><button className="ember-button disabled:opacity-60" disabled={saving} type="submit">{saving ? "Saving..." : "Save profile"}</button><button className="rounded-full bg-surface-container-high px-5 py-3 font-semibold" disabled={saving} onClick={() => { setEditing(false); setError(""); }} type="button">Cancel</button></div></form> : <><div className="flex items-start justify-between gap-4"><div><h2 className="font-headline text-3xl font-bold">{profile.name || "Member"}</h2><p className="mt-2 text-sm text-on-surface-variant">Profile status: {profile.profileCompleted ? "Complete" : "Incomplete"}</p></div><button className="ember-button" onClick={() => setEditing(true)} type="button">Edit Profile</button></div><dl className="mt-8 grid gap-5 sm:grid-cols-2">{[["Weight", profile.weight ? `${profile.weight} kg` : "Not provided"], ["Height", profile.height ? `${profile.height} cm` : "Not provided"], ["Date of birth", profile.dateOfBirth ? new Date(profile.dateOfBirth).toLocaleDateString() : "Not provided"], ["Age", ageFrom(profile.dateOfBirth) ?? "Not provided"], ["Gender", profile.gender || "Not provided"]].map(([label, value]) => <div className="rounded-xl bg-surface p-4" key={label}><dt className="text-xs font-bold uppercase tracking-wide text-on-surface-variant">{label}</dt><dd className="mt-2 font-semibold">{value}</dd></div>)}</dl></>}</div></AppShell>;
}
