import { Link } from 'react-router-dom'

// Composant de structure globale placé dans /layouts (Jalon 1)
export default function Navbar() {
  return (
    <nav style={styles.nav}>
      <div style={styles.inner}>
        <Link to="/" style={styles.logo}>
          <span style={styles.logoAccent}>Task</span>Flow
        </Link>
        <span style={styles.tagline}>Tableau de tâches</span>
      </div>
    </nav>
  )
}

const styles = {
  nav: {
    background: '#0f0f0f',
    borderBottom: '2px solid #00ff87',
    padding: '0 2rem',
    height: '60px',
    display: 'flex',
    alignItems: 'center',
    position: 'sticky',
    top: 0,
    zIndex: 100,
  },
  inner: {
    display: 'flex',
    alignItems: 'center',
    gap: '1.5rem',
    width: '100%',
  },
  logo: {
    fontFamily: "'Syne', sans-serif",
    fontWeight: 800,
    fontSize: '1.5rem',
    color: '#ffffff',
    textDecoration: 'none',
    letterSpacing: '-0.02em',
  },
  logoAccent: {
    color: '#00ff87',
  },
  tagline: {
    fontFamily: "'Space Mono', monospace",
    fontSize: '0.7rem',
    color: '#555',
    letterSpacing: '0.05em',
    textTransform: 'uppercase',
  },
}
