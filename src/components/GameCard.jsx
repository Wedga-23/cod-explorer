export function GameCard({ game, onClick }) {
  return (
    <div
      onClick={onClick}
      style={{
        backgroundColor: "rgba(20, 20, 20, 0.85)",
        borderRadius: "10px",
        overflow: "hidden",
        cursor: "pointer", // Cambia el cursor a manita al pasar por encima
        border: "1px solid rgba(255, 255, 255, 0.1)",
        transition: "transform 0.2s ease, box-shadow 0.2s ease",
      }}
    >
      <img
        src={game.background_image}
        alt={game.name}
        style={{ width: "100%", height: "180px", objectFit: "cover" }}
      />
      <div style={{ padding: "1rem" }}>
        <h3 style={{ margin: "0 0 0.5rem 0", color: "#fff" }}>{game.name}</h3>
        <p style={{ margin: "0.2rem 0", color: "#aaa", fontSize: "0.85rem" }}>
          📅 Lanzamiento: {game.released}
        </p>
        <p style={{ margin: "0.2rem 0", color: "#ffd166", fontSize: "0.85rem" }}>
          ⭐ Rating: {game.rating} / 5
        </p>
      </div>
    </div>
  );
}