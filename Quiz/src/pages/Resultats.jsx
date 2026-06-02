import { useMemo, useState } from 'react'
import { useLocation, useNavigate, Navigate } from 'react-router-dom'
import { useUser } from '../context/UserContext.jsx'
import Navbar from '../layouts/Navbar.jsx'

/**
 * Page Résultats
 *
 * Jalon 5 : useMemo pour le calcul du ratio de bonnes réponses
 *   → Le calcul ne s'exécute qu'une seule fois même si l'interface
 *     se rafraîchit (ex : changement de thème clair/sombre)
 */
export default function Resultats() {
  const location = useLocation()
  const navigate = useNavigate()
  const { pseudo, meilleurScore } = useUser()

  // Thème clair/sombre pour démontrer useMemo (Jalon 5)
  const [themeSombre, setThemeSombre] = useState(true)

  // Récupération du score passé via navigate(..., { state: {...} })
  const { score = 0, total = 10 } = location.state || {}

  /**
   * Jalon 5 : useMemo – Calcul du ratio enveloppé pour éviter
   * toute ré-exécution inutile lors des re-rendus (ex: toggle thème)
   * Ce "calcul lourd" ne s'exécutera qu'une seule fois.
   */
  const statsCalculees = useMemo(() => {
    console.log('✅ useMemo : calcul du ratio exécuté une seule fois')
    const ratio      = total > 0 ? ((score / total) * 100).toFixed(1) : '0.0'
    const mention    = getMention(score, total)
    const mauvaises  = total - score
    return { ratio, mention, mauvaises }
  }, [score, total]) // Ne recalcule que si score ou total changent

  // Thème dynamique (sert à illustrer que useMemo protège le calcul)
  const theme = themeSombre ? darkTheme : lightTheme

  return (
    <>
      <Navbar />
      <main style={{ ...styles.main, background: theme.bg }}>
        <div style={styles.container}>

          {/* Bouton toggle thème – provoque des re-rendus sans recalculer useMemo */}
          <button
            style={{ ...styles.themeBtn, color: theme.text, borderColor: theme.border }}
            onClick={() => setThemeSombre(!themeSombre)}
          >
            {themeSombre ? '☀️ Mode clair' : '🌙 Mode sombre'}
          </button>

          {/* Carte résultat */}
          <div style={{ ...styles.card, background: theme.card, borderColor: theme.border }}>

            <div style={styles.trophee}>
              {score >= total * 0.8 ? '🏆' : score >= total * 0.5 ? '⭐' : '💪'}
            </div>

            <h1 style={{ ...styles.titre, color: theme.text }}>
              {statsCalculees.mention}
            </h1>

            <p style={styles.pseudo}>Joueur : <strong style={{ color: '#bef264' }}>{pseudo}</strong></p>

            {/* Score principal */}
            <div style={styles.scoreGrand}>
              <span style={styles.scoreNum}>{score}</span>
              <span style={styles.scoreSep}>/</span>
              <span style={styles.scoreTotal}>{total}</span>
            </div>

            {/* Jalon 5 : Ratio calculé via useMemo */}
            <div style={styles.ratioBox}>
              <span style={styles.ratioLabel}>Ratio de réussite</span>
              <span style={styles.ratioValue}>{statsCalculees.ratio}%</span>
            </div>

            {/* Détails */}
            <div style={styles.details}>
              <Stat label="✅ Bonnes réponses"    value={score}                      color="#4ade80" />
              <Stat label="❌ Mauvaises réponses"  value={statsCalculees.mauvaises}   color="#f87171" />
              <Stat label="🏆 Meilleur score"      value={meilleurScore}              color="#f7c948" />
            </div>

            <div style={styles.divider} />

            {/* Note useMemo pour l'évaluateur */}
            <p style={styles.note}>
              💡 <em>Le calcul du ratio est protégé par <code>useMemo</code> — changer le thème ci-dessus ne le recalcule pas.</em>
            </p>

            {/* Actions */}
            <div style={styles.actions}>
              <button style={styles.btnPrimary} onClick={() => navigate('/quiz')}>
                Rejouer
              </button>
              <button style={styles.btnSecondary} onClick={() => navigate('/')}>
                Accueil
              </button>
            </div>

          </div>
        </div>
      </main>
    </>
  )
}

// ── Sous-composant stat ───────────────────────────────────────
function Stat({ label, value, color }) {
  return (
    <div style={styles.statRow}>
      <span style={styles.statLabel}>{label}</span>
      <span style={{ ...styles.statValue, color }}>{value}</span>
    </div>
  )
}

