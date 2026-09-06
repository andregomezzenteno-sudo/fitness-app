import { useState } from 'react'
import type { Day, GroceryItem, MealType, WeekPlan } from './types'
import { useLocalStorage } from './lib/useLocalStorage'
import { emptyWeekPlan } from './lib/planGuide'
import { Recetas } from './pages/Recetas'
import { Semana } from './pages/Semana'
import { ListaCompra } from './pages/ListaCompra'
import { Gym } from './pages/Gym'
import './App.css'

type Tab = 'recetas' | 'semana' | 'lista' | 'gym'

function App() {
  const [tab, setTab] = useState<Tab>('recetas')
  const [groceryItems, setGroceryItems] = useLocalStorage<GroceryItem[]>('grocery', [])
  const [weekPlan, setWeekPlan] = useLocalStorage<WeekPlan>('week-plan', emptyWeekPlan())

  function addToGrocery(items: GroceryItem[]) {
    setGroceryItems((prev) => [...prev, ...items])
    setTab('lista')
  }

  function addToPlan(recipeId: string, day: Day, slot: MealType) {
    setWeekPlan((prev) => {
      if (prev[day][slot].includes(recipeId)) return prev
      return {
        ...prev,
        [day]: { ...prev[day], [slot]: [...prev[day][slot], recipeId] },
      }
    })
    setTab('semana')
  }

  return (
    <div className="app">
      <main className="app-content">
        {tab === 'recetas' && <Recetas addToGrocery={addToGrocery} addToPlan={addToPlan} />}
        {tab === 'semana' && <Semana plan={weekPlan} setPlan={setWeekPlan} />}
        {tab === 'lista' && <ListaCompra items={groceryItems} setItems={setGroceryItems} />}
        {tab === 'gym' && <Gym />}
      </main>
      <nav className="tabbar">
        <button className={tab === 'recetas' ? 'active' : ''} onClick={() => setTab('recetas')}>
          Recetas
        </button>
        <button className={tab === 'semana' ? 'active' : ''} onClick={() => setTab('semana')}>
          Semana
        </button>
        <button className={tab === 'lista' ? 'active' : ''} onClick={() => setTab('lista')}>
          Lista
        </button>
        <button className={tab === 'gym' ? 'active' : ''} onClick={() => setTab('gym')}>
          Gym
        </button>
      </nav>
    </div>
  )
}

export default App
