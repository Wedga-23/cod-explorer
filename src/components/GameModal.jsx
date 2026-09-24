import { useEffect, useState } from "react";
import { fetchGameDetail } from "../api/rawgApi";

// Descripciones oficiales en español
const spanishDescriptions = {
  "gears of war": "La primera entrega de la legendaria saga. Marcus Fenix y el Escuadrón Delta luchan contra la temible Horda Locust en el planeta Sera 14 años después del Día de la Emergencia para desplegar la Bomba de Masa Ligera.",
  "gears of war 2": "Marcus Fenix y la CGO llevan la guerra directamente al subsuelo de Sera para detener el avance de la Horda Locust y salvar la ciudad de Jacinto antes de que caiga.",
  "gears of war 3": "Con la humanidad al borde de la extinción y los Locust infectados por la Invasión Lambent, Marcus y el Escuadrón Delta emprenden una última y desesperada misión para salvar el mundo.",
  "gears of war 4": "25 años después de los eventos de Gears 3, JD Fenix y sus amigos deben enfrentarse a una nueva amenaza biológica conocida como el Swarm (El Enjambre).",
  "gears 5": "Kait Diaz emprende un viaje personal para descubrir su misterioso vínculo con el enemigo, revelando la verdadera historia del origen de los Locust y el destino de Sera.",
  "gears tactics": "Juego de estrategia táctica por turnos ambientado 12 años antes del primer Gears of War. Controla a Gabe Diaz para reclutar, equipar y liderar escuadrones en la caza del temible líder Locust Ukkon.",
  "gears of war: judgment": "Ambientado inmediatamente después del Día de la Emergencia, sigue al Escuadrón Kilo liderado por Damon Baird y Augustus Cole en su juicio por violar órdenes militares para salvar la ciudad de Halvo Bay."
};

// Personajes principales por juego
const gameCharacters = {
  "gears of war": [
    { name: "Marcus Fenix", role: "Sargento / Líder del Escuadrón Delta" },
    { name: "Dominic Santiago (Dom)", role: "Soldado del Escuadrón Delta" },
    { name: "Damon Baird", role: "Especialista en tecnología y mecánica" },
    { name: "Augustus Cole (Cole Train)", role: "Soldado de vanguardia" }
  ],
  "gears of war 2": [
    { name: "Marcus Fenix", role: "Sargento del Escuadrón Delta" },
    { name: "Dominic Santiago", role: "Cabo del Escuadrón Delta" },
    { name: "Tai Kaliso", role: "Guerrero honorable de Ilima" },
    { name: "Benjamin Carmine", role: "Recluta novato CGO" },
    { name: "Reina Myrrah", role: "Líder de la Horda Locust" }
  ],
  "gears of war 3": [
    { name: "Marcus Fenix", role: "Comandante de campo" },
    { name: "Anya Stroud", role: "Oficial CGO / Soldado de combate" },
    { name: "Samantha Byrne (Sam)", role: "Soldado de artillería pesada" },
    { name: "Jace Stratton", role: "Soldado del Escuadrón Delta" },
    { name: "Clayton Carmine", role: "El veterano sobreviviente Carmine" }
  ],
  "gears of war 4": [
    { name: "JD Fenix", role: "Ex-oficial de la CGO e hijo de Marcus" },
    { name: "Kait Diaz", role: "Forastera capacitada para la supervivencia" },
    { name: "Delmont Walker (Del)", role: "Ex-soldado CGO y mejor amigo de JD" },
    { name: "Marcus Fenix", role: "Leyenda retirada de la CGO" }
  ],
  "gears 5": [
    { name: "Kait Diaz", role: "Protagonista / Enlace con los Locust" },
    { name: "Delmont Walker (Del)", role: "Ingeniero y compañero táctico" },
    { name: "JD Fenix", role: "Capitán de la CGO" },
    { name: "FAZ Chutani", role: "Soldado de operaciones especiales" },
    { name: "Jack", role: "Dron de apoyo táctico y combate" }
  ],
  "gears tactics": [
    { name: "Gabe Diaz", role: "Teniente CGO y padre de Kait" },
    { name: "Sid Redburn", role: "Comandante veterano CGO" },
    { name: "Mikayla Dorn", role: "Francotiradora forastera" },
    { name: "Ukkon", role: "Científico genético y líder Locust" }
  ],
  "gears of war: judgment": [
    { name: "Damon Baird", role: "Teniente / Líder del Escuadrón Kilo" },
    { name: "Augustus Cole", role: "Soldado del Escuadrón Kilo" },
    { name: "Sofia Hendrik", role: "Cadete de la Guardia de Ónix" },
    { name: "Garron Paduk", role: "Ex-soldado de la UIR" }
  ]
};

