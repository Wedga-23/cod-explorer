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
      image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d4/German_Officer_WWII_Insignia_placeholder.svg/800px-German_Officer_WWII_Insignia_placeholder.svg.png',
      description: 'Científico sociópata del Grupo 935. Obsesionado con el elemento 115, la tecnología de teletransporte y el control total de la Gran Pirámide en la Luna.',
      details: { aparicion: 'Shi No Numa', rol: 'Científico Jefe', universo: 'Línea de Tiempo del Éter' }
    },
    {
      id: 2,
      name: 'Tank Dempsey',
      status: 'Fallecido',
      faction: 'Ultimis / Primis',
      image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/1b/US_Marine_Corps_emblem.svg/800px-US_Marine_Corps_emblem.svg.png',
      description: 'Suboficial de los Marines de EE. UU. Capturado en Verrückt, destaca por su fuerza, manejo de armas pesadas y romper constantemente la cuarta pared.',
      details: { aparicion: 'Verrückt', rol: 'Infantería Pesada', universo: 'Línea de Tiempo del Éter' }
    },
    {
      id: 3,
      name: 'Nikolai Belinski',
      status: 'Fallecido',
      faction: 'Ultimis / Primis',
      image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a9/Red_star.svg/800px-Red_star.svg.png',
      description: 'Soldado del Ejército Rojo con un pasado trágico. A pesar de su constante consumo de vodka, se convierte en el líder definitivo para cerrar el ciclo del Éter.',
      details: { aparicion: 'Shi No Numa', rol: 'Líder / Infantería', universo: 'Línea de Tiempo del Éter' }
    },
    {
      id: 4,
      name: 'Takeo Masaki',
      status: 'Fallecido',
      faction: 'Ultimis / Primis',
      image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b4/Imperial_Seal_of_Japan.svg/800px-Imperial_Seal_of_Japan.svg.png',
      description: 'Oficial del Ejército Imperial Japonés. Guiado por un estricto código de honor Bushido, servía como observador para el Emperador de Japón.',
      details: { aparicion: 'Shi No Numa', rol: 'Oficial / Espadachín', universo: 'Línea de Tiempo del Éter' }
    },
    {
      id: 5,
      name: 'Samantha Maxis',
      status: 'Vivo',
      faction: 'Requiem / Éter Oscuro',
      image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e4/Aether_Symbol_placeholder.png/600px-Aether_Symbol_placeholder.png',
      description: 'Hija del Dr. Ludvig Maxis. Quedó atrapada en el Éter Oscuro durante la Guerra Fría y desarrolló habilidades teledirigidas sobrenaturales.',
      details: { aparicion: 'Der Riese', rol: 'Agente Especial', universo: 'Dark Aether Saga' }
    },
    {
      id: 6,
      name: 'Dr. Ludvig Maxis',
      status: 'Fallecido',
      faction: 'Grupo 935',
      image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/87/Biohazard_symbol.svg/800px-Biohazard_symbol.svg.png',
      description: 'Fundador y cerebro del Grupo 935. Padre de Samantha y rival científico directo de Richtofen durante los experimentos con el Elemento 115.',
      details: { aparicion: 'Der Riese', rol: 'Director de Investigación', universo: 'Línea de Tiempo del Éter' }
    }
  ],
  mapas: [
    {
      id: 101,
      name: 'Nacht der Untoten',
      game: 'World at War',
      image: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=800&q=80',
      description: 'El mapa original que comenzó todo. Un aeródromo militar en ruinas rodeado de niebla donde un grupo de supervivientes resiste noche tras noche.',
      details: { ubicacion: 'Alemania', novedad: 'Primer mapa Zombie', trampa: 'Ninguna' }
    },
    {
      id: 102,
      name: 'Kino der Toten',
      game: 'Black Ops 1',
      image: 'https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?auto=format&fit=crop&w=800&q=80',
      description: 'Un antiguo teatro abandonado en Berlín. Cuenta con escenario, vestíbulo, teletransportador central y el icónico proyector de cine.',
      details: { ubicacion: 'Berlín, Alemania', ventaja: 'Juggernog', icono: 'Teletransportador' }
    },
    {
      id: 103,
      name: 'Der Riese',
      game: 'World at War / BO1 / BO3',
      image: 'https://images.unsplash.com/photo-1509198397868-475647b2a1e5?auto=format&fit=crop&w=800&q=80',
      description: 'Instalación científica secreta en Polonia. Es la cuna de la máquina Pack-a-Punch y donde se desarrolló la legendaria Wunderwaffe DG-2.',
      details: { ubicacion: 'Breslau', novedad: 'Pack-a-Punch', trampa: 'Barrera Eléctrica' }
    },
    {
      id: 104,
      name: 'Origins (Northern France)',
      game: 'Black Ops 2 / BO3',
      image: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&w=800&q=80',
      description: 'Trincheras llenas de barro en la I Guerra Mundial. Destaca por los tres Gigantes de Acero patrullando y la construcción de los Bastones Elementales.',
      details: { ubicacion: 'Francia', arma_clave: 'Bastones Elementales', enemigo: 'Panzer Soldat' }
    },
    {
      id: 105,
      name: 'Mob of the Dead',
      game: 'Black Ops 2',
      image: 'https://images.unsplash.com/photo-1509198397868-475647b2a1e5?auto=format&fit=crop&w=800&q=80',
      description: 'Prisión de Alcatraz envuelta en una pesadilla infernal donde cuatro reos intentan construir un avión de madera para escapar.',
      details: { ubicacion: 'San Francisco, EE.UU.', mecanica: 'Modo Vida Después de la Muerte', jefe: 'Brutus' }
    }
  ],
  armas: [
    {
      id: 201,
      name: 'Ray Gun (Arma de Rayos)',
      category: 'Arma Maravilla',
      image: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=800&q=80',
      description: 'Dispositivo futurista inventado por H. Porter. Dispara carcasas de plasma verde con daño de área capaz de destruir grupos enteros.',
      details: { municion: 'Célula 115', mejorada: 'Porter X2 Ray Gun', dano: 'Extremo' }
    },
    {
      id: 202,
      name: 'Wunderwaffe DG-2',
      category: 'Arma Maravilla',
      image: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&w=800&q=80',
      description: 'Diseñada por Edward Richtofen. Genera una potente corriente eléctrica de 200,000 amperios que se encadena entre hasta 10 zombis.',
      details: { capacidad: '3 Disparos', mejorada: 'DG-3 Juggernaut', efecto: 'Muerte instantánea en cadena' }
    },
    {
      id: 203,
      name: 'Monkey Bomb',
      category: 'Equipamiento Táctico',
      image: 'https://images.unsplash.com/photo-1563089145-599997674d42?auto=format&fit=crop&w=800&q=80',
      description: 'Juguete musical con platillos modificado con explosivos. Atrae a todos los zombis cercanos tocando una canción antes de detonar.',
      details: { tipo: 'Granada Táctica', tiempo: '8 Segundos', uso: 'Rescate de emergencia' }
    },
    {
      id: 204,
      name: 'Thundergun (Cañón de Trueno)',
      category: 'Arma Maravilla',
      image: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=800&q=80',
      description: 'Arma de aire comprimido masiva. Lanza un choque sónico gigantesco que derriba o despeja instantáneamente cualquier horda al frente.',
      details: { mapa_debut: 'Kino der Toten', mejorada: 'ZeusCannon', capacidad: '2 Disparos' }
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