import type { Day, MealType, WeekPlan } from '../types'

export const days: Day[] = ['lunes', 'martes', 'miercoles', 'jueves', 'viernes', 'sabado', 'domingo']

export const dayLabel: Record<Day, string> = {
  lunes: 'Lunes',
  martes: 'Martes',
  miercoles: 'Miércoles',
  jueves: 'Jueves',
  viernes: 'Viernes',
  sabado: 'Sábado',
  domingo: 'Domingo',
}

export const mealTypes: MealType[] = ['desayuno', 'comida', 'snack']

export const mealTypeLabel: Record<MealType, string> = {
  desayuno: 'Desayuno',
  comida: 'Comida / Cena',
  snack: 'Snack',
}

export function emptyWeekPlan(): WeekPlan {
  const plan = {} as WeekPlan
  for (const d of days) {
    plan[d] = { desayuno: [], comida: [], snack: [] }
  }
  return plan
}
