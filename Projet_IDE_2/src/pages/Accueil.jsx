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
          <div style={styles.badge}>QUIZ ARENA</div>
          <h1 style={styles.title}>
            <span style={styles.accent}>Quiz</span>
          </h1>
          <p style={styles.subtitle}>
            Culture générale revisitée en mode express
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
    background: 'radial-gradient(circle at top, rgba(190, 242, 100, 0.16), transparent 35%), #050706',
    minHeight: '100vh',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '2rem 1rem',
  },
  card: {
    background: 'rgba(14, 20, 18, 0.96)',
    border: '1px solid rgba(133, 167, 45, 0.24)',
    borderRadius: '24px',
    padding: '2.5rem 2rem',
    maxWidth: '520px',
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    gap: '1rem',
    alignItems: 'center',
    textAlign: 'center',
    boxShadow: '0 28px 80px rgba(0, 0, 0, 0.28)',
    backdropFilter: 'blur(14px)',
  },
  badge: {
    fontFamily: "'Space Mono', monospace",
    fontSize: '0.65rem',
    letterSpacing: '0.18em',
    color: '#d9f99d',
    border: '1px solid rgba(217, 249, 157, 0.35)',
    borderRadius: '999px',
    padding: '4px 16px',
  },
  title: {
    fontFamily: "'Syne', sans-serif",
    fontWeight: 800,
    fontSize: '3rem',
    color: '#f8fafc',
    letterSpacing: '-0.04em',
    lineHeight: 1,
  },
  accent: { color: '#bef264' },
  subtitle: {
    fontFamily: "'Space Mono', monospace",
    fontSize: '0.78rem',
    color: '#94a64a',
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
    background: '#101b0d',
    color: '#d9f99d',
    padding: '5px 14px',
    borderRadius: '999px',
    border: '1px solid rgba(133, 167, 45, 0.22)',
  },
  divider: {
    height: '1px',
    background: 'rgba(133, 167, 45, 0.18)',
    width: '100%',
  },
  label: {
    fontFamily: "'Space Mono', monospace",
    fontSize: '0.65rem',
    color: '#9ca34c',
    textTransform: 'uppercase',
    letterSpacing: '0.08em',
    alignSelf: 'flex-start',
  },
  input: {
    width: '100%',
    background: '#091007',
    border: '1px solid rgba(133, 167, 45, 0.22)',
    borderRadius: '12px',
    padding: '0.85rem 1rem',
    color: '#f8fafc',
    fontFamily: "'Space Mono', monospace",
    fontSize: '0.9rem',
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
    background: 'linear-gradient(135deg, #bef264, #4d7c0f)',
    color: '#08100b',
    border: 'none',
    borderRadius: '12px',
    padding: '0.95rem',
    fontFamily: "'Syne', sans-serif",
    fontWeight: 800,
    fontSize: '1rem',
    cursor: 'pointer',
    letterSpacing: '0.02em',
    marginTop: '0.25rem',
    boxShadow: '0 18px 30px rgba(94, 119, 18, 0.22)',
  },
  hint: {
    fontFamily: "'Space Mono', monospace",
    fontSize: '0.65rem',
    color: '#72832d',
  },
}
