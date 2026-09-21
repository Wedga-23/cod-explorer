export function Navbar({ activeTab, setActiveTab }) {
  const tabs = [
    { id: 'personajes', label: 'Personajes' },
    { id: 'mapas', label: 'Mapas Icónicos' },
    { id: 'armas', label: 'Armas Especiales' }
  ];

  return (
    <nav style={{ backgroundColor: '#0b0f19', borderBottom: '1px solid #1e293b', padding: '15px 20px', sticky: 'top' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '15px' }}>
        <h1 style={{ margin: 0, color: '#ef4444', fontSize: '1.5rem', tracking: 'wide', textTransform: 'uppercase' }}>
          ☣️ COD Zombies Codex
        </h1>
        <div style={{ display: 'flex', gap: '10px' }}>
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              style={{
                backgroundColor: activeTab === tab.id ? '#ef4444' : '#1e293b',
                color: '#fff',
                border: 'none',
                padding: '8px 16px',
                borderRadius: '6px',
                cursor: 'pointer',
                fontWeight: '600',
                transition: '0.2s'
              }}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>
    </nav>
  );
}