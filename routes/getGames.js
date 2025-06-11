const express = require('express');
const router = express.Router();
const rawgApi = require('../public/services/rawgApi');
const connBBDD = require('../dao/connBBDD');

router.get('/mostrar', async (req, res) => {
  try {
    const juegos = await rawgApi.obtenerJuegos();
    res.json(juegos);
  } catch (err) {
    res.status(500).json({ error: 'No se pudo obtener los juegos' });
  }
});

router.get('/mostrarAll', async (req, res) => {


  try {
    const juegos = await rawgApi.obtenerAllGames();
    res.json(juegos);
  } catch (err) {
    res.status(500).json({ error: 'No se pudo obtener los juegos' });
  }
});

router.post('/mostrarScreenshots', async (req, res) => {

  try {
    const { gameId } = req.body;

    const screenShots = await rawgApi.obtenerScreenshots(gameId);

    res.json(screenShots);

  } catch (err) {

    res.status(500).json({ error: 'No se pudo obtener los screenshots' });

  }

});

router.post('/mostrarTrailers', async (req, res) => {

  try {
    const { gameId } = req.body;

    const trailers = await rawgApi.obtenerTrailers(gameId);

    res.json(trailers);
  } catch (err) {

    res.status(500).json({ error: 'No se pudo obtener los trailers' });

  }

})

router.post('/busquedaJuego', async (req, res) => {
  console.log('Body recibido:', req.body);
  const { nombreJuego } = req.body;

  try {

    const result = await rawgApi.obtenerJuegoPorNombre(nombreJuego);

    res.json(result);

  } catch (err) {

    res.status(500).json({ error: 'No se pudo obtener el juego' });

  }


})





router.post('/obtenerResenas', async (req, res) => {

  const { gameId } = req.body;

  try {

    const result = await connBBDD.getReviews(gameId);

    res.json(result);


  } catch (err) {

    res.status(500).json({ error: 'Error obteniendo reseñas' });

  }


})

router.post('/mostrarPorPlataformas', async (req, res) => {
  const { platform } = req.body;

  try {
    const juegos = await rawgApi.obtenerJuegosPorPlataforma(platform);
    res.json(juegos);
  } catch (error) {
    res.status(500).json({ error: 'No se pudieron obtener los juegos por plataforma' });
  }
});

router.post('/filterByGenre', async (req, res) => {

  const { genre } = req.body;

  try{

    const result = await rawgApi.obtenerJuegosPorGenero(genre);

    res.json(result);

  }catch(error){

    res.status(500).json({ error: 'No se pudieron obtener los juegos por plataforma' })

  }



})

module.exports = router;
