import { NavLink } from 'react-router-dom'
import './Sidebar.css'

const navItems = [
  { path: '/dashboard', icon: 'dashboard', label: 'Dashboard' },
  { path: '/workouts', icon: 'fitness_center', label: 'Workouts' },
  { path: '/analytics', icon: 'leaderboard', label: 'Analytics' },
  { path: '/community', icon: 'group', label: 'Friends' },
  { path: '/profile', icon: 'person', label: 'Profile' },
]

export default function Sidebar() {
  return (
    <aside className="sidebar" id="main-sidebar">
      <div className="sidebar-logo">
        <div className="sidebar-logo-mark">
          <span className="material-icons-outlined">bolt</span>
        </div>
        <div className="sidebar-logo-text">
          <span className="sidebar-brand">MuscleTrace</span>
          <span className="sidebar-tagline">Elite Performance</span>
        </div>
      </div>

      <nav className="sidebar-nav">
        {navItems.map(item => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) =>
              `sidebar-link ${isActive ? 'sidebar-link--active' : ''}`
            }
            id={`nav-${item.label.toLowerCase()}`}
          >
            <span className="material-icons-outlined">{item.icon}</span>
            <span className="sidebar-link-label">{item.label}</span>
          </NavLink>
        ))}
      </nav>

      <div className="sidebar-footer">
        <div className="sidebar-user">
          <div className="sidebar-avatar">AR</div>
          <div className="sidebar-user-info">
            <span className="sidebar-user-name">Alex Rivera</span>
            <span className="sidebar-user-tier badge badge-primary">Pro</span>
          </div>
        </div>
      </div>
    </aside>
  )
}
