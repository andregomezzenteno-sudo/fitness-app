import type { Day, MealType, Recipe, WeekPlan } from '../types'
import { seedRecipes } from '../data/seedRecipes'
import { useLocalStorage } from '../lib/useLocalStorage'
import { days, dayLabel, mealTypes, mealTypeLabel } from '../lib/planGuide'
import { recipeEmoji } from '../lib/recipeVisual'

export function Semana({
  plan,
  setPlan,
}: {
  plan: WeekPlan
  setPlan: React.Dispatch<React.SetStateAction<WeekPlan>>
}) {
  const [recipes] = useLocalStorage<Recipe[]>('recipes-v2', seedRecipes)

  function removeFromPlan(day: Day, slot: MealType, recipeId: string) {
    setPlan((prev) => ({
      ...prev,
      [day]: {
        ...prev[day],
        [slot]: prev[day][slot].filter((id) => id !== recipeId),
      },
    }))
  }

  function recipeById(id: string) {
    return recipes.find((r) => r.id === id)
  }

  function dayTotals(day: Day) {
    const ids = mealTypes.flatMap((m) => plan[day][m])
    const recs = ids.map(recipeById).filter((r): r is Recipe => !!r)
    return {
      kcal: recs.reduce((sum, r) => sum + r.kcal, 0),
      protein: recs.reduce((sum, r) => sum + r.protein, 0),
    }
  }

  return (
    <div className="page">
      <h2>Mi semana</h2>
      {days.map((day) => {
        const totals = dayTotals(day)
        const hasAny = mealTypes.some((m) => plan[day][m].length > 0)
        return (
          <div key={day} className="day-block">
            <div className="day-header">
              <h3>{dayLabel[day]}</h3>
              {hasAny && (
                <span className="day-totals">
                  {totals.kcal} kcal · P {totals.protein}g
                </span>
              )}
            </div>
            {mealTypes.map((slot) => {
              const ids = plan[day][slot]
              if (ids.length === 0) return null
              return (
                <div key={slot} className="slot-row">
                  <span className="slot-label">{mealTypeLabel[slot]}</span>
                  <ul className="plan-list">
                    {ids.map((id) => {
                      const r = recipeById(id)
                      if (!r) return null
                      return (
                        <li key={id}>
                          <span>
                            {recipeEmoji(r)} {r.name}
                          </span>
                          <button className="link-danger" onClick={() => removeFromPlan(day, slot, id)}>
                            ✕
                          </button>
                        </li>
                      )
                    })}
                  </ul>
                </div>
              )
            })}
            {!hasAny && <p className="empty-inline">Sin recetas asignadas. Añade desde Recetas.</p>}
          </div>
        )
      })}
    </div>
  )
}
