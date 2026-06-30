export default function InfoChip({ label, value, sublabel }) {
  if (!value) return null
  return (
    <div className="rounded-2xl bg-surface-container-lowest shadow-ambient px-4 py-3">
      <p className="text-[10px] font-bold uppercase tracking-wide text-on-surface-variant mb-1">
        {label}
      </p>
      <p className="font-semibold text-on-surface capitalize text-sm">{value}</p>
      {sublabel && (
        <p className="text-[11px] text-on-surface-variant capitalize mt-0.5">{sublabel}</p>
      )}
    </div>
  )
}