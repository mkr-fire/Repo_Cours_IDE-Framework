const User = require("../models/User");
const jwt = require("jsonwebtoken");

/*
  Fonction login

  - Vérifie si le joueur existe
  - Le crée si nécessaire
  - Génère un JWT
  - Retourne le JWT
*/

exports.login = async (req, res) => {
  try {
    
    // récupération du pseudo envoyé par React
    const { pseudo } = req.body;

    // vérification
    if (!pseudo) {
      return res.status(400).json({
        message: "Pseudo obligatoire"
      });
    }

    // recherche du joueur
    let user = await User.findOne({
      pseudo: pseudo.toLowerCase()
    });

    // si le joueur n'existe pas
    if (!user) {

      user = await User.create({
        pseudo: pseudo.toLowerCase()
      });

    }

    /*
      génération du token

      payload :
      données stockées dans le token
    */
    const token = jwt.sign(
      {
        id: user._id,
        pseudo: user.pseudo
      },

      process.env.JWT_SECRET,

      {
        expiresIn: "2h"
      }
    );

    res.status(200).json({
      token,
      pseudo: user.pseudo
    });

  } catch (error) {

    res.status(500).json({
      message: error.message
    });

  }
};