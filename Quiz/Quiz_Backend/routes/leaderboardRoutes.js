const express = require("express");

const router = express.Router();

const {
  getLeaderboard
} = require(
  "../controllers/userController"
);

router.get(
  "/",
  getLeaderboard
);

module.exports = router;