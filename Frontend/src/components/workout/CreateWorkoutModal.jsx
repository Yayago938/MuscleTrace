import { useEffect, useRef, useState } from 'react'

export default function CreateWorkoutModal({ isOpen, loading, error, onClose, onCreate }) {
  const inputRef = useRef(null)
  const [name, setName] = useState('')
  const [validationError, setValidationError] = useState('')

  useEffect(() => {
    if (!isOpen) return

    setName('')
    setValidationError('')

    const focusTimer = window.setTimeout(() => inputRef.current?.focus(), 0)

    function handleKeyDown(event) {
      if (event.key === 'Escape' && !loading) {
        onClose()
      }
    }

    document.addEventListener('keydown', handleKeyDown)
    return () => {
      window.clearTimeout(focusTimer)
      document.removeEventListener('keydown', handleKeyDown)
    }
  }, [isOpen, loading, onClose])

  if (!isOpen) return null

  async function handleSubmit(event) {
    event.preventDefault()
    const trimmed = name.trim()

    if (!trimmed) {
      setValidationError('Workout name is required.')
      inputRef.current?.focus()
      return
    }

    const created = await onCreate(trimmed)
    if (created) setName('')
  }

  function handleBackdropClick(event) {
    if (event.target === event.currentTarget && !loading) {
      onClose()
    }
  }

  return (
    <div
      role="presentation"
      onMouseDown={handleBackdropClick}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4 backdrop-blur-sm"
    >
      <section
        role="dialog"
        aria-modal="true"
        aria-labelledby="create-workout-title"
        className="w-full max-w-md rounded-editorial bg-surface p-6 shadow-ambient"
      >
        <div className="mb-5 flex items-start justify-between gap-4">
          <div>
            <h2 id="create-workout-title" className="font-headline text-2xl font-bold text-on-surface">
              Create Workout
            </h2>
            <p className="mt-1 text-sm text-on-surface-variant">
              Start a backend-backed workout routine.
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            disabled={loading}
            aria-label="Close create workout dialog"
            className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-on-surface-variant transition hover:bg-surface-container hover:text-on-surface disabled:opacity-50"
          >
            <span className="material-symbols-outlined text-[18px]">close</span>
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <label className="block">
            <span className="mb-2 block text-xs font-bold uppercase tracking-wide text-on-surface-variant">
              Workout Name
            </span>
            <input
              ref={inputRef}
              type="text"
              value={name}
              onChange={(event) => {
                setName(event.target.value)
                setValidationError('')
              }}
              disabled={loading}
              className="w-full rounded-full bg-surface-container-low px-4 py-3 text-sm font-semibold text-on-surface outline-none transition focus:ring-2 focus:ring-primary-container disabled:opacity-60"
            />
          </label>

          {(validationError || error) && (
            <p role="alert" className="text-sm font-semibold text-secondary">
              {validationError || error}
            </p>
          )}

          <div className="flex items-center justify-end gap-3 pt-1">
            <button
              type="button"
              onClick={onClose}
              disabled={loading}
              className="rounded-full bg-surface-container px-5 py-3 text-sm font-bold text-on-surface transition hover:bg-surface-container-high disabled:opacity-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="ember-button justify-center normal-case tracking-normal text-sm disabled:cursor-not-allowed disabled:opacity-60"
            >
              {loading ? 'Creating...' : 'Create'}
            </button>
          </div>
        </form>
      </section>
    </div>
  )
}