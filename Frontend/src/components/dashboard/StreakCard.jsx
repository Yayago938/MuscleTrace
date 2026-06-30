export default function StreakCard({ days = 18 }) {
  return (
    <div className="w-44 shrink-0 rounded-editorial p-6 flex flex-col items-center justify-center
      text-on-primary bg-ember shadow-soft">
      <span className="material-symbols-outlined text-3xl mb-3" style={{ fontVariationSettings: '"FILL" 1' }}>
        local_fire_department
      </span>
      <span className="font-headline text-4xl font-bold leading-none mb-1">{days}</span>
      <span className="text-[11px] font-bold tracking-[0.18em] uppercase opacity-90">Day Streak</span>
    </div>
  )
}