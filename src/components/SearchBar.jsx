export function SearchBar({ searchTerm, setSearchTerm, onSearch }) {
  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch();
  };

  return (
    <form onSubmit={handleSubmit} style={{ marginBottom: '20px', display: 'flex', gap: '10px' }}>
      <input
        type="text"
        placeholder="Buscar videojuego..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        style={{ padding: '8px 12px', fontSize: '16px', borderRadius: '4px', border: '1px solid #ccc', flex: 1 }}
      />
      <button type="submit" style={{ padding: '8px 16px', fontSize: '16px', cursor: 'pointer' }}>
        Buscar
      </button>
    </form>
  );
}