const express = require('express');
const router = express.Router();

// Definir la ruta para /dashboard
router.get('/', (req, res) => {
    if (!req.session.user) {
        return res.redirect('/'); // o redirige a /login si prefieres
    }

    res.render('dashboard', { user: req.session.user }); // Pasa el usuario a la vista
});
  
// Asegúrate de exportar el router correctamente
module.exports = router;
