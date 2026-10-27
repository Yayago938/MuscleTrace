import { useEffect, useState } from "react";
import { getClubs, joinClub, leaveClub } from "../../api/clubsService";

export default function ClubBrowseSection() {
  const [query, setQuery] = useState("");
  const [clubs, setClubs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [mutating, setMutating] = useState("");
  const load = () => { setLoading(true); setError(""); getClubs(query).then(({ data }) => setClubs(data.items)).catch(() => setError("Unable to load clubs.")).finally(() => setLoading(false)); };
  useEffect(() => { const timer = setTimeout(load, 300); return () => clearTimeout(timer); }, [query]);
  async function updateMembership(club) { setMutating(club.id); setError(""); try { club.isMember ? await leaveClub(club.id) : await joinClub(club.id); await load(); } catch (requestError) { setError(requestError?.response?.data?.error || "Unable to update club membership."); } finally { setMutating(""); } }
  return <section className="editorial-card p-6 lg:col-span-2"><div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between"><div><h2 className="font-headline text-2xl font-bold">Browse clubs</h2><p className="mt-1 text-sm text-on-surface-variant">Find a training community to join.</p></div><label className="sr-only" htmlFor="dashboard-club-search">Search clubs</label><input className="rounded-full bg-surface-container-low px-4 py-2 text-sm outline-none focus:ring-2 focus:ring-primary/30" id="dashboard-club-search" onChange={(event) => setQuery(event.target.value)} placeholder="Search clubs" value={query} /></div>{error && <div className="mt-4 rounded-xl bg-secondary/10 p-3 text-sm text-secondary">{error} <button className="font-semibold underline" onClick={load} type="button">Retry</button></div>}{loading ? <p className="mt-5 text-sm text-on-surface-variant">Loading clubs...</p> : clubs.length === 0 ? <p className="mt-5 text-sm text-on-surface-variant">No clubs found.</p> : <div className="mt-5 grid gap-3 sm:grid-cols-2">{clubs.map((club) => <article className="rounded-xl bg-surface-container-low p-4" key={club.id}><h3 className="font-bold">{club.name}</h3><p className="mt-1 line-clamp-2 text-sm text-on-surface-variant">{club.description || "No description."}</p><div className="mt-3 flex items-center justify-between"><span className="text-xs font-semibold text-on-surface-variant">{club.memberCount} members</span><button className="text-sm font-bold text-primary disabled:opacity-50" disabled={mutating === club.id} onClick={() => updateMembership(club)} type="button">{mutating === club.id ? "Saving..." : club.isMember ? "Leave club" : "Join club"}</button></div></article>)}</div>}</section>;
}
