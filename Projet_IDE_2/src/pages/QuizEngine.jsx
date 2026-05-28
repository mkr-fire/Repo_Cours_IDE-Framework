import { useEffect, useRef, useReducer } from 'react'
import { useNavigate } from 'react-router-dom'
import { useUser } from '../context/UserContext.jsx'
import { useFetch } from '../hooks/useFetch.js'
import { quizReducer, INITIAL_STATE } from '../hooks/quizReducer.js'
import Navbar from '../layouts/Navbar.jsx'

const DUREE_SECONDES = 60 // Jalon 5 : Durée du compte à rebours

/**
 * Page QuizEngine – Moteur principal du quiz
 *
 * Jalon 1 : useFetch pour récupérer les questions depuis /questions.json
 * Jalon 4 : useReducer pour gérer l'état complexe du quiz
 * Jalon 5 : useRef pour stocker l'id du setInterval (sans re-rendu)
 *           Le compte à rebours est nettoyé proprement (clearInterval)
 */
export default function QuizEngine() {
  // Jalon 4 : useReducer remplace tous les useState individuels
  const [state, dispatch] = useReducer(quizReducer, INITIAL_STATE)
  const { questionIndex, statut, score } = state

  // Jalon 1 : Custom Hook useFetch – logique réseau extraite du composant
  const { data: questions, loading, error } = useFetch('/questions.json')

  // Jalon 2 : Accès au contexte global
  const { pseudo, mettreAJourScore } = useUser()

  const navigate   = useNavigate()

  // Jalon 5 : useRef pour stocker l'identifiant du setInterval
  // → N'est PAS dans le state pour ne pas provoquer de re-rendus
  const intervalRef   = useRef(null)
  const tempsRef      = useRef(DUREE_SECONDES)        // valeur courante du timer
  const [affichage, setAffichage] = [
    useRef(DUREE_SECONDES),
    // On utilise un état séparé uniquement pour l'affichage du timer
  ]

  // On utilise un state léger juste pour l'affichage du timer
  const [tempsAffiche, setTempsAffiche] = [0, null]

  // Trick propre : un seul useState pour l'affichage du compte à rebours
  const [timer, setTimer] = useTimerState(DUREE_SECONDES)

  // Démarrage automatique quand les questions sont chargées
  useEffect(() => {
    if (questions && statut === 'attente') {
      dispatch({ type: 'START_QUIZ' })
    }
  }, [questions])

  // Jalon 5 : Gestion du compte à rebours avec useRef
  useEffect(() => {
    if (statut !== 'en_cours') return

    // Nettoyage de tout intervalle précédent
    clearInterval(intervalRef.current)
    tempsRef.current = DUREE_SECONDES
    setTimer(DUREE_SECONDES)

    // Stockage de l'id dans useRef → pas de re-rendu, accessible partout
    intervalRef.current = setInterval(() => {
      tempsRef.current -= 1
      setTimer(tempsRef.current)

      // Jalon 5 : Si le temps atteint 0 → clearInterval + FINISH_QUIZ
      if (tempsRef.current <= 0) {
        clearInterval(intervalRef.current) // Nettoyage de la fuite mémoire
        dispatch({ type: 'FINISH_QUIZ' })
      }
    }, 1000)

    // Cleanup : nettoyage si le composant est démonté (fuite mémoire évitée)
    return () => clearInterval(intervalRef.current)
  }, [statut])

  // Redirection vers /resultats quand le quiz est terminé
  useEffect(() => {
    if (statut === 'termine') {
      clearInterval(intervalRef.current) // Sécurité : nettoyage final
      mettreAJourScore(score)            // Jalon 2 : mise à jour du contexte global
      navigate('/resultats', { state: { score, total: questions?.length || 10 } })
    }
  }, [statut])

  // Jalon 4 : Envoi de l'action ANSWER_QUESTION au reducer
  const handleReponse = (reponseChoisie) => {
    if (!questions) return
    const questionCourante = questions[questionIndex]

    dispatch({
      type: 'ANSWER_QUESTION',
      payload: {
        reponse:       reponseChoisie,
        bonneReponse:  questionCourante.bonne_reponse,
        totalQuestions: questions.length,
      },
    })
  }

  // Couleur du timer selon le temps restant
  const timerColor = timer > 30 ? '#4ade80' : timer > 10 ? '#f7c948' : '#f87171'

  // ── Rendus conditionnels ──────────────────────────────────────
  if (loading) return <Loader />
  if (error)   return <Erreur message={error} />
  if (!questions || questions.length === 0) return <Erreur message="Aucune question trouvée." />

  const questionCourante = questions[questionIndex]
  const progression      = ((questionIndex + 1) / questions.length) * 100

  return (
    <>
      <Navbar />
      <main style={styles.main}>
        <div style={styles.container}>

          {/* En-tête : timer + score + progression */}
          <div style={styles.header}>
            <div style={styles.timerBox}>
              <span style={styles.timerLabel}>TEMPS</span>
              <span style={{ ...styles.timerValue, color: timerColor }}>
                {String(timer).padStart(2, '0')}s
              </span>
            </div>

            <div style={styles.progressWrap}>
              <div style={styles.progressBar}>
                <div style={{ ...styles.progressFill, width: `${progression}%` }} />
              </div>
              <span style={styles.progressLabel}>
                {questionIndex + 1} / {questions.length}
              </span>
            </div>

            <div style={styles.scoreBox}>
              <span style={styles.timerLabel}>SCORE</span>
              <span style={{ ...styles.timerValue, color: '#a78bfa' }}>{score}</span>
            </div>
          </div>

          {/* Carte de question */}
          <div style={styles.card}>
            <span style={styles.categorie}>{questionCourante.categorie}</span>
            <h2 style={styles.question}>{questionCourante.libelle}</h2>

            {/* Options de réponse */}
            <div style={styles.options}>
              {questionCourante.options.map((opt, i) => (
                <button
                  key={i}
                  style={styles.optBtn}
                  onClick={() => handleReponse(opt)}
                >
                  <span style={styles.optLetter}>
                    {String.fromCharCode(65 + i)}
                  </span>
                  {opt}
                </button>
              ))}
            </div>
          </div>

          {/* Bouton abandon */}
          <button
            style={styles.abandonBtn}
            onClick={() => dispatch({ type: 'FINISH_QUIZ' })}
          >
            Terminer le quiz
          </button>

        </div>
      </main>
    </>
  )
}

