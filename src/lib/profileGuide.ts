import type { UserProfile, WeightEntry } from '../types'
import { uid } from './useLocalStorage'

const LB_PER_KG = 2.20462

export function defaultProfile(): UserProfile {
  return {
    heightCm: 175,
    goal: 'Recomposición: ganar músculo y bajar grasa',
    weightLog: [{ id: uid(), date: todayISO(), weightLb: 150 }],
  }
}

export function todayISO() {
  return new Date().toISOString().slice(0, 10)
}

export function sortedLog(log: WeightEntry[]) {
  return [...log].sort((a, b) => a.date.localeCompare(b.date))
}

export function latestWeightLb(profile: UserProfile): number | null {
  const log = sortedLog(profile.weightLog)
  return log.length ? log[log.length - 1].weightLb : null
}

export function lbToKg(lb: number) {
  return lb / LB_PER_KG
}

export function bmi(weightLb: number, heightCm: number) {
  const kg = lbToKg(weightLb)
  const m = heightCm / 100
  return kg / (m * m)
}

export function bmiLabel(value: number) {
  if (value < 18.5) return 'Bajo peso'
  if (value < 25) return 'Normal'
  if (value < 30) return 'Sobrepeso'
  return 'Obesidad'
}

// Estimación simple orientada a recomposición corporal (sin edad/sexo):
// mantenimiento ~ 33 kcal/kg, déficit leve del 10%, proteína alta para preservar músculo.
export function suggestedMacros(weightLb: number) {
  const kg = lbToKg(weightLb)
  const maintenanceKcal = kg * 33
  const kcal = Math.round(maintenanceKcal * 0.9)
  const proteinG = Math.round(kg * 2.2)
  const fatG = Math.round(kg * 0.8)
  const remainingKcal = kcal - proteinG * 4 - fatG * 9
  const carbsG = Math.max(0, Math.round(remainingKcal / 4))
  return { kcal, proteinG, fatG, carbsG }
}
