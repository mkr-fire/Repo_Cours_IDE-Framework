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
