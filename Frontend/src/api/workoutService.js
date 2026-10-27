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