import api from './api'

export function createWorkout() {
  return api.post('/workouts')
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