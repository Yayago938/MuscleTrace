import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  formatWorkoutDate,
  getApiErrorMessage,
  getWorkoutDisplayName,
  useWorkouts,
} from '../../context/WorkoutContext'

export default function WorkoutCard({ workout }) {
  const navigate = useNavigate()
  const { deleteWorkout } = useWorkouts()
  const [confirmingDelete, setConfirmingDelete] = useState(false)
  const [deleting, setDeleting] = useState(false)
  const [error, setError] = useState('')

  const { id, date, createdAt, updatedAt, exercises = [] } = workout
  const name = getWorkoutDisplayName(workout)
  const coverExercise = exercises[0]
  const exerciseCount = exercises.length

  async function handleDelete() {
    setDeleting(true)
    setError('')

    try {
      await deleteWorkout(id)
    } catch (err) {
      setError(getApiErrorMessage(err, 'Unable to delete workout.'))
      setDeleting(false)
      setConfirmingDelete(false)
    }
  }

  return (
    <div className="editorial-card overflow-hidden flex flex-col group">
      <button
        type="button"
        onClick={() => navigate(`/workouts/${id}`)}
        className="relative aspect-[4/3] bg-surface-container overflow-hidden text-left"
        aria-label={`Open ${name}`}
      >
        <div className="w-full h-full flex items-center justify-center">
          <span className="material-symbols-outlined text-4xl text-on-surface-variant">
            fitness_center
          </span>
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-black/25 to-transparent" />
        {coverExercise?.muscleGroup && (
          <span className="absolute left-3 top-3 rounded-full bg-surface-container-lowest/90 px-3 py-1 text-[10px] font-bold uppercase tracking-wide text-on-surface-variant backdrop-blur capitalize">
            {coverExercise.muscleGroup}
          </span>
        )}
      </button>

      <div className="p-4 flex flex-col flex-1">
        <h3 className="font-headline text-lg font-bold text-on-surface leading-snug mb-2">
          {name}
        </h3>

        <div className="flex flex-wrap gap-3 mb-4 text-[11px] text-on-surface-variant font-medium">
          <span className="flex items-center gap-1">
            <span className="material-symbols-outlined text-[13px] text-primary">fitness_center</span>
            {exerciseCount} {exerciseCount === 1 ? 'exercise' : 'exercises'}
          </span>
          <span className="flex items-center gap-1">
            <span className="material-symbols-outlined text-[13px] text-primary">calendar_today</span>
            {formatWorkoutDate(date || createdAt)}
          </span>
          {updatedAt && (
            <span className="flex items-center gap-1">
              <span className="material-symbols-outlined text-[13px] text-primary">update</span>
              {formatWorkoutDate(updatedAt)}
            </span>
          )}
        </div>

        {error && <p className="mb-3 text-xs font-semibold text-secondary">{error}</p>}

        {confirmingDelete ? (
          <div className="mt-auto rounded-editorial bg-surface-container-low p-3">
            <p className="text-xs font-semibold text-on-surface mb-3">Delete this workout?</p>
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => setConfirmingDelete(false)}
                disabled={deleting}
                className="flex-1 rounded-full bg-surface-container px-3 py-2 text-xs font-bold text-on-surface disabled:opacity-50"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleDelete}
                disabled={deleting}
                className="flex-1 rounded-full bg-secondary px-3 py-2 text-xs font-bold text-white disabled:opacity-50"
              >
                {deleting ? 'Deleting...' : 'Delete'}
              </button>
            </div>
          </div>
        ) : (
          <div className="mt-auto flex items-center gap-2 pt-3 border-t border-outline-variant">
            <button
              type="button"
              onClick={() => navigate(`/workouts/${id}`)}
              aria-label="Open workout details"
              className="w-8 h-8 rounded-full flex items-center justify-center text-on-surface-variant hover:bg-surface-container hover:text-on-surface transition-colors"
            >
              <span className="material-symbols-outlined text-[16px]">visibility</span>
            </button>
            <button
              type="button"
              onClick={() => setConfirmingDelete(true)}
              aria-label="Delete workout"
              className="w-8 h-8 rounded-full flex items-center justify-center text-on-surface-variant hover:bg-secondary-fixed hover:text-secondary transition-colors"
            >
              <span className="material-symbols-outlined text-[16px]">delete</span>
            </button>

            <button
              type="button"
              onClick={() => navigate('/workouts/new', { state: { workoutId: id } })}
              className="ember-button ml-auto normal-case tracking-normal text-xs gap-1.5 py-2.5 px-4"
            >
              Start
              <span className="material-symbols-outlined text-[14px]">play_arrow</span>
            </button>
          </div>
        )}
      </div>
    </div>
  )
}