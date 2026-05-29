



## Structure du projet

```
src/
├── components/
│   └── ProtectedRoute.jsx   # Jalon 3 : Garde de route (Context + Navigate)
├── context/
│   └── UserContext.jsx      # Jalon 2 : createContext + UserProvider + useUser
├── hooks/
│   ├── useFetch.js          # Jalon 1 : Custom Hook réseau (data/loading/error)
│   └── quizReducer.js       # Jalon 4 : Reducer (START/ANSWER/FINISH)
├── layouts/
│   └── Navbar.jsx           # Barre de navigation globale
├── pages/
│   ├── Accueil.jsx          # Page "/" : saisie du pseudo
│   ├── QuizEngine.jsx       # Page "/quiz" : moteur du quiz
│   └── Resultats.jsx        # Page "/resultats" : score + useMemo
├── App.jsx                  # Jalons 2 & 3 : Provider + BrowserRouter + Routes
└── main.jsx                 # Point d'entrée React
public/
└── questions.json           # Jalon 1 : 10 questions (F1, MotoGP, NBA, Manga)
```
