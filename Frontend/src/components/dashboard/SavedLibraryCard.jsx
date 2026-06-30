export default function SavedLibraryCard() {
  return (
    <div className="editorial-card p-5 flex-1">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-1.5 text-xs font-bold text-on-surface uppercase tracking-wide">
          <span className="material-symbols-outlined text-secondary text-[16px]" style={{ fontVariationSettings: '"FILL" 1' }}>
            favorite
          </span>
          Saved Library
        </div>
        <a href="#" className="text-xs font-bold text-primary">All</a>
      </div>
      <div className="rounded-2xl bg-surface-container p-4">
        <p className="text-sm font-semibold text-on-surface mb-1">Glute Core Precision</p>
        <p className="text-xs text-on-surface-variant">45 mins · 8 Exercises</p>
      </div>
    </div>
  )
}