import type { StoreType } from '../types'

export const storeLabel: Record<StoreType, string> = {
  carniceria: 'Carnicería',
  verduleria: 'Verdulería / Frutería',
  supermercado: 'Supermercado',
  otro: 'Otro',
}

export const storeHint: Record<StoreType, string> = {
  carniceria: 'Carne fresca: normalmente más barata y mejor calidad que en supermercado',
  verduleria: 'Fruta y verdura: normalmente más barata que en supermercado',
  supermercado: 'Despensa, lácteos, congelados, limpieza',
  otro: 'Sin categoría fija',
}

export const storeOrder: StoreType[] = ['carniceria', 'verduleria', 'supermercado', 'otro']
