const authRoutes =
require("./routes/authRoutes");
app.use(
  "/api/auth",
  authRoutes
);

const questionRoutes =
require("./routes/questionRoutes");
app.use(
  "/api/questions",
  questionRoutes
);

const userRoutes =
require("./routes/userRoutes");
const leaderboardRoutes =
require("./routes/leaderboardRoutes");
app.use(
  "/api/users",
  userRoutes
);
app.use(
  "/api/leaderboard",
  leaderboardRoutes
);