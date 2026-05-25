import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Dashboard from './pages/Dashboard.jsx'
import TaskDetail from './pages/TaskDetail.jsx'

// Jalon 5 : Configuration du BrowserRouter et de l'arbre des routes
export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Route racine → Dashboard */}
        <Route path="/" element={<Dashboard />} />
        {/* Route dynamique → Fiche détaillée d'une tâche */}
        <Route path="/task/:id" element={<TaskDetail />} />
      </Routes>
    </BrowserRouter>
  )
}
