# TaskFlow – Gestionnaire de tâches d'équipe

> Projet réalisé dans le cadre du TP Évalué – Architecture Front-End  
> École Nationale Supérieure Polytechnique de Maroua – Année 2025-2026  
> Enseignant : MANAODA DEUHWE Yves Hermann

---

## Description

**TaskFlow** est une Single Page Application (SPA) développée avec **React** et **Vite.js**.  
Elle permet de gérer et suivre des tâches d'équipe avec persistance locale des données.

---

## Jalons implémentés

| Jalon | Description | Points |
|-------|-------------|--------|
| 1 | Environnement Vite.js + Structure `/src` | 3 pts |
| 2 | Composants `TaskCard` + rendu `.map()` avec `key={task.id}` | 4 pts |
| 3 | Formulaire contrôlé + Lifting State Up + Spread Operator | 5 pts |
| 4 | `useEffect` + `localStorage` (clé `taskflow_data`) | 4 pts |
| 5 | `BrowserRouter` + routes dynamiques + `useParams` + `<Link>` | 4 pts |
| **Bonus** | Hook personnalisé `useLocalStorage.js` | +2 pts |

**Total visé : 20/20 + 2 pts bonus**

---

## Installation

```bash
npm install
```

## Lancement du serveur de développement

```bash
npm run dev
```

L'application sera disponible sur [http://localhost:5173](http://localhost:5173)

## Build de production

```bash
npm run build
```

---

## Structure du projet

```
src/
├── components/
│   ├── TaskCard.jsx      # Carte de tâche cliquable (Link React Router)
│   └── TaskForm.jsx      # Formulaire contrôlé avec Lifting State Up
├── hooks/
│   └── useLocalStorage.js  # Hook personnalisé (BONUS)
├── layouts/
│   └── Navbar.jsx        # Barre de navigation globale
├── pages/
│   ├── Dashboard.jsx     # Page principale avec liste des tâches
│   └── TaskDetail.jsx    # Page de détail via useParams()
├── App.jsx               # BrowserRouter + Routes
└── main.jsx              # Point d'entrée React
```

---

## Choix techniques importants

- **Immuabilité** : Aucun `push()` direct sur le state. Utilisation systématique du Spread Operator : `setTasks([...tasks, nouvelleTache])`
- **Navigation SPA** : Aucune balise `<a href>` pour la navigation interne. Utilisation exclusive de `<Link>` de `react-router-dom`
- **Clés uniques** : `key={task.id}` sur chaque `<TaskCard>` — jamais `key={index}`
- **Identifiants** : Générés via `Date.now()` pour garantir l'unicité
- **Persistance** : `localStorage` sous la clé `taskflow_data` via le hook `useLocalStorage`
