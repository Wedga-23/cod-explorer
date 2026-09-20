import { useState } from 'react';
import { Navbar } from './components/Navbar';
import { SearchBar } from './components/SearchBar';
import { GameCard } from './components/GameCard';

// Base de datos de personajes de Call of Duty Zombies
const ZOMBIES_CHARACTERS = [
  {
    id: 1,
    name: 'Edward Richtofen',
    status: 'Fallecido',
    faction: 'Primis / Ultimis',
    firstAppeared: 'Shi No Numa (World at War)',
    location: 'Der Riese / Alcatraz',
    image: 'https://vignette.wikia.nocookie.net/callofduty/images/e/e0/Richtofen_BO4.png'
  },
  {
    id: 2,
    name: 'Tank Dempsey',
    status: 'Fallecido',
    faction: 'Primis / Ultimis',
    firstAppeared: 'Verrückt (World at War)',
    location: 'Kino der Toten',
    image: 'https://vignette.wikia.nocookie.net/callofduty/images/8/87/Dempsey_BO4.png'
  },
  {
    id: 3,
    name: 'Nikolai Belinski',
    status: 'Fallecido',
    faction: 'Primis / Ultimis',
    firstAppeared: 'Shi No Numa (World at War)',
    location: 'Gorod Krovi',
    image: 'https://vignette.wikia.nocookie.net/callofduty/images/8/81/Nikolai_BO4.png'
  },
  {
    id: 4,
    name: 'Takeo Masaki',
    status: 'Fallecido',
    faction: 'Primis / Ultimis',
    firstAppeared: 'Shi No Numa (World at War)',
    location: 'Zetsubou No Shima',
    image: 'https://vignette.wikia.nocookie.net/callofduty/images/d/d8/Takeo_BO4.png'
  },
  {
    id: 5,
    name: 'Samantha Maxis',
    status: 'Vivo',
    faction: 'Éter Oscuro / Requiem',
    firstAppeared: 'Der Riese (World at War)',
    location: 'Moon / Firebase Z',
    image: 'https://vignette.wikia.nocookie.net/callofduty/images/2/22/Samantha_ColdWar.png'
  },
  {
    id: 6,
    name: 'Grigori Weaver',
    status: 'Vivo',
    faction: 'Requiem',
    firstAppeared: 'Die Maschine (Cold War)',
    location: 'Ural Mountains',
    image: 'https://vignette.wikia.nocookie.net/callofduty/images/c/c2/Weaver_ColdWar.png'
  }
];

function App() {
  const [searchTerm, setSearchTerm] = useState('');

  // Filtrado dinámico en tiempo real según la búsqueda
  const filteredCharacters = ZOMBIES_CHARACTERS.filter((char) =>
    char.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#0f172a', fontFamily: 'sans-serif' }}>
      <Navbar />
      <main style={{ padding: '20px', maxWidth: '1200px', margin: '0 auto' }}>
        <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))',
          gap: '24px'
        }}>
          {filteredCharacters.length > 0 ? (
            filteredCharacters.map((char) => (
              <GameCard key={char.id} character={char} />
            ))
          ) : (
            <p style={{ color: '#94a3b8', textAlign: 'center', gridColumn: '1 / -1' }}>
              No se encontraron personajes que coincidan con "{searchTerm}".
            </p>
          )}
        </div>
      </main>
    </div>
  );
}

export default App;