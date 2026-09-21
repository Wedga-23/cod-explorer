export function DetailModal({ item, onClose }) {
  if (!item) return null;

  return (
    <div 
      onClick={onClose}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        backgroundColor: 'rgba(0, 0, 0, 0.85)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 1000,
        padding: '20px'
      }}
    >
      <div 
        onClick={(e) => e.stopPropagation()}
        style={{
          backgroundColor: '#182232',
          borderRadius: '12px',
          maxWidth: '500px',
          width: '100%',
          overflow: 'hidden',
          border: '1px solid #334155',
          color: '#f8fafc'
        }}
      >
        <img src={item.image} alt={item.name} style={{ width: '100%', height: '240px', objectFit: 'cover' }} />
        <div style={{ padding: '20px' }}>
          <h2 style={{ margin: '0 0 10px 0', color: '#ef4444' }}>{item.name}</h2>
          <p style={{ color: '#cbd5e1', lineHeight: '1.5', fontSize: '0.95rem', marginBottom: '15px' }}>
            {item.description}
          </p>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px', backgroundColor: '#0f172a', padding: '12px', borderRadius: '8px', fontSize: '0.85rem' }}>
            {item.details && Object.entries(item.details).map(([key, val]) => (
              <div key={key}>
                <span style={{ color: '#64748b', display: 'block', textTransform: 'capitalize' }}>{key}</span>
                <strong style={{ color: '#f1f5f9' }}>{val}</strong>
              </div>
            ))}
          </div>

          <button
            onClick={onClose}
            style={{
              marginTop: '20px',
              width: '100%',
              padding: '10px',
              backgroundColor: '#ef4444',
              color: '#fff',
              border: 'none',
              borderRadius: '6px',
              cursor: 'pointer',
              fontWeight: 'bold'
            }}
          >
            Cerrar
          </button>
        </div>
      </div>
    </div>
  );
}