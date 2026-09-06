import { useState } from 'react'
import type { GroceryCategory, GroceryItem, StoreType } from '../types'
import { storeLabel, storeOrder } from '../lib/storeGuide'
import { uid } from '../lib/useLocalStorage'

export function ListaCompra({
  items,
  setItems,
}: {
  items: GroceryItem[]
  setItems: React.Dispatch<React.SetStateAction<GroceryItem[]>>
}) {
  const [name, setName] = useState('')
  const [store, setStore] = useState<StoreType>('supermercado')
  const [category, setCategory] = useState<GroceryCategory>('comida')

  function addManual() {
    if (!name.trim()) return
    setItems((prev) => [
      ...prev,
      { id: uid(), name: name.trim(), store, category, checked: false },
    ])
    setName('')
  }

  function toggle(id: string) {
    setItems((prev) => prev.map((i) => (i.id === id ? { ...i, checked: !i.checked } : i)))
  }

  function remove(id: string) {
    setItems((prev) => prev.filter((i) => i.id !== id))
  }

  function clearChecked() {
    setItems((prev) => prev.filter((i) => !i.checked))
  }

  return (
    <div className="page">
      <h2>Lista de la compra</h2>

      <div className="add-row">
        <input
          placeholder="Añadir producto (ej. detergente)"
          value={name}
          onChange={(e) => setName(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && addManual()}
        />
        <select value={store} onChange={(e) => setStore(e.target.value as StoreType)}>
          {storeOrder.map((s) => (
            <option key={s} value={s}>
              {storeLabel[s]}
            </option>
          ))}
        </select>
        <select value={category} onChange={(e) => setCategory(e.target.value as GroceryCategory)}>
          <option value="comida">Comida</option>
          <option value="limpieza">Limpieza</option>
          <option value="otro">Otro</option>
        </select>
        <button className="btn-primary" onClick={addManual}>
          Añadir
        </button>
      </div>

      {storeOrder.map((s) => {
        const group = items.filter((i) => i.store === s)
        if (group.length === 0) return null
        return (
          <div key={s} className="store-group">
            <h3>{storeLabel[s]}</h3>
            <ul className="grocery-list">
              {group.map((item) => (
                <li key={item.id} className={item.checked ? 'checked' : ''}>
                  <label>
                    <input
                      type="checkbox"
                      checked={item.checked}
                      onChange={() => toggle(item.id)}
                    />
                    {item.name}
                    {item.qty ? ` — ${item.qty}${item.unit ?? ''}` : ''}
                  </label>
                  <button className="link-danger" onClick={() => remove(item.id)}>
                    ✕
                  </button>
                </li>
              ))}
            </ul>
          </div>
        )
      })}

      {items.length === 0 && <p className="empty">Lista vacía. Añade productos o ve a Recetas.</p>}
      {items.some((i) => i.checked) && (
        <button className="btn-secondary" onClick={clearChecked}>
          Quitar marcados
        </button>
      )}
    </div>
  )
}
