import { useState } from "react";
import { AppShell } from "../components/AppShell";
import { defaultWorkout } from "../data/siteData";

export function WorkoutPage() {
  const [sets, setSets] = useState(defaultWorkout);

  function updateSet(id, key, value) {
    setSets((current) => current.map((set) => (set.id === id ? { ...set, [key]: value } : set)));
  }

  function addSet() {
    setSets((current) => [
      ...current,
      { id: current.length + 1, set: current.length + 1, weight: "", reps: "", rpe: "-", done: false },
    ]);
  }

  return (
    <AppShell
      eyebrow="Sculpting the Anterior Chain"
      title="Workout Studio"
      toolbar={
        <button className="ember-button justify-center" type="button">
          Complete Workout
        </button>
      }
    >
      <div className="mx-auto max-w-7xl">
        <section className="mb-14 flex flex-col gap-8 xl:flex-row xl:items-end xl:justify-between">
          <div>
            <h2 className="font-headline text-5xl font-bold leading-tight">
              Sculpting the <span className="italic text-primary">Anterior Chain</span>
            </h2>
            <div className="mt-5 flex flex-wrap gap-6 text-sm uppercase tracking-[0.18em] text-on-surface-variant">
              <span>Oct 24, 2023</span>
              <span>00:42:15</span>
              <span>342 kcal</span>
            </div>
          </div>
          <div className="glass-panel w-full max-w-xs rounded-[2rem] border border-white/50 p-4 shadow-ambient">
            <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-on-surface-variant">Target Activation</p>
            <div className="mt-3 rounded-[1.5rem] bg-surface-container p-4">
              <img
                alt="Target activation"
                className="mx-auto h-56 object-contain"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuDy5eazHK0b1hFxGQgO6V8PJmbNr0XhRrbHvQkLHXBtmttEXJAfdMEISWkglKafg30fckW-94PyFXhhzC2mt1OKbaAU-AHYYt5vead5LImuUatDtkar9lNFSLAaI4RVYbmYZXl4Fv9-zRcd20LQwGvuqdCHrJe9XnrU1r63Ig8wTkKquIkaMJ37vEF017tOMziNmSWC-Z6ymaMUuKIRG4cT65BLrbKexcNnPJEbh_PneCBrg1j8j_z6c0A69IDXaIHHpqAa1iaAwA8"
              />
            </div>
            <p className="mt-3 font-headline text-lg italic text-primary">Pectoralis Major</p>
          </div>
        </section>

        <section className="mb-10 flex flex-col gap-4 md:flex-row">
          <label className="relative flex-1">
            <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-on-surface-variant">search</span>
            <input
              className="w-full rounded-[1.5rem] bg-surface-container-low px-12 py-4 outline-none transition focus:bg-white focus:ring-2 focus:ring-primary/15"
              placeholder="Search exercise library..."
              type="text"
            />
          </label>
          <button className="rounded-full bg-surface-container-highest px-8 py-4 text-xs font-bold uppercase tracking-[0.2em] transition hover:bg-surface-container-high" type="button">
            Templates
          </button>
        </section>

        <section className="glass-panel rounded-[2rem] border border-white/50 p-8 shadow-ambient">
          <div className="flex items-start justify-between gap-4">
            <div>
              <h3 className="font-headline text-3xl font-bold">Incline Barbell Bench Press</h3>
              <p className="mt-2 text-sm text-on-surface-variant">Focus: Upper Chest &amp; Shoulders</p>
            </div>
            <button className="text-on-surface-variant transition hover:text-red-600" type="button">
              <span className="material-symbols-outlined">delete_outline</span>
            </button>
          </div>

          <div className="mt-8 grid grid-cols-12 gap-4 px-4 text-[10px] font-bold uppercase tracking-[0.22em] text-on-surface-variant">
            <div className="col-span-1 text-center">Set</div>
            <div className="col-span-4">Weight (kg)</div>
            <div className="col-span-4">Reps</div>
            <div className="col-span-1 text-center">RPE</div>
            <div className="col-span-2 text-right">Done</div>
          </div>

          <div className="mt-4 space-y-3">
            {sets.map((set) => (
              <div className="grid grid-cols-12 items-center gap-4 rounded-[1.5rem] bg-surface-container-low/70 p-4" key={set.id}>
                <div className="col-span-1 text-center font-headline text-2xl font-bold italic text-primary">{set.set}</div>
                <div className="col-span-4">
                  <input
                    className="w-full bg-transparent text-lg font-medium outline-none"
                    onChange={(event) => updateSet(set.id, "weight", event.target.value)}
                    placeholder="--"
                    type="number"
                    value={set.weight}
                  />
                </div>
                <div className="col-span-4">
                  <input
                    className="w-full bg-transparent text-lg font-medium outline-none"
                    onChange={(event) => updateSet(set.id, "reps", event.target.value)}
                    placeholder="--"
                    type="number"
                    value={set.reps}
                  />
                </div>
                <div className="col-span-1 text-center text-xs text-on-surface-variant">{set.rpe}</div>
                <div className="col-span-2 flex justify-end">
                  <button
                    className={`flex h-7 w-7 items-center justify-center rounded-full border-2 transition ${
                      set.done
                        ? "border-primary-container bg-primary-container text-white"
                        : "border-outline-variant text-transparent hover:border-primary-container"
                    }`}
                    onClick={() => updateSet(set.id, "done", !set.done)}
                    type="button"
                  >
                    <span className="material-symbols-outlined text-sm">check</span>
                  </button>
                </div>
              </div>
            ))}
          </div>

          <button className="mt-6 inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.22em] text-primary" onClick={addSet} type="button">
            <span className="material-symbols-outlined text-base">add</span>
            Add Set
          </button>
        </section>

        <section className="mt-8 flex cursor-pointer flex-col items-center justify-center rounded-[2rem] border-2 border-dashed border-outline-variant p-12 text-center text-on-surface-variant transition hover:border-primary hover:text-primary">
          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-surface-container">
            <span className="material-symbols-outlined text-4xl">fitness_center</span>
          </div>
          <p className="mt-4 font-headline text-2xl italic">Add a new movement...</p>
          <p className="mt-2 text-xs font-bold uppercase tracking-[0.22em]">Browse the Atelier Library</p>
        </section>
      </div>
    </AppShell>
  );
}
