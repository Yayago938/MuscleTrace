export default function FilterDropdown({ label, value, options, onChange }) {
  return (
    <div>
      <p className="text-[10px] font-bold uppercase tracking-wide text-primary mb-1">{label}</p>
      <div className="relative">
        <select
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="appearance-none bg-transparent text-sm font-semibold text-on-surface pr-6 py-1
            cursor-pointer focus:outline-none capitalize"
        >
          {options.map((opt) => (
            <option key={opt} value={opt} className="capitalize">
              {opt}
            </option>
          ))}
        </select>
        <span className="material-symbols-outlined absolute right-0 top-1/2 -translate-y-1/2 text-[16px]
          text-on-surface-variant pointer-events-none">
          expand_more
        </span>
      </div>
    </div>
  )
}