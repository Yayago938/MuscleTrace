import { useState, useEffect } from 'react'
import Sidebar from '../components/Sidebar'
import Footer from '../components/Footer'
import './LogWorkout.css'

const initialExercises = [
  {
    id: 1,
    name: 'Barbell Back Squat',
    muscle: 'Quadriceps, Glutes',
    sets: [
      { set: 1, weight: 100, reps: 8, status: 'done', prev: '95kg × 8' },
      { set: 2, weight: 110, reps: 6, status: 'done', prev: '105kg × 6' },
      { set: 3, weight: 120, reps: 5, status: 'done', prev: '115kg × 5' },
      { set: 4, weight: 120, reps: 4, status: 'current', prev: '115kg × 4' },
    ],
  },
  {
    id: 2,
    name: 'Leg Press (Plate Loaded)',
    muscle: 'Quadriceps, Hamstrings',
    sets: [
      { set: 1, weight: 200, reps: 12, status: 'done', prev: '180kg × 12' },
      { set: 2, weight: 220, reps: 10, status: 'done', prev: '200kg × 10' },
      { set: 3, weight: 240, reps: 8, status: 'pending', prev: '220kg × 8' },
    ],
  },
  {
    id: 3,
    name: 'Bulgarian Split Squats',
    muscle: 'Quadriceps, Glutes',
    sets: [
      { set: 1, weight: 30, reps: 10, status: 'pending', prev: '25kg × 10' },
      { set: 2, weight: 30, reps: 10, status: 'pending', prev: '25kg × 10' },
      { set: 3, weight: 30, reps: 10, status: 'pending', prev: '25kg × 10' },
    ],
  },
]

function formatTime(seconds) {
  const h = Math.floor(seconds / 3600)
  const m = Math.floor((seconds % 3600) / 60)
  const s = seconds % 60
  return `${h.toString().padStart(2, '0')}:${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`
}

export default function LogWorkout() {
  const [elapsed, setElapsed] = useState(2520) // start at 42 min
  const [exercises] = useState(initialExercises)
  const [searchQuery, setSearchQuery] = useState('')

  useEffect(() => {
    const timer = setInterval(() => setElapsed(prev => prev + 1), 1000)
    return () => clearInterval(timer)
  }, [])

  const totalVolume = exercises.reduce((acc, ex) => {
    return acc + ex.sets.reduce((a, s) => {
      return s.status === 'done' ? a + s.weight * s.reps : a
    }, 0)
  }, 0)

  const completedSets = exercises.reduce((acc, ex) => {
    return acc + ex.sets.filter(s => s.status === 'done').length
  }, 0)

  const totalSets = exercises.reduce((acc, ex) => acc + ex.sets.length, 0)

  return (
    <div className="app-layout" id="log-workout-page">
      <Sidebar />
      <main className="main-content">
        {/* Session Header */}
        <div className="session-header glass-card-heavy animate-fade-in" id="session-header">
          <div className="session-info">
            <div className="session-badge badge badge-secondary">
              <span className="material-icons-outlined" style={{ fontSize: 14 }}>radio_button_checked</span>
              Active Session
            </div>
            <h2 className="session-title">Leg Day — Phase 2</h2>
          </div>

          <div className="session-stats">
            <div className="session-stat">
              <span className="label-sm">Duration</span>
              <span className="session-timer stat-value-primary" style={{ fontSize: '1.5rem' }}>
                {formatTime(elapsed)}
              </span>
            </div>
            <div className="session-divider"></div>
            <div className="session-stat">
              <span className="label-sm">Total Volume</span>
              <span className="stat-value-secondary" style={{ fontSize: '1.5rem' }}>
                {totalVolume.toLocaleString()} <span className="stat-unit">kg</span>
              </span>
            </div>
            <div className="session-divider"></div>
            <div className="session-stat">
              <span className="label-sm">Sets</span>
              <span className="stat-value" style={{ fontSize: '1.5rem', color: 'var(--color-on-surface)' }}>
                {completedSets}/{totalSets}
              </span>
            </div>
          </div>

          <button className="btn btn-danger" id="end-session-btn">
            <span className="material-icons-outlined">stop_circle</span>
            End Session
          </button>
        </div>

        {/* Exercises */}
        <div className="exercises-list">
          {exercises.map((ex, exIdx) => (
            <div className={`exercise-card glass-card animate-fade-in-up delay-${exIdx + 1}`} key={ex.id} id={`exercise-${ex.id}`}>
              <div className="exercise-header">
                <div className="exercise-title-row">
                  <span className="material-icons-outlined exercise-grip">drag_indicator</span>
                  <div>
                    <h3 className="exercise-name">{ex.name}</h3>
                    <span className="label-sm">{ex.muscle}</span>
                  </div>
                </div>
                <button className="btn btn-secondary" style={{ padding: '6px 14px', fontSize: 'var(--font-label-md)' }}>
                  <span className="material-icons-outlined" style={{ fontSize: 16 }}>add</span>
                  Add Set
                </button>
              </div>

              <div className="sets-table">
                <div className="sets-header">
                  <span>Set</span>
                  <span>Previous</span>
                  <span>Weight (KG)</span>
                  <span>Reps</span>
                  <span>Status</span>
                </div>
                {ex.sets.map(s => (
                  <div className={`set-row ${s.status === 'current' ? 'set-row--current' : ''} ${s.status === 'done' ? 'set-row--done' : ''}`} key={`${ex.id}-${s.set}`}>
                    <span className="set-num">{s.set}</span>
                    <span className="set-prev">{s.prev}</span>
                    <span className="set-weight">{s.weight}</span>
                    <span className="set-reps">{s.reps}</span>
                    <span className={`set-status set-status--${s.status}`}>
                      {s.status === 'done' && <span className="material-icons-outlined" style={{ fontSize: 16, color: 'var(--color-secondary)' }}>check_circle</span>}
                      {s.status === 'current' && <span className="material-icons-outlined" style={{ fontSize: 16, color: 'var(--color-primary)' }}>play_circle</span>}
                      {s.status === 'pending' && <span className="material-icons-outlined" style={{ fontSize: 16, color: 'var(--color-outline)' }}>radio_button_unchecked</span>}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Quick Add */}
        <div className="quick-add glass-card animate-fade-in-up delay-4" id="quick-add-exercise">
          <span className="material-icons-outlined" style={{ color: 'var(--color-outline)' }}>search</span>
          <input
            type="text"
            className="input"
            placeholder="Quick add exercise... (e.g. Romanian Deadlift)"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            id="exercise-search-input"
            style={{ background: 'transparent', border: 'none', padding: '0' }}
          />
        </div>

        {/* Save */}
        <div className="save-row animate-fade-in-up delay-5">
          <button className="btn btn-primary btn-save" id="save-workout-btn">
            <span className="material-icons-outlined">save</span>
            Save Workout
          </button>
        </div>

        <Footer />
      </main>
    </div>
  )
}
