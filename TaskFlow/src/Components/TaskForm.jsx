import { useState } from 'react'

/**
 * Jalon 3 : Composant Contrôlé (Controlled Component)
 * - Chaque champ est lié à un état React dédié via onChange
 * - La fonction onAddTask remonte la nouvelle tâche vers le Dashboard (Lifting State Up)
 */
export default function TaskForm({ onAddTask }) {
  // États dédiés pour chaque champ du formulaire (Composants Contrôlés)
  const [titre, setTitre]           = useState('')
  const [description, setDescription] = useState('')
  const [statut, setStatut]         = useState('A faire')

  const handleSubmit = (e) => {
    e.preventDefault() // Jalon 3 : Bloquer le comportement par défaut du navigateur

    if (!titre.trim()) return // Validation minimale

    // Création d'un nouvel objet tâche avec identifiant unique
    const nouvelleTache = {
      id: Date.now(), // Jalon 3 : Identifiant unique basé sur le timestamp
      titre: titre.trim(),
      description: description.trim(),
      statut,
    }

    onAddTask(nouvelleTache) // Jalon 3 : Remontée d'état (Lifting State Up) via callback

    // Réinitialisation du formulaire
    setTitre('')
    setDescription('')
    setStatut('A faire')
  }

  return (
    <section style={styles.wrapper}>
      <h2 style={styles.heading}>Nouvelle tâche</h2>

      {/* Jalon 3 : Formulaire contrôlé — chaque input est lié à son état via value + onChange */}
      <form onSubmit={handleSubmit} style={styles.form}>
        <div style={styles.field}>
          <label style={styles.label}>Titre</label>
          <input
            style={styles.input}
            type="text"
            placeholder="Ex : Rédiger le rapport final"
            value={titre}
            onChange={(e) => setTitre(e.target.value)}
            required
          />
        </div>

        <div style={styles.field}>
          <label style={styles.label}>Description</label>
          <textarea
            style={{ ...styles.input, resize: 'vertical', minHeight: '80px' }}
            placeholder="Détails de la tâche..."
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>

        <div style={styles.field}>
          <label style={styles.label}>Statut initial</label>
          <select
            style={styles.input}
            value={statut}
            onChange={(e) => setStatut(e.target.value)}
          >
            <option value="A faire">À faire</option>
            <option value="En cours">En cours</option>
            <option value="Termine">Terminé</option>
          </select>
        </div>

        <button type="submit" style={styles.btn}>
          + Ajouter la tâche
        </button>
      </form>
    </section>
  )
}

const styles = {
  wrapper: {
    background: '#161616',
    border: '1px solid #2a2a2a',
    borderRadius: '8px',
    padding: '1.5rem',
    marginBottom: '2rem',
  },
  heading: {
    fontFamily: "'Syne', sans-serif",
    fontWeight: 700,
    fontSize: '1rem',
    color: '#2563eb',
    margin: '0 0 1.25rem 0',
    textTransform: 'uppercase',
    letterSpacing: '0.08em',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '1rem',
  },
  field: {
    display: 'flex',
    flexDirection: 'column',
    gap: '0.4rem',
  },
  label: {
    fontFamily: "'Space Mono', monospace",
    fontSize: '0.7rem',
    color: '#888',
    textTransform: 'uppercase',
    letterSpacing: '0.06em',
  },
  input: {
    background: '#0f0f0f',
    border: '1px solid #333',
    borderRadius: '6px',
    padding: '0.65rem 0.9rem',
    color: '#f0f0f0',
    fontFamily: "'Space Mono', monospace",
    fontSize: '0.8rem',
    outline: 'none',
    width: '100%',
    boxSizing: 'border-box',
  },
  btn: {
    background: '#2563eb',
    color: '#ffffff',
    border: 'none',
    borderRadius: '6px',
    padding: '0.75rem 1.5rem',
    fontFamily: "'Syne', sans-serif",
    fontWeight: 700,
    fontSize: '0.85rem',
    cursor: 'pointer',
    alignSelf: 'flex-start',
    letterSpacing: '0.02em',
  },
}
