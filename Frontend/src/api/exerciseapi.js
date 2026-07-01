const BASE_URL = "https://oss.exercisedb.dev/api/v1";
const STATIC_IMAGE_BASE_URL = "https://static.exercisedb.dev";

function resolveGifUrl(exercise) {
  const rawUrl =
    exercise?.gifUrl ??
    exercise?.gif_url ??
    exercise?.imageUrl ??
    exercise?.image ??
    exercise?.thumbnail ??
    "";

  if (!rawUrl) return "";
  if (/^https?:\/\//i.test(rawUrl)) return rawUrl;

  return `${STATIC_IMAGE_BASE_URL}/${String(rawUrl).replace(/^\/+/, "")}`;
}

function normalizeExercise(exercise) {
  if (!exercise || typeof exercise !== "object") return exercise;

  return {
    ...exercise,
    gifUrl: resolveGifUrl(exercise),
  };
}

function normalizeExerciseResponse(response) {
  if (Array.isArray(response)) {
    return response.map(normalizeExercise);
  }

  if (Array.isArray(response?.data)) {
    return {
      ...response,
      data: response.data.map(normalizeExercise),
    };
  }

  if (response?.data && typeof response.data === "object") {
    return {
      ...response,
      data: normalizeExercise(response.data),
    };
  }

  if (Array.isArray(response?.exercises)) {
    return {
      ...response,
      exercises: response.exercises.map(normalizeExercise),
    };
  }

  return normalizeExercise(response);
}

async function fetchData(url) {
  const response = await fetch(url);

  if (!response.ok) {
    throw new Error(`API Error: ${response.status}`);
  }

  const data = await response.json();
  return normalizeExerciseResponse(data);
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
