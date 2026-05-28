import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useUser } from '../context/UserContext.jsx'
import Navbar from '../layouts/Navbar.jsx'

/**
 * Page d'Accueil / Login
 * Jalon 2 : Consomme le UserContext pour enregistrer le pseudo
 * Jalon 3 : Une fois le pseudo saisi, la navigation vers /quiz est autorisée
 */
export default function Accueil() {
  const [input, setInput] = useState('')
  const [erreur, setErreur] = useState('')
  const { connecter } = useUser()
  const navigate = useNavigate()

  const handleStart = () => {
    if (!input.trim()) {
      setErreur('Veuillez saisir un pseudonyme pour continuer.')
      return
    }
    connecter(input) // Jalon 2 : mise à jour du contexte global
    navigate('/quiz') // Jalon 3 : accès maintenant autorisé par ProtectedRoute
  }

  return (
    <>
      <Navbar />
      <main style={styles.main}>
        <div style={styles.card}>

          {/* Logo / Titre */}
          <div style={styles.badge}>QUIZ EXPERT</div>
          <h1 style={styles.title}>
            <span style={styles.accent}>Poly</span>Quiz
          </h1>
          <p style={styles.subtitle}>
            F1 · MotoGP · NBA · Manga & Anime
          </p>

          {/* Catégories */}
          <div style={styles.tags}>
            {['🏎️ Formule 1', '🏍️ MotoGP', '🏀 NBA', '🎌 Manga'].map((t) => (
              <span key={t} style={styles.tag}>{t}</span>
            ))}
          </div>

          <div style={styles.divider} />

          {/* Formulaire pseudo */}
          <label style={styles.label}>Votre pseudonyme</label>
          <input
            style={styles.input}
            type="text"
            placeholder="Ex : SpeedMaster99"
            value={input}
            onChange={(e) => { setInput(e.target.value); setErreur('') }}
            onKeyDown={(e) => e.key === 'Enter' && handleStart()}
            maxLength={20}
          />

          {erreur && <p style={styles.erreur}>{erreur}</p>}

          <button style={styles.btn} onClick={handleStart}>
            Lancer le Quiz →
          </button>

          <p style={styles.hint}>10 questions · 60 secondes · Niveau Expert</p>
        </div>
      </main>
    </>
  )
}

const styles = {
  main: {
    background: '#0a0a0f',
    minHeight: '100vh',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '2rem 1rem',
  },
  card: {
    background: '#111120',
    border: '1px solid #2a2a4a',
    borderRadius: '16px',
    padding: '2.5rem 2rem',
    maxWidth: '480px',
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    gap: '1rem',
    alignItems: 'center',
    textAlign: 'center',
  },
  badge: {
    fontFamily: "'Space Mono', monospace",
    fontSize: '0.6rem',
    letterSpacing: '0.15em',
    color: '#a78bfa',
    border: '1px solid #a78bfa',
    borderRadius: '999px',
    padding: '3px 14px',
  },
  title: {
    fontFamily: "'Syne', sans-serif",
    fontWeight: 800,
    fontSize: '3rem',
    color: '#fff',
    letterSpacing: '-0.04em',
    lineHeight: 1,
  },
  accent: { color: '#a78bfa' },
  subtitle: {
    fontFamily: "'Space Mono', monospace",
    fontSize: '0.72rem',
    color: '#555',
    letterSpacing: '0.06em',
  },
  tags: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '0.5rem',
    justifyContent: 'center',
  },
  tag: {
    fontFamily: "'Space Mono', monospace",
    fontSize: '0.65rem',
    background: '#1e1e35',
    color: '#a78bfa',
    padding: '4px 12px',
    borderRadius: '999px',
    border: '1px solid #2a2a5a',
  },
  divider: {
    height: '1px',
    background: '#1e1e35',
    width: '100%',
  },
  label: {
    fontFamily: "'Space Mono', monospace",
    fontSize: '0.65rem',
    color: '#888',
    textTransform: 'uppercase',
    letterSpacing: '0.08em',
    alignSelf: 'flex-start',
  },
  input: {
    width: '100%',
    background: '#0a0a0f',
    border: '1px solid #2a2a4a',
    borderRadius: '8px',
    padding: '0.75rem 1rem',
    color: '#f0f0f0',
    fontFamily: "'Space Mono', monospace",
    fontSize: '0.85rem',
    outline: 'none',
  },
  erreur: {
    fontFamily: "'Space Mono', monospace",
    fontSize: '0.7rem',
    color: '#f87171',
    alignSelf: 'flex-start',
  },
  btn: {
    width: '100%',
    background: '#7c3aed',
    color: '#fff',
    border: 'none',
    borderRadius: '8px',
    padding: '0.85rem',
    fontFamily: "'Syne', sans-serif",
    fontWeight: 700,
    fontSize: '1rem',
    cursor: 'pointer',
    letterSpacing: '0.02em',
    marginTop: '0.25rem',
  },
  hint: {
    fontFamily: "'Space Mono', monospace",
    fontSize: '0.65rem',
    color: '#444',
  },
}
