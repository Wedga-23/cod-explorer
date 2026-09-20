import { useEffect, useState } from 'react';
import { Navbar } from './components/Navbar';
import { SearchBar } from './components/SearchBar';
import { GameCard } from './components/GameCard';

function App() {
  const [games, setGames] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  const API_KEY = import.meta.env.VITE_RAWG_API_KEY;

  // Carga inicial al montar el componente
  useEffect(() => {
    fetch(`https://api.rawg.io/api/games?key=${API_KEY}&page_size=9`)
      .then((res) => res.json())
      .then((data) => {
        setGames(data.results || []);
        setLoading(false);
      })
      .catch((err) => {
        console.error('Error al cargar juegos:', err);
        setLoading(false);
      });
  }, [API_KEY]);

  // Función para realizar la búsqueda manual
  const handleSearch = () => {
    setLoading(true);
    const searchParam = searchTerm ? `&search=${encodeURIComponent(searchTerm)}` : '';
    fetch(`https://api.rawg.io/api/games?key=${API_KEY}&page_size=9${searchParam}`)
      .then((res) => res.json())
      .then((data) => {
        setGames(data.results || []);
        setLoading(false);
      })
      .catch((err) => {
        console.error('Error al buscar juegos:', err);
        setLoading(false);
      });
  };

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#f3f4f6' }}>
      <Navbar />
      <main style={{ padding: '0 20px 20px', maxWidth: '1200px', margin: '0 auto' }}>
        <SearchBar
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          onSearch={handleSearch}
        />

        {loading ? (
          <p>Cargando videojuegos...</p>
        ) : (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))', gap: '20px' }}>
            {games.map((game) => (
              <GameCard key={game.id} game={game} />
            ))}
          </div>
        )}
      </main>
    </div>
  );
}

export default App;