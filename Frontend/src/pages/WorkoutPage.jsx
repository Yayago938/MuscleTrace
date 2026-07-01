import { useEffect, useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { AppShell } from '../components/AppShell'
import { formatWorkoutDate, getApiErrorMessage, getWorkoutDisplayName, useWorkouts } from '../context/WorkoutContext'

export function WorkoutPage() {
  const location = useLocation()
  const navigate = useNavigate()
  const { loadWorkout } = useWorkouts()
  const workoutId = location.state?.workoutId
  const [workout, setWorkout] = useState(null)
  const [loading, setLoading] = useState(Boolean(workoutId))
  const [error, setError] = useState('')

  useEffect(() => {
    if (!workoutId) return

    let cancelled = false

    async function load() {
      setLoading(true)
      setError('')

      try {
        const loaded = await loadWorkout(workoutId)
        if (!cancelled) setWorkout(loaded)
      } catch (err) {
        if (!cancelled) setError(getApiErrorMessage(err, 'Unable to load workout.'))
      } finally {
        if (!cancelled) setLoading(false)
      }
    }

    load()
    return () => {
      cancelled = true
    }
  }, [loadWorkout, workoutId])

  if (!workoutId) {
    return (
      <AppShell eyebrow="Workout Studio" title="No Workout Selected">
        <div className="mx-auto max-w-3xl rounded-editorial bg-surface-container-lowest p-8 text-center shadow-ambient">
          <span className="material-symbols-outlined text-4xl text-on-surface-variant">fitness_center</span>
          <p className="mt-4 font-headline text-2xl font-bold text-on-surface">Choose a saved workout to start.</p>
          <Link to="/workouts" className="ember-button mt-6 inline-flex normal-case tracking-normal text-sm">
            Back to Workouts
          </Link>
        </div>
      </AppShell>
    )
  }

  if (loading) {
    return (
      <AppShell eyebrow="Workout Studio" title="Loading Workout">
        <p className="text-sm font-semibold text-on-surface-variant">Loading workout...</p>
      </AppShell>
    )
  }

  if (error || !workout) {
    return (
      <AppShell eyebrow="Workout Studio" title="Workout Unavailable">
        <div className="rounded-editorial bg-secondary/10 p-4 text-sm font-semibold text-secondary">
          {error || 'Workout not found.'}
        </div>
      </AppShell>
    )
  }

  const exercises = workout.exercises ?? []

  return (
    <AppShell
      eyebrow="Workout Studio"
      title={getWorkoutDisplayName(workout)}
      toolbar={
        <button className="ember-button justify-center" type="button" onClick={() => navigate('/history')}>
          Complete Workout
        </button>
      }
    >
      <div className="mx-auto max-w-5xl">
        <section className="mb-10 flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
          <div>
            <h2 className="font-headline text-4xl font-bold leading-tight text-on-surface">
              {getWorkoutDisplayName(workout)}
            </h2>
            <div className="mt-4 flex flex-wrap gap-6 text-sm uppercase tracking-wide text-on-surface-variant">
              <span>{formatWorkoutDate(workout.date || workout.createdAt)}</span>
              <span>{exercises.length} {exercises.length === 1 ? 'exercise' : 'exercises'}</span>
            </div>
          </div>
          <Link to={`/workouts/${workout.id}`} className="rounded-full bg-surface-container-highest px-6 py-3 text-xs font-bold uppercase tracking-wide transition hover:bg-surface-container-high">
            Edit Exercises
          </Link>
        </section>

        {exercises.length > 0 ? (
          <div className="space-y-4">
            {exercises.map((exercise, index) => (
              <section key={exercise.id} className="glass-panel rounded-editorial border border-white/50 p-6 shadow-ambient">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="text-[10px] font-bold uppercase tracking-wide text-primary">Movement {index + 1}</p>
                    <h3 className="mt-1 font-headline text-2xl font-bold capitalize text-on-surface">{exercise.name}</h3>
                    <p className="mt-2 text-sm text-on-surface-variant capitalize">
                      {exercise.muscleName || exercise.muscleGroup}
                    </p>
                  </div>
                  <span className="material-symbols-outlined text-on-surface-variant">fitness_center</span>
                </div>

                <div className="mt-6 grid grid-cols-3 gap-3">
                  <div className="rounded-editorial bg-surface-container-low p-4">
                    <p className="text-[10px] font-bold uppercase tracking-wide text-on-surface-variant">Sets</p>
                    <p className="font-headline text-2xl font-bold text-on-surface">{exercise.sets}</p>
                  </div>
                  <div className="rounded-editorial bg-surface-container-low p-4">
                    <p className="text-[10px] font-bold uppercase tracking-wide text-on-surface-variant">Reps</p>
                    <p className="font-headline text-2xl font-bold text-on-surface">{exercise.reps}</p>
                  </div>
                  <div className="rounded-editorial bg-surface-container-low p-4">
                    <p className="text-[10px] font-bold uppercase tracking-wide text-on-surface-variant">Weight</p>
                    <p className="font-headline text-2xl font-bold text-on-surface">{exercise.weight}</p>
                  </div>
                </div>
              </section>
            ))}
          </div>
        ) : (
          <div className="rounded-editorial border-2 border-dashed border-outline-variant p-12 text-center text-on-surface-variant">
            <span className="material-symbols-outlined text-4xl">fitness_center</span>
            <p className="mt-4 font-headline text-2xl font-bold text-on-surface">No exercises in this workout yet.</p>
            <button
              type="button"
              onClick={() => navigate('/exercises', { state: { addingToWorkout: workout.id } })}
              className="ember-button mt-6 normal-case tracking-normal text-sm"
            >
              Add Exercise
            </button>
          </div>
        )}
      </div>
    </AppShell>
  )
}