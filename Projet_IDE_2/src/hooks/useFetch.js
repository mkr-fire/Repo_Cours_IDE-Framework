import { useState, useEffect } from 'react'

/**
 * Jalon 1 : Custom Hook useFetch
 * Abstrait toute la logique réseau hors des composants graphiques.
 * Gère trois états internes : data, loading, error.
 *
 * @param {string} url - L'URL à fetcher
 * @returns {{ data: any, loading: boolean, error: string|null }}
 */
export function useFetch(url) {
  const [data, setData]       = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError]     = useState(null)

  useEffect(() => {
    // Réinitialisation à chaque changement d'URL
    setLoading(true)
    setError(null)
    setData(null)

    // AbortController pour nettoyer la requête si le composant est démonté
    const controller = new AbortController()

    fetch(url, { signal: controller.signal })
      .then((res) => {
        if (!res.ok) throw new Error(`Erreur HTTP : ${res.status}`)
        return res.json()
      })
      .then((json) => {
        setData(json)
        setLoading(false)
      })
      .catch((err) => {
        if (err.name === 'AbortError') return // Requête annulée, on ignore
        setError(err.message)
        setLoading(false)
      })

    // Cleanup : annule la requête si le composant se démonte
    return () => controller.abort()
  }, [url])

  return { data, loading, error }
}
