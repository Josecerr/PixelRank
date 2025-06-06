const express = require('express');
const router = express.Router();
const connBBDD = require('../dao/connBBDD');

router.get('/usersLibrary', async (req, res) => {
    const { friendId } = req.query;
    if (!req.session.user) return res.redirect('/');

    
    const userFriend = await connBBDD.getUserById(friendId); 

    res.render('othersLibrary', {
        user: req.session.user,
        userFriend: userFriend
    });
});


  
// Asegúrate de exportar el router correctamente
module.exports = router;
