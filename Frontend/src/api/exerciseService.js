import api from './api'

export function addExerciseToWorkout(exercise) {
  return api.post('/exercises', {
    workoutId: exercise.workoutId,
    name: exercise.name,
    sets: exercise.sets,
    reps: exercise.reps,
    weight: exercise.weight,
    muscleGroup: exercise.muscleGroup,
    muscleName: exercise.muscleName,
  })
}

export function updateExercise(exerciseId, payload) {
  return api.put(`/exercises/${exerciseId}`, payload)
}

export function deleteExercise(exerciseId) {
  return api.delete(`/exercises/${exerciseId}`)
}