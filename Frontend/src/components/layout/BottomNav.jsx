import { NavLink } from 'react-router-dom'

const NAV_ITEMS = [
  { label: 'Dashboard', icon: 'dashboard', path: '/dashboard' },
  { label: 'Exercises', icon: 'explore', path: '/exercises' },
  { label: 'Workouts', icon: 'fitness_center', path: '/workouts' },
  { label: 'Friends', icon: 'group', path: '/friends' },
  { label: 'Settings', icon: 'settings', path: '/settings' },
]

export default function BottomNav() {
  return (
    <nav
      aria-label="Primary"
      className="fixed inset-x-0 bottom-0 z-50 border-t border-outline-variant bg-white/95 px-2 pt-2 shadow-ambient backdrop-blur-xl [padding-bottom:calc(env(safe-area-inset-bottom)+0.5rem)] md:hidden"
    >
      <div className="grid grid-cols-5 gap-1">
        {NAV_ITEMS.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) =>
              `flex min-w-0 flex-col items-center justify-center gap-1 rounded-editorial px-1 py-2 text-[10px] font-bold transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary ${
                isActive
                  ? 'bg-surface-container-lowest text-primary shadow-ambient'
                  : 'text-on-surface-variant hover:text-on-surface'
              }`
            }
          >
            <span className="material-symbols-outlined text-[20px]">{item.icon}</span>
            <span className="truncate">{item.label}</span>
          </NavLink>
        ))}
      </div>
    </nav>
  )
}
