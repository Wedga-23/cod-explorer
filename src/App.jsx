import { useState } from 'react';
import { Navbar } from './components/Navbar';
import { SearchBar } from './components/SearchBar';
import { GameCard } from './components/GameCard';
import { DetailModal } from './components/DetailModal';

const ZOMBIES_DATA = {
  personajes: [
    {
      id: 1,
      name: 'Edward Richtofen',
      status: 'Fallecido',
      faction: 'Ultimis / Primis',
      image: 'https://images.unsplash.com/photo-1579373903781-fd5c0c30c4cd?auto=format&fit=crop&w=600&q=80',
      description: 'Científico sociópata del Grupo 935. Obsesionado con el Elemento 115, la tecnología de teletransporte y el control total del Éter.',
      details: { aparicion: 'Shi No Numa', rol: 'Científico Jefe', universo: 'Línea de Tiempo del Éter' }
    },
    {
      id: 2,
      name: 'Tank Dempsey',
      status: 'Fallecido',
      faction: 'Ultimis / Primis',
      image: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&w=600&q=80',
      description: 'Suboficial de los Marines de EE. UU. Capturado en Verrückt, destaca por su agresividad, el manejo de armas pesadas y sus frases icónicas.',
      details: { aparicion: 'Verrückt', rol: 'Infantería Pesada', universo: 'Línea de Tiempo del Éter' }
    },
    {
      id: 3,
      name: 'Nikolai Belinski',
      status: 'Fallecido',
      faction: 'Ultimis / Primis',
      image: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=600&q=80',
      description: 'Soldado del Ejército Rojo con un pasado complejo. A pesar de su carácter trágico, se convierte en la clave para cerrar el ciclo del Éter.',
      details: { aparicion: 'Shi No Numa', rol: 'Líder / Infantería', universo: 'Línea de Tiempo del Éter' }
    },
    {
      id: 4,
      name: 'Takeo Masaki',
      status: 'Fallecido',
      faction: 'Ultimis / Primis',
      image: 'https://images.unsplash.com/photo-1563089145-599997674d42?auto=format&fit=crop&w=600&q=80',
      description: 'Oficial del Ejército Imperial Japonés que se rige por un estricto código de honor Bushido y la lealtad absoluta al Emperador.',
      details: { aparicion: 'Shi No Numa', rol: 'Oficial / Espadachín', universo: 'Línea de Tiempo del Éter' }
    },
    {
      id: 5,
      name: 'Samantha Maxis',
      status: 'Vivo',
      faction: 'Requiem / Éter Oscuro',
      image: 'https://images.unsplash.com/photo-1534447677768-be436bb09401?auto=format&fit=crop&w=600&q=80',
      description: 'Hija del Dr. Ludvig Maxis. Atrapada en la dimensión del Éter Oscuro, adquirió habilidades sobrenaturales y gran control telequinético.',
      details: { aparicion: 'Der Riese', rol: 'Agente Especial', universo: 'Dark Aether Saga' }
    },
    {
      id: 6,
      name: 'Dr. Ludvig Maxis',
      status: 'Fallecido',
      faction: 'Grupo 935',
      image: 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=600&q=80',
      description: 'Fundador y cerebro intelectual del Grupo 935. Lideró la investigación científica inicial sobre el Elemento 115.',
      details: { aparicion: 'Der Riese', rol: 'Director de Investigación', universo: 'Línea de Tiempo del Éter' }
    }
  ],
  mapas: [
    {
      id: 101,
      name: 'Nacht der Untoten',
      game: 'World at War',
      image: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=600&q=80',
      description: 'Un aeródromo militar destruido rodeado de niebla. El mapa original donde nació el modo Zombies sin ventajas ni Pack-a-Punch.',
      details: { ubicacion: 'Alemania', novedad: 'Primer mapa Zombie', trampa: 'Ninguna' }
    },
    {
      id: 102,
      name: 'Kino der Toten',
      game: 'Black Ops 1',
      image: 'https://images.unsplash.com/photo-1517604931442-7e0c8ed2963c?auto=format&fit=crop&w=600&q=80',
      description: 'Un antiguo teatro abandonado en Berlín. Cuenta con escenario, vestíbulo, teletransportador central y el icónico proyector de cine.',
      details: { ubicacion: 'Berlín, Alemania', ventaja: 'Juggernog', icono: 'Teletransportador' }
    },
    {
      id: 103,
      name: 'Der Riese',
      game: 'World at War / BO1 / BO3',
      image: 'https://images.unsplash.com/photo-1509198397868-475647b2a1e5?auto=format&fit=crop&w=600&q=80',
      description: 'Instalación científica secreta del Grupo 935 en Polonia. Es la cuna de la máquina Pack-a-Punch para mejorar armas.',
      details: { ubicacion: 'Breslau', novedad: 'Pack-a-Punch', trampa: 'Barrera Eléctrica' }
    },
    {
      id: 104,
      name: 'Origins',
      game: 'Black Ops 2 / BO3',
      image: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=600&q=80',
      description: 'Las trincheras de la Primera Guerra Mundial en Francia. Destaca por tres Gigantes de Acero y los cuatro Bastones Elementales.',
      details: { ubicacion: 'Francia', arma_clave: 'Bastones Elementales', enemigo: 'Panzer Soldat' }
    }
  ],
  armas: [
    {
      id: 201,
      name: 'Ray Gun (Arma de Rayos)',
      category: 'Arma Maravilla',
      image: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=600&q=80',
      description: 'Dispositivo futurista creado por H. Porter. Dispara carcasas de plasma verde con alto daño de área.',
      details: { municion: 'Célula 115', mejorada: 'Porter X2 Ray Gun', dano: 'Extremo' }
    },
    {
      id: 202,
      name: 'Wunderwaffe DG-2',
      category: 'Arma Maravilla',
      image: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&w=600&q=80',
      description: 'Inventada por Edward Richtofen. Genera una corriente eléctrica de 200,000 amperios que se encadena en múltiples enemigos.',
      details: { capacidad: '3 Disparos', mejorada: 'DG-3 Juggernaut', efecto: 'Muerte instantánea en cadena' }
    },
    {
      id: 203,
      name: 'Monkey Bomb',
      category: 'Equipamiento Táctico',
      image: 'https://images.unsplash.com/photo-1563089145-599997674d42?auto=format&fit=crop&w=600&q=80',
      description: 'Juguete musical de mono con platillos modificado con explosivos. Atrae a los zombis cantando antes de detonar.',
      details: { tipo: 'Granada Táctica', tiempo: '8 Segundos', uso: 'Rescate de emergencia' }
    }
  ]
};

function App() {
  const [activeTab, setActiveTab] = useState('personajes');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedItem, setSelectedItem] = useState(null);

  const currentList = ZOMBIES_DATA[activeTab] || [];
  const filteredData = currentList.filter((item) =>
    item.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#0b0f19', fontFamily: 'system-ui, sans-serif' }}>
      <Navbar activeTab={activeTab} setActiveTab={(tab) => { setActiveTab(tab); setSearchTerm(''); }} />
      
      <main style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 20px 40px' }}>
        <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: '20px' }}>
          {filteredData.length > 0 ? (
            filteredData.map((item) => (
              <GameCard 
                key={item.id} 
                item={item} 
                type={activeTab} 
                onSelect={(selected) => setSelectedItem(selected)} 
              />
            ))
          ) : (
            <p style={{ color: '#64748b', textAlign: 'center', gridColumn: '1 / -1' }}>
              No hay registros que coincidan con la búsqueda.
            </p>
          )}
        </div>
      </main>

      <DetailModal item={selectedItem} onClose={() => setSelectedItem(null)} />
    </div>
  );
}

export default App;