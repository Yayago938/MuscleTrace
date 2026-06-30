export default function TodaySessionCard() {
  return (
    <div className="editorial-card p-6 flex-1">
      <div className="flex items-center gap-1.5 text-xs font-bold text-primary uppercase tracking-[0.18em] mb-3">
        <span className="material-symbols-outlined text-[16px]">north_east</span>
        Today's Session
      </div>
      <h2 className="font-headline text-2xl font-bold text-on-surface mb-5">
        Chest & Shoulders Sculpt
      </h2>

      <div className="flex gap-10 mb-6">
        {[
          ['Duration', '75 Min', 'text-on-surface'],
          ['Intensity', 'High', 'text-on-surface'],
          ['Target', 'Hypertrophy', 'text-primary'],
        ].map(([label, value, color]) => (
          <div key={label}>
            <p className="text-[11px] font-bold text-on-surface-variant uppercase tracking-wide mb-1">{label}</p>
            <p className={`text-sm font-semibold ${color}`}>{value}</p>
          </div>
        ))}
      </div>

      <div className="flex gap-3">
        <button className="ember-button normal-case tracking-normal text-sm">Begin Workout</button>
        <button className="inline-flex rounded-full bg-surface-container px-6 py-3 text-sm font-bold
          text-on-surface transition hover:bg-surface-container-high">
          View List
        </button>
      </div>
    </div>
  )
}