const BASE_URL = "https://oss.exercisedb.dev/api/v1";

async function fetchData(url) {
  const response = await fetch(url);

  if (!response.ok) {
    throw new Error(`API Error: ${response.status}`);
  }

  return response.json();
}

export function getExercises(limit = 20, after = "", before = "") {
  const params = new URLSearchParams();
  params.append("limit", limit);
  if (after) params.append("after", after);
  if (before) params.append("before", before);
  return fetchData(`${BASE_URL}/exercises?${params}`);
}

export function getExercisesByBodyParts(
  bodyParts = [],
  limit = 20,
  after = "",
  before = ""
) {
  const params = new URLSearchParams();

  if (bodyParts.length)
    params.append("bodyParts", bodyParts.join(","));

  params.append("limit", limit);

  if (after) params.append("after", after);
  if (before) params.append("before", before);

  return fetchData(`${BASE_URL}/exercises/bodyparts?${params}`);
}

export function getExercisesByMuscles(
  targetMuscles = [],
  secondaryMuscles = [],
  limit = 20,
  after = "",
  before = ""
) {
  const params = new URLSearchParams();

  if (targetMuscles.length)
    params.append("targetMuscles", targetMuscles.join(","));

  if (secondaryMuscles.length)
    params.append("secondaryMuscles", secondaryMuscles.join(","));

  params.append("limit", limit);

  if (after) params.append("after", after);
  if (before) params.append("before", before);

  return fetchData(`${BASE_URL}/exercises/muscles?${params}`);
}


export function searchExercises(search, threshold = 0.5) {
  const params = new URLSearchParams({
    search,
    threshold,
  });

  return fetchData(`${BASE_URL}/exercises/search?${params}`);
}


export function getExerciseById(exerciseId) {
  return fetchData(`${BASE_URL}/exercises/${exerciseId}`);
}