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
      description: 'Científico alemán del Grupo 935. Obsesionado con el elemento 115 y el control del Éter Oscuro.',
      details: { aparicion: 'Shi No Numa', rol: 'Científico', universo: 'Éter Aislado' }
    },
    {
      id: 2,
      name: 'Tank Dempsey',
      status: 'Fallecido',
      faction: 'Ultimis / Primis',
      image: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&w=600&q=80',
      description: 'Marine de los Estados Unidos. Agresivo, experto en armas pesadas y leal a su escuadrón.',
      details: { aparicion: 'Verrückt', rol: 'Infantería', universo: 'Éter Aislado' }
    },
    {
      id: 3,
      name: 'Samantha Maxis',
      status: 'Vivo',
      faction: 'Requiem / Éter Oscuro',
      image: 'https://images.unsplash.com/photo-1534447677768-be436bb09401?auto=format&fit=crop&w=600&q=80',
      description: 'Hija de Ludvig Maxis. Atrapada en la pirámide de la Luna, obtuvo poderes oscuros telequinéticos.',
      details: { aparicion: 'Der Riese', rol: 'Entidad', universo: 'Dark Aether' }
    }
  ],
  mapas: [
    {
      id: 101,
      name: 'Kino der Toten',
      game: 'Black Ops 1',
      image: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=600&q=80',
      description: 'Un teatro alemán abandonado convertido en centro de pruebas del Grupo 935. Famoso por su proyector y teletransportador.',
      details: { ubicacion: 'Alemania', trampa: 'Torreta Eléctrica', perk: 'Juggernog' }
    },
    {
      id: 102,
      name: 'Der Riese',
      game: 'World at War',
      image: 'https://images.unsplash.com/photo-1509198397868-475647b2a1e5?auto=format&fit=crop&w=600&q=80',
      description: 'Instalación principal de investigación donde se creó la máquina Pack-a-Punch y la Wunderwaffe DG-2.',
      details: { ubicacion: 'Breslau', innovacion: 'Pack-a-Punch', icono: 'Wunderwaffe' }
    }
  ],
  armas: [
    {
      id: 201,
      name: 'Ray Gun (Arma de Rayos)',
      category: 'Arma Maravilla',
      image: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=600&q=80',
      description: 'El arma de energía icónica diseñada por H. Porter. Dispara proyectiles de plasma verde con alto daño de área.',
      details: { municion: 'Energía 115', mejorada: 'Porter X2 Ray Gun', dano: 'Extremo' }
    },
    {
      id: 202,
      name: 'Wunderwaffe DG-2',
      category: 'Arma Maravilla',
      image: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&w=600&q=80',
      description: 'Genera descargas eléctricas en cadena capaces de eliminar hasta 10 zombis de un solo disparo.',
      details: { creador: 'Richtofen', capacidad: '3 Disparos', mejorada: 'DG-3 Juggernaut' }
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