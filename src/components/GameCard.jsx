export function GameCard({ character }) {
  // Configuración de color para el estado (Status dot)
  const isAlive = character.status.toLowerCase() === 'vivo';
  const statusColor = isAlive ? '#22c55e' : '#ef4444';

  return (
    <div style={{
      backgroundColor: '#1e293b',
      borderRadius: '12px',
      overflow: 'hidden',
      boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.5)',
      display: 'flex',
      flexDirection: 'column',
      color: '#f8fafc'
    }}>
      <img
        src={character.image}
        alt={character.name}
        style={{ width: '100%', height: '220px', objectFit: 'cover' }}
      />
      <div style={{ padding: '16px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
        <div>
          <h3 style={{ margin: '0 0 6px 0', fontSize: '1.25rem', color: '#fff' }}>{character.name}</h3>
          <p style={{ margin: 0, display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.9rem', color: '#cbd5e1' }}>
            <span style={{
              height: '9px',
              width: '9px',
              backgroundColor: statusColor,
              borderRadius: '50%',
              display: 'inline-block'
            }}></span>
            {character.status} - {character.faction}
          </p>
        </div>

        <div>
          <span style={{ fontSize: '0.75rem', color: '#94a3b8', textTransform: 'uppercase', fontWeight: 'bold' }}>
            Primera Aparición
          </span>
          <p style={{ margin: '2px 0 0 0', fontSize: '0.9rem', color: '#f1f5f9' }}>{character.firstAppeared}</p>
        </div>

        <div>
          <span style={{ fontSize: '0.75rem', color: '#94a3b8', textTransform: 'uppercase', fontWeight: 'bold' }}>
            Ubicación / Mapa Icónico
          </span>
          <p style={{ margin: '2px 0 0 0', fontSize: '0.9rem', color: '#f1f5f9' }}>{character.location}</p>
        </div>
      </div>
    </div>
  );
}