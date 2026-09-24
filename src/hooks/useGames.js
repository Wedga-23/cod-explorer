import { useState, useEffect } from "react";
import { fetchGearsGames } from "../api/rawgApi";

export function useGames(searchQuery = "") {
  const [games, setGames] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const controller = new AbortController();

    const timeoutId = setTimeout(async () => {
      setLoading(true);
      setError(null);

      try {
        const data = await fetchGearsGames(searchQuery, controller.signal);
        setGames(data);
      } catch (err) {
        if (err.name !== "CanceledError" && err.code !== "ERR_CANCELED") {
          setError(err.message || "Error al cargar los juegos.");
        }
      } finally {
        setLoading(false);
      }
    }, 400);

    return () => {
      clearTimeout(timeoutId);
      controller.abort();
    };
  }, [searchQuery]);

  return { games, loading, error };
}
