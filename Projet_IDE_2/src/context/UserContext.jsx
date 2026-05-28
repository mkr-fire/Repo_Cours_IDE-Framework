import { createContext, useContext, useState } from 'react'

/**
 * Jalon 2 : API Context – Bus de données global
 * Permet au pseudo et au meilleur score d'être accessibles dans toute
 * l'application sans Props Drilling.
 */

// Instanciation du contexte global
export const UserContext = createContext(null)

/**
 * Composant Provider – Enveloppe la racine de l'application (App.jsx)
 * État global : pseudonyme (null par défaut) + meilleur score
 */
export function UserProvider({ children }) {
  const [pseudo, setPseudo]         = useState(null)
  const [meilleurScore, setMeilleurScore] = useState(0)

  /**
   * Enregistre le pseudo du joueur (appelé depuis la page d'accueil)
   */
  const connecter = (nom) => {
    setPseudo(nom.trim())
  }

  /**
   * Met à jour le meilleur score si le nouveau score est supérieur
   */
  const mettreAJourScore = (score) => {
    setMeilleurScore((prev) => Math.max(prev, score))
  }

  /**
   * Déconnecte le joueur et réinitialise le pseudo
   */
  const deconnecter = () => {
    setPseudo(null)
  }

  const valeur = {
    pseudo,
    meilleurScore,
    connecter,
    mettreAJourScore,
    deconnecter,
  }

  return (
    <UserContext.Provider value={valeur}>
      {children}
    </UserContext.Provider>
  )
}

/**
 * Hook utilitaire pour consommer le contexte sans répéter useContext(UserContext)
 */
export function useUser() {
  const ctx = useContext(UserContext)
  if (!ctx) throw new Error('useUser doit être utilisé à l\'intérieur de <UserProvider>')
  return ctx
}