export function GameModal({ gameId, onClose }) {
  const [game, setGame] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let isMounted = true;

    fetchGameDetail(gameId)
      .then((data) => {
        if (isMounted) {
          setGame(data);
          setLoading(false);
        }
      })
      .catch((err) => {
        if (isMounted) {
          setError(err.message);
          setLoading(false);
        }
      });

    return () => {
      isMounted = false;
    };
  }, [gameId]);

  // Traducción rápida de géneros
  const translateGenre = (name) => {
    const map = {
      Shooter: "Disparos / Shooter",
      Action: "Acción",
      Strategy: "Estrategia",
      Adventure: "Aventura",
      Tactical: "Táctico",
    };
    return map[name] || name;
  };

  // Obtener descripción en español
  const getDescriptionInSpanish = (gameData) => {
    if (!gameData) return "";
    const cleanName = gameData.name.toLowerCase().trim();

    for (const [key, desc] of Object.entries(spanishDescriptions)) {
      if (cleanName.includes(key)) {
        return desc;
      }
    }

    const html = gameData.description_raw || gameData.description || "";
    const tmp = document.createElement("DIV");
    tmp.innerHTML = html;
    return tmp.textContent || tmp.innerText || "Sin descripción disponible en español.";
  };

  // Obtener la lista de personajes
  const getCharactersList = (gameData) => {
    if (!gameData) return [];
    const cleanName = gameData.name.toLowerCase().trim();

    for (const [key, list] of Object.entries(gameCharacters)) {
      if (cleanName.includes(key)) {
        return list;
      }
    }
    return [];
  };

  if (!gameId) return null;

  const characters = getCharactersList(game);

  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: "rgba(0, 0, 0, 0.88)",
        backdropFilter: "blur(4px)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        zIndex: 1000,
        padding: "1rem",
      }}
      onClick={onClose}
    >
      <div
        style={{
          // Fondo temático Gears con gradiente oscuro e imagen de la portada de fondo
          background: game?.background_image
            ? `linear-gradient(to bottom, rgba(15, 15, 15, 0.82), rgba(10, 10, 10, 0.96)), url(${game.background_image}) center/cover no-repeat`
            : "linear-gradient(135deg, #181818 0%, #0d0d0d 100%)",
          color: "#f5f5f5",
          borderRadius: "14px",
          maxWidth: "720px",
          width: "100%",
          maxHeight: "90vh",
          overflowY: "auto",
          padding: "1.8rem",
          position: "relative",
          boxShadow: "0 0 30px rgba(230, 57, 70, 0.25), 0 10px 30px rgba(0,0,0,0.9)",
          border: "1px solid rgba(230, 57, 70, 0.4)",
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Botón de Cierre */}
        <button
          onClick={onClose}
          style={{
            position: "absolute",
            top: "14px",
            right: "18px",
            background: "rgba(0, 0, 0, 0.6)",
            border: "1px solid rgba(255, 255, 255, 0.2)",
            borderRadius: "50%",
            width: "36px",
            height: "36px",
            color: "#fff",
            fontSize: "1.4rem",
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            lineHeight: 1,
            transition: "all 0.2s ease",
          }}
        >
          &times;
        </button>

        {loading && (
          <p style={{ textAlign: "center", padding: "2.5rem", color: "#e63946", fontSize: "1.1rem" }}>
            ⚙️ Cargando datos tácticos...
          </p>
        )}

        {error && (
          <p style={{ color: "#e63946", textAlign: "center", padding: "2.5rem" }}>
            {error}
          </p>
        )}

        {game && !loading && (
          <>
            {/* Título Estilo Gears */}
            <div style={{ borderBottom: "2px solid #e63946", paddingBottom: "0.6rem", marginBottom: "1.2rem" }}>
              <h2
                style={{
                  color: "#e63946",
                  marginTop: 0,
                  marginBottom: "0.3rem",
                  fontSize: "1.8rem",
                  textTransform: "uppercase",
                  letterSpacing: "1px",
                  textShadow: "0 2px 8px rgba(230, 57, 70, 0.4)",
                }}
              >
                {game.name}
              </h2>

              <div style={{ display: "flex", gap: "12px", flexWrap: "wrap", fontSize: "0.85rem" }}>
                <span style={{ color: "#aaa" }}>
                  <strong style={{ color: "#ddd" }}>Géneros:</strong>{" "}
                  {game.genres && game.genres.length > 0
                    ? game.genres.map((g) => translateGenre(g.name)).join(", ")
                    : "Acción / Shooter"}
                </span>
                <span style={{ color: "#aaa" }}>
                  <strong style={{ color: "#ddd" }}>Plataformas:</strong>{" "}
                  {game.platforms && game.platforms.length > 0
                    ? game.platforms.map((p) => p.platform.name).join(", ")
                    : "Xbox / PC"}
                </span>
              </div>
            </div>

            {/* Sinopsis */}
            <div
              style={{
                backgroundColor: "rgba(0, 0, 0, 0.65)",
                padding: "1rem",
                borderRadius: "8px",
                borderLeft: "4px solid #e63946",
                lineHeight: "1.6",
                fontSize: "0.95rem",
                color: "#e0e0e0",
                boxShadow: "inset 0 0 10px rgba(0,0,0,0.5)",
              }}
            >
              <strong style={{ color: "#fff", display: "block", marginBottom: "0.4rem", textTransform: "uppercase", fontSize: "0.85rem", letterSpacing: "0.5px" }}>
                📝 Sinopsis Oficial:
              </strong>
              {getDescriptionInSpanish(game)}
            </div>

            {/* Personajes Principales en estilo Tarjetas Tácticas CGO */}
            {characters.length > 0 && (
              <div style={{ marginTop: "1.5rem" }}>
                <h3
                  style={{
                    fontSize: "1.1rem",
                    marginBottom: "0.8rem",
                    color: "#fff",
                    textTransform: "uppercase",
                    letterSpacing: "0.8px",
                    display: "flex",
                    alignItems: "center",
                    gap: "6px",
                  }}
                >
                  <span style={{ color: "#e63946" }}>⚙️</span> Personal Táctico Destacado:
                </h3>
                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(auto-fit, minmax(210px, 1fr))",
                    gap: "10px",
                  }}
                >
                  {characters.map((char, index) => (
                    <div
                      key={index}
                      style={{
                        backgroundColor: "rgba(20, 20, 20, 0.85)",
                        padding: "0.8rem 1rem",
                        borderRadius: "8px",
                        border: "1px solid rgba(255, 255, 255, 0.08)",
                        borderLeft: "3px solid #e63946",
                        boxShadow: "0 4px 10px rgba(0,0,0,0.4)",
                      }}
                    >
                      <strong style={{ color: "#fff", display: "block", fontSize: "0.95rem" }}>
                        {char.name}
                      </strong>
                      <span style={{ color: "#a0a0a0", fontSize: "0.8rem", display: "block", marginTop: "2px" }}>
                        {char.role}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Galería de Capturas */}
            {game.screenshots && game.screenshots.length > 0 && (
              <div style={{ marginTop: "1.5rem" }}>
                <h3
                  style={{
                    fontSize: "1.1rem",
                    marginBottom: "0.8rem",
                    color: "#fff",
                    textTransform: "uppercase",
                    letterSpacing: "0.8px",
                  }}
                >
                  📸 Capturas de Pantalla:
                </h3>
                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
                    gap: "10px",
                  }}
                >
                  {game.screenshots.map((s) => (
                    <img
                      key={s.id}
                      src={s.image}
                      alt="Captura del juego"
                      style={{
                        width: "100%",
                        height: "110px",
                        objectFit: "cover",
                        borderRadius: "6px",
                        border: "1px solid rgba(255, 255, 255, 0.15)",
                        transition: "transform 0.2s ease",
                      }}
                    />
                  ))}
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}