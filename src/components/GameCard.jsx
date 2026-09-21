export function GameCard({ item, type, onSelect }) {
  return (
    <div 
      onClick={() => onSelect(item)}
      style={{
        backgroundColor: '#182232',
        borderRadius: '10px',
        overflow: 'hidden',
        border: '1px solid #283548',
        cursor: 'pointer',
        transition: 'transform 0.2s, border-color 0.2s',
        display: 'flex',
        flexDirection: 'column'
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = 'translateY(-4px)';
        e.currentTarget.style.borderColor = '#ef4444';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = 'translateY(0)';
        e.currentTarget.style.borderColor = '#283548';
      }}
    >
      <img
        src={item.image}
        alt={item.name}
        onError={(e) => {
          // Fallback en caso de bloqueo de red
          e.target.onerror = null;
          e.target.src = 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/87/Biohazard_symbol.svg/800px-Biohazard_symbol.svg.png';
        }}
        style={{ width: '100%', height: '180px', objectFit: 'cover', backgroundColor: '#0f172a' }}
      />
      <div style={{ padding: '15px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
        <h3 style={{ margin: 0, color: '#f8fafc', fontSize: '1.1rem' }}>{item.name}</h3>
        
        {type === 'personajes' && (
          <p style={{ margin: 0, fontSize: '0.85rem', color: '#94a3b8' }}>
            Año: {item.year} • {item.developer}
          </p>
        )}

        {type === 'mapas' && (
          <p style={{ margin: 0, fontSize: '0.85rem', color: '#94a3b8' }}>Juego: {item.game}</p>
        )}

        {type === 'armas' && (
          <p style={{ margin: 0, fontSize: '0.85rem', color: '#94a3b8' }}>Categoría: {item.category}</p>
        )}

        <span style={{ fontSize: '0.75rem', color: '#ef4444', fontWeight: 'bold', marginTop: '5px' }}>
          Ver expedientes →
        </span>
      </div>
    </div>
  );
}