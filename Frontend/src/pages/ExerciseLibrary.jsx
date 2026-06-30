import { useEffect, useMemo, useState } from 'react'
import Sidebar from '../components/layout/sidebar'
import ExerciseCard from '../components/explorer/ExerciseCard'
import ExerciseCardSkeleton from '../components/explorer/ExerciseCardSkeleton'
import FilterDropdown from '../components/explorer/FilterDropdown'
import {
  getExercises,
  getExercisesByBodyParts,
  getExercisesByMuscles,
  searchExercises,
} from '../api/exerciseapi'

const BODY_PARTS = ['all sections', 'chest', 'back', 'shoulders', 'upper arms', 'upper legs', 'lower legs', 'waist']
const TARGET_MUSCLES = ['any muscle', 'pectorals', 'lats', 'biceps', 'triceps', 'quads', 'hamstrings', 'glutes', 'abs']
const EQUIPMENTS = ['all gear', 'barbell', 'dumbbell', 'body weight', 'cable', 'leverage machine', 'kettlebell']

const PAGE_SIZE = 12

export default function ExerciseLibrary() {
  const [exercises, setExercises] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const [search, setSearch] = useState('')
  const [bodyPart, setBodyPart] = useState(BODY_PARTS[0])
  const [targetMuscle, setTargetMuscle] = useState(TARGET_MUSCLES[0])
  const [equipment, setEquipment] = useState(EQUIPMENTS[0])

  // Debounce search input
  const [debouncedSearch, setDebouncedSearch] = useState('')
  useEffect(() => {
    const t = setTimeout(() => setDebouncedSearch(search.trim()), 400)
    return () => clearTimeout(t)
  }, [search])

  useEffect(() => {
    let cancelled = false

    async function load() {
      setLoading(true)
      setError(null)
      try {
        let res

        if (debouncedSearch) {
          res = await searchExercises(debouncedSearch)
        } else if (bodyPart !== 'all sections') {
          res = await getExercisesByBodyParts([bodyPart], PAGE_SIZE)
        } else if (targetMuscle !== 'any muscle') {
          res = await getExercisesByMuscles([targetMuscle], [], PAGE_SIZE)
        } else {
          res = await getExercises(PAGE_SIZE)
        }

        if (cancelled) return

        let list = res?.data ?? res?.exercises ?? res ?? []

        if (equipment !== 'all gear') {
          list = list.filter((ex) =>
            ex.equipments?.some((eq) => eq.toLowerCase() === equipment)
          )
        }

        setExercises(Array.isArray(list) ? list : [])
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
  }, [debouncedSearch, bodyPart, targetMuscle, equipment])

  const skeletons = useMemo(() => Array.from({ length: 8 }), [])

  return (
    <div className="flex min-h-screen bg-background">
      <Sidebar />

      <main className="flex-1 px-8 py-8 max-w-6xl relative">
        <div className="absolute inset-x-0 top-0 h-64 bg-haze pointer-events-none" />

        <div className="relative">
          <div className="flex items-start justify-between gap-8 mb-6">
            <div>
              <h1 className="font-headline text-4xl sm:text-5xl font-bold text-on-surface mb-3">
                Exercise Library
              </h1>
              <p className="text-on-surface-variant text-sm max-w-md leading-relaxed">
                The Digital Atelier of human movement. Refine your form, explore new
                modalities, and architect your physical masterpiece.
              </p>
            </div>

            <div className="relative shrink-0 hidden sm:block">
              <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2
                text-on-surface-variant text-[18px]">
                search
              </span>
              <input
                type="search"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search exercises..."
                className="w-72 bg-surface-container-low rounded-full pl-10 pr-4 py-2.5 text-sm
                  placeholder:text-on-surface-variant focus:outline-none focus:ring-2 focus:ring-primary-container"
              />
            </div>
          </div>

          <div className="flex items-end gap-8 mb-8 flex-wrap">
            <FilterDropdown
              label="Body Part"
              value={bodyPart}
              options={BODY_PARTS}
              onChange={(v) => {
                setBodyPart(v)
                if (v !== 'all sections') setTargetMuscle(TARGET_MUSCLES[0])
              }}
            />
            <FilterDropdown
              label="Target Muscle"
              value={targetMuscle}
              options={TARGET_MUSCLES}
              onChange={(v) => {
                setTargetMuscle(v)
                if (v !== 'any muscle') setBodyPart(BODY_PARTS[0])
              }}
            />
            <FilterDropdown
              label="Equipment"
              value={equipment}
              options={EQUIPMENTS}
              onChange={setEquipment}
            />
            <button className="ml-auto flex items-center gap-2 rounded-full bg-surface-container-low
              px-4 py-2.5 text-xs font-semibold text-on-surface-variant hover:bg-surface-container transition-colors">
              <span className="material-symbols-outlined text-[16px]">tune</span>
              More Filters
            </button>
          </div>

          {error && (
            <p className="text-secondary text-sm mb-6">
              Couldn't load exercises right now. {error}
            </p>
          )}

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {loading
              ? skeletons.map((_, i) => <ExerciseCardSkeleton key={i} />)
              : exercises.map((ex) => (
                  <ExerciseCard key={ex.exerciseId} exercise={ex} />
                ))}
          </div>

          {!loading && exercises.length === 0 && !error && (
            <p className="text-on-surface-variant text-sm mt-10 text-center">
              No exercises match these filters. Try widening your search.
            </p>
          )}
        </div>
      </main>
    </div>
  )
}