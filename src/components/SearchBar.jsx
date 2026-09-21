export function SearchBar({ searchTerm, setSearchTerm }) {
  return (
    <div style={{ margin: '25px 0', display: 'flex', justifyContent: 'center' }}>
      <input
        type="text"
        placeholder="Buscar en el archivo..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        style={{
          width: '100%',
          maxWidth: '550px',
          padding: '12px 18px',
          borderRadius: '8px',
          border: '1px solid #334155',
          backgroundColor: '#1e293b',
          color: '#f8fafc',
          outline: 'none',
          fontSize: '0.95rem'
        }}
      />
    </div>
  );
}