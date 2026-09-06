import { useState } from 'react'
import type { UserProfile } from '../types'
import { uid } from '../lib/useLocalStorage'
import {
  bmi,
  bmiLabel,
  latestWeightLb,
  sortedLog,
  suggestedMacros,
  todayISO,
} from '../lib/profileGuide'

interface Props {
  profile: UserProfile
  setProfile: (updater: (prev: UserProfile) => UserProfile) => void
}

export function Perfil({ profile, setProfile }: Props) {
  const [newWeight, setNewWeight] = useState('')
  const [newHeight, setNewHeight] = useState(String(profile.heightCm))

  const currentWeight = latestWeightLb(profile)
  const log = sortedLog(profile.weightLog).reverse()
  const first = sortedLog(profile.weightLog)[0]
  const change = currentWeight != null && first ? currentWeight - first.weightLb : 0

  function logWeight() {
    const w = Number(newWeight)
    if (!w || w <= 0) return
    setProfile((prev) => ({
      ...prev,
      weightLog: [...prev.weightLog, { id: uid(), date: todayISO(), weightLb: w }],
    }))
    setNewWeight('')
  }

  function saveHeight() {
    const h = Number(newHeight)
    if (!h || h <= 0) return
    setProfile((prev) => ({ ...prev, heightCm: h }))
  }

  function removeEntry(id: string) {
    setProfile((prev) => ({ ...prev, weightLog: prev.weightLog.filter((e) => e.id !== id) }))
  }

  const currentBmi = currentWeight != null ? bmi(currentWeight, profile.heightCm) : null
  const macros = currentWeight != null ? suggestedMacros(currentWeight) : null

  return (
    <div className="page">
      <h2>Perfil</h2>

      <div className="card-list">
        <div className="recipe-card">
          <div className="recipe-card-title">Peso actual</div>
          <div className="macros">
            <span>{currentWeight != null ? `${currentWeight} lb` : 'Sin registro'}</span>
            {currentWeight != null && (
              <span>{(currentWeight / 2.20462).toFixed(1)} kg</span>
            )}
            {change !== 0 && (
              <span>{change > 0 ? '+' : ''}{change.toFixed(1)} lb desde el inicio</span>
            )}
          </div>
        </div>

        {currentBmi != null && (
          <div className="recipe-card">
            <div className="recipe-card-title">IMC</div>
            <div className="macros">
              <span>{currentBmi.toFixed(1)}</span>
              <span>{bmiLabel(currentBmi)}</span>
            </div>
          </div>
        )}

        {macros && (
          <div className="recipe-card">
            <div className="recipe-card-title">Macros sugeridos para tu objetivo</div>
            <div className="macros small">
              <span>{macros.kcal} kcal</span>
              <span>P {macros.proteinG}g</span>
              <span>C {macros.carbsG}g</span>
              <span>G {macros.fatG}g</span>
            </div>
            <div className="empty-inline">
              Estimación orientativa para recomposición corporal (déficit leve + proteína alta). No sustituye seguimiento profesional.
            </div>
          </div>
        )}
      </div>

      <h3 className="section-gap">Objetivo</h3>
      <input
        value={profile.goal}
        onChange={(e) => setProfile((prev) => ({ ...prev, goal: e.target.value }))}
        style={{ width: '100%', padding: '10px 12px', borderRadius: 8, border: '1px solid var(--border)', background: 'var(--bg)', color: 'var(--text-h)', fontSize: 14 }}
      />

      <h3 className="section-gap">Registrar peso</h3>
      <div className="add-row">
        <input
          type="number"
          placeholder="Peso (lb)"
          value={newWeight}
          onChange={(e) => setNewWeight(e.target.value)}
        />
        <button className="btn-primary" onClick={logWeight}>Guardar peso de hoy</button>
      </div>

      <h3 className="section-gap">Altura</h3>
      <div className="add-row">
        <input
          type="number"
          placeholder="Altura (cm)"
          value={newHeight}
          onChange={(e) => setNewHeight(e.target.value)}
        />
        <button className="btn-secondary" onClick={saveHeight}>Actualizar altura</button>
      </div>

      <h3 className="section-gap">Historial</h3>
      {log.length === 0 && <p className="empty-inline">Sin registros todavía.</p>}
      <ul className="grocery-list">
        {log.map((entry) => (
          <li key={entry.id}>
            <span>{entry.date} — {entry.weightLb} lb</span>
            <button className="link-danger" onClick={() => removeEntry(entry.id)}>✕</button>
          </li>
        ))}
      </ul>
    </div>
  )
}
