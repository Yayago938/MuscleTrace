import { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import {
  formatWorkoutDate,
  getApiErrorMessage,
  getWorkoutDisplayName,
  useWorkouts,
} from '../context/WorkoutContext'

function toPositiveInt(value) {
  const parsed = Number.parseInt(value, 10)
  return Number.isInteger(parsed) && parsed > 0 ? parsed : null
}

function toNonNegativeFloat(value) {
  const parsed = Number.parseFloat(value)
  return Number.isFinite(parsed) && parsed >= 0 ? parsed : null
}

function ExerciseListItem({ exercise, onSaved, onDelete }) {
  const [editing, setEditing] = useState(false)
  const [saving, setSaving] = useState(false)
  const [deleting, setDeleting] = useState(false)
  const [confirmingDelete, setConfirmingDelete] = useState(false)
  const [error, setError] = useState('')
  const [form, setForm] = useState({
    sets: String(exercise.sets ?? ''),
    reps: String(exercise.reps ?? ''),
    weight: String(exercise.weight ?? ''),
  })

  useEffect(() => {
    setForm({
      sets: String(exercise.sets ?? ''),
      reps: String(exercise.reps ?? ''),
      weight: String(exercise.weight ?? ''),
    })
  }, [exercise])

  function updateField(field, value) {
    setForm((current) => ({ ...current, [field]: value }))
    setError('')
  }

  async function handleSave() {
    const sets = toPositiveInt(form.sets)
    const reps = toPositiveInt(form.reps)
    const weight = toNonNegativeFloat(form.weight)

    if (sets === null || reps === null || weight === null) {
      setError('Sets, reps, and weight must be valid numbers.')
      return
    }

    setSaving(true)
    setError('')

    try {
      await onSaved(exercise.id, { sets, reps, weight })
      setEditing(false)
    } catch (err) {
      setError(getApiErrorMessage(err, 'Unable to update exercise.'))
    } finally {
      setSaving(false)
    }
  }

  async function handleDelete() {
    setDeleting(true)
    setError('')

    try {
      await onDelete(exercise.id)
    } catch (err) {
      setError(getApiErrorMessage(err, 'Unable to delete exercise.'))
      setDeleting(false)
      setConfirmingDelete(false)
    }
  }

  return (
    <div className="editorial-card p-4">
      <div className="flex items-start gap-4">
        <div className="w-16 h-16 rounded-2xl overflow-hidden bg-surface-container shrink-0 flex items-center justify-center">
          <span className="material-symbols-outlined text-on-surface-variant text-[22px]">
            fitness_center
          </span>
        </div>

        <div className="flex-1 min-w-0">
          <h3 className="font-headline text-base font-bold text-on-surface capitalize truncate">
            {exercise.name}
          </h3>
          <div className="mt-1 flex flex-wrap items-center gap-3 text-xs text-on-surface-variant capitalize">
            <span className="flex items-center gap-1">
              <span className="material-symbols-outlined text-[12px] text-primary">target</span>
              {exercise.muscleName || exercise.muscleGroup}
            </span>
            {exercise.muscleGroup && (
              <span className="flex items-center gap-1">
                <span className="material-symbols-outlined text-[12px] text-primary">category</span>
                {exercise.muscleGroup}
              </span>
            )}
          </div>
        </div>

        <button
          type="button"
          onClick={() => setEditing((current) => !current)}
          aria-label={`Edit ${exercise.name}`}
          className="w-9 h-9 rounded-full flex items-center justify-center text-on-surface-variant hover:bg-surface-container hover:text-on-surface transition-colors shrink-0"
        >
          <span className="material-symbols-outlined text-[18px]">edit</span>
        </button>
        <button
          type="button"
          onClick={() => setConfirmingDelete(true)}
          aria-label={`Remove ${exercise.name}`}
          className="w-9 h-9 rounded-full flex items-center justify-center text-on-surface-variant hover:bg-secondary-fixed hover:text-secondary transition-colors shrink-0"
        >
          <span className="material-symbols-outlined text-[18px]">delete</span>
        </button>
      </div>

      {editing ? (
        <div className="mt-4 grid gap-3 sm:grid-cols-3">
          {['sets', 'reps', 'weight'].map((field) => (
            <label key={field} className="block">
              <span className="mb-1 block text-[10px] font-bold uppercase tracking-wide text-on-surface-variant">
                {field}
              </span>
              <input
                type="number"
                min={field === 'weight' ? '0' : '1'}
                step={field === 'weight' ? '0.5' : '1'}
                value={form[field]}
                onChange={(event) => updateField(field, event.target.value)}
                className="w-full rounded-full bg-surface-container-low px-3 py-2 text-sm font-semibold outline-none focus:ring-2 focus:ring-primary-container"
              />
            </label>
          ))}
          <div className="sm:col-span-3 flex items-center justify-end gap-2">
            <button
              type="button"
              onClick={() => setEditing(false)}
              disabled={saving}
              className="rounded-full bg-surface-container px-4 py-2 text-xs font-bold text-on-surface disabled:opacity-50"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={handleSave}
              disabled={saving}
              className="ember-button normal-case tracking-normal text-xs disabled:opacity-60"
            >
              {saving ? 'Saving...' : 'Save'}
            </button>
          </div>
        </div>
      ) : (
        <div className="mt-4 grid grid-cols-3 gap-3 text-sm">
          <div className="rounded-editorial bg-surface-container-low p-3">
            <p className="text-[10px] font-bold uppercase tracking-wide text-on-surface-variant">Sets</p>
            <p className="font-headline text-xl font-bold text-on-surface">{exercise.sets}</p>
          </div>
          <div className="rounded-editorial bg-surface-container-low p-3">
            <p className="text-[10px] font-bold uppercase tracking-wide text-on-surface-variant">Reps</p>
            <p className="font-headline text-xl font-bold text-on-surface">{exercise.reps}</p>
          </div>
          <div className="rounded-editorial bg-surface-container-low p-3">
            <p className="text-[10px] font-bold uppercase tracking-wide text-on-surface-variant">Weight</p>
            <p className="font-headline text-xl font-bold text-on-surface">{exercise.weight}</p>
          </div>
        </div>
      )}

      {confirmingDelete && (
        <div className="mt-4 rounded-editorial bg-secondary/10 p-3">
          <p className="mb-3 text-sm font-semibold text-on-surface">Delete this exercise?</p>
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => setConfirmingDelete(false)}
              disabled={deleting}
              className="rounded-full bg-surface-container px-4 py-2 text-xs font-bold text-on-surface disabled:opacity-50"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={handleDelete}
              disabled={deleting}
              className="rounded-full bg-secondary px-4 py-2 text-xs font-bold text-white disabled:opacity-50"
            >
              {deleting ? 'Deleting...' : 'Delete'}
            </button>
          </div>
        </div>
      )}

      {error && <p role="alert" className="mt-3 text-xs font-semibold text-secondary">{error}</p>}
    </div>
  )
}

export default function EditWorkout() {
  const { workoutId } = useParams()
  const navigate = useNavigate()
  const { loadWorkout, updateExercise, removeExercise } = useWorkouts()
  const [workout, setWorkout] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  async function refreshWorkout() {
    setError('')
    const loaded = await loadWorkout(workoutId)
    setWorkout(loaded)
  }

  useEffect(() => {
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

  async function handleUpdateExercise(exerciseId, payload) {
    await updateExercise(exerciseId, payload)
    await refreshWorkout()
  }

  async function handleDeleteExercise(exerciseId) {
    await removeExercise(workoutId, exerciseId)
    await refreshWorkout()
  }

  if (loading) {
    return (
      <main className="flex-1 px-8 py-8 max-w-3xl">
        <p className="text-sm font-semibold text-on-surface-variant">Loading workout...</p>
      </main>
    )
  }

  if (error || !workout) {
    return (
      <main className="flex-1 px-8 py-8 max-w-5xl">
        <p className="text-secondary text-sm mb-4">{error || 'Workout not found.'}</p>
        <Link to="/workouts" className="text-primary text-sm font-semibold">
          Back to saved workouts
        </Link>
      </main>
    )
  }

  const exercises = workout.exercises ?? []
  const name = getWorkoutDisplayName(workout)

  return (
    <main className="flex-1 px-8 py-8 max-w-3xl relative">
      <div className="absolute inset-x-0 top-0 h-48 bg-haze pointer-events-none" />

      <div className="relative">
        <Link
          to="/workouts"
          className="inline-flex items-center gap-1 text-xs font-bold text-on-surface-variant hover:text-on-surface mb-5"
        >
          <span className="material-symbols-outlined text-[16px]">arrow_back</span>
          Back to saved workouts
        </Link>

        <div className="mb-2">
          <h1 className="font-headline text-3xl sm:text-4xl font-bold text-on-surface">
            {name}
          </h1>
          <p className="mt-2 text-sm text-on-surface-variant">
            {exercises.length} {exercises.length === 1 ? 'exercise' : 'exercises'} | Created {formatWorkoutDate(workout.createdAt || workout.date)} | Updated {formatWorkoutDate(workout.updatedAt)}
          </p>
        </div>

        {exercises.length > 0 ? (
          <div className="space-y-3 mb-6 mt-8">
            {exercises.map((exercise) => (
              <ExerciseListItem
                key={exercise.id}
                exercise={exercise}
                onSaved={handleUpdateExercise}
                onDelete={handleDeleteExercise}
              />
            ))}
          </div>
        ) : (
          <div className="editorial-card flex flex-col items-center justify-center py-16 mb-6 mt-8 text-on-surface-variant gap-3">
            <span className="material-symbols-outlined text-4xl">fitness_center</span>
            <p className="text-sm font-medium">No exercises yet. Add one below.</p>
          </div>
        )}

        <button
          type="button"
          onClick={() => navigate('/exercises', { state: { addingToWorkout: workoutId } })}
          className="w-full flex items-center justify-center gap-2 rounded-2xl border-2 border-dashed border-outline-variant py-4 text-sm font-bold text-on-surface-variant hover:border-primary hover:text-primary transition-colors mb-6"
        >
          <span className="material-symbols-outlined text-[20px]">add_circle</span>
          Add Exercise from Library
        </button>

        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => navigate('/workouts')}
            className="rounded-full bg-surface-container px-6 py-3 text-sm font-bold text-on-surface hover:bg-surface-container-high transition-colors"
          >
            Done
          </button>
          <button
            type="button"
            onClick={() => navigate('/workouts/new', { state: { workoutId } })}
            className="ember-button normal-case tracking-normal text-sm gap-2"
          >
            <span className="material-symbols-outlined text-[16px]">play_arrow</span>
            Start Workout
          </button>
        </div>
      </div>
    </main>
  )
}