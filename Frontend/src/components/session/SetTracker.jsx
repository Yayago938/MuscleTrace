import { useState } from 'react'

function SetRow({ index, set, isActive, isCompleted, onChange, onComplete }) {
  const num = String(index + 1).padStart(2, '0')

  if (isCompleted) {
    return (
      <div className="grid grid-cols-[40px_1fr_1fr_40px] items-center gap-3 px-2 py-3
        border-b border-outline-variant opacity-50">
        <span className="text-xs font-bold text-on-surface-variant">{num}</span>
        <span className="text-sm font-semibold text-on-surface-variant line-through text-center">
          {set.weight || '—'}
        </span>
        <span className="text-sm font-semibold text-on-surface-variant line-through text-center">
          {set.reps || '—'}
        </span>
        <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center ml-auto">
          <span className="material-symbols-outlined text-on-primary text-[16px]">check</span>
        </div>
      </div>
    )
  }

  if (isActive) {
    return (
      <div className="grid grid-cols-[40px_1fr_1fr_40px] items-center gap-3 px-2 py-3
        bg-surface-container-lowest rounded-2xl shadow-ambient -mx-2">
        <span className="text-xs font-bold text-primary">{num}</span>
        <input
          type="number"
          value={set.weight}
          onChange={(e) => onChange({ ...set, weight: e.target.value })}
          className="w-full text-center text-sm font-bold text-on-surface bg-surface-container
            rounded-xl px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary-container"
          placeholder="—"
        />
        <input
          type="number"
          value={set.reps}
          onChange={(e) => onChange({ ...set, reps: e.target.value })}
          className="w-full text-center text-sm font-bold text-on-surface bg-surface-container
            rounded-xl px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary-container"
          placeholder="—"
        />
        <button
          onClick={onComplete}
          className="w-8 h-8 rounded-full border-2 border-primary flex items-center justify-center
            ml-auto hover:bg-primary hover:text-on-primary transition-colors text-primary"
        >
          <span className="material-symbols-outlined text-[16px]">check</span>
        </button>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-[40px_1fr_1fr_40px] items-center gap-3 px-2 py-3
      border-b border-outline-variant">
      <span className="text-xs font-bold text-on-surface-variant">{num}</span>
      <span className="text-sm text-on-surface-variant text-center">—</span>
      <span className="text-sm text-on-surface-variant text-center">—</span>
      <span className="w-8" />
    </div>
  )
}

export default function SetTracker({ previousBest, sets, onSetsChange, onRestStart }) {
  const [activeIndex, setActiveIndex] = useState(0)

  function handleChange(i, updated) {
    const next = sets.map((s, idx) => (idx === i ? updated : s))
    onSetsChange(next)
  }

  function handleComplete(i) {
    const next = sets.map((s, idx) => (idx === i ? { ...s, completed: true } : s))
    onSetsChange(next)
    const nextPending = next.findIndex((s) => !s.completed)
    setActiveIndex(nextPending === -1 ? -1 : nextPending)
    onRestStart?.()
  }

  function addSet() {
    onSetsChange([...sets, { weight: '', reps: '', completed: false }])
  }

  return (
    <div className="flex flex-col gap-5">
      {previousBest && (
        <div className="editorial-card px-5 py-4">
          <p className="text-[10px] font-bold uppercase tracking-wide text-on-surface-variant
            flex items-center gap-1.5 mb-3">
            <span className="material-symbols-outlined text-[13px]">history</span>
            Previous Best · {previousBest.date}
          </p>
          <div className="grid grid-cols-3 divide-x divide-outline-variant">
            <div className="pr-4">
              <p className="font-headline text-2xl font-bold text-primary leading-none">
                {previousBest.weight}
              </p>
              <p className="text-[10px] font-bold uppercase tracking-wide text-on-surface-variant mt-1">
                Weight
              </p>
            </div>
            <div className="px-4">
              <p className="font-headline text-2xl font-bold text-on-surface leading-none">
                {previousBest.reps}
              </p>
              <p className="text-[10px] font-bold uppercase tracking-wide text-on-surface-variant mt-1">
                Volume
              </p>
            </div>
            <div className="pl-4">
              <p className="font-headline text-2xl font-bold text-on-surface leading-none">
                {previousBest.sets}
              </p>
              <p className="text-[10px] font-bold uppercase tracking-wide text-on-surface-variant mt-1">
                Density
              </p>
            </div>
          </div>
        </div>
      )}

      <div className="editorial-card px-5 py-4">
        <div className="grid grid-cols-[40px_1fr_1fr_40px] gap-3 px-2 pb-3 border-b border-outline-variant">
          <span className="text-[10px] font-bold uppercase tracking-wide text-on-surface-variant">Set</span>
          <span className="text-[10px] font-bold uppercase tracking-wide text-on-surface-variant text-center">
            Weight (lbs)
          </span>
          <span className="text-[10px] font-bold uppercase tracking-wide text-on-surface-variant text-center">
            Reps
          </span>
          <span />
        </div>

        <div className="py-1">
          {sets.map((set, i) => (
            <SetRow
              key={i}
              index={i}
              set={set}
              isActive={!set.completed && i === activeIndex}
              isCompleted={set.completed}
              onChange={(updated) => handleChange(i, updated)}
              onComplete={() => handleComplete(i)}
            />
          ))}
        </div>

        <button
          onClick={addSet}
          className="w-full py-3 text-xs font-bold uppercase tracking-wide text-on-surface-variant
            hover:text-on-surface transition-colors"
        >
          + Add Set
        </button>
      </div>
    </div>
  )
}