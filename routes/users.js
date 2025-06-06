const express = require('express');
const router = express.Router();
const connBBDD = require('../dao/connBBDD');
const bcrypt = require('bcrypt');
const rawgApi = require('../public/services/rawgApi');

const multer = require('multer');
const path = require('path');
//Ruta para el log-in o register de un usuario


router.post('/register', async (req, res) => {
    const { username, email, password } = req.body;
    try {
        // Lógica para registrar el usuario en la base de datos

        const hashPassword = await bcrypt.hash(password, 10)

        const result = await connBBDD.insertUser(username, email, hashPassword);

        console.log(result);

        const userId = result.insertId;


        const user = await connBBDD.getUserById(userId);
        //Datos sencillos, no peligrosos
        req.session.user = {
            id: userId,
            email: user.email,
            username: user.username,
            avatar: user.avatar
        };


        res.json({ success: true, message: 'Usuario registrado exitosamente', user: user });


    } catch (error) {

        res.status(400).json(error);

    }
});




//Ruta para login de un usuario

router.post('/login', async (req, res) => {
    const { email, password } = req.body;  // Obtenemos los datos del cuerpo de la solicitud

    try {
        // Llamamos a la función loginUser que devolverá una promesa
        const result = await connBBDD.loginUser(email, password);

        const user = result.data;



        if (result.success) {

            req.session.user = {
                id: user.id,
                email: user.email,
                username: user.username,
                avatar: user.avatar
            };

            res.json({ success: true, message: 'Usuario logueado exitosamente', user: user });


        } else {
            // Manejar el caso cuando no se cumple la condición
            res.status(401).json({ message: "Email or password incorrect" });
        }
    } catch (error) {
        // En caso de error, enviar el mensaje de error al cliente
        res.status(400).json({ message: error.message });
    }
});

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'public/images/uploads');
    },
    filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, uniqueSuffix + path.extname(file.originalname)); // nombre único por archivo, para no duplicados
    }
});

const upload = multer({ storage });

router.post('/update', upload.single('avatar'), async (req, res) => {
    try {
        const { userId } = req.body;

        if (!userId) {
            return res.status(400).json({ success: false, message: 'Falta userId' });
        }

        let avatarUrl = null;

        if (req.file) {
            avatarUrl = `/images/uploads/${req.file.filename}`; //Ruta donde guardaré todo
        }

        const result = await connBBDD.updateUser(userId, avatarUrl);

        if (result.affectedRows === 0) {
            return res.status(404).json({ success: false, message: 'Usuario no encontrado' });
        }
        req.session.user.avatar = avatarUrl;

        res.json({ success: true, message: 'Avatar actualizado', avatar: avatarUrl });

    } catch (error) {
        console.error('Error en /update:', error);
        res.status(500).json({ success: false, message: 'Error interno del servidor' });
    }
});
router.get('/profile', (req, res) => {
    if (!req.session.user) {

        return res.status(401).json({ success: false, message: 'No autorizado' });
    }
    res.json({ success: true, user: req.session.user });
});

router.post('/postReview', async (req, res) => {
    const { review, userId, gameId, rating } = req.body;

    const result = await connBBDD.postReview(review, userId, gameId, rating);

    if (result.affectedRows === 0) {

        res.status(401).json({ error: "Error posting the review" });

    }

    res.json({ success: true });


})

router.get('/logout', async (req, res) => {

    req.session.destroy((err) => {
        if (err) {
            console.error('Error al cerrar sesión:', err);
            return res.status(500).send('Error al cerrar sesión');
        }
        res.redirect('/');
    });

});

router.get('/search', async (req, res) => {
    const { username } = req.query;

    if (!username || username.length < 2) {
        return res.status(400).json({ message: 'Username too short or missing' });
    }

    try {

        const miId = req.session.user.id;

        const users = await connBBDD.searchFriends(username, miId);
        res.json(users);
    } catch (error) {
        console.error('Error searching users:', error);
        res.status(500).json({ message: 'Server error' });
    }
});

router.post('/sendFriendship', async (req, res) => {
    const { userFriendID } = req.body;

    const myID = req.session.user.id;
    try {

        const result = await connBBDD.addFriendship(userFriendID, myID);

        res.json({ success: true, result });

    } catch (error) {

        console.error('Error adding friend:', error);
        res.status(500).json({ message: 'Server error' });

    }


})

router.get('/getFriends', async (req, res) => {

    const myID = req.session.user.id;

    try {

        const result = await connBBDD.getFriends(myID);

        res.json(result);


    } catch (error) {

        console.error('Error getting friends:', error);
        res.status(500).json({ message: 'Server error' });

    }

})

router.post('/acceptFriendship', async (req, res) => {

    const { IDFriendship } = req.body;

    try {

        const result = await connBBDD.acceptFriend(IDFriendship)

        res.json(result);


    } catch (error) {

        console.error('Error getting friends:', error);
        res.status(500).json({ message: 'Server error' });
        res.render(error);

    }


});

router.post('/addToLibrary', async (req, res) => {
    try {
        const { gameID, status } = req.body;
        const userID = req.session.user.id;

        const result = await connBBDD.addToLibrary(userID, gameID, status);

        res.json({
            success: true,
            message: 'Game added to library successfully',
            data: result
        });

    } catch (error) {
        res.status(500).render('error', { message: 'Error interno del servidor' });

    }
});

router.post('/verifyLibrary', async (req, res) => {

    try {
        const { gameID } = req.body;
        const userID = req.session.user.id;

        const data = await connBBDD.verifyGameLibrary(userID, gameID);

        const exist = data.length > 0;

        res.json({
            success: true,
            message: 'Game exists',
            data: exist
        });


    } catch (error) {



    }



})

router.get('/getLibrary', async (req, res) => {


    try {

        const userID = req.session.user.id;

        const result = await connBBDD.getLibrary(userID);

        const juegos = [];

        for (const { game_id, status } of result) {
            const juego = await rawgApi.obtenerJuegoPorId(game_id);
            if (juego) {
                juegos.push({ ...juego, status });
            }
        }

        res.json(juegos);


    } catch (error) {

        res.status(500).render('error', { message: 'Error interno del servidor' });


    }





})


router.get('/getLibraryOthers', async (req, res) => {


    try {

        const userID = req.query.id;

        const result = await connBBDD.getLibrary(userID);

        const juegos = [];

        for (const { game_id, status } of result) {
            const juego = await rawgApi.obtenerJuegoPorId(game_id);
            if (juego) {
                juegos.push({ ...juego, status });
            }
        }

        res.json(juegos);


    } catch (error) {

        res.status(500).render('error', { message: 'Error interno del servidor' });


    }





})


router.post('/updateStatusCompleted', async (req, res) => {

    try {

        const { juegoID } = req.body;

        const userID = req.session.user.id;

        const result = await connBBDD.updateStatusDelete(userID, juegoID);


        res.json(result);



    } catch (error) {

        res.status(500).json('error', { message: 'Error updating status' });

    }


})

router.post('/updateStatus', async (req, res) => {

    try {

        const { juegoID, status } = req.body;

        const userID = req.session.user.id;

        const result= await connBBDD.updateStatus(userID,juegoID,status);

        res.json(result);



    } catch (error) {

        res.status(500).json('error', { message: 'Error updating status' });

    }



})


module.exports = router;
