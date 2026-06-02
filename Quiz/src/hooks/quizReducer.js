/**
 * Jalon 4 : Machine à état complexe – quizReducer
 *
 * Gère l'intégralité de l'état du quiz :
 *   - questionIndex  : index de la question courante
 *   - reponsesChoisies : tableau des réponses sélectionnées
 *   - statut         : 'attente' | 'en_cours' | 'termine'
 *   - score          : score temporaire calculé automatiquement
 *
 * Actions gérées :
 *   - START_QUIZ        : démarre la partie
 *   - ANSWER_QUESTION   : enregistre la réponse, calcule si correcte, avance
 *   - FINISH_QUIZ       : termine la partie (fin du temps ou dernière question)
 */

export const INITIAL_STATE = {
  questionIndex:    0,
  reponsesChoisies: [],
  statut:           'attente',  // 'attente' | 'en_cours' | 'termine'
  score:            0,
}

export function quizReducer(state, action) {
  switch (action.type) {

    case 'START_QUIZ':
      return {
        ...INITIAL_STATE,
        statut: 'en_cours',
      }

    case 'ANSWER_QUESTION': {
      const { reponse, bonneReponse, totalQuestions } = action.payload

      // Calcul automatique : la réponse est-elle correcte ?
      const estCorrecte = reponse === bonneReponse
      const nouveauScore = estCorrecte ? state.score + 1 : state.score

      const nouvelIndex = state.questionIndex + 1
      const estDerniere = nouvelIndex >= totalQuestions

      return {
        ...state,
        score:            nouveauScore,
        reponsesChoisies: [...state.reponsesChoisies, reponse],
        questionIndex:    estDerniere ? state.questionIndex : nouvelIndex,
        // Si c'était la dernière question → on termine automatiquement
        statut:           estDerniere ? 'termine' : 'en_cours',
      }
    }

    case 'FINISH_QUIZ':
      return {
        ...state,
        statut: 'termine',
      }

    default:
      return state
  }
}
