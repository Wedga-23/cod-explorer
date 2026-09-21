export function GameCard({ item, type, onSelect }) {
  const getStatusColor = (status) => {
    if (status === 'Vivo') return '#22c55e';
    if (status === 'Fallecido') return '#ef4444';
    return '#eab308';
  };

  // Generador de portadas temáticas garantizadas de COD Zombies
  const getFallbackBanner = () => {
    const bgColors = {
      personajes: 'linear-gradient(135deg, #450a0a 0%, #18181b 100%)',
      mapas: 'linear-gradient(135deg, #1e1b4b 0%, #09090b 100%)',
      armas: 'linear-gradient(135deg, #064e3b 0%, #09090b 100%)'
    };

    const icons = {
      personajes: '☣️',
      mapas: '🧟',
      armas: '⚡'
    };

    return (
      <div style={{
        width: '100%',
        height: '180px',
        background: bgColors[type] || 'linear-gradient(135deg, #182232 0%, #0b0f19 100%)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        borderBottom: '2px solid #3f3f46',
        position: 'relative'
      }}>
        <span style={{ fontSize: '3rem', filter: 'drop-shadow(0 0 10px rgba(239, 68, 68, 0.5))' }}>
          {icons[type] || '🎮'}
        </span>
        <span style={{ 
          marginTop: '8px', 
          fontSize: '0.75rem', 
          letterSpacing: '2px', 
          color: '#e4e4e7', 
          fontWeight: 'bold',
          textTransform: 'uppercase'
        }}>
          {item.name}
        </span>
      </div>
    );
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
      {/* Banner visual resistente a bloqueos */}
      {getFallbackBanner()}

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
          Ver expedientes →
        </span>
      </div>
    </div>
  );
}