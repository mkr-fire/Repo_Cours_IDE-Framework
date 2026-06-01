const express = require('express');
const app = express();
const PORT = 5000;

app.use(express.json());

let articles = [
    { id: 1, titre: "Article 1", contenu: "Contenu du premier article" },
    { id: 2, titre: "Article 2", contenu: "Contenu du deuxième article" }
];

app.get('/api/articles', (req, res) => {
    res.json(articles);
});

app.post('/api/articles', (req, res) => {
    const nouvelArticle = {
        id: articles.length + 1,
        ...req.body
    };

    articles.push(nouvelArticle);
    res.status(201).json({
        message: "Article ajouté avec succès",
        article: nouvelArticle
    });
});

app.listen(PORT, () => {
    console.log(`Serveur démarré sur http://localhost:${PORT}`);
});
