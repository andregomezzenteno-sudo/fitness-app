import type { Recipe } from '../types'

export function recipeEmoji(recipe: Recipe): string {
  const text = (recipe.name + ' ' + recipe.tags.join(' ')).toLowerCase()
  if (recipe.mealType === 'snack') return '🥤'
  if (recipe.mealType === 'desayuno') {
    if (text.includes('avena') || text.includes('porridge')) return '🥣'
    if (text.includes('yogur') || text.includes('skyr')) return '🥛'
    if (text.includes('tostada') || text.includes('pan')) return '🍞'
    return '🍳'
  }
  if (text.includes('salmon') || text.includes('salmón') || text.includes('merluza') || text.includes('pescado') || text.includes('atun') || text.includes('atún') || text.includes('gambas')) return '🐟'
  if (text.includes('pollo') || text.includes('pavo') || text.includes('ave')) return '🍗'
  if (text.includes('ternera') || text.includes('cerdo') || text.includes('lomo') || text.includes('carne')) return '🥩'
  if (text.includes('garbanzo') || text.includes('lenteja') || text.includes('legumbre')) return '🥘'
  if (text.includes('pasta') || text.includes('arroz') || text.includes('fideos')) return '🍝'
  if (text.includes('ensalada') || text.includes('quinoa')) return '🥗'
  return '🍽️'
}

export function exerciseSearchUrl(name: string): string {
  const q = encodeURIComponent(`${name} técnica ejecución ejercicio`)
  return `https://www.youtube.com/results?search_query=${q}`
}
