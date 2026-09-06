import { useState } from 'react'
import type { Day, GroceryItem, MealType, UserProfile, WeekPlan } from './types'
import { useLocalStorage } from './lib/useLocalStorage'
import { emptyWeekPlan } from './lib/planGuide'
import { defaultProfile } from './lib/profileGuide'
import { Recetas } from './pages/Recetas'
import { Semana } from './pages/Semana'
import { ListaCompra } from './pages/ListaCompra'
import { Gym } from './pages/Gym'
import { Perfil } from './pages/Perfil'
import './App.css'

type Tab = 'recetas' | 'semana' | 'lista' | 'gym' | 'perfil'

function App() {
  const [tab, setTab] = useState<Tab>('recetas')
  const [groceryItems, setGroceryItems] = useLocalStorage<GroceryItem[]>('grocery', [])
  const [weekPlan, setWeekPlan] = useLocalStorage<WeekPlan>('week-plan', emptyWeekPlan())
  const [profile, setProfile] = useLocalStorage<UserProfile>('profile', defaultProfile())

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
        {tab === 'perfil' && <Perfil profile={profile} setProfile={setProfile} />}
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
        <button className={tab === 'perfil' ? 'active' : ''} onClick={() => setTab('perfil')}>
          Perfil
        </button>
      </nav>
    </div>
  )
}

export default App