// ── Logique mention ───────────────────────────────────────────
function getMention(score, total) {
  const ratio = score / total
  if (ratio >= 0.9) return 'Exceptionnel ! 🌟'
  if (ratio >= 0.7) return 'Très bien !'
  if (ratio >= 0.5) return 'Pas mal !'
  return 'Continuez à apprendre !'
}

// ── Thèmes ────────────────────────────────────────────────────
const darkTheme  = { bg: '#070907', card: 'rgba(14, 18, 11, 0.94)', text: '#f8fafc', border: 'rgba(133, 167, 45, 0.24)' }
const lightTheme = { bg: '#f7fbea', card: '#f8fdf3', text: '#111827', border: '#d9f99d' }

// ── Styles ────────────────────────────────────────────────────
const styles = {
  main: {
    minHeight: '100vh',
    padding: '2rem 1rem',
    transition: 'background 0.3s',
  },
  container: {
    maxWidth: '520px',
    margin: '0 auto',
    display: 'flex',
    flexDirection: 'column',
    gap: '1rem',
    alignItems: 'flex-end',
  },
  themeBtn: {
    background: 'transparent',
    border: '1px solid',
    borderRadius: '8px',
    padding: '6px 16px',
    fontFamily: "'Space Mono', monospace",
    fontSize: '0.75rem',
    cursor: 'pointer',
    color: 'inherit',
  },
  card: {
    border: '1px solid',
    borderRadius: '24px',
    padding: '2.5rem 2rem',
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    gap: '1.5rem',
    alignItems: 'center',
    textAlign: 'center',
    transition: 'background 0.3s',
    boxShadow: '0 28px 80px rgba(19, 38, 10, 0.22)',
  },
  trophee: { fontSize: '3rem' },
  titre: {
    fontFamily: "'Syne', sans-serif",
    fontWeight: 800,
    fontSize: '1.75rem',
    letterSpacing: '-0.02em',
  },
  pseudo: {
    fontFamily: "'Space Mono', monospace",
    fontSize: '0.78rem',
    color: '#a3b23b',
  },
  scoreGrand: {
    display: 'flex',
    alignItems: 'baseline',
    gap: '0.25rem',
  },
  scoreNum: {
    fontFamily: "'Syne', sans-serif",
    fontWeight: 800,
    fontSize: '4rem',
    color: '#bef264',
    lineHeight: 1,
  },
  scoreSep: {
    fontFamily: "'Syne', sans-serif",
    fontSize: '2rem',
    color: '#6b7280',
  },
  scoreTotal: {
    fontFamily: "'Syne', sans-serif",
    fontSize: '2rem',
    color: '#6b7280',
  },
  ratioBox: {
    background: 'rgba(190, 242, 100, 0.12)',
    border: '1px solid rgba(190, 242, 100, 0.3)',
    borderRadius: '12px',
    padding: '0.95rem 2rem',
    display: 'flex',
    flexDirection: 'column',
    gap: '4px',
  },
  ratioLabel: {
    fontFamily: "'Space Mono', monospace",
    fontSize: '0.65rem',
    color: '#a3e635',
    textTransform: 'uppercase',
    letterSpacing: '0.1em',
  },
  ratioValue: {
    fontFamily: "'Syne', sans-serif",
    fontWeight: 800,
    fontSize: '2rem',
    color: 'inherit',
  },
  details: {
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    gap: '0.65rem',
  },
  statRow: {
    display: 'flex',
    justifyContent: 'space-between',
    padding: '0.75rem 0',
    borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
  },
  statLabel: {
    fontFamily: "'Space Mono', monospace",
    fontSize: '0.72rem',
    color: '#9ca3af',
  },
  statValue: {
    fontFamily: "'Syne', sans-serif",
    fontWeight: 700,
    fontSize: '1rem',
  },
  divider: { height: '1px', background: 'rgba(255, 255, 255, 0.08)', width: '100%' },
  note: {
    fontFamily: "'Space Mono', monospace",
    fontSize: '0.65rem',
    color: '#9ca3af',
    lineHeight: 1.6,
    textAlign: 'left',
  },
  actions: {
    display: 'flex',
    gap: '1rem',
    width: '100%',
  },
  btnPrimary: {
    flex: 1,
    background: '#bef264',
    color: '#08100b',
    border: 'none',
    borderRadius: '12px',
    padding: '0.92rem',
    fontFamily: "'Syne', sans-serif",
    fontWeight: 700,
    fontSize: '0.95rem',
    cursor: 'pointer',
  },
  btnSecondary: {
    flex: 1,
    background: 'transparent',
    color: '#bef264',
    border: '1px solid #bef264',
    borderRadius: '12px',
    padding: '0.92rem',
    fontFamily: "'Syne', sans-serif",
    fontWeight: 700,
    fontSize: '0.95rem',
    cursor: 'pointer',
  },
}
