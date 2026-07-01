import { useEffect, useState } from 'react'

function formatTime(seconds) {
  const m = Math.floor(seconds / 60).toString().padStart(2, '0')
  const s = (seconds % 60).toString().padStart(2, '0')
  return `${m}:${s}`
}

export default function SessionHeader({ workoutName, restSeconds = 0, onRestEnd }) {
  const [totalSeconds, setTotalSeconds] = useState(0)
  const [rest, setRest] = useState(restSeconds)

  useEffect(() => {
    const t = setInterval(() => setTotalSeconds((s) => s + 1), 1000)
    return () => clearInterval(t)
  }, [])

  useEffect(() => {
    setRest(restSeconds)
  }, [restSeconds])

  useEffect(() => {
    if (rest <= 0) return
    const t = setInterval(() => {
      setRest((r) => {
        if (r <= 1) { clearInterval(t); onRestEnd?.(); return 0 }
        return r - 1
      })
    }, 1000)
    return () => clearInterval(t)
  }, [restSeconds])

  return (
    <div className="flex items-center justify-between mb-6">
      <div>
        <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-primary mb-1">
          Current Session
        </p>
        <h1 className="font-headline text-2xl sm:text-3xl font-bold text-on-surface">
          {workoutName}
        </h1>
      </div>

      <div className="flex items-center gap-6">
        <div className="text-right">
          <p className="text-[10px] font-bold uppercase tracking-wide text-on-surface-variant mb-0.5">
            Total Time
          </p>
          <p className="font-headline text-2xl font-bold text-on-surface tabular-nums">
            {formatTime(totalSeconds)}
          </p>
        </div>
        <div className="text-right">
          <p className="text-[10px] font-bold uppercase tracking-wide text-on-surface-variant mb-0.5">
            Rest Timer
          </p>
          <p className={`font-headline text-2xl font-bold tabular-nums transition-colors
            ${rest > 0 ? 'text-secondary' : 'text-on-surface-variant'}`}>
            {formatTime(rest)}
          </p>
        </div>
      </div>
    </div>
  )
}