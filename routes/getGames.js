const express = require('express');
const router = express.Router();
const rawgApi = require('../public/services/rawgApi');

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
  }catch(err){

    res.status(500).json({error : 'No se pudo obtener los trailers'});

  }

})

router.post('/busquedaJuego', async(req,res)=>{
  console.log('Body recibido:', req.body); 
  const{nombreJuego}=req.body;

  try{

    const result=await rawgApi.obtenerJuegoPorNombre(nombreJuego);

    res.json(result);

  }catch(err){

    res.status(500).json({error : 'No se pudo obtener el juego'});

  }


})


module.exports = router;
