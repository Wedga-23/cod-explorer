import { useState } from 'react';
import { Navbar } from './components/Navbar';
import { SearchBar } from './components/SearchBar';
import { GameCard } from './components/GameCard';
import { DetailModal } from './components/DetailModal';

const ZOMBIES_DATA = {
  personajes: [
    {
      id: 1,
      name: 'Call of Duty: World at War',
      year: '2008',
      developer: 'Treyarch',
      image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/1b/US_Marine_Corps_emblem.svg/800px-US_Marine_Corps_emblem.svg.png',
      description: 'El nacimiento del modo Zombies como un huevo de pascua llamado "Nacht der Untoten". Introdujo las rondas, la caja misteriosa y las ventajas icónicas como Juggernog.',
      details: { mapas_destacados: 'Nacht der Untoten, Verrückt, Shi No Numa, Der Riese', importancia: 'Origen del Elemento 115' }
    },
    {
      id: 2,
      name: 'Call of Duty: Black Ops',
      year: '2010',
      developer: 'Treyarch',
      image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a9/Red_star.svg/800px-Red_star.svg.png',
      description: 'Consolidó el modo con una narrativa profunda del Éter, cinemáticas, easter eggs complejos y mapas icónicos como Kino der Toten, Shangri-La y Moon.',
      details: { mapas_destacados: 'Kino der Toten, FIVE, Ascension, Call of the Dead, Moon', innovacion: 'Easter Eggs principales con logros' }
    },
    {
      id: 3,
      name: 'Call of Duty: Black Ops II',
      year: '2012',
      developer: 'Treyarch',
      image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b4/Imperial_Seal_of_Japan.svg/800px-Imperial_Seal_of_Japan.svg.png',
      description: 'Expandió el universo con la tripulación Victis y el arco Primis en Origins. Introdujo mecánicas complejas de construcción, bastones elementales y movilidad en transporte.',
      details: { mapas_destacados: 'Tranzit, Die Rise, Mob of the Dead, Buried, Origins', innovacion: 'Construcción de armas y herramientas' }
    },
    {
      id: 4,
      name: 'Call of Duty: Black Ops III',
      year: '2015',
      developer: 'Treyarch',
      image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d4/German_Officer_WWII_Insignia_placeholder.svg/800px-German_Officer_WWII_Insignia_placeholder.svg.png',
      description: 'Considerada la cumbre del modo Zombies por la comunidad. Añadió los GobbleGums, la remasterización Zombies Chronicles y misiones narrativas épicas.',
      details: { mapas_destacados: 'Shadows of Evil, Der Eisendrache, Gorod Krovi, Revelations', innovacion: 'Sistema de GobbleGums y Mod Support' }
    },
    {
      id: 5,
      name: 'Call of Duty: Black Ops 4',
      year: '2018',
      developer: 'Treyarch',
      image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/87/Biohazard_symbol.svg/800px-Biohazard_symbol.svg.png',
      description: 'Cerró la historia clásica del Éter en Tag der Toten e inició la saga Caos. Rediseñó el sistema de ventajas, el elixir y las clases iniciales.',
      details: { mapas_destacados: 'IX, Voyage of Despair, Blood of the Dead, Ancient Evil', innovacion: 'Elección de elixires y armas iniciales' }
    },
    {
      id: 6,
      name: 'Call of Duty: Black Ops Cold War',
      year: '2020',
      developer: 'Treyarch',
      image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e4/Aether_Symbol_placeholder.png/600px-Aether_Symbol_placeholder.png',
      description: 'Dio inicio a la era del Éter Oscuro con la organización Requiem y el modo Brote (Outbreak) en mapas de mundo abierto.',
      details: { mapas_destacados: 'Die Maschine, Firebase Z, Mauer der Toten, Forsaken', innovacion: 'Modo Brote (Outbreak) y exfiltración' }
    }
  ],
  mapas: [
    {
      id: 101,
      name: 'Nacht der Untoten',
      game: 'World at War (2008)',
      image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e4/Aether_Symbol_placeholder.png/600px-Aether_Symbol_placeholder.png',
      description: 'Un aeródromo militar destruido rodeado de niebla. El mapa donde nació la leyenda sin ventajas ni Pack-a-Punch.',
      details: { ubicacion: 'Alemania', novedad: 'Primer mapa en la historia', trampa: 'Ninguna' }
    },
    {
      id: 102,
      name: 'Kino der Toten',
      game: 'Black Ops 1 (2010)',
      image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/87/Biohazard_symbol.svg/800px-Biohazard_symbol.svg.png',
      description: 'Un teatro de operaciones nazi abandonado en Berlín con el icónico proyector de cine y el teletransportador central.',
      details: { ubicacion: 'Berlín, Alemania', ventaja: 'Juggernog', icono: 'Teletransportador' }
    },
    {
      id: 103,
      name: 'Der Riese',
      game: 'World at War / BO1 / BO3',
      image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d4/German_Officer_WWII_Insignia_placeholder.svg/800px-German_Officer_WWII_Insignia_placeholder.svg.png',
      description: 'La instalación principal del Grupo 935. Aquí se creó la máquina Pack-a-Punch para mejorar las armas.',
      details: { ubicacion: 'Breslau, Polonia', novedad: 'Pack-a-Punch', trampa: 'Barrera Eléctrica' }
    },
    {
      id: 104,
      name: 'Origins',
      game: 'Black Ops 2 / BO3',
      image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/1b/US_Marine_Corps_emblem.svg/800px-US_Marine_Corps_emblem.svg.png',
      description: 'Las trincheras de la Primera Guerra Mundial con tres Gigantes de Acero y la creación de los 4 Bastones Elementales.',
      details: { ubicacion: 'Francia', arma_clave: 'Bastones Elementales', enemigo: 'Panzer Soldat' }
    }
  ],
  armas: [
    {
      id: 201,
      name: 'Ray Gun (Arma de Rayos)',
      category: 'Arma Maravilla',
      image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/87/Biohazard_symbol.svg/800px-Biohazard_symbol.svg.png',
      description: 'El arma emblemática presente en prácticamente todos los juegos de la saga. Dispara plasma verde con daño de área.',
      details: { municion: 'Célula 115', mejorada: 'Porter X2 Ray Gun', dano: 'Extremo' }
    },
    {
      id: 202,
      name: 'Wunderwaffe DG-2',
      category: 'Arma Maravilla',
      image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d4/German_Officer_WWII_Insignia_placeholder.svg/800px-German_Officer_WWII_Insignia_placeholder.svg.png',
      description: 'Diseñada por Edward Richtofen. Lanza descargas de 200,000 amperios que se encadenan hasta en 10 zombis.',
      details: { capacidad: '3 Disparos', mejorada: 'DG-3 Juggernaut', efecto: 'Muerte instantánea' }
    },
    {
      id: 203,
      name: 'Monkey Bomb',
      category: 'Equipamiento Táctico',
      image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a9/Red_star.svg/800px-Red_star.svg.png',
      description: 'Juguete musical modificado con explosivos. Atrae a los hordas de zombis con música antes de detonar.',
      details: { tipo: 'Granada Táctica', tiempo: '8 Segundos', uso: 'Rescate' }
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

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '20px' }}>
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