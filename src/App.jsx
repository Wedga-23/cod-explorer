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
      image: 'https://static.wikia.nocookie.net/callofduty/images/e/e0/Richtofen_BO4.png',
      description: 'Científico alemán del Grupo 935. Obsesionado con el elemento 115 y el control del Éter Oscuro.',
      details: { aparicion: 'Shi No Numa', rol: 'Científico', universo: 'Éter Aislado' }
    },
    {
      id: 2,
      name: 'Tank Dempsey',
      status: 'Fallecido',
      faction: 'Ultimis / Primis',
      image: 'https://static.wikia.nocookie.net/callofduty/images/8/87/Dempsey_BO4.png',
      description: 'Marine de los Estados Unidos. Agresivo, experto en armas pesadas y leal a su escuadrón.',
      details: { aparicion: 'Verrückt', rol: 'Infantería', universo: 'Éter Aislado' }
    },
    {
      id: 3,
      name: 'Nikolai Belinski',
      status: 'Fallecido',
      faction: 'Ultimis / Primis',
      image: 'https://static.wikia.nocookie.net/callofduty/images/8/81/Nikolai_BO4.png',
      description: 'Soldado del Ejército Rojo con afición al vodka. Pieza clave en la resolución de la historia del Éter.',
      details: { aparicion: 'Shi No Numa', rol: 'Infantería', universo: 'Éter Aislado' }
    },
    {
      id: 4,
      name: 'Takeo Masaki',
      status: 'Fallecido',
      faction: 'Ultimis / Primis',
      image: 'https://static.wikia.nocookie.net/callofduty/images/d/d8/Takeo_BO4.png',
      description: 'Capitán del Ejército Imperial Japonés. Guiado por un estricto código de honor del Bushido.',
      details: { aparicion: 'Shi No Numa', rol: 'Oficial', universo: 'Éter Aislado' }
    },
    {
      id: 5,
      name: 'Samantha Maxis',
      status: 'Vivo',
      faction: 'Requiem / Éter Oscuro',
      image: 'https://static.wikia.nocookie.net/callofduty/images/2/22/Samantha_ColdWar.png',
      description: 'Hija de Ludvig Maxis. Atrapada en la pirámide de la Luna, obtuvo poderes oscuros telequinéticos.',
      details: { aparicion: 'Der Riese', rol: 'Entidad', universo: 'Dark Aether' }
    }
  ],
  mapas: [
    {
      id: 101,
      name: 'Kino der Toten',
      game: 'Black Ops 1',
      image: 'https://static.wikia.nocookie.net/callofduty/images/f/f9/Kino_Der_Toten_Loading_Screen_BOIII.png',
      description: 'Un teatro alemán abandonado convertido en centro de pruebas del Grupo 935. Famoso por su proyector y teletransportador.',
      details: { ubicacion: 'Alemania', trampa: 'Torreta Eléctrica', perk: 'Juggernog' }
    },
    {
      id: 102,
      name: 'Der Riese',
      game: 'World at War',
      image: 'https://static.wikia.nocookie.net/callofduty/images/d/d5/Der_Riese_Loading_Screen_WaW.png',
      description: 'Instalación principal de investigación donde se creó la máquina Pack-a-Punch y la Wunderwaffe DG-2.',
      details: { ubicacion: 'Breslau', innovacion: 'Pack-a-Punch', icono: 'Wunderwaffe' }
    },
    {
      id: 103,
      name: 'Origins',
      game: 'Black Ops 2',
      image: 'https://static.wikia.nocookie.net/callofduty/images/2/2f/Origins_loading_screen_BO2.png',
      description: 'Ubicado en el norte de Francia durante la Primera Guerra Mundial. Introdujo los cuatro bastones elementales y los gigantes.',
      details: { ubicacion: 'Francia', elemento: 'Bastones Elementales', enemigo: 'Panzer Soldat' }
    }
  ],
  armas: [
    {
      id: 201,
      name: 'Ray Gun (Arma de Rayos)',
      category: 'Arma Maravilla',
      image: 'https://static.wikia.nocookie.net/callofduty/images/3/3d/Ray_Gun_BO4.png',
      description: 'El arma de energía icónica diseñada por H. Porter. Dispara proyectiles de plasma verde con alto daño de área.',
      details: { municion: 'Energía 115', mejorada: 'Porter X2 Ray Gun', dano: 'Extremo' }
    },
    {
      id: 202,
      name: 'Wunderwaffe DG-2',
      category: 'Arma Maravilla',
      image: 'https://static.wikia.nocookie.net/callofduty/images/5/5a/Wunderwaffe_DG-2_BO3.png',
      description: 'Genera descargas eléctricas en cadena capaces de eliminar hasta 10 zombis de un solo disparo.',
      details: { creador: 'Richtofen', capacidad: '3 Disparos', mejorada: 'DG-3 Juggernaut' }
    },
    {
      id: 203,
      name: 'Monkey Bomb',
      category: 'Equipamiento Táctico',
      image: 'https://static.wikia.nocookie.net/callofduty/images/e/e0/Cymbal_Monkey_BO4.png',
      description: 'Un mono de juguete con platillos que atrae a las hordas de zombis tocando una melodía antes de explotar.',
      details: { efecto: 'Atracción en masa', tipo: 'Táctica', uso: 'Salvavidas' }
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