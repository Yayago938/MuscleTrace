const EXERCISES = [
  { name: 'Barbell Back Squat', detail: 'Legs · 5 Reps', img: 'https://i.pravatar.cc/60?img=51' },
  { name: 'Dumbbell Flyes', detail: 'Chest · 8 Reps', img: 'https://i.pravatar.cc/60?img=52' },
]

export default function ExercisesViewedCard() {
  return (
    <div className="editorial-card p-5 flex-1">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-xs font-bold text-on-surface uppercase tracking-wide">Exercises Viewed</h3>
        <span className="material-symbols-outlined text-on-surface-variant text-[18px]">visibility</span>
      </div>
      <ul className="space-y-3">
        {EXERCISES.map((ex) => (
          <li key={ex.name} className="flex items-center gap-3">
            <img src={ex.img} alt={ex.name} className="w-9 h-9 rounded-full object-cover shrink-0" />
            <div className="min-w-0">
              <p className="text-sm font-semibold text-on-surface truncate">{ex.name}</p>
              <p className="text-xs text-on-surface-variant">{ex.detail}</p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  )
}