// ── Hook interne pour l'affichage du timer ─────────────────────
import { useState } from 'react'
function useTimerState(initial) {
  const [val, setVal] = useState(initial)
  return [val, setVal]
}

// ── Sous-composants ────────────────────────────────────────────
function Loader() {
  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '80vh' }}>
      <p style={{ fontFamily: "'Space Mono', monospace", color: '#a78bfa', fontSize: '0.9rem' }}>
        Chargement des questions…
      </p>
    </div>
  )
}

function Erreur({ message }) {
  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '80vh' }}>
      <p style={{ fontFamily: "'Space Mono', monospace", color: '#f87171', fontSize: '0.85rem' }}>
        ⚠️ {message}
      </p>
    </div>
  )
}

// ── Styles ─────────────────────────────────────────────────────
const styles = {
  main: {
    background: '#0a0a0f',
    minHeight: '100vh',
    padding: '2rem 1rem',
  },
  container: {
    maxWidth: '640px',
    margin: '0 auto',
    display: 'flex',
    flexDirection: 'column',
    gap: '1.5rem',
  },
  header: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: '1rem',
  },
  timerBox: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '2px',
  },
  timerLabel: {
    fontFamily: "'Space Mono', monospace",
    fontSize: '0.55rem',
    color: '#555',
    letterSpacing: '0.1em',
    textTransform: 'uppercase',
  },
  timerValue: {
    fontFamily: "'Syne', sans-serif",
    fontWeight: 800,
    fontSize: '1.6rem',
    lineHeight: 1,
  },
  progressWrap: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    gap: '6px',
    alignItems: 'center',
  },
  progressBar: {
    width: '100%',
    height: '6px',
    background: '#1e1e35',
    borderRadius: '999px',
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    background: '#7c3aed',
    borderRadius: '999px',
    transition: 'width 0.3s ease',
  },
  progressLabel: {
    fontFamily: "'Space Mono', monospace",
    fontSize: '0.65rem',
    color: '#555',
  },
  scoreBox: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '2px',
  },
  card: {
    background: '#111120',
    border: '1px solid #2a2a4a',
    borderRadius: '12px',
    padding: '2rem',
    display: 'flex',
    flexDirection: 'column',
    gap: '1.5rem',
  },
  categorie: {
    fontFamily: "'Space Mono', monospace",
    fontSize: '0.65rem',
    color: '#a78bfa',
    textTransform: 'uppercase',
    letterSpacing: '0.1em',
    border: '1px solid #2a2a5a',
    borderRadius: '999px',
    padding: '3px 12px',
    alignSelf: 'flex-start',
  },
  question: {
    fontFamily: "'Syne', sans-serif",
    fontWeight: 700,
    fontSize: '1.15rem',
    color: '#f0f0f0',
    lineHeight: 1.5,
  },
  options: {
    display: 'flex',
    flexDirection: 'column',
    gap: '0.75rem',
  },
  optBtn: {
    display: 'flex',
    alignItems: 'center',
    gap: '1rem',
    background: '#0a0a0f',
    border: '1px solid #2a2a4a',
    borderRadius: '8px',
    padding: '0.85rem 1rem',
    color: '#ddd',
    fontFamily: "'Space Mono', monospace",
    fontSize: '0.8rem',
    cursor: 'pointer',
    textAlign: 'left',
    transition: 'border-color 0.15s',
  },
  optLetter: {
    width: '26px',
    height: '26px',
    borderRadius: '50%',
    background: '#1e1e35',
    color: '#a78bfa',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontWeight: 700,
    fontSize: '0.7rem',
    flexShrink: 0,
  },
  abandonBtn: {
    background: 'transparent',
    border: '1px solid #333',
    color: '#555',
    borderRadius: '8px',
    padding: '0.65rem',
    fontFamily: "'Space Mono', monospace",
    fontSize: '0.7rem',
    cursor: 'pointer',
    width: '100%',
  },
}
