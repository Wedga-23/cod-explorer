import axios from "axios";

const BASE_URL = "https://api.rawg.io/api";
const API_KEY = import.meta.env.VITE_RAWG_API_KEY;

const rawgClient = axios.create({
  baseURL: BASE_URL,
  timeout: 8000,
});

export async function fetchGearsGames(query = "", signal) {
  try {
    const searchTerm = query ? `gears of war ${query}` : "gears of war";
    const response = await rawgClient.get("/games", {
      signal,
      params: {
        key: API_KEY,
        search: searchTerm,
        page_size: 20,
        search_exact: false,
      },
    });

    const results = response.data.results || [];
    return results.filter((game) =>
      game.name.toLowerCase().includes("gears")
    );
  } catch (error) {
    if (axios.isCancel(error) || error.name === "CanceledError") {
      throw error;
    }
    if (error.response) {
      throw new Error(`Error del servidor: ${error.response.status}`, { cause: error });
    } else if (error.request) {
      throw new Error("No se pudo conectar con el servidor. Revisa tu conexión.", { cause: error });
    } else {
      throw new Error("Ocurrió un error inesperado al buscar los juegos.", { cause: error });
    }
  }
}

export async function fetchGameDetail(id) {
  try {
    const [detailRes, screenshotsRes] = await Promise.all([
      rawgClient.get(`/games/${id}`, { params: { key: API_KEY } }),
      rawgClient.get(`/games/${id}/screenshots`, { params: { key: API_KEY } })
    ]);
    return {
      ...detailRes.data,
      screenshots: screenshotsRes.data.results || []
    };
  } catch (error) {
    throw new Error("No se pudo obtener la información detallada del juego.", { cause: error });
  }
}