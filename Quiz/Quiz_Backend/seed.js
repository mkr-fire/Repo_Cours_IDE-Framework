const mongoose = require("mongoose");
const Question = require("./models/Question");

async function seed() {
  await mongoose.connect(
    process.env.MONGO_URI
  );

  await Question.deleteMany();

  await Question.insertMany([
    {
      category: "F1",
      text: "Qui a remporté le titre 2023 ?",
      options: [
        "Verstappen",
        "Hamilton",
        "Leclerc",
        "Norris"
      ],
      correctAnswer: "Verstappen"
    },

    // Ajouter au moins 9 autres questions
  ]);

  console.log("Questions insérées");

  process.exit(0);
}

seed();