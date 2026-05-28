import { Link } from 'react-router-dom'
import { useUser } from '../context/UserContext.jsx'

export default function Navbar() {
  const { pseudo, meilleurScore, deconnecter } = useUser()

  return (
    <nav style={styles.nav}>
      <div style={styles.inner}>
        <Link to="/" style={styles.logo}>
          <span style={styles.accent}>Poly</span>Quiz
        </Link>

        {pseudo && (
          <div style={styles.right}>
            <span style={styles.info}>
              👤 <strong>{pseudo}</strong>
            </span>
            <span style={styles.info}>
              🏆 Meilleur : <strong style={{ color: '#f7c948' }}>{meilleurScore}</strong>
            </span>
            <button onClick={deconnecter} style={styles.btn}>
              Quitter
            </button>
          </div>
        )}
      </div>
    </nav>
  )
}

const styles = {
  nav: {
    background: '#0f0f1a',
    borderBottom: '2px solid #7c3aed',
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
    justifyContent: 'space-between',
    width: '100%',
  },
  logo: {
    fontFamily: "'Syne', sans-serif",
    fontWeight: 800,
    fontSize: '1.4rem',
    color: '#fff',
    textDecoration: 'none',
    letterSpacing: '-0.02em',
  },
  accent: { color: '#a78bfa' },
  right: {
    display: 'flex',
    alignItems: 'center',
    gap: '1.5rem',
  },
  info: {
    fontFamily: "'Space Mono', monospace",
    fontSize: '0.72rem',
    color: '#aaa',
  },
  btn: {
    background: 'transparent',
    border: '1px solid #444',
    color: '#aaa',
    borderRadius: '6px',
    padding: '4px 12px',
    fontFamily: "'Space Mono', monospace",
    fontSize: '0.7rem',
    cursor: 'pointer',
  },
}
