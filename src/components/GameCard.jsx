export function GameCard({ game }) {
  return (
    <div style={{ border: '1px solid #ccc', borderRadius: '8px', padding: '10px', backgroundColor: '#fff' }}>
      <img
        src={game.background_image || 'https://via.placeholder.com/300x150?text=No+Image'}
        alt={game.name}
        style={{ width: '100%', height: '150px', objectFit: 'cover', borderRadius: '4px' }}
      />
      <h3 style={{ margin: '10px 0 5px' }}>{game.name}</h3>
      <p style={{ margin: 0 }}>Rating: ⭐ {game.rating}</p>
    </div>
  );
}