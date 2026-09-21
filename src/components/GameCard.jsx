export function GameCard({ item, type, onSelect }) {
  const getStatusColor = (status) => {
    if (status === 'Vivo') return '#22c55e';
    if (status === 'Fallecido') return '#ef4444';
    return '#eab308';
  };

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
          e.target.onerror = null;
          e.target.src = 'https://picsum.photos/600/400?blur=2';
        }}
        style={{ width: '100%', height: '180px', objectFit: 'cover' }}
      />
      <div style={{ padding: '15px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
        <h3 style={{ margin: 0, color: '#f8fafc', fontSize: '1.1rem' }}>{item.name}</h3>
        
        {type === 'personajes' && (
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.85rem', color: '#94a3b8' }}>
            <span style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: getStatusColor(item.status) }}></span>
            {item.status} • {item.faction}
          </div>
        )}

        {type === 'mapas' && (
          <p style={{ margin: 0, fontSize: '0.85rem', color: '#94a3b8' }}>Juego: {item.game}</p>
        )}

        {type === 'armas' && (
          <p style={{ margin: 0, fontSize: '0.85rem', color: '#94a3b8' }}>Tipo: {item.category}</p>
        )}

        <span style={{ fontSize: '0.75rem', color: '#ef4444', fontWeight: 'bold', marginTop: '5px' }}>
          Ver detalles →
        </span>
      </div>
    </div>
  );
}