import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { AppShell } from "../components/AppShell";
import { getFriendProfile } from "../api/friendsService";

export function FriendProfilePage() {
  const { userId } = useParams();
  const [profile, setProfile] = useState(null);
  const [error, setError] = useState("");
  const load = () => { setError(""); getFriendProfile(userId).then(({ data }) => setProfile(data)).catch((requestError) => setError(requestError?.response?.status === 403 ? "You are not authorized to view this profile." : requestError?.response?.status === 404 ? "Friend not found." : "Unable to load this profile.")); };
  useEffect(() => { load(); }, [userId]);
  return <AppShell eyebrow="Friends" title="Friend Profile"><div className="mx-auto max-w-3xl rounded-[2rem] bg-surface-container-low p-6 shadow-ambient md:p-8"><Link className="text-sm font-semibold text-primary" to="/friends">← Back to Friends</Link>{error ? <div className="mt-6 rounded-xl bg-secondary/10 p-4 text-secondary"><p>{error}</p><button className="mt-3 font-semibold underline" onClick={load} type="button">Retry</button></div> : !profile ? <p className="mt-6 text-on-surface-variant">Loading profile...</p> : <><h2 className="mt-6 font-headline text-4xl font-bold">{profile.name}</h2><p className="mt-2 text-on-surface-variant">Friend profile</p><section className="mt-8 rounded-xl bg-surface p-5"><h3 className="font-headline text-2xl font-bold">Workout summary</h3><p className="mt-3 text-on-surface-variant">{profile.workoutSummary.totalWorkouts} total workouts</p>{profile.workoutSummary.recentWorkout ? <p className="mt-2 text-sm">Most recent: {profile.workoutSummary.recentWorkout.name} · {new Date(profile.workoutSummary.recentWorkout.date).toLocaleDateString()}</p> : <p className="mt-2 text-sm text-on-surface-variant">No workouts yet.</p>}</section></>}</div></AppShell>;
}
