import { Navigate } from 'react-router-dom'
import { useUser } from '../context/UserContext.jsx'

/**
 * Jalon 3 : Composant d'architecture <ProtectedRoute>
 *
 * Interroge le UserContext pour vérifier si un pseudo est défini.
 * - Si OUI → rend les enfants normalement (accès autorisé)
 * - Si NON → redirige immédiatement vers "/" via <Navigate> (accès bloqué)
 *
 * Pattern fondamental de sécurité Front-End.
 * Utilisé pour protéger les routes /quiz et /resultats.
 */
export default function ProtectedRoute({ children }) {
  const { pseudo } = useUser()

  // Jalon 3 : Blocage du rendu + redirection si pas de pseudo
  if (!pseudo) {
    return <Navigate to="/" replace />
  }

  return children
}
