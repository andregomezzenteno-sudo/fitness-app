import { useState } from 'react'
import type { Recipe } from '../types'
import { recipeEmoji, recipeImagePath } from '../lib/recipeVisual'

export function RecipeThumb({ recipe, size = 'card' }: { recipe: Recipe; size?: 'card' | 'header' }) {
  const [failed, setFailed] = useState(false)

  if (failed) {
    return <span className={`recipe-thumb-emoji recipe-thumb-emoji-${size}`}>{recipeEmoji(recipe)}</span>
  }

  return (
    <img
      className={`recipe-thumb recipe-thumb-${size}`}
      src={recipeImagePath(recipe)}
      alt={recipe.name}
      loading="lazy"
      onError={() => setFailed(true)}
    />
  )
}
