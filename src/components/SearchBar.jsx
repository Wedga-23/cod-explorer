export function SearchBar({ searchTerm, setSearchTerm }) {
  return (
    <div style={{ marginBottom: '30px', display: 'flex', justifyContent: 'center' }}>
      <input
        type="text"
        placeholder="Buscar personaje (ej. Richtofen, Dempsey)..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        style={{
          width: '100%',
          maxWidth: '500px',
          padding: '12px 20px',
          fontSize: '16px',
          borderRadius: '25px',
          border: '1px solid #334155',
          backgroundColor: '#1e293b',
          color: '#fff',
          outline: 'none'
        }}
      />
    </div>
  );
}