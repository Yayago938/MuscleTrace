import { useMemo, useState } from 'react'
import WorkoutCard from '../components/workout/WorkoutCard'
import { getWorkoutDisplayName, useWorkouts } from '../context/WorkoutContext'

export default function SavedWorkouts() {
  const { workouts, loadingWorkouts, workoutsError, openCreateWorkoutModal, refreshWorkouts } = useWorkouts()
  const [search, setSearch] = useState('')

  const filtered = useMemo(() => {
    const query = search.trim().toLowerCase()
    if (!query) return workouts

    return workouts.filter((workout) =>
      getWorkoutDisplayName(workout).toLowerCase().includes(query) ||
      workout.exercises?.some((exercise) => exercise.name?.toLowerCase().includes(query))
    )
  }, [search, workouts])

  return (
    <main className="flex-1 px-8 py-8 max-w-5xl relative">
      <div className="absolute inset-x-0 top-0 h-64 bg-haze pointer-events-none" />

      <div className="relative">
        <div className="flex items-start justify-between gap-6 mb-6">
          <div>
            <h1 className="font-headline text-4xl sm:text-5xl font-bold text-on-surface mb-2">
              Saved Workouts
            </h1>
            <p className="text-sm text-primary max-w-md leading-relaxed">
              Your backend-synced routines and their exercises.
            </p>
          </div>
          <button
            type="button"
            onClick={openCreateWorkoutModal}
            className="ember-button shrink-0 normal-case tracking-normal text-sm gap-2"
          >
            <span className="material-symbols-outlined text-[16px]">add</span>
            Create New Routine
          </button>
        </div>

        <div className="flex items-center gap-4 mb-8 border-b border-outline-variant pb-4">
          <div className="relative ml-auto">
            <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant text-[16px]">
              search
            </span>
            <input
              type="search"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Find a workout..."
              className="bg-surface-container-low rounded-full pl-9 pr-4 py-2 text-xs font-medium placeholder:text-on-surface-variant focus:outline-none focus:ring-2 focus:ring-primary-container w-56"
            />
          </div>
        </div>

        {workoutsError && (
          <div className="mb-6 rounded-editorial bg-secondary/10 px-4 py-3 text-sm font-semibold text-secondary">
            {workoutsError}
            <button type="button" onClick={refreshWorkouts} className="ml-3 underline">
              Retry
            </button>
          </div>
        )}

        {loadingWorkouts ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {Array.from({ length: 6 }).map((_, index) => (
              <div key={index} className="editorial-card h-72 animate-pulse bg-surface-container-low" />
            ))}
          </div>
        ) : filtered.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {filtered.map((workout) => (
              <WorkoutCard key={workout.id} workout={workout} />
            ))}
          </div>
        ) : (
          <div className="editorial-card flex flex-col items-center justify-center gap-4 py-16 text-center text-on-surface-variant">
            <span className="material-symbols-outlined text-4xl">fitness_center</span>
            <div>
              <p className="font-headline text-2xl font-bold text-on-surface">
                {search ? `No workouts match "${search}".` : 'No workouts created yet.'}
              </p>
              <p className="mt-2 text-sm">Create a routine and it will appear here after the backend saves it.</p>
            </div>
            {!search && (
              <button
                type="button"
                onClick={openCreateWorkoutModal}
                className="ember-button normal-case tracking-normal text-sm gap-2"
              >
                <span className="material-symbols-outlined text-[16px]">add</span>
                Create Workout
              </button>
            )}
          </div>
        )}
      </div>
    </main>
  )
}