import { useState } from "react";
import { useGames } from "./hooks/useGames";
import { SearchBar } from "./components/SearchBar";
import { GameGrid } from "./components/GameGrid";
import { GameModal } from "./components/GameModal";

export default function App() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedGameId, setSelectedGameId] = useState(null);
  const { games, loading, error } = useGames(searchTerm);

  return (
    <div
      style={{
        minHeight: "100vh",
        width: "100%",
        background: "radial-gradient(circle at center, #2b0a0a 0%, #0d0d0d 100%)",
        color: "#f5f5f5",
        fontFamily: "system-ui, -apple-system, sans-serif",
        padding: "2rem 1rem",
        boxSizing: "border-box",
      }}
    >
      <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
        {/* Encabezado */}
        <header style={{ textAlign: "center", marginBottom: "2rem" }}>
          <h1
            style={{
              color: "#e63946",
              margin: "0 0 0.5rem 0",
              fontSize: "2.5rem",
              textTransform: "uppercase",
              letterSpacing: "1.5px",
              textShadow: "0 0 15px rgba(230, 57, 70, 0.5)",
            }}
          >
            ⚙️🪚💀 Gears of War Explorer
          </h1>
          <p style={{ color: "#aaa", margin: 0, fontSize: "1rem" }}>
            Catálogo de videojuego Gears of War Explorer
          </p>

          {/* Buscador */}
          <div style={{ marginTop: "1.5rem" }}>
            <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
          </div>
        </header>

        {/* Estado de Carga */}
        {loading && (
          <p style={{ textAlign: "center", color: "#e63946", fontSize: "1.2rem" }}>
            💀⚙️🩸Cargando arsenal...
          </p>
        )}

        {/* Mensaje de Error */}
        {error && (
          <p style={{ textAlign: "center", color: "#ff4d4d" }}>
            Error al cargar los datos: {error}
          </p>
        )}

        {/* Cuadrícula de Juegos */}
        {!loading && !error && (
          <GameGrid
            games={games}
            onGameClick={(id) => setSelectedGameId(id)}
          />
        )}

        {/* Modal de Detalle */}
        {selectedGameId && (
          <GameModal
            gameId={selectedGameId}
            onClose={() => setSelectedGameId(null)}
          />
        )}
      </div>
    </div>
  );
}