const jwt = require("jsonwebtoken");

/*
  Middleware de protection

  Vérifie que le token envoyé
  est valide
*/

module.exports = (req, res, next) => {

  try {

    // récupération du header
    const authHeader =
      req.headers.authorization;

    if (!authHeader) {

      return res.status(401).json({
        message: "Token absent"
      });

    }

    /*
      format attendu :

      Bearer eyJhbGc...
    */

    const token =
      authHeader.split(" ")[1];

    if (!token) {

      return res.status(401).json({
        message: "Token invalide"
      });

    }

    // décodage du token
    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET
    );

    /*
      ajout du joueur
      dans la requête
    */
    req.user = decoded;

    next();

  } catch (error) {

    res.status(401).json({
      message: "Accès refusé"
    });

  }
};