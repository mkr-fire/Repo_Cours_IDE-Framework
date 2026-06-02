const Question =
require("../models/Question");

/*
  Retourne toutes les questions
*/

exports.getQuestions =
async (req, res) => {

  try {

    const questions =
      await Question.find();

    res.status(200).json(
      questions
    );

  } catch (error) {

    res.status(500).json({
      message: error.message
    });

  }

};