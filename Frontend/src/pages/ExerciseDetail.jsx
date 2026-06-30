import { useEffect, useState } from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'
import Sidebar from '../components/layout/sidebar'
import MusclePreview from '../components/explorer/MusclePreview'
import InfoChip from '../components/explorer/InfoChip'
import { getExerciseById } from '../api/exerciseapi'
import { titleCase, cleanInstruction } from '../utils/exerciseFormat'

export default function ExerciseDetail() {
  const { exerciseId } = useParams()
  const navigate = useNavigate()

  const [exercise, setExercise] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    let cancelled = false

    async function load() {
      setLoading(true)
      setError(null)
      try {
        const res = await getExerciseById(exerciseId)
        const data = res?.data ?? res
        if (!cancelled) setExercise(data)
      } catch (err) {
        if (!cancelled) setError(err.message)
      } finally {
        if (!cancelled) setLoading(false)
      }
    }

    load()
    return () => {
      cancelled = true
    }
  }, [exerciseId])

  if (loading) {
    return (
      <div className="flex min-h-screen bg-background">
        <Sidebar />
        <main className="flex-1 px-8 py-8 max-w-5xl">
          <div className="animate-pulse space-y-6">
            <div className="h-3 w-40 bg-surface-container rounded" />
            <div className="h-12 w-2/3 bg-surface-container rounded" />
            <div className="grid grid-cols-2 gap-8">
              <div className="aspect-[4/5] bg-surface-container rounded-editorial" />
              <div className="space-y-4">
                <div className="h-4 bg-surface-container rounded w-full" />
                <div className="h-4 bg-surface-container rounded w-5/6" />
                <div className="h-4 bg-surface-container rounded w-2/3" />
              </div>
            </div>
          </div>
        </main>
      </div>
    )
  }

  if (error || !exercise) {
    return (
      <div className="flex min-h-screen bg-background">
        <Sidebar />
        <main className="flex-1 px-8 py-8 max-w-5xl">
          <p className="text-secondary text-sm mb-4">
            Couldn't load this exercise. {error}
          </p>
          <button
            onClick={() => navigate(-1)}
            className="text-primary text-sm font-semibold"
          >
            ← Go back
          </button>
        </main>
      </div>
    )
  }

  const {
    name,
    gifUrl,
    bodyParts = [],
    targetMuscles = [],
    secondaryMuscles = [],
    equipments = [],
    instructions = [],
    exerciseType,
    difficulty,
  } = exercise

  const primaryMuscle = targetMuscles[0]
  const breadcrumb = [bodyParts[0], primaryMuscle].filter(Boolean).map(titleCase).join(' / ')

  return (
    <div className="flex min-h-screen bg-background">
      <Sidebar />

      <main className="flex-1 px-8 py-8 max-w-5xl relative">
        <div className="absolute inset-x-0 top-0 h-64 bg-haze pointer-events-none" />

        <div className="relative">
          <Link
            to="/explorer"
            className="inline-flex items-center gap-1 text-xs font-bold text-on-surface-variant
              hover:text-on-surface mb-4"
          >
            <span className="material-symbols-outlined text-[16px]">arrow_back</span>
            Back to library
          </Link>

          <div className="flex items-start justify-between gap-6 mb-6">
            <div>
              {breadcrumb && (
                <p className="text-xs font-bold uppercase tracking-[0.18em] text-primary mb-2">
                  {breadcrumb}
                </p>
              )}
              <h1 className="font-headline text-4xl sm:text-5xl font-bold text-on-surface capitalize leading-tight">
                {name}
              </h1>
            </div>

            <div className="flex items-center gap-2 shrink-0">
              <button
                aria-label="Share"
                className="w-10 h-10 rounded-full bg-surface-container-low flex items-center
                  justify-center text-on-surface-variant hover:bg-surface-container transition-colors"
              >
                <span className="material-symbols-outlined text-[18px]">share</span>
              </button>
              <button
                aria-label="Save"
                className="w-10 h-10 rounded-full bg-surface-container-low flex items-center
                  justify-center text-on-surface-variant hover:bg-surface-container transition-colors"
              >
                <span className="material-symbols-outlined text-[18px]">favorite</span>
              </button>
              <button className="ember-button normal-case tracking-normal text-sm whitespace-nowrap">
                Add to Workout
              </button>
            </div>
          </div>

          <div className="grid sm:grid-cols-2 gap-8">
            <div>
              <MusclePreview gifUrl={gifUrl} name={name} primaryMuscle={primaryMuscle} />

              <div className="grid grid-cols-3 gap-3 mt-4">
                <InfoChip label="Complexity" value={difficulty ? titleCase(difficulty) : 'Standard'} />
                <InfoChip
                  label="Movement"
                  value={exerciseType ? titleCase(exerciseType) : 'Isolation'}
                />
                <InfoChip label="Equipment" value={titleCase(equipments[0] || 'Bodyweight')} />
              </div>
            </div>

            <div>
              <p className="text-[11px] font-bold uppercase tracking-wide text-primary mb-4">
                Biometric Focus
              </p>

              {primaryMuscle && (
                <div className="flex items-center justify-between py-3 border-b border-outline-variant">
                  <span className="text-sm font-semibold text-on-surface">Primary Target</span>
                  <span className="rounded-full bg-primary-fixed text-primary text-[10px] font-bold
                    uppercase tracking-wide px-3 py-1 capitalize">
                    {primaryMuscle}
                  </span>
                </div>
              )}

              {secondaryMuscles.length > 0 && (
                <div className="flex items-start justify-between py-3 border-b border-outline-variant">
                  <span className="text-sm font-semibold text-on-surface shrink-0">Synergists</span>
                  <div className="text-right">
                    {secondaryMuscles.map((m) => (
                      <p key={m} className="text-sm text-on-surface-variant capitalize">{m}</p>
                    ))}
                  </div>
                </div>
              )}

              {instructions.length > 0 ? (
                <div className="mt-8">
                  <p className="text-[11px] font-bold uppercase tracking-wide text-primary mb-4">
                    Mastery Protocol
                  </p>
                  <ol className="space-y-5">
                    {instructions.map((step, i) => (
                      <li key={i} className="flex gap-4">
                        <span className="font-headline text-2xl font-bold text-primary-container shrink-0 w-8">
                          {String(i + 1).padStart(2, '0')}
                        </span>
                        <p className="text-sm text-on-surface-variant leading-relaxed pt-1">
                          {cleanInstruction(step)}
                        </p>
                      </li>
                    ))}
                  </ol>
                </div>
              ) : (
                <p className="text-sm text-on-surface-variant mt-8">
                  No step-by-step instructions available for this exercise yet.
                </p>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}