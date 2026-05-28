import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { UserProvider } from './context/UserContext.jsx'
import ProtectedRoute from './components/ProtectedRoute.jsx'
import Accueil from './pages/Accueil.jsx'
import QuizEngine from './pages/QuizEngine.jsx'
import Resultats from './pages/Resultats.jsx'

/**
 * App.jsx – Racine de l'application
 *
 * Jalon 2 : <UserProvider> enveloppe toute l'application
 *           → pseudo et meilleurScore accessibles partout sans Props Drilling
 *
 * Jalon 3 : Configuration du BrowserRouter avec trois routes principales :
 *   - "/"          → Accueil (page de login pseudo)
 *   - "/quiz"      → QuizEngine (protégée par <ProtectedRoute>)
 *   - "/resultats" → Resultats  (protégée par <ProtectedRoute>)
 */
export default function App() {
  return (
    // Jalon 2 : Le Provider enveloppe la racine entière
    <UserProvider>
      <BrowserRouter>
        <Routes>
          {/* Route publique : Accueil / Login */}
          <Route path="/" element={<Accueil />} />

          {/* Jalon 3 : Routes protégées – accessibles uniquement si pseudo défini */}
          <Route
            path="/quiz"
            element={
              <ProtectedRoute>
                <QuizEngine />
              </ProtectedRoute>
            }
          />
          <Route
            path="/resultats"
            element={
              <ProtectedRoute>
                <Resultats />
              </ProtectedRoute>
            }
          />
        </Routes>
      </BrowserRouter>
    </UserProvider>
  )
}
