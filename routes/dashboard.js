const express = require('express');
const router = express.Router();

// Definir la ruta para /dashboard
router.get('/', (req, res) => {
    res.render('dashboard');  // Aquí renderizas la vista dashboard
});

// Asegúrate de exportar el router correctamente
module.exports = router;
