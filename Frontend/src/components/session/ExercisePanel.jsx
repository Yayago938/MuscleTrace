const MUSCLE_COLOR = {
  chest: '#C97A3D',
  pectorals: '#C97A3D',
  triceps: '#A85A2A',
  shoulders: '#8A4420',
  'anterior deltoids': '#C97A3D',
  lats: '#7A3F1B',
  biceps: '#A85A2A',
  quads: '#C97A3D',
  hamstrings: '#8A4420',
  glutes: '#A85A2A',
  abs: '#7A3F1B',
  back: '#8A4420',
}

function MuscleChip({ label }) {
  const color = MUSCLE_COLOR[label.toLowerCase()] ?? '#897365'
  return (
    <div className="flex flex-col items-center gap-1.5">
      <svg width="36" height="48" viewBox="0 0 36 48" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect x="10" y="0" width="16" height="8" rx="8" fill={color} opacity="0.4" />
        <rect x="4" y="10" width="28" height="22" rx="8" fill={color} />
        <rect x="0" y="14" width="8" height="16" rx="4" fill={color} opacity="0.7" />
        <rect x="28" y="14" width="8" height="16" rx="4" fill={color} opacity="0.7" />
        <rect x="8" y="32" width="9" height="16" rx="4" fill={color} opacity="0.6" />
        <rect x="19" y="32" width="9" height="16" rx="4" fill={color} opacity="0.6" />
      </svg>
      <span className="text-[9px] font-bold uppercase tracking-wide text-on-surface-variant">
        {label}
      </span>
    </div>
  )
}

export default function ExercisePanel({ exercise, tip }) {
  const {
    name = '',
    gifUrl,
    targetMuscles = [],
    secondaryMuscles = [],
    bodyParts = [],
  } = exercise

  const displayMuscles = [...new Set([
    ...(targetMuscles.length ? targetMuscles.slice(0, 1) : bodyParts.slice(0, 1)),
    ...secondaryMuscles.slice(0, 1),
  ])].slice(0, 2)

  const primaryLabel = [targetMuscles[0], ...secondaryMuscles.slice(0, 2)]
    .filter(Boolean)
    .map((m) => m.charAt(0).toUpperCase() + m.slice(1))
    .join(', ')

  return (
    <div className="flex flex-col gap-4">
      <div className="relative rounded-editorial overflow-hidden aspect-[3/4] bg-surface-container-low">
        {gifUrl ? (
          <img src={gifUrl} alt={name} className="w-full h-full object-cover" />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-on-surface-variant">
            <span className="material-symbols-outlined text-5xl">fitness_center</span>
          </div>
        )}

        {tip && (
          <div className="absolute top-4 left-4 right-4 bg-surface-container-lowest/92 backdrop-blur
            rounded-2xl px-4 py-3">
            <p className="text-[10px] font-bold uppercase tracking-wide text-primary flex items-center
              gap-1 mb-1">
              <span className="material-symbols-outlined text-[13px]">location_on</span>
              Atelier Tip
            </p>
            <p className="text-xs text-on-surface leading-relaxed">{tip}</p>
          </div>
        )}

        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent
          px-5 pt-10 pb-5">
          <h2 className="font-headline text-2xl font-bold text-white capitalize leading-tight">
            {name}
          </h2>
        </div>
      </div>

      <div className="editorial-card px-5 py-4 flex items-center justify-between">
        <div>
          <h3 className="text-sm font-bold text-on-surface mb-1">Target Areas</h3>
          {primaryLabel && (
            <p className="text-xs text-on-surface-variant capitalize">
              Primary: {primaryLabel}
            </p>
          )}
        </div>
        <div className="flex items-end gap-4">
          {displayMuscles.map((m) => (
            <MuscleChip key={m} label={m} />
          ))}
        </div>
      </div>
    </div>
  )
}