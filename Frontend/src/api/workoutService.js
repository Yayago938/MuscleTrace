import api from './api'

export function buildCreateWorkoutPayload(workout) {
  const rawName = typeof workout === 'string' ? workout : workout?.name
  const name = rawName?.trim()

  if (!name) {
    throw new Error('Workout name is required.')
  }

  return { name }
}

export function createWorkout(workout) {
  return api.post('/workouts', buildCreateWorkoutPayload(workout))
}

export function getWorkouts() {
  return api.get('/workouts')
}

export function getWorkoutById(id) {
  return api.get(`/workouts/${id}`)
}

export function deleteWorkout(id) {
  return api.delete(`/workouts/${id}`)
}
export const startSession = (workoutId) => api.post('/workouts/sessions', { workoutId })
export const getActiveSession = () => api.get('/workouts/sessions/active')
export const getSession = (id) => api.get(`/workouts/sessions/${id}`)
export const pauseSession = (id) => api.post(`/workouts/sessions/${id}/pause`)
export const resumeSession = (id) => api.post(`/workouts/sessions/${id}/resume`)
export const completeSession = (id) => api.post(`/workouts/sessions/${id}/complete`)
export const updateSession = (id, exercises) => api.patch(`/workouts/sessions/${id}`, { exercises })
