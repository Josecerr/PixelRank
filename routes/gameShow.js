const express = require('express');
const router = express.Router();

const { obtenerJuegoPorId }=require ('../public/services/rawgApi.js');

router.get('/', async (req, res) => {
    const gameId = req.query.id;
  
    try {
      const gameData = await obtenerJuegoPorId(gameId);
      res.render('showGame', { game: gameData }); 
    } catch (error) {
      res.status(500).send('Error al obtener los datos del juego');
    }
  });

module.exports = router;
