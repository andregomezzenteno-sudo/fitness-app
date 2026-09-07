import { useState } from 'react'
import type { Day, GroceryItem, MealType, Recipe } from '../types'
import { seedRecipes } from '../data/seedRecipes'
import { useLocalStorage, uid } from '../lib/useLocalStorage'
import { storeLabel } from '../lib/storeGuide'
import { RecipeThumb } from '../components/RecipeThumb'
import { days, dayLabel, mealTypes, mealTypeLabel } from '../lib/planGuide'

type Filter = 'todas' | MealType

export function Recetas({
  addToGrocery,
  addToPlan,
}: {
  addToGrocery: (items: GroceryItem[]) => void
  addToPlan: (recipeId: string, day: Day, slot: MealType) => void
}) {
  const [recipes] = useLocalStorage<Recipe[]>('recipes-v2', seedRecipes)
  const [openId, setOpenId] = useState<string | null>(null)
  const [filter, setFilter] = useState<Filter>('todas')
  const [planDay, setPlanDay] = useState<Day>('lunes')
  const [planSlot, setPlanSlot] = useState<MealType>('comida')

  const open = recipes.find((r) => r.id === openId)
  const filtered = filter === 'todas' ? recipes : recipes.filter((r) => r.mealType === filter)

  if (open) {
    return (
      <div className="page">
        <button className="link-back" onClick={() => setOpenId(null)}>
          ← Recetas
        </button>
        <RecipeThumb recipe={open} size="header" />
        <h2>{open.name}</h2>
        <div className="macros">
          <span>{open.kcal} kcal</span>
          <span>P {open.protein}g</span>
          <span>C {open.carbs}g</span>
          <span>G {open.fat}g</span>
          <span>⏱ {open.prepMinutes} min</span>
        </div>
        <h3>Ingredientes</h3>
        <ul className="ingredient-list">
          {open.ingredients.map((ing) => (
            <li key={ing.id}>
              {ing.qty} {ing.unit} {ing.name}
              <span className="tag">{storeLabel[ing.store]}</span>
            </li>
          ))}
        </ul>
        <h3>Preparación</h3>
        <ol>
          {open.steps.map((s, i) => (
            <li key={i}>{s}</li>
          ))}
        </ol>
        <button
          className="btn-primary"
          onClick={() => {
            const items: GroceryItem[] = open.ingredients.map((ing) => ({
              id: uid(),
              name: ing.name,
              qty: ing.qty,
              unit: ing.unit,
              store: ing.store,
              category: 'comida',
              checked: false,
              fromRecipeId: open.id,
            }))
            addToGrocery(items)
          }}
        >
          Añadir ingredientes a la lista de compra
        </button>

        <h3 className="section-gap">Añadir a mi semana</h3>
        <div className="add-row">
          <select value={planDay} onChange={(e) => setPlanDay(e.target.value as Day)}>
            {days.map((d) => (
              <option key={d} value={d}>
                {dayLabel[d]}
              </option>
            ))}
          </select>
          <select value={planSlot} onChange={(e) => setPlanSlot(e.target.value as MealType)}>
            {mealTypes.map((m) => (
              <option key={m} value={m}>
                {mealTypeLabel[m]}
              </option>
            ))}
          </select>
          <button className="btn-secondary" onClick={() => addToPlan(open.id, planDay, planSlot)}>
            Añadir al plan
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="page">
      <h2>Recetas</h2>
      <div className="filter-row">
        <button className={filter === 'todas' ? 'active' : ''} onClick={() => setFilter('todas')}>
          Todas
        </button>
        {mealTypes.map((m) => (
          <button key={m} className={filter === m ? 'active' : ''} onClick={() => setFilter(m)}>
            {mealTypeLabel[m]}
          </button>
        ))}
      </div>
      <div className="card-list">
        {filtered.map((r) => (
          <button key={r.id} className="recipe-card" onClick={() => setOpenId(r.id)}>
            <RecipeThumb recipe={r} size="card" />
            <div className="recipe-card-title">{r.name}</div>
            <div className="macros small">
              <span>{r.kcal} kcal</span>
              <span>P {r.protein}g</span>
              <span>⏱ {r.prepMinutes} min</span>
            </div>
            <div className="tags">
              {r.tags.map((t) => (
                <span key={t} className="tag">
                  {t}
                </span>
              ))}
            </div>
          </button>
        ))}
      </div>
    </div>
  )
}
