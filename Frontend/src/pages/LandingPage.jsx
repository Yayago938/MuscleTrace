import { Link } from 'react-router-dom'
import BodyModel from '../components/BodyModel'
import Footer from '../components/Footer'
import './LandingPage.css'

const features = [
  {
    icon: 'view_in_ar',
    title: '3D Muscle Mapping',
    desc: 'Visualize specific muscle group activation in real-time. Understand your biomechanics like never before with deep-tissue heatmaps.',
    stats: [
      { label: 'Hypertrophy', value: '+12.4%', color: 'secondary' },
      { label: 'Recovery', value: 'Optimal', color: 'primary' },
    ],
  },
  {
    icon: 'fitness_center',
    title: 'Workout Tracking',
    desc: 'Surgical logging. Simple, powerful data entry designed for the heat of the set.',
    stats: [
      { label: 'Deadlift', value: '220kg × 5', color: 'primary' },
      { label: 'Bench Press', value: '140kg × 8', color: 'primary' },
    ],
  },
  {
    icon: 'insights',
    title: 'Weekly Analytics',
    desc: 'Deep data insights and volume trends to optimize your periodization.',
    stats: [
      { label: 'Volume', value: '+18%', color: 'secondary' },
      { label: 'Frequency', value: '5.2/wk', color: 'primary' },
    ],
  },
  {
    icon: 'emoji_events',
    title: 'Social Leaderboards',
    desc: 'Compete with the elite. Join squads, share progress, and dominate the rankings.',
    stats: [
      { label: 'Rank', value: 'Top 12%', color: 'primary' },
      { label: 'Streak', value: '14 Days', color: 'secondary' },
    ],
  },
]

export default function LandingPage() {
  return (
    <div className="landing" id="landing-page">
      {/* === NAV === */}
      <header className="landing-nav">
        <div className="landing-nav-inner">
          <Link to="/" className="landing-logo" id="landing-logo">
            <span className="material-icons-outlined" style={{ color: 'var(--color-primary)' }}>bolt</span>
            <span className="landing-logo-text">MuscleTrace</span>
          </Link>
          <nav className="landing-links">
            <Link to="/dashboard">Dashboard</Link>
            <Link to="/workouts">Workouts</Link>
            <Link to="/analytics">Analytics</Link>
            <Link to="/community">Friends</Link>
          </nav>
          <Link to="/signup" className="btn btn-primary" id="get-started-btn">
            Get Started
          </Link>
        </div>
      </header>

      {/* === HERO === */}
      <section className="hero" id="hero-section">
        <div className="hero-content animate-fade-in-up">
          <div className="hero-badge badge badge-primary">
            <span className="material-icons-outlined" style={{ fontSize: 14 }}>bolt</span>
            Elite Performance Instrumentation
          </div>
          <h1 className="hero-title">
            Visualize Your<br />
            <span className="hero-title-accent">Strength</span>
          </h1>
          <p className="hero-subtitle">
            Track workouts. Map muscles. See your progress in immersive 3D telemetry.
            The ultimate instrumentation for the human machine.
          </p>
          <div className="hero-cta">
            <Link to="/signup" className="btn btn-primary" id="hero-cta-start">
              <span className="material-icons-outlined">rocket_launch</span>
              Get Started Free
            </Link>
            <Link to="/analytics" className="btn btn-secondary" id="hero-cta-demo">
              <span className="material-icons-outlined">play_circle</span>
              View Demo
            </Link>
          </div>
        </div>

        <div className="hero-model animate-fade-in delay-2">
          <BodyModel
            height="550px"
            muscleHighlights={{
              chest: 'active',
              shoulders: 'active',
              core: 'recovery',
              quads: 'overstrain',
            }}
            enableControls
          />
          {/* Floating metrics */}
          <div className="hero-metric hero-metric-1 glass-card">
            <span className="label-sm">Latissimus Dorsi</span>
            <span className="stat-value-primary" style={{ fontSize: '1.25rem', fontWeight: 800 }}>94%</span>
            <span className="label-sm" style={{ color: 'var(--color-secondary)' }}>Active</span>
          </div>
          <div className="hero-metric hero-metric-2 glass-card">
            <span className="label-sm">Core Stability</span>
            <div className="hero-metric-bar">
              <div className="hero-metric-bar-fill" style={{ width: '78%' }}></div>
            </div>
          </div>
        </div>
      </section>

      {/* === FEATURES === */}
      <section className="features" id="features-section">
        <div className="features-header animate-fade-in-up">
          <h2>High-Performance<br />Instrumentation</h2>
          <p>Every feature engineered for precision. Every metric, a weapon.</p>
        </div>

        <div className="features-grid">
          {features.map((f, i) => (
            <div className={`feature-card glass-card animate-fade-in-up delay-${i + 1}`} key={f.title} id={`feature-${f.title.toLowerCase().replace(/\s/g, '-')}`}>
              <div className="feature-icon-wrap">
                <span className="material-icons-outlined">{f.icon}</span>
              </div>
              <h3 className="feature-title">{f.title}</h3>
              <p className="feature-desc">{f.desc}</p>
              <div className="feature-stats">
                {f.stats.map(s => (
                  <div className="feature-stat" key={s.label}>
                    <span className="label-sm">{s.label}</span>
                    <span className={`feature-stat-value stat-value-${s.color}`}>{s.value}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* === CTA === */}
      <section className="cta-section" id="cta-section">
        <div className="cta-inner glass-card-heavy animate-fade-in-up">
          <h2>Ready to map your<br /><span style={{ color: 'var(--color-primary)' }}>Full Potential?</span></h2>
          <p>Join 500,000+ elite athletes utilizing Kinetic Precision to optimize every rep and every set.</p>
          <div className="cta-buttons">
            <Link to="/dashboard" className="btn btn-primary">
              <span className="material-icons-outlined">rocket_launch</span>
              Start Training
            </Link>
            <Link to="/analytics" className="btn btn-secondary">Learn More</Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
