export default function MusclePreview({ gifUrl, name, primaryMuscle }) {
  return (
    <div className="relative rounded-editorial overflow-hidden bg-surface-container-low aspect-[4/5]">
      <span className="absolute top-4 left-4 z-10 flex items-center gap-1.5 rounded-full
        bg-surface-container-lowest/90 backdrop-blur px-3 py-1 text-[10px] font-bold
        uppercase tracking-wide text-secondary">
        <span className="w-1.5 h-1.5 rounded-full bg-secondary" />
        Peak Activation
      </span>

      <img
        src={gifUrl}
        alt={name}
        className="w-full h-full object-cover"
      />

      {primaryMuscle && (
        <div className="absolute bottom-4 right-4 z-10 bg-surface-container-lowest/95 backdrop-blur
          rounded-2xl px-4 py-3 shadow-ambient max-w-[200px]">
          <p className="text-[10px] font-bold uppercase tracking-wide text-on-surface-variant mb-0.5">
            Muscle Group
          </p>
          <p className="font-headline font-bold text-on-surface capitalize">{primaryMuscle}</p>
        </div>
      )}
    </div>
  )
}