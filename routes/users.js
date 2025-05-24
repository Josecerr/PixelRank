const express = require('express');
const router = express.Router();
const connBBDD = require('../dao/connBBDD');
const bcrypt = require('bcrypt');

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

        req.session.user=user;

        
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
        cb(null, 'public/images/uploads/');
    },
    filename: (req, file, cb) => {
        const uniqueName = Date.now() + '-' + file.originalname;
        cb(null, uniqueName);
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

router.get('/logout', async (req, res) => {
    
    res.render('index.ejs');

});



module.exports = router;
