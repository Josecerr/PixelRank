const express = require('express');
const router = express.Router();


router.get('/myLibrary', (req, res) => {
    if (!req.session.user) {
        return res.redirect('/'); // o redirige a /login si prefieres
    }

    res.render('myLibrary', { user: req.session.user }); // Pasa el usuario a la vista
});
  
// Asegúrate de exportar el router correctamente
module.exports = router;
