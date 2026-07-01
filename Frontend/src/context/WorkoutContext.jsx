import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react'
import CreateWorkoutModal from '../components/workout/CreateWorkoutModal'
import {
  createWorkout as createWorkoutRequest,
  deleteWorkout as deleteWorkoutRequest,
  getWorkoutById,
  getWorkouts,
} from '../api/workoutService'
import {
  addExerciseToWorkout as addExerciseRequest,
  deleteExercise as deleteExerciseRequest,
  updateExercise as updateExerciseRequest,
} from '../api/exerciseService'

const WorkoutContext = createContext(null)

export function getApiErrorMessage(error, fallback = 'Something went wrong. Please try again.') {
  const status = error?.response?.status
  const backendMessage = error?.response?.data?.message || error?.response?.data?.error

  if (backendMessage) return backendMessage
  if (status === 400) return 'Please check the submitted workout details.'
  if (status === 401) return 'Your session has expired. Please log in again.'
  if (status === 403) return 'You are not allowed to access this workout.'
  if (status === 404) return 'The requested workout was not found.'
  if (status === 422) return 'Please correct the workout details and try again.'
  if (status >= 500) return 'The server could not complete this workout action right now.'

  return error?.message || fallback
}

export function formatWorkoutDate(value) {
  if (!value) return 'No date'
  const date = new Date(value)
  if (Number.isNaN(date.getTime())) return 'No date'
  return date.toLocaleDateString('en-US', { month: 'short', day: '2-digit', year: 'numeric' })
}

export function getWorkoutDisplayName(workout) {
  if (!workout) return 'Workout'
  if (workout.name) return workout.name
  const firstExercise = workout.exercises?.[0]?.name
  if (firstExercise) return `${firstExercise} Workout`
  return `Workout ${formatWorkoutDate(workout.date || workout.createdAt)}`
}

export function normalizeExercisePayload(exercise) {
  return {
    workoutId: exercise.workoutId,
    name: exercise.name,
    sets: Number(exercise.sets),
    reps: Number(exercise.reps),
    weight: Number(exercise.weight),
    muscleGroup: exercise.muscleGroup,
    muscleName: exercise.muscleName,
  }
}

export function WorkoutProvider({ children }) {
  const [workouts, setWorkouts] = useState([])
  const [loadingWorkouts, setLoadingWorkouts] = useState(false)
  const [workoutsError, setWorkoutsError] = useState('')
  const [currentWorkoutExercises, setCurrentWorkoutExercises] = useState([])
  const [createModalOpen, setCreateModalOpen] = useState(false)
  const [creatingWorkout, setCreatingWorkout] = useState(false)
  const [createWorkoutError, setCreateWorkoutError] = useState('')

  const refreshWorkouts = useCallback(async () => {
    setLoadingWorkouts(true)
    setWorkoutsError('')

    try {
      const response = await getWorkouts()
      setWorkouts(Array.isArray(response.data) ? response.data : [])
    } catch (error) {
      setWorkoutsError(getApiErrorMessage(error, 'Unable to load workouts.'))
    } finally {
      setLoadingWorkouts(false)
    }
  }, [])

  useEffect(() => {
    if (localStorage.getItem('token')) {
      refreshWorkouts()
    }
  }, [refreshWorkouts])

  const openCreateWorkoutModal = useCallback(() => {
    setCreateWorkoutError('')
    setCreateModalOpen(true)
  }, [])

  const closeCreateWorkoutModal = useCallback(() => {
    if (!creatingWorkout) setCreateModalOpen(false)
  }, [creatingWorkout])

  const createWorkout = useCallback(
    async () => {
      setCreatingWorkout(true)
      setCreateWorkoutError('')

      try {
        const response = await createWorkoutRequest()
        await refreshWorkouts()
        setCreateModalOpen(false)
        return response.data
      } catch (error) {
        setCreateWorkoutError(getApiErrorMessage(error, 'Unable to create workout.'))
        return null
      } finally {
        setCreatingWorkout(false)
      }
    },
    [refreshWorkouts]
  )

  const deleteWorkout = useCallback(
    async (id) => {
      await deleteWorkoutRequest(id)
      await refreshWorkouts()
    },
    [refreshWorkouts]
  )

  const getWorkout = useCallback(
    (id) => workouts.find((workout) => workout.id === id) ?? null,
    [workouts]
  )

  const loadWorkout = useCallback(async (id) => {
    const response = await getWorkoutById(id)
    return response.data
  }, [])

  const addExerciseToWorkout = useCallback(
    async (workoutId, exercise) => {
      const response = await addExerciseRequest(normalizeExercisePayload({ ...exercise, workoutId }))
      await refreshWorkouts()
      return response.data
    },
    [refreshWorkouts]
  )

  const updateExercise = useCallback(
    async (exerciseId, payload) => {
      const response = await updateExerciseRequest(exerciseId, payload)
      await refreshWorkouts()
      return response.data
    },
    [refreshWorkouts]
  )

  const removeExercise = useCallback(
    async (_workoutId, exerciseId) => {
      await deleteExerciseRequest(exerciseId)
      await refreshWorkouts()
    },
    [refreshWorkouts]
  )

  function addExerciseToCurrentWorkout(exercise) {
    setCurrentWorkoutExercises((prev) => {
      const existing = prev.some((item) => item.exerciseId === exercise.exerciseId)
      return existing ? prev : [...prev, exercise]
    })
  }

  function clearCurrentWorkout() {
    setCurrentWorkoutExercises([])
  }

  const value = useMemo(
    () => ({
      workouts,
      loadingWorkouts,
      workoutsError,
      currentWorkoutExercises,
      getWorkout,
      loadWorkout,
      refreshWorkouts,
      openCreateWorkoutModal,
      createWorkout,
      deleteWorkout,
      removeExercise,
      addExerciseToWorkout,
      updateExercise,
      addExerciseToCurrentWorkout,
      clearCurrentWorkout,
      getApiErrorMessage,
    }),
    [
      workouts,
      loadingWorkouts,
      workoutsError,
      currentWorkoutExercises,
      getWorkout,
      loadWorkout,
      refreshWorkouts,
      openCreateWorkoutModal,
      createWorkout,
      deleteWorkout,
      removeExercise,
      addExerciseToWorkout,
      updateExercise,
    ]
  )

  return (
    <WorkoutContext.Provider value={value}>
      {children}
      <CreateWorkoutModal
        isOpen={createModalOpen}
        loading={creatingWorkout}
        error={createWorkoutError}
        onClose={closeCreateWorkoutModal}
        onCreate={createWorkout}
      />
    </WorkoutContext.Provider>
  )
}

export function useWorkouts() {
  const ctx = useContext(WorkoutContext)
  if (!ctx) throw new Error('useWorkouts must be used inside WorkoutProvider')
  return ctx
}