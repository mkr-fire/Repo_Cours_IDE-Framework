# Quiz Full-Stack (React + Node.js + MongoDB)

# Présentation

Quiz est une application Full-Stack de quiz développée dans le cadre des Travaux Pratiques d'Architecture Full-Stack.

L'application permet :

* l'authentification des joueurs via JSON Web Token (JWT) ;
* la récupération dynamique des questions depuis MongoDB ;
* l'enregistrement sécurisé des scores ;
* la consultation d'un classement général (Leaderboard) ;
* la protection des routes sensibles grâce à un middleware JWT.

---

# Architecture du Projet

```text
PolyQuiz_Project/
│
├── Quiz/
│   │
│   ├── public/
│   │
│   ├── src/
│   │   │
│   │   ├── assets/
│   │   │
│   │   ├── components/
│   │   │   └── ProtectedRoute.jsx
│   │   │
│   │   ├── context/
│   │   │   └── UserContext.jsx
│   │   │
│   │   ├── hooks/
│   │   │   ├── useFetch.js
│   │   │   └── quizReducer.js
│   │   │
│   │   ├── layouts/
│   │   │   └── Navbar.jsx
│   │   │
│   │   ├── pages/
│   │   │   ├── Accueil.jsx
│   │   │   ├── QuizEngine.jsx
│   │   │   ├── Resultats.jsx
│   │   │   └── Leaderboard.jsx
│   │   │
│   │   ├── App.jsx
│   │   └── main.jsx
│   │
│   ├── package.json
│   └── vite.config.js
│
├── Quiz_Backend/
│   │
│   ├── controllers/
│   │   ├── authController.js
│   │   ├── questionController.js
│   │   └── userController.js
│   │
│   ├── middlewares/
│   │   └── authMiddleware.js
│   │
│   ├── models/
│   │   ├── User.js
│   │   └── Question.js
│   │
│   ├── routes/
│   │   ├── authRoutes.js
│   │   ├── questionRoutes.js
│   │   ├── userRoutes.js
│   │   └── leaderboardRoutes.js
│   │
│   ├── .env
│   ├── .gitignore
│   ├── seed.js
│   ├── package.json
│   └── server.js
│
└── README.md
```

---

# Technologies Utilisées

## Front-End

* React
* React Router
* Vite
* JavaScript
* CSS

## Back-End

* Node.js
* Express.js
* MongoDB
* Mongoose
* JSON Web Token (JWT)
* CORS
* Dotenv
* Nodemon

---

# Installation des Prérequis

Installer les logiciels suivants :

* Node.js
* npm
* MongoDB Community Server
* MongoDB Compass
* Git

Vérification :

```bash
node -v
npm -v
```

---

# Configuration du Back-End

Se placer dans le dossier :

```bash
cd Quiz_Backend
```

Initialiser le projet :

```bash
npm init -y
```

Installer les dépendances :

```bash
npm install express mongoose cors dotenv jsonwebtoken
```

Installer les dépendances de développement :

```bash
npm install -D nodemon
```

---

# Configuration des Variables d'Environnement

Créer un fichier `.env` à la racine du dossier `Quiz_Backend`.

```env
PORT=5000

MONGO_URI=mongodb://127.0.0.1:27017/polyquiz

JWT_SECRET=polyquiz_secret_2026
```

---

# Configuration de package.json

Ajouter les scripts suivants :

```json
"scripts": {
  "start": "node server.js",
  "dev": "nodemon server.js"
}
```

---

# Configuration de MongoDB

Démarrer MongoDB.

Connexion locale :

```text
mongodb://127.0.0.1:27017
```

Base utilisée :

```text
polyquiz
```

---

# Peuplement Initial de la Base de Données

Le fichier `seed.js` permet d'insérer automatiquement les questions dans MongoDB.

Exécuter :

```bash
node seed.js
```

Résultat attendu :

```text
Questions insérées
```

Cette opération n'est nécessaire qu'une seule fois.

---

# Lancement du Back-End

Depuis le dossier `Quiz_Backend` :

```bash
npm run dev
```

Résultat attendu :

```text
MongoDB connecté
Serveur démarré sur le port 5000
```

Le serveur est accessible sur :

```text
http://localhost:5000
```

---

# Installation du Front-End

Ouvrir un nouveau terminal.

Se placer dans le dossier :

```bash
cd Quiz
```

Installer les dépendances :

```bash
npm install
```

---

# Lancement du Front-End

Depuis le dossier `Quiz` :

```bash
npm run dev
```

L'application est accessible sur :

```text
http://localhost:5173
```

---

### 1. Démarrer MongoDB

Vérifier que MongoDB est actif.

### 2. Lancer le Back-End

```bash
cd Quiz_Backend
npm run dev
```

### 3. Lancer le Front-End

```bash
cd Quiz
npm run dev
```

### 4. Ouvrir l'application

```text
http://localhost:5173
```

# Fonctionnalités Réalisées

* Authentification JWT
* Création automatique des utilisateurs
* Middleware de protection des routes
* Gestion des questions via MongoDB
* Script de peuplement automatique (seed.js)
* Mise à jour sécurisée du meilleur score
* Classement général Top 10
* Architecture MVC
* Communication React ↔ API REST
* Gestion des variables d'environnement via dotenv