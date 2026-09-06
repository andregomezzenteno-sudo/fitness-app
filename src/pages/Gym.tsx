import { useState } from 'react'
import type { WorkoutDay } from '../types'
import { seedWorkouts } from '../data/seedWorkouts'
import { useLocalStorage } from '../lib/useLocalStorage'
import { exerciseSearchUrl } from '../lib/recipeVisual'

export function Gym() {
  const [workouts] = useLocalStorage<WorkoutDay[]>('workouts', seedWorkouts)
  const [openId, setOpenId] = useState<string | null>(null)
  const [done, setDone] = useLocalStorage<Record<string, boolean>>('gym-done', {})

  const open = workouts.find((w) => w.id === openId)

  if (open) {
    return (
      <div className="page">
        <button className="link-back" onClick={() => setOpenId(null)}>
          ← Rutina
        </button>
        <h2>{open.name}</h2>
        <ul className="exercise-list">
          {open.exercises.map((ex) => {
            const key = `${open.id}-${ex.id}`
            return (
              <li key={ex.id} className={done[key] ? 'checked' : ''}>
                <label>
                  <input
                    type="checkbox"
                    checked={!!done[key]}
                    onChange={() =>
                      setDone((prev) => ({ ...prev, [key]: !prev[key] }))
                    }
                  />
                  <div>
                    <div className="exercise-name">{ex.name}</div>
                    <div className="exercise-meta">
                      {ex.sets} series x {ex.reps} · descanso {ex.restSec}s
                    </div>
                  </div>
                </label>
                <a
                  className="link-video"
                  href={exerciseSearchUrl(ex.name)}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={(e) => e.stopPropagation()}
                >
                  Ver ejecución ▶
                </a>
              </li>
            )
          })}
        </ul>
      </div>
    )
  }

  return (
    <div className="page">
      <h2>Gimnasio</h2>
      <div className="card-list">
        {workouts.map((w) => {
          const total = w.exercises.length
          const completed = w.exercises.filter((ex) => done[`${w.id}-${ex.id}`]).length
          return (
            <button key={w.id} className="recipe-card" onClick={() => setOpenId(w.id)}>
              <div className="recipe-card-title">{w.name}</div>
              <div className="macros small">
                <span>{total} ejercicios</span>
                {completed > 0 && <span>{completed}/{total} hechos</span>}
              </div>
            </button>
          )
        })}
      </div>
    </div>
  )
}
