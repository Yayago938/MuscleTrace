import { NavLink } from 'react-router-dom'

const NAV_ITEMS = [
  { label: 'Dashboard', icon: 'dashboard', path: '/dashboard' },
  { label: 'Explorer', icon: 'explore', path: '/explorer' },
  { label: 'Builder', icon: 'construction', path: '/builder' },
  { label: 'History', icon: 'history', path: '/history' },
  { label: 'Social', icon: 'group', path: '/social' },
  { label: 'Settings', icon: 'settings', path: '/settings' },
]

export default function Sidebar() {
  return (
    <aside className="w-60 shrink-0 bg-surface px-5 py-6 flex flex-col min-h-screen border-r border-outline-variant">
      <div className="mb-10 px-2">
        <span className="font-headline italic font-bold text-primary text-lg">
          MuscleTrace
        </span>
      </div>

      <nav className="flex-1 space-y-1">
        {NAV_ITEMS.map((item) => (
          <NavLink
            key={item.label}
            to={item.path}
            className={({ isActive }) =>
              `nav-chip flex items-center gap-3 normal-case tracking-normal text-xs w-full text-left
              ${isActive
                ? 'bg-surface-container-lowest text-on-surface shadow-ambient'
                : 'text-on-surface-variant hover:text-on-surface'}`
            }
          >
            <span className="material-symbols-outlined text-[18px]">{item.icon}</span>
            {item.label}
          </NavLink>
        ))}
      </nav>

      <div className="space-y-4">
        <button
          type="button"
          onClick={() => {
            /* TODO: wire to start-workout flow */
          }}
          className="ember-button w-full justify-center normal-case tracking-normal text-sm gap-2"
        >
          <span className="material-symbols-outlined text-[16px]">play_arrow</span>
          Start Workout
        </button>

        <div className="px-2 space-y-2 text-xs text-on-surface-variant font-medium">
          <button
            type="button"
            onClick={() => {
              /* TODO: open help */
            }}
            className="flex items-center gap-2 hover:text-on-surface w-full text-left"
          >
            <span className="material-symbols-outlined text-[16px]">help</span>
            Help
          </button>
          <button
            type="button"
            onClick={() => {
              /* TODO: wire to logout */
            }}
            className="flex items-center gap-2 hover:text-on-surface w-full text-left"
          >
            <span className="material-symbols-outlined text-[16px]">logout</span>
            Logout
          </button>
        </div>
      </div>
    </aside>
  )
}