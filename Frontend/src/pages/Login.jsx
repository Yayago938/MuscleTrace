import { useState } from 'react'
import { Link } from 'react-router-dom'
import BodyModel from '../components/BodyModel'
import './Auth.css'

export default function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [rememberMe, setRememberMe] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()
    // placeholder — would connect to backend
    window.location.href = '/dashboard'
  }

  return (
    <div className="auth-page" id="login-page">
      {/* Left - 3D Visual */}
      <div className="auth-visual">
        <div className="auth-visual-content">
          <BodyModel
            height="100%"
            muscleHighlights={{
              chest: 'active',
              shoulders: 'active',
              core: 'recovery',
              quads: 'active',
              biceps: 'active',
            }}
            enableControls
          />
          <div className="auth-visual-overlay">
            <div className="auth-visual-stats">
              <div className="auth-vis-stat glass-card">
                <span className="label-sm">Athletes Online</span>
                <span className="stat-value-secondary" style={{ fontSize: '1.5rem' }}>12,847</span>
              </div>
              <div className="auth-vis-stat glass-card">
                <span className="label-sm">Workouts Today</span>
                <span className="stat-value-primary" style={{ fontSize: '1.5rem' }}>48.2K</span>
              </div>
            </div>
          </div>
        </div>
        <div className="auth-visual-tagline">
          <h2>The Digital<br /><span style={{ color: 'var(--color-primary)' }}>Athlete.</span></h2>
          <p>Precision instrumentation for the human machine.</p>
        </div>
      </div>

      {/* Right - Form */}
      <div className="auth-form-side">
        <div className="auth-form-container">
          {/* Logo */}
          <Link to="/" className="auth-logo" id="auth-logo">
            <div className="auth-logo-mark">
              <span className="material-icons-outlined">bolt</span>
            </div>
            <div className="auth-logo-text">
              <span className="auth-brand">MuscleTrace</span>
              <span className="auth-tagline">Elite Performance</span>
            </div>
          </Link>

          <div className="auth-header">
            <h1>Welcome back</h1>
            <p>Sign in to access your performance dashboard.</p>
          </div>

          {/* Social Login */}
          <div className="social-login">
            <button className="btn-social" id="google-login-btn" type="button">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 01-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" fill="#4285F4"/>
                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
              </svg>
              Continue with Google
            </button>
            <button className="btn-social" id="github-login-btn" type="button">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/>
              </svg>
              Continue with GitHub
            </button>
          </div>

          <div className="auth-divider">
            <span>or continue with email</span>
          </div>

          {/* Form */}
          <form className="auth-form" onSubmit={handleSubmit} id="login-form">
            <div className="form-group">
              <label className="form-label" htmlFor="login-email">Email</label>
              <div className="input-wrap">
                <span className="material-icons-outlined input-icon">mail</span>
                <input
                  type="email"
                  id="login-email"
                  className="input input-with-icon"
                  placeholder="athlete@muscletrace.io"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
            </div>

            <div className="form-group">
              <div className="form-label-row">
                <label className="form-label" htmlFor="login-password">Password</label>
                <Link to="/forgot-password" className="form-link">Forgot password?</Link>
              </div>
              <div className="input-wrap">
                <span className="material-icons-outlined input-icon">lock</span>
                <input
                  type={showPassword ? 'text' : 'password'}
                  id="login-password"
                  className="input input-with-icon"
                  placeholder="••••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                <button
                  type="button"
                  className="input-action"
                  onClick={() => setShowPassword(!showPassword)}
                  aria-label="Toggle password visibility"
                >
                  <span className="material-icons-outlined">
                    {showPassword ? 'visibility_off' : 'visibility'}
                  </span>
                </button>
              </div>
            </div>

            <div className="form-row">
              <label className="checkbox-wrap" id="remember-me-label">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  id="remember-me"
                />
                <span className="checkbox-custom"></span>
                <span className="checkbox-label">Remember me</span>
              </label>
            </div>

            <button type="submit" className="btn btn-primary btn-full" id="login-submit-btn">
              <span className="material-icons-outlined">login</span>
              Sign In
            </button>
          </form>

          <p className="auth-alt">
            Don't have an account? <Link to="/signup" id="go-to-signup">Create one free</Link>
          </p>
        </div>
      </div>
    </div>
  )
}
