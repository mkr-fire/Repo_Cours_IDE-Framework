import { useLocalStorage } from '../hooks/useLocalStorage.js'
import TaskCard from '../components/TaskCard.jsx'
import TaskForm from '../components/TaskForm.jsx'
import Navbar from '../layouts/Navbar.jsx'

/**
 * Jalon 2 : État local représentant la liste initiale des tâches
 * Chaque tâche respecte la structure : { id, titre, description, statut }
 */
const INITIAL_TASKS = [
  {
    id: 1,
    titre: "Conception de l'ontologie",
    description: "Rédiger les axiomes de base du domaine.",
    statut: 'A faire',
  },
  {
    id: 2,
    titre: 'Intégration de l\'API REST',
    description: 'Connecter le frontend au backend via les endpoints définis.',
    statut: 'En cours',
  },
  {
    id: 3,
    titre: 'Rédaction du rapport final',
    description: 'Synthétiser les résultats et préparer la soutenance.',
    statut: 'Termine',
  },
]

/**
 * Page principale Dashboard
 *
 * Jalon 2 : Rendu dynamique avec .map() et key={task.id}
 * Jalon 3 : Lifting State Up via onAddTask transmis au TaskForm
 * Jalon 4 : Persistance via le hook useLocalStorage (bonus)
 *           Remplace useState + useEffect manuels
 */
export default function Dashboard() {
  // BONUS : useLocalStorage remplace useState + useEffect (Jalon 4 + Bonus)
  // Lecture synchrone au montage, sauvegarde automatique à chaque changement
  const [tasks, setTasks] = useLocalStorage('taskflow_data', INITIAL_TASKS)

  /**
   * Jalon 3 : Callback transmis au TaskForm via props (Lifting State Up)
   * Jalon 3 : Utilisation obligatoire du Spread Operator — INTERDIT de faire push()
   */
  const handleAddTask = (nouvelleTache) => {
    setTasks([...tasks, nouvelleTache]) // Immuabilité respectée ✅
  }

  // Compteurs par statut pour le résumé
  const counts = {
    'A faire':  tasks.filter(t => t.statut === 'A faire').length,
    'En cours': tasks.filter(t => t.statut === 'En cours').length,
    'Termine':  tasks.filter(t => t.statut === 'Termine').length,
  }

  return (
    <>
      <Navbar />
      <main style={styles.main}>
        <div style={styles.container}>

          {/* En-tête */}
          <header style={styles.header}>
            <h1 style={styles.title}>Dashboard</h1>
            <div style={styles.stats}>
              <Stat label="À faire"  value={counts['A faire']}  color="#ff6b35" />
              <Stat label="En cours" value={counts['En cours']} color="#00b4d8" />
              <Stat label="Terminé"  value={counts['Termine']}  color="#00ff87" />
            </div>
          </header>

          {/* Jalon 3 : TaskForm reçoit la callback onAddTask (Lifting State Up) */}
          <TaskForm onAddTask={handleAddTask} />

          {/* Jalon 2 : .map() avec key={task.id} — index interdit */}
          <section style={styles.grid}>
            {tasks.length === 0 ? (
              <p style={styles.empty}>Aucune tâche. Ajoutez-en une ci-dessus.</p>
            ) : (
              tasks.map((task) => (
                <TaskCard key={task.id} task={task} />
              ))
            )}
          </section>

        </div>
      </main>
    </>
  )
}

// Petit composant stat interne
function Stat({ label, value, color }) {
  return (
    <div style={styles.statItem}>
      <span style={{ ...styles.statValue, color }}>{value}</span>
      <span style={styles.statLabel}>{label}</span>
    </div>
  )
}

const styles = {
  main: {
    background: '#0f0f0f',
    minHeight: '100vh',
    padding: '2rem 1rem',
  },
  container: {
    maxWidth: '760px',
    margin: '0 auto',
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '2rem',
    flexWrap: 'wrap',
    gap: '1rem',
  },
  title: {
    fontFamily: "'Syne', sans-serif",
    fontWeight: 800,
    fontSize: '2rem',
    color: '#ffffff',
    margin: 0,
    letterSpacing: '-0.03em',
  },
  stats: {
    display: 'flex',
    gap: '1.5rem',
  },
  statItem: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  statValue: {
    fontFamily: "'Syne', sans-serif",
    fontWeight: 800,
    fontSize: '1.6rem',
    lineHeight: 1,
  },
  statLabel: {
    fontFamily: "'Space Mono', monospace",
    fontSize: '0.6rem',
    color: '#555',
    textTransform: 'uppercase',
    letterSpacing: '0.06em',
  },
  grid: {
    display: 'grid',
    gap: '1rem',
  },
  empty: {
    fontFamily: "'Space Mono', monospace",
    color: '#555',
    fontSize: '0.8rem',
    textAlign: 'center',
    padding: '2rem',
  },
}
