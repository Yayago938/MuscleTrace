import { useState } from "react";
import { searchExercises } from "../../api/exerciseapi";
import MusclePreview from "../explorer/MusclePreview";
import InfoChip from "../explorer/InfoChip";
import { cleanInstruction, titleCase } from "../../utils/exerciseFormat";

export default function WorkoutExerciseDetailCard({ exercise, children }) {
  const [open, setOpen] = useState(false);
  const [detail, setDetail] = useState(null);
  const [error, setError] = useState("");
  async function toggle() { if (!open && !detail) { try { const response = await searchExercises(exercise.name); const list = response?.data || response?.exercises || response || []; setDetail(list.find((item) => item.name?.toLowerCase() === exercise.name?.toLowerCase()) || list[0] || null); if (!list.length) setError("Exercise details are unavailable."); } catch { setError("Exercise details are unavailable."); } } setOpen(!open); }
  const target = detail?.targetMuscles?.[0] || exercise.muscleName || exercise.muscleGroup;
  return <section className="rounded-[1.5rem] bg-surface-container-low p-5 shadow-ambient"><button aria-expanded={open} className="flex w-full items-start justify-between gap-4 text-left" onClick={toggle} type="button"><div><h3 className="font-headline text-2xl font-bold capitalize">{exercise.name}</h3><p className="mt-1 text-sm text-on-surface-variant capitalize">{target || "Target not provided"}</p></div><span className="material-symbols-outlined">{open ? "expand_less" : "expand_more"}</span></button><div className="mt-4 grid grid-cols-3 gap-3"><InfoChip label="Sets" value={exercise.sets} /><InfoChip label="Reps" value={exercise.reps} /><InfoChip label="Weight" value={exercise.weight === 0 ? "Bodyweight" : `${exercise.weight} kg`} /></div>{children}{open && <div className="mt-6 border-t border-outline-variant pt-6">{detail?.gifUrl && <MusclePreview gifUrl={detail.gifUrl} name={detail.name} primaryMuscle={target} />}<div className="mt-4 grid grid-cols-2 gap-3"><InfoChip label="Equipment" value={titleCase(detail?.equipments?.[0] || "Not provided")} /><InfoChip label="Movement" value={titleCase(detail?.exerciseType || "Not provided")} /></div>{detail?.instructions?.length ? <ol className="mt-6 space-y-3">{detail.instructions.map((step, index) => <li className="flex gap-3 text-sm text-on-surface-variant" key={index}><span className="font-bold text-primary">{index + 1}.</span>{cleanInstruction(step)}</li>)}</ol> : <p className="mt-5 text-sm text-on-surface-variant">{error || "Loading exercise details..."}</p>}</div>}</section>;
}
