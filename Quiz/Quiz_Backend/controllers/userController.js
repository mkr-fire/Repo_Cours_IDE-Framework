const User =
require("../models/User");

/*
  Mise à jour du record
*/

exports.updateScore =
async (req, res) => {

  try {

    const { score } =
      req.body;

    /*
      récupéré grâce au JWT
    */
    const userId =
      req.user.id;

    const user =
      await User.findById(
        userId
      );

    if (!user) {

      return res.status(404).json({
        message: "Utilisateur introuvable"
      });

    }

    /*
      mise à jour
      uniquement si
      nouveau record
    */
    if (
      score > user.bestScore
    ) {

      user.bestScore = score;

      await user.save();

    }

    res.status(200).json({
      bestScore:
        user.bestScore
    });

  } catch (error) {

    res.status(500).json({
      message: error.message
    });

  }

};

exports.getLeaderboard =
async (req, res) => {

  try {

    const leaderboard =
      await User.find()

      .select(
        "pseudo bestScore"
      )

      .sort({
        bestScore: -1
      })

      .limit(10);

    res.status(200).json(
      leaderboard
    );

  } catch (error) {

    res.status(500).json({
      message: error.message
    });

  }

};