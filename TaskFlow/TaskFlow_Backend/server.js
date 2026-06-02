require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const taskRoutes = require("./routes/taskRoutes");

const app = express();

app.use(express.json());

app.use(
  cors({
    origin: "http://localhost:5173"
  })
);

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("MongoDB connecté");
  })
  .catch((err) => {
    console.log(err);
  });

app.get("/api/ping", (req, res) => {
  res.json({
    message: "Serveur TaskFlow operationnel"
  });
});

app.use("/api/tasks", taskRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Serveur démarré sur le port ${PORT}`);
});