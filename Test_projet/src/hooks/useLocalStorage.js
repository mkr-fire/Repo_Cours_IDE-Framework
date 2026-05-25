import { useState, useEffect } from 'react'

/**
 * Hook personnalisé useLocalStorage
 * BONUS (+2 pts) : Extraction de la logique de persistance dans un hook dédié.
 *
 * @param {string} key   - La clé utilisée dans le localStorage
 * @param {any} initialValue - La valeur par défaut si aucune donnée n'existe
 * @returns {[any, Function]} - Le state et le setter, identiques à useState
 */
export function useLocalStorage(key, initialValue) {
  // Lecture synchrone au montage du composant (Jalon 4)
  const [value, setValue] = useState(() => {
    const saved = localStorage.getItem(key)
    return saved ? JSON.parse(saved) : initialValue
  })

  // Sérialisation et sauvegarde à chaque modification de value (Jalon 4)
  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value))
  }, [key, value])

  return [value, setValue]
}
