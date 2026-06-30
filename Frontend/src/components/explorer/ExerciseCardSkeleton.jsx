export default function ExerciseCardSkeleton() {
  return (
    <div className="rounded-editorial bg-surface-container-lowest shadow-ambient overflow-hidden animate-pulse">
      <div className="aspect-[4/3] bg-surface-container" />
      <div className="p-4 space-y-3">
        <div className="h-4 bg-surface-container rounded w-3/4" />
        <div className="h-3 bg-surface-container rounded w-1/2" />
        <div className="h-9 bg-surface-container rounded-full mt-4" />
      </div>
    </div>
  )
}