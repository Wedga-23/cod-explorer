
export function SearchBar({ searchTerm, setSearchTerm }) {
  return (
    <div style={{ marginBottom: "2rem", textAlign: "center" }}>
      <input
        type="text"
        placeholder="Buscar juego de Gears of War..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        style={{
          width: "100%",
          maxWidth: "400px",
          padding: "12px 16px",
          fontSize: "1rem",
          borderRadius: "8px",
          border: "1px solid #444",
          backgroundColor: "#1e1e1e",
          color: "#fff",
          outline: "none"
        }}
      />
    </div>
  );
}
