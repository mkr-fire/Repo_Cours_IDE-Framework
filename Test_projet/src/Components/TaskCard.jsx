import { Link } from 'react-router-dom'

// Jalon 2 : Composant réutilisable recevant une tâche via ses props
// Jalon 5 : Utilisation de <Link> pour la navigation SPA (interdit d'utiliser <a href>)
export default function TaskCard({ task }) {
  const statutConfig = {
    'A faire':  { color: '#2563eb', bg: 'rgba(37,99,235,0.08)',  label: 'À faire'   },
    'En cours': { color: '#06b6d4', bg: 'rgba(6,182,212,0.08)',   label: 'En cours'  },
    'Termine':  { color: '#10b981', bg: 'rgba(16,185,129,0.08)',   label: 'Terminé'   },
  }

  const config = statutConfig[task.statut] || statutConfig['A faire']

  return (
    // <Link> de React Router — aucun rechargement de page (Jalon 5)
    <Link to={`/task/${task.id}`} style={styles.link}>
      <article style={styles.card}>
        {/* Badge de statut */}
        <span style={{ ...styles.badge, color: config.color, background: config.bg }}>
          {config.label}
        </span>

        <h3 style={styles.titre}>{task.titre}</h3>
        <p style={styles.description}>{task.description}</p>

        <span style={styles.voir}>Voir le détail →</span>
      </article>
    </Link>
  )
}

const styles = {
  link: {
    textDecoration: 'none',
    display: 'block',
  },
  card: {
    background: '#161616',
    border: '1px solid #2a2a2a',
    borderRadius: '8px',
    padding: '1.25rem 1.5rem',
    display: 'flex',
    flexDirection: 'column',
    gap: '0.6rem',
    cursor: 'pointer',
    transition: 'border-color 0.2s, transform 0.2s',
  },
  badge: {
    fontFamily: "'Space Mono', monospace",
    fontSize: '0.65rem',
    fontWeight: 700,
    letterSpacing: '0.08em',
    textTransform: 'uppercase',
    padding: '3px 10px',
    borderRadius: '999px',
    alignSelf: 'flex-start',
  },
  titre: {
    fontFamily: "'Syne', sans-serif",
    fontWeight: 700,
    fontSize: '1rem',
    color: '#f0f0f0',
    margin: 0,
  },
  description: {
    fontFamily: "'Space Mono', monospace",
    fontSize: '0.75rem',
    color: '#888',
    margin: 0,
    lineHeight: 1.6,
    overflow: 'hidden',
    display: '-webkit-box',
    WebkitLineClamp: 2,
    WebkitBoxOrient: 'vertical',
  },
  voir: {
    fontFamily: "'Space Mono', monospace",
    fontSize: '0.7rem',
    color: '#2563eb',
    marginTop: '0.25rem',
  },
}
