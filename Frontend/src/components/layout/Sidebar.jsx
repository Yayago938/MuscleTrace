import { NavLink, useNavigate } from 'react-router-dom'
import { useWorkouts } from '../../context/WorkoutContext'

const NAV_ITEMS = [
  { label: 'Dashboard', icon: 'dashboard', path: '/dashboard' },
  { label: 'Exercises', icon: 'explore', path: '/exercises' },
  { label: 'Workouts', icon: 'fitness_center', path: '/workouts' },
  { label: 'Friends', icon: 'group', path: '/friends' },
  { label: 'Settings', icon: 'settings', path: '/settings' },
]

export default function Sidebar() {
  const navigate = useNavigate()
  const { openCreateWorkoutModal } = useWorkouts()

  return (
    <aside className="fixed inset-y-0 left-0 z-40 hidden h-screen w-60 shrink-0 flex-col overflow-y-auto border-r border-outline-variant bg-surface px-5 py-6 md:flex">
      <div className="mb-10 px-2">
        <span className="font-headline italic font-bold text-primary text-lg">
          MuscleTrace
        </span>
      </div>

      <nav aria-label="Primary" className="flex-1 space-y-1">
        {NAV_ITEMS.map((item) => (
          <NavLink
            key={item.label}
            to={item.path}
            className={({ isActive }) =>
              `nav-chip flex items-center gap-3 normal-case tracking-normal text-xs w-full text-left
              ${isActive
                ? 'bg-surface-container-lowest text-on-surface shadow-ambient'
                : 'text-on-surface-variant hover:text-on-surface focus-visible:text-on-surface'} focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary`
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
          onClick={openCreateWorkoutModal}
          className="ember-button w-full justify-center normal-case tracking-normal text-sm gap-2 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
        >
          <span className="material-symbols-outlined text-[16px]">add</span>
          Create Workout
        </button>

        <div className="px-2 space-y-2 text-xs text-on-surface-variant font-medium">
          <button
            type="button"
            onClick={() => {}}
            className="flex items-center gap-2 hover:text-on-surface focus-visible:text-on-surface focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary w-full text-left"
          >
            <span className="material-symbols-outlined text-[16px]">help</span>
            Help
          </button>
          <button
            type="button"
            onClick={() => {
              localStorage.removeItem('token')
              navigate('/login')
            }}
            className="flex items-center gap-2 hover:text-on-surface focus-visible:text-on-surface focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary w-full text-left"
          >
            <span className="material-symbols-outlined text-[16px]">logout</span>
            Logout
          </button>
        </div>
      </div>
    </aside>
  )
}