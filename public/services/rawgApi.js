const axios = require('axios');

const RAWG_API_KEY = '7e8df08fa55b498683acd52e4bcdfe90';
const BASE_URL = 'https://api.rawg.io/api';


//Metodo para obtener juegos


async function obtenerJuegos() {
  try {
    const response = await axios.get(`${BASE_URL}/games`, {
      params: {
        key: RAWG_API_KEY,
        page_size: 8

      }
    });
    console.log('Respuesta completa:', response.data);
    console.log('Resultados:', response.data.results);
    return response.data.results;
  } catch (error) {
    console.error('Error al conectarse a RAWG:', error.message);
    throw error;
  }
}
//Metodo para obtener mas de 8 juegos
async function obtenerAllGames() {
  try {
    const response = await axios.get(`${BASE_URL}/games`, {
      params: {
        key: RAWG_API_KEY,
        page_size: 100
      }
    });
    //depuración
    console.log('Respuesta completa:', response.data);
    console.log('Resultados:', response.data.results);
    return response.data.results;
  } catch (error) {
    console.error('Error al conectarse a RAWG:', error.message);
    throw error;
  }
}

async function obtenerJuegoPorId(id) {
  try {
    const response = await axios.get(`${BASE_URL}/games/${id}`, {
      params: {
        key: RAWG_API_KEY
      }
    });
    return response.data;
  } catch (error) {
    console.error(`Error al obtener el juego con ID ${id}:`, error.message);
    throw error;
  }
}

async function obtenerScreenshots(id) {
  try {
    const response = await axios.get(`${BASE_URL}/games/${id}/screenshots`, {
      params: { key: RAWG_API_KEY }
    });
    return response.data.results;
  } catch (error) {
    console.error(`Error al obtener screenshots del juego ${id}:`, error.message);
    throw error;
  }
}

async function obtenerTrailers(id) {

  try {
    const response = await axios.get(`${BASE_URL}/games/${id}/movies`, {
      params: { key: RAWG_API_KEY }
    });
    return response.data.results;



  } catch (error) {
    console.error(`Error al obtener trailer ${id}:`, error.message);
    throw error;

  }


}

async function obtenerJuegoPorNombre(nombreJuego) {
  try {
    const response = await axios.get(`${BASE_URL}/games`, {
      params: {
        key: RAWG_API_KEY,
        search: nombreJuego,
        exclude_additions: true
      }
    });

    console.log('RAWG result:', response.data.results);
    return response.data.results;

  } catch (error) {
    if (error.response) {
      console.error('Error de respuesta RAWG:', {
        status: error.response.status,
        data: error.response.data
      });
    } else if (error.request) {
      console.error('Sin respuesta de RAWG:', error.request);
    } else {
      console.error('Error al configurar la solicitud:', error.message);
    }

    throw error;
  }
}


module.exports = {
  obtenerJuegos,
  obtenerAllGames,
  obtenerJuegoPorId,
  obtenerScreenshots,
  obtenerTrailers,
  obtenerJuegoPorNombre
};
