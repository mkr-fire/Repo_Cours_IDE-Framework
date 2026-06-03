import { useEffect, useState } from "react";

const styles = {
  page: {
    minHeight: "100vh",
    background: "linear-gradient(135deg, #0f0f1a 0%, #1a1a2e 50%, #16213e 100%)",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: "3rem 1rem",
    fontFamily: "'Georgia', serif",
  },
  title: {
    fontSize: "2.8rem",
    fontWeight: "bold",
    color: "#f7c948",
    textAlign: "center",
    marginBottom: "0.4rem",
    letterSpacing: "2px",
    textShadow: "0 0 20px rgba(247,201,72,0.4)",
  },
  subtitle: {
    color: "#aaa",
    marginBottom: "2.5rem",
    fontSize: "1rem",
    letterSpacing: "1px",
  },
  card: {
    width: "100%",
    maxWidth: "600px",
    background: "rgba(255,255,255,0.04)",
    borderRadius: "16px",
    border: "1px solid rgba(247,201,72,0.15)",
    overflow: "hidden",
    boxShadow: "0 8px 32px rgba(0,0,0,0.4)",
  },
  row: (index) => ({
    display: "flex",
    alignItems: "center",
    padding: "1rem 1.5rem",
    borderBottom: "1px solid rgba(255,255,255,0.05)",
    background:
      index === 0
        ? "rgba(247,201,72,0.08)"
        : index === 1
        ? "rgba(192,192,192,0.06)"
        : index === 2
        ? "rgba(205,127,50,0.06)"
        : "transparent",
    transition: "background 0.2s",
  }),
  rank: (index) => ({
    width: "2.5rem",
    height: "2.5rem",
    borderRadius: "50%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontWeight: "bold",
    fontSize: "1rem",
    marginRight: "1rem",
    flexShrink: 0,
    background:
      index === 0
        ? "linear-gradient(135deg, #f7c948, #e0a800)"
        : index === 1
        ? "linear-gradient(135deg, #c0c0c0, #a0a0a0)"
        : index === 2
        ? "linear-gradient(135deg, #cd7f32, #a0622a)"
        : "rgba(255,255,255,0.08)",
    color: index < 3 ? "#000" : "#aaa",
    boxShadow: index === 0 ? "0 0 12px rgba(247,201,72,0.5)" : "none",
  }),
  pseudo: {
    flex: 1,
    color: "#fff",
    fontSize: "1.05rem",
    fontWeight: index => index < 3 ? "bold" : "normal",
  },
  score: {
    color: "#f7c948",
    fontWeight: "bold",
    fontSize: "1.1rem",
  },
  medal: ["🥇", "🥈", "🥉"],
  empty: {
    textAlign: "center",
    color: "#666",
    padding: "3rem",
    fontSize: "1rem",
  },
  loading: {
    color: "#f7c948",
    textAlign: "center",
    padding: "3rem",
    fontSize: "1.1rem",
    animation: "pulse 1.5s infinite",
  },
  error: {
    color: "#e05252",
    textAlign: "center",
    padding: "2rem",
    fontSize: "1rem",
  },
};

export default function Leaderboard() {
  const [scores, setScores] = useState([]);
  const [loading, setLoading] = useState(true);
  const [erreur, setErreur] = useState(null);

  useEffect(() => {
    fetch("http://localhost:5000/api/leaderboard")
      .then((res) => {
        if (!res.ok) throw new Error("Erreur serveur");
        return res.json();
      })
      .then((data) => {
        setScores(data);
        setLoading(false);
      })
      .catch((err) => {
        setErreur("Impossible de charger le classement.");
        setLoading(false);
      });
  }, []);

  return (
    <div style={styles.page}>
      <h1 style={styles.title}>🏆 Leaderboard</h1>
      <p style={styles.subtitle}>Top 10 des meilleurs joueurs</p>

      <div style={styles.card}>
        {loading && <p style={styles.loading}>Chargement...</p>}

        {erreur && <p style={styles.error}>{erreur}</p>}

        {!loading && !erreur && scores.length === 0 && (
          <p style={styles.empty}>Aucun score enregistré pour l'instant.</p>
        )}

        {!loading &&
          !erreur &&
          scores.map((joueur, index) => (
            <div key={joueur._id || index} style={styles.row(index)}>
              <div style={styles.rank(index)}>
                {index < 3 ? styles.medal[index] : index + 1}
              </div>
              <span style={{ ...styles.pseudo, fontWeight: index < 3 ? "bold" : "normal" }}>
                {joueur.pseudo}
              </span>
              <span style={styles.score}>{joueur.meilleurScore} pts</span>
            </div>
          ))}
      </div>
    </div>
  );
}
