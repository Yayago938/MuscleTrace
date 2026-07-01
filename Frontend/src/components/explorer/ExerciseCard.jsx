import { useState } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { getApiErrorMessage, useWorkouts } from '../../context/WorkoutContext'

function toPositiveInt(value) {
  const parsed = Number.parseInt(value, 10)
  return Number.isInteger(parsed) && parsed > 0 ? parsed : null
}

function toNonNegativeFloat(value) {
  const parsed = Number.parseFloat(value)
  return Number.isFinite(parsed) && parsed >= 0 ? parsed : null
}

export default function ExerciseCard({ exercise }) {
  const navigate = useNavigate()
  const location = useLocation()
  const { addExerciseToWorkout, addExerciseToCurrentWorkout, currentWorkoutExercises } = useWorkouts()
  const [imageFailed, setImageFailed] = useState(false)
  const [form, setForm] = useState({ sets: '', reps: '', weight: '' })
  const [message, setMessage] = useState(null)
  const [adding, setAdding] = useState(false)

  const { exerciseId, name, gifUrl, bodyParts = [], targetMuscles = [], equipments = [] } = exercise
  const addingToWorkout = location.state?.addingToWorkout ?? null
  const alreadyAdded = !addingToWorkout && currentWorkoutExercises.some((item) => item.exerciseId === exerciseId)

  const badge = bodyParts[0] || targetMuscles[0] || 'Exercise'
  const muscleLine = [targetMuscles[0], bodyParts[0]].filter(Boolean).join(', ')
  const equipmentLine = equipments[0]
  const showPreview = gifUrl && !imageFailed

  function updateField(field, value) {
    setForm((current) => ({ ...current, [field]: value }))
    setMessage(null)
  }

  async function handleAdd() {
    if (alreadyAdded || adding) return

    const sets = toPositiveInt(form.sets)
    const reps = toPositiveInt(form.reps)
    const weight = toNonNegativeFloat(form.weight)
    const muscleGroup = bodyParts[0]
    const muscleName = targetMuscles[0]

    if (!name || !muscleGroup || !muscleName) {
      setMessage({ type: 'error', text: 'This exercise is missing required muscle details.' })
      return
    }

    if (sets === null || reps === null || weight === null) {
      setMessage({ type: 'error', text: 'Enter sets, reps, and weight before adding.' })
      return
    }

    const selectedExercise = {
      ...exercise,
      exerciseId,
      name,
      sets,
      reps,
      weight,
      muscleGroup,
      muscleName,
    }

    if (!addingToWorkout) {
      addExerciseToCurrentWorkout(selectedExercise)
      setMessage({ type: 'success', text: 'Exercise added to workout' })
      return
    }

    setAdding(true)
    setMessage(null)

    try {
      await addExerciseToWorkout(addingToWorkout, selectedExercise)
      setMessage({ type: 'success', text: 'Exercise added to workout' })
      window.setTimeout(() => navigate(`/workouts/${addingToWorkout}`), 500)
    } catch (err) {
      setMessage({ type: 'error', text: getApiErrorMessage(err, 'Unable to add exercise.') })
    } finally {
      setAdding(false)
    }
  }

  return (
    <div className="rounded-editorial bg-surface-container-lowest shadow-ambient overflow-hidden flex flex-col">
      <div className="relative aspect-[4/3] bg-surface-container">
        <span className="absolute top-3 left-3 z-10 rounded-full bg-surface-container-lowest/90 backdrop-blur px-3 py-1 text-[10px] font-bold uppercase tracking-wide text-on-surface-variant">
          {badge}
        </span>
        {showPreview ? (
          <img
            src={gifUrl}
            alt={name}
            loading="lazy"
            onError={() => setImageFailed(true)}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center px-4 text-center text-xs font-bold uppercase tracking-wide text-on-surface-variant">
            No Preview Available
          </div>
        )}
      </div>

      <div className="p-4 flex flex-col flex-1">
        <h3 className="font-headline text-lg font-bold text-on-surface leading-snug mb-2 capitalize line-clamp-2">
          {name}
        </h3>

        <div className="space-y-1 mb-4">
          {muscleLine && (
            <div className="flex items-center gap-1.5 text-xs text-on-surface-variant capitalize">
              <span className="material-symbols-outlined text-[14px]">target</span>
              {muscleLine}
            </div>
          )}
          {equipmentLine && (
            <div className="flex items-center gap-1.5 text-xs text-on-surface-variant capitalize">
              <span className="material-symbols-outlined text-[14px]">fitness_center</span>
              {equipmentLine}
            </div>
          )}
        </div>

        <div className="mb-4 grid grid-cols-3 gap-2">
          <label className="block">
            <span className="sr-only">Sets</span>
            <input
              type="number"
              min="1"
              inputMode="numeric"
              value={form.sets}
              onChange={(event) => updateField('sets', event.target.value)}
              disabled={alreadyAdded || adding}
              placeholder="Sets"
              className="w-full rounded-full bg-surface-container-low px-3 py-2 text-xs font-semibold outline-none placeholder:text-on-surface-variant focus:ring-2 focus:ring-primary-container disabled:opacity-60"
            />
          </label>
          <label className="block">
            <span className="sr-only">Reps</span>
            <input
              type="number"
              min="1"
              inputMode="numeric"
              value={form.reps}
              onChange={(event) => updateField('reps', event.target.value)}
              disabled={alreadyAdded || adding}
              placeholder="Reps"
              className="w-full rounded-full bg-surface-container-low px-3 py-2 text-xs font-semibold outline-none placeholder:text-on-surface-variant focus:ring-2 focus:ring-primary-container disabled:opacity-60"
            />
          </label>
          <label className="block">
            <span className="sr-only">Weight</span>
            <input
              type="number"
              min="0"
              step="0.5"
              inputMode="decimal"
              value={form.weight}
              onChange={(event) => updateField('weight', event.target.value)}
              disabled={alreadyAdded || adding}
              placeholder="Weight"
              className="w-full rounded-full bg-surface-container-low px-3 py-2 text-xs font-semibold outline-none placeholder:text-on-surface-variant focus:ring-2 focus:ring-primary-container disabled:opacity-60"
            />
          </label>
        </div>

        <div className="mt-auto flex items-center gap-2">
          <button
            type="button"
            onClick={handleAdd}
            disabled={alreadyAdded || adding}
            className={`ember-button flex-1 justify-center normal-case tracking-normal text-xs disabled:cursor-not-allowed disabled:opacity-70 ${
              alreadyAdded ? 'bg-surface-container-highest text-on-surface shadow-none' : ''
            }`}
          >
            {adding ? 'Adding...' : alreadyAdded ? 'Added' : addingToWorkout ? 'Add to Workout' : 'Add to New Routine'}
          </button>
          <button
            type="button"
            onClick={() => navigate(`/exercises/${exerciseId}`)}
            aria-label={`Preview ${name}`}
            className="w-10 h-10 shrink-0 rounded-full bg-surface-container flex items-center justify-center text-on-surface-variant hover:bg-surface-container-high transition-colors"
          >
            <span className="material-symbols-outlined text-[18px]">visibility</span>
          </button>
        </div>

        {message && (
          <p
            role="status"
            className={`mt-3 text-xs font-semibold ${
              message.type === 'success' ? 'text-primary' : 'text-secondary'
            }`}
          >
            {message.text}
          </p>
        )}
      </div>
    </div>
  )
}