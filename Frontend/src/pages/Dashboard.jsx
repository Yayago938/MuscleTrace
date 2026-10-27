import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Header from "../components/dashboard/Header";
import { getDashboard } from "../api/dashboardService";

function WorkoutList({ workouts, emptyText, emptyLink, emptyTo, showFriend }) {
  if (!workouts.length) return <p className="rounded-[1.5rem] bg-surface-container-low px-5 py-6 text-sm text-on-surface-variant">{emptyText} <Link className="font-semibold text-primary" to={emptyTo}>{emptyLink}</Link></p>;
  return <div className="space-y-3">{workouts.map((workout) => <article className="rounded-[1.5rem] bg-surface-container-low px-5 py-4" key={workout.id}><p className="font-semibold">{workout.name}</p><p className="mt-1 text-sm text-on-surface-variant">{showFriend ? `${workout.friendName} · ` : ""}{new Date(workout.date).toLocaleDateString()}</p></article>)}</div>;
}

export function Dashboard() {
  const [data, setData] = useState(null);
  const [error, setError] = useState("");

  const load = () => {
    setError("");
    getDashboard().then(({ data: response }) => setData(response)).catch(() => setError("Unable to load your dashboard."));
  };

  useEffect(() => { load(); }, []);

  return (
    <main className="flex-1 px-8 py-8 max-w-5xl relative">
        <div className="absolute inset-x-0 top-0 h-64 bg-haze pointer-events-none" />
        <div className="relative">
          <Header name="Yash" />
          {error ? <section className="rounded-[2rem] bg-secondary/10 p-6 text-secondary"><p>{error}</p><button className="mt-4 rounded-full bg-surface-container-highest px-5 py-2 text-sm font-semibold" onClick={load} type="button">Retry</button></section> : !data ? <p className="text-on-surface-variant">Loading dashboard...</p> : <div className="grid gap-5 lg:grid-cols-2"><section className="editorial-card p-6"><h2 className="font-headline text-2xl font-bold">Recent workouts</h2><div className="mt-5"><WorkoutList emptyLink="Log your first one" emptyText="No workouts yet –" emptyTo="/workouts/new" workouts={data.recentWorkouts} /></div></section><section className="editorial-card p-6"><h2 className="font-headline text-2xl font-bold">Friends&apos; activity</h2><div className="mt-5"><WorkoutList emptyLink="Add friends" emptyText="Add friends to see their activity." emptyTo="/friends" showFriend workouts={data.friendActivity} /></div></section></div>}
        </div>
    </main>
  )
}

