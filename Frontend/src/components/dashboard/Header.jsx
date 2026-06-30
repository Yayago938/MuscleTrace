export default function Header({ name = 'Yash' }) {
  return (
    <div className="flex items-start justify-between mb-8">
      <div>
        <h1 className="font-headline text-3xl sm:text-4xl font-bold text-on-surface flex items-center gap-2">
          Good Morning, {name} <span className="text-3xl">👋</span>
        </h1>
        <p className="font-headline italic text-on-surface-variant mt-1.5 text-[15px]">
          Your digital atelier awaits the next masterpiece.
        </p>
      </div>
      <div className="w-11 h-11 rounded-full overflow-hidden border-2 border-surface-container-lowest shadow-ambient shrink-0">
        <img src="https://i.pravatar.cc/100?img=12" alt="Profile" className="w-full h-full object-cover" />
      </div>
    </div>
  )
}