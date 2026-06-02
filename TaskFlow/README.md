## TaskFlow - Application Full-Stack (React + Node.js + MongoDB)

## Structure du projet

```text
TaskFlow/
│
├── TaskFlow/
│   ├── public/
│   ├── src/
|   |   ├── assets/
|   |   |   ├── hero.png
|   |   |   ├── vite.svg
│   │   ├── components/
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   └── ...
│   ├── package.json
│   └── vite.config.js
│
├── TaskFlow_Backend/
│   ├── controllers/
│   │   └── taskController.js
│   │
│   ├── models/
│   │   └── Task.js
│   │
│   ├── routes/
│   │   └── taskRoutes.js
│   │
│   ├── .env
│   ├── .gitignore
│   ├── package.json
│   └── server.js
│
└── README.md
```

---

# Prérequis

Avant d'exécuter le projet, les logiciels suivants doivent être installés :

* Node.js
* npm
* MongoDB Community Server
* MongoDB Compass (optionnel mais recommandé)
* Git

---

# Installation du Back-End

Ouvrir un terminal puis se placer dans le dossier du serveur :

```bash
cd TaskFlow_Backend
```

Installer les dépendances :

```bash
npm install
```

Les dépendances installées sont :

```bash
npm install express mongoose cors dotenv
npm install -D nodemon
```

---

# Configuration des variables d'environnement

Créer un fichier `.env` à la racine de `TaskFlow_Backend` :

```env
PORT=5000
MONGO_URI=mongodb://127.0.0.1:27017/taskflow
```

Pour MongoDB Atlas :

```env
PORT=5000
MONGO_URI=votre_url_mongodb_atlas
```

---

# Démarrage de MongoDB

Démarrer le service MongoDB.

Vérifier la connexion dans MongoDB Compass :

```text
mongodb://127.0.0.1:27017
```

---

# Lancement du Back-End

Depuis le dossier `TaskFlow_Backend` :

```bash
npm run dev
```

Le serveur démarre sur :

```text
http://localhost:5000
```

Message attendu :

```text
MongoDB connecté
Serveur démarré sur le port 5000
```

---

# Test du serveur

Tester la route :

```http
GET http://localhost:5000/api/ping
```

Réponse attendue :

```json
{
  "message": "Serveur TaskFlow operationnel"
}
```

---

# Installation du Front-End

Ouvrir un nouveau terminal.

Se placer dans le dossier React :

```bash
cd TaskFlow
```

Installer les dépendances :

```bash
npm install
```

---

# Lancement du Front-End

Depuis le dossier `TaskFlow` :

```bash
npm run dev
```

L'application sera accessible à l'adresse :

```text
http://localhost:5173
```

---

# Ordre de démarrage du projet

À chaque utilisation du projet :

### Étape 1

Démarrer MongoDB.

### Étape 2

Lancer le Back-End :

```bash
cd TaskFlow_Backend
npm run dev
```

### Étape 3

Lancer le Front-End :

```bash
cd TaskFlow
npm run dev
```

### Étape 4

Ouvrir le navigateur :

```text
http://localhost:5173
```

---

# API REST disponible

## Récupérer toutes les tâches

```http
GET /api/tasks
```

## Ajouter une tâche

```http
POST /api/tasks
```

Exemple :

```json
{
  "title": "Faire le TP Backend",
  "description": "Architecture MVC"
}
```

## Modifier le statut d'une tâche

```http
PUT /api/tasks/:id
```

Exemple :

```json
{
  "status": "En cours"
}
```

## Supprimer une tâche

```http
DELETE /api/tasks/:id
```

---

# Technologies utilisées

## Front-End

* React
* Vite
* JavaScript
* CSS

## Back-End

* Node.js
* Express.js
* MongoDB
* Mongoose
* CORS
* Dotenv
* Nodemon