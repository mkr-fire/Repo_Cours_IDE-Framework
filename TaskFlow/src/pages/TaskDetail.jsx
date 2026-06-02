import { useParams, Link } from 'react-router-dom'
import { useLocalStorage } from '../hooks/useLocalStorage.js'
import Navbar from '../layouts/Navbar.jsx'

const INITIAL_TASKS = []

/**
 * Jalon 5 : Page de détail d'une tâche
 * - useParams() extrait l'id depuis l'URL /task/:id
 * - Recherche de la tâche dans les données persistées
 * - Affichage complet de toutes ses propriétés
 */
export default function TaskDetail() {
  // Jalon 5 : Extraction de l'identifiant depuis l'URL dynamique
  const { id } = useParams()

  // Lecture des tâches depuis le localStorage (même clé que le Dashboard)
  const [tasks] = useLocalStorage('taskflow_data', INITIAL_TASKS)

  // Recherche de la tâche correspondante (id est une string dans l'URL → conversion)
  const task = tasks.find((t) => t.id === Number(id) || t.id === id)

  const statutConfig = {
    'A faire':  { color: '#ff6b35', bg: 'rgba(255,107,53,0.1)',  label: 'À faire'  },
    'En cours': { color: '#00b4d8', bg: 'rgba(0,180,216,0.1)',   label: 'En cours' },
    'Termine':  { color: '#00ff87', bg: 'rgba(0,255,135,0.1)',   label: 'Terminé'  },
  }

  return (
    <>
      <Navbar />
      <main style={styles.main}>
        <div style={styles.container}>

          {/* Jalon 5 : <Link> obligatoire — aucun <a href> */}
          <Link to="/" style={styles.retour}>← Retour au Dashboard</Link>

          {!task ? (
            <div style={styles.notFound}>
              <h2 style={styles.notFoundTitle}>Tâche introuvable</h2>
              <p style={styles.notFoundText}>
                L'identifiant <code style={styles.code}>#{id}</code> ne correspond à aucune tâche enregistrée.
              </p>
              <Link to="/" style={styles.btnRetour}>Revenir au Dashboard</Link>
            </div>
          ) : (
            <article style={styles.card}>

              {/* Badge statut */}
              {task.statut && statutConfig[task.statut] && (
                <span style={{
                  ...styles.badge,
                  color: statutConfig[task.statut].color,
                  background: statutConfig[task.statut].bg,
                }}>
                  {statutConfig[task.statut].label}
                </span>
              )}

              {/* Titre complet */}
              <h1 style={styles.titre}>{task.titre}</h1>

              {/* Séparateur */}
              <div style={styles.divider} />

              {/* Toutes les propriétés en grand format */}
              <section style={styles.section}>
                <span style={styles.fieldLabel}>Description</span>
                <p style={styles.fieldValue}>
                  {task.description || <em style={{ color: '#555' }}>Aucune description fournie.</em>}
                </p>
              </section>

              <section style={styles.section}>
                <span style={styles.fieldLabel}>Identifiant unique</span>
                <code style={styles.code}>{task.id}</code>
              </section>

              <section style={styles.section}>
                <span style={styles.fieldLabel}>Statut actuel</span>
                <p style={styles.fieldValue}>{task.statut}</p>
              </section>

            </article>
          )}
        </div>
      </main>
    </>
  )
}

const styles = {
  main: {
    background: '#0f0f0f',
    minHeight: '100vh',
    padding: '2rem 1rem',
  },
  container: {
    maxWidth: '680px',
    margin: '0 auto',
  },
  retour: {
    fontFamily: "'Space Mono', monospace",
    fontSize: '0.75rem',
    color: '#555',
    textDecoration: 'none',
    display: 'inline-block',
    marginBottom: '1.5rem',
    letterSpacing: '0.04em',
  },
  card: {
    background: '#161616',
    border: '1px solid #2a2a2a',
    borderRadius: '10px',
    padding: '2rem',
    display: 'flex',
    flexDirection: 'column',
    gap: '1.25rem',
  },
  badge: {
    fontFamily: "'Space Mono', monospace",
    fontSize: '0.65rem',
    fontWeight: 700,
    letterSpacing: '0.08em',
    textTransform: 'uppercase',
    padding: '4px 12px',
    borderRadius: '999px',
    alignSelf: 'flex-start',
  },
  titre: {
    fontFamily: "'Syne', sans-serif",
    fontWeight: 800,
    fontSize: '1.8rem',
    color: '#ffffff',
    margin: 0,
    lineHeight: 1.2,
    letterSpacing: '-0.02em',
  },
  divider: {
    height: '1px',
    background: '#2a2a2a',
  },
  section: {
    display: 'flex',
    flexDirection: 'column',
    gap: '0.4rem',
  },
  fieldLabel: {
    fontFamily: "'Space Mono', monospace",
    fontSize: '0.65rem',
    color: '#555',
    textTransform: 'uppercase',
    letterSpacing: '0.08em',
  },
  fieldValue: {
    fontFamily: "'Space Mono', monospace",
    fontSize: '0.85rem',
    color: '#ccc',
    margin: 0,
    lineHeight: 1.7,
  },
  code: {
    fontFamily: "'Space Mono', monospace",
    fontSize: '0.8rem',
    color: '#00ff87',
    background: 'rgba(0,255,135,0.08)',
    padding: '2px 8px',
    borderRadius: '4px',
  },
  notFound: {
    textAlign: 'center',
    padding: '4rem 2rem',
  },
  notFoundTitle: {
    fontFamily: "'Syne', sans-serif",
    fontWeight: 800,
    color: '#ffffff',
    fontSize: '1.5rem',
    marginBottom: '0.75rem',
  },
  notFoundText: {
    fontFamily: "'Space Mono', monospace",
    color: '#888',
    fontSize: '0.8rem',
    marginBottom: '1.5rem',
  },
  btnRetour: {
    fontFamily: "'Syne', sans-serif",
    fontWeight: 700,
    fontSize: '0.85rem',
    background: '#00ff87',
    color: '#0f0f0f',
    padding: '0.65rem 1.5rem',
    borderRadius: '6px',
    textDecoration: 'none',
    display: 'inline-block',
  },
}
