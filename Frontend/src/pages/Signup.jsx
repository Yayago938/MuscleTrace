import { useState } from 'react'
import { Link } from 'react-router-dom'
import BodyModel from '../components/BodyModel'
import './Auth.css'

export default function Signup() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [agreed, setAgreed] = useState(false)

  const passwordStrength = () => {
    if (password.length === 0) return { level: 0, text: '', color: '' }
    if (password.length < 6) return { level: 1, text: 'Weak', color: 'var(--color-tertiary)' }
    if (password.length < 10) return { level: 2, text: 'Fair', color: '#f0a500' }
    if (/(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])/.test(password))
      return { level: 4, text: 'Excellent', color: 'var(--color-secondary)' }
    return { level: 3, text: 'Good', color: 'var(--color-primary)' }
  }

  const strength = passwordStrength()

  const handleSubmit = (e) => {
    e.preventDefault()
    window.location.href = '/dashboard'
  }

  return (
    <div className="auth-page" id="signup-page">
      {/* Left - 3D Visual */}
      <div className="auth-visual">
        <div className="auth-visual-content">
          <BodyModel
            height="100%"
            muscleHighlights={{
              chest: 'recovery',
              shoulders: 'recovery',
              core: 'active',
              quads: 'recovery',
              calves: 'active',
            }}
            enableControls
          />
          <div className="auth-visual-overlay">
            <div className="auth-visual-stats">
              <div className="auth-vis-stat glass-card">
                <span className="label-sm">Free Plan</span>
                <span className="stat-value-primary" style={{ fontSize: '1.1rem' }}>Unlimited Tracking</span>
              </div>
              <div className="auth-vis-stat glass-card">
                <span className="label-sm">Join</span>
                <span className="stat-value-secondary" style={{ fontSize: '1.5rem' }}>500K+</span>
                <span className="label-sm">Athletes</span>
              </div>
            </div>
          </div>
        </div>
        <div className="auth-visual-tagline">
          <h2>Map Your<br /><span style={{ color: 'var(--color-secondary)' }}>Potential.</span></h2>
          <p>Start your elite performance journey today.</p>
        </div>
      </div>

      {/* Right - Form */}
      <div className="auth-form-side">
        <div className="auth-form-container">
          {/* Logo */}
          <Link to="/" className="auth-logo" id="auth-logo-signup">
            <div className="auth-logo-mark">
              <span className="material-icons-outlined">bolt</span>
            </div>
            <div className="auth-logo-text">
              <span className="auth-brand">MuscleTrace</span>
              <span className="auth-tagline">Elite Performance</span>
            </div>
          </Link>

          <div className="auth-header">
            <h1>Create your account</h1>
            <p>Join the elite. Start tracking your performance for free.</p>
          </div>

          {/* Social Login */}
          <div className="social-login">
            <button className="btn-social" id="google-signup-btn" type="button">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 01-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" fill="#4285F4"/>
                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
              </svg>
              Sign up with Google
            </button>
            <button className="btn-social" id="github-signup-btn" type="button">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/>
              </svg>
              Sign up with GitHub
            </button>
          </div>

          <div className="auth-divider">
            <span>or register with email</span>
          </div>

          {/* Form */}
          <form className="auth-form" onSubmit={handleSubmit} id="signup-form">
            <div className="form-group">
              <label className="form-label" htmlFor="signup-name">Full Name</label>
              <div className="input-wrap">
                <span className="material-icons-outlined input-icon">person</span>
                <input
                  type="text"
                  id="signup-name"
                  className="input input-with-icon"
                  placeholder="Alex Rivera"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </div>
            </div>

            <div className="form-group">
              <label className="form-label" htmlFor="signup-email">Email</label>
              <div className="input-wrap">
                <span className="material-icons-outlined input-icon">mail</span>
                <input
                  type="email"
                  id="signup-email"
                  className="input input-with-icon"
                  placeholder="athlete@muscletrace.io"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
            </div>

            <div className="form-group">
              <label className="form-label" htmlFor="signup-password">Password</label>
              <div className="input-wrap">
                <span className="material-icons-outlined input-icon">lock</span>
                <input
                  type={showPassword ? 'text' : 'password'}
                  id="signup-password"
                  className="input input-with-icon"
                  placeholder="Min. 8 characters"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  minLength={8}
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
              {/* Password Strength */}
              {password.length > 0 && (
                <div className="password-strength">
                  <div className="strength-bars">
                    {[1, 2, 3, 4].map(i => (
                      <div
                        key={i}
                        className={`strength-bar ${i <= strength.level ? 'strength-bar--active' : ''}`}
                        style={i <= strength.level ? { background: strength.color } : {}}
                      />
                    ))}
                  </div>
                  <span className="strength-text" style={{ color: strength.color }}>{strength.text}</span>
                </div>
              )}
            </div>

            <div className="form-group">
              <label className="form-label" htmlFor="signup-confirm">Confirm Password</label>
              <div className="input-wrap">
                <span className="material-icons-outlined input-icon">lock</span>
                <input
                  type={showPassword ? 'text' : 'password'}
                  id="signup-confirm"
                  className="input input-with-icon"
                  placeholder="Re-enter your password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                />
                {confirmPassword.length > 0 && password === confirmPassword && (
                  <span className="material-icons-outlined input-check" style={{ color: 'var(--color-secondary)' }}>
                    check_circle
                  </span>
                )}
                {confirmPassword.length > 0 && password !== confirmPassword && (
                  <span className="material-icons-outlined input-check" style={{ color: 'var(--color-tertiary)' }}>
                    cancel
                  </span>
                )}
              </div>
            </div>

            <div className="form-row">
              <label className="checkbox-wrap" id="terms-label">
                <input
                  type="checkbox"
                  checked={agreed}
                  onChange={(e) => setAgreed(e.target.checked)}
                  id="agree-terms"
                  required
                />
                <span className="checkbox-custom"></span>
                <span className="checkbox-label">
                  I agree to the <Link to="/terms">Terms of Service</Link> and <Link to="/privacy">Privacy Policy</Link>
                </span>
              </label>
            </div>

            <button
              type="submit"
              className="btn btn-primary btn-full"
              id="signup-submit-btn"
              disabled={!agreed || password !== confirmPassword}
            >
              <span className="material-icons-outlined">rocket_launch</span>
              Create Account
            </button>
          </form>

          <p className="auth-alt">
            Already have an account? <Link to="/login" id="go-to-login">Sign in</Link>
          </p>
        </div>
      </div>
    </div>
  )
}
