export type StoreType = 'carniceria' | 'verduleria' | 'supermercado' | 'otro'

export interface RecipeIngredient {
  id: string
  name: string
  qty: number
  unit: string
  store: StoreType
}

export type MealType = 'desayuno' | 'comida' | 'snack'

export interface Recipe {
  id: string
  name: string
  mealType: MealType
  prepMinutes: number
  kcal: number
  protein: number
  carbs: number
  fat: number
  servings: number
  tags: string[]
  ingredients: RecipeIngredient[]
  steps: string[]
}

export type GroceryCategory = 'comida' | 'limpieza' | 'otro'

export interface GroceryItem {
  id: string
  name: string
  qty?: number
  unit?: string
  store: StoreType
  category: GroceryCategory
  checked: boolean
  fromRecipeId?: string
}

export interface Exercise {
  id: string
  name: string
  sets: number
  reps: string
  restSec: number
  notes?: string
}

export interface WorkoutDay {
  id: string
  name: string
  exercises: Exercise[]
}

export interface UserProfile {
  weightLb: number
  heightCm: number
  goal: string
}

export type Day = 'lunes' | 'martes' | 'miercoles' | 'jueves' | 'viernes' | 'sabado' | 'domingo'

export type WeekPlan = Record<Day, Record<MealType, string[]>>
