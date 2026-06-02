const express = require("express");

const router = express.Router();

const authMiddleware =
require("../middlewares/authMiddleware");

const {
  updateScore
} = require(
  "../controllers/userController"
);

/*
  Route protégée
*/

router.post(
  "/score",
  authMiddleware,
  updateScore
);

module.exports = router;