import { useNavigate } from 'react-router-dom'

export default function ExerciseCard({ exercise, onAdd }) {
  const navigate = useNavigate()
  const { exerciseId, name, gifUrl, bodyParts = [], targetMuscles = [], equipments = [] } = exercise

  const badge = bodyParts[0] || targetMuscles[0] || 'Exercise'
  const muscleLine = [targetMuscles[0], bodyParts[0]].filter(Boolean).join(', ')
  const equipmentLine = equipments[0]

  return (
    <div className="rounded-editorial bg-surface-container-lowest shadow-ambient overflow-hidden flex flex-col">
      <div className="relative aspect-[4/3] bg-surface-container">
        <span className="absolute top-3 left-3 z-10 rounded-full bg-surface-container-lowest/90
          backdrop-blur px-3 py-1 text-[10px] font-bold uppercase tracking-wide text-on-surface-variant">
          {badge}
        </span>
        <img src={gifUrl} alt={name} loading="lazy" className="w-full h-full object-cover" />
      </div>

      <div className="p-4 flex flex-col flex-1">
        <h3 className="font-headline text-lg font-bold text-on-surface leading-snug mb-2 capitalize line-clamp-2">
          {name}
        </h3>

        <div className="space-y-1 mb-4">
          {muscleLine && (
            <div className="flex items-center gap-1.5 text-xs text-on-surface-variant capitalize">
              <span className="material-symbols-outlined text-[14px]">target</span>
              {muscleLine}
            </div>
          )}
          {equipmentLine && (
            <div className="flex items-center gap-1.5 text-xs text-on-surface-variant capitalize">
              <span className="material-symbols-outlined text-[14px]">fitness_center</span>
              {equipmentLine}
            </div>
          )}
        </div>

        <div className="mt-auto flex items-center gap-2">
          <button
            onClick={() => onAdd?.(exercise)}
            className="ember-button flex-1 justify-center normal-case tracking-normal text-xs"
          >
            Add to Workout
          </button>
          <button
            onClick={() => navigate(`/explorer/${exerciseId}`)}
            aria-label={`Preview ${name}`}
            className="w-10 h-10 shrink-0 rounded-full bg-surface-container flex items-center
              justify-center text-on-surface-variant hover:bg-surface-container-high transition-colors"
          >
            <span className="material-symbols-outlined text-[18px]">visibility</span>
          </button>
        </div>
      </div>
    </div>
  )
}