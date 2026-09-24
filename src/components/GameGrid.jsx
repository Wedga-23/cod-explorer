import { GameCard } from "./GameCard";

export function GameGrid({ games, onGameClick }) {
  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fill, minmax(240px, 1fr))",
        gap: "20px",
      }}
    >
      {games.map((game) => (
        <GameCard
          key={game.id}
          game={game}
          onClick={() => onGameClick(game.id)}
        />
      ))}
    </div>
  );
}