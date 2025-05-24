const mysql = require('mysql2');
const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');




const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'pixelrank'
});

connection.connect((err) => {
  if (err) {
    console.error('Error al conectar a la base de datos:', err);
    return;
  }
  console.log('Conectado a la base de datos MySQL');
});


//Insertar usuario
const insertUser = (username, email, hashedPassword) => {

  const urlAvatar = "/images/no-user.webp";

  const sql = "INSERT INTO USERS (USERNAME,EMAIL,PASSWORD,avatar) VALUES(?,?,?,?)";

  return new Promise((resolve, reject) => {
    connection.query(sql, [username, email, hashedPassword, urlAvatar], (err, results) => {
      if (err) {
        //Si es error rechaza la promesa
        reject({
          error: "Error with the promise"

        });


      } else {
        //Si cumple, resuelve la promesa
        resolve(results);
      }
    })

  })


}

const getUserById = (userID) => {

  const sql = "SELECT avatar, username FROM USERS WHERE ID=?"

  return new Promise((resolve, reject) => {

    connection.query(sql, [userID], (err, results) => {

      if (err) {

        reject({

          error: "Error while getting data"

        })

      } else {

        resolve(results[0]);


      }

    });


  });


}

// Función para iniciar sesión
const loginUser = (email, password) => {
  const sql = "SELECT id,username,avatar,password FROM USERS WHERE EMAIL = ?";

  return new Promise((resolve, reject) => {

    connection.query(sql, [email], async (err, results) => {
      if (err) {
        reject({
          success: false,
          message: "Error while loggin"
        });
        return;
      }


      if (results.length === 0) {
        reject({
          success: false,
          message: "Email doesn't exist"
        });
        return;
      }

      // Usuario encontrado, comparamos las contraseñas
      const user = results[0];  // Obtenemos el primer usuario(unico por email xd)



      try {




        const isPasswordValid = await bcrypt.compare(password, user.password);


        if (isPasswordValid) {

          resolve({
            success: true,
            message: "Login completed",
            data: user
          });



        } else {

          reject({
            success: false,
            message: "Incorrect password"
          });
        }

      } catch (error) {
        reject({
          success: false,
          message: "Error, comparing passwords failed",
          error: error
        });
      }
    });
  });
};


const updateUser = (userId, avatarUrl) => {
  return new Promise((resolve, reject) => {
    const sql = `UPDATE users SET avatar = ? WHERE id = ?`;
    connection.query(sql, [avatarUrl, userId], (err, result) => {
      if (err) return reject(err);
      resolve(result);
    });
  });
};

const postReview = (review, userId, gameId, rating) => {

  return new Promise((resolve, reject) => {
    const sql = "INSERT INTO REVIEWS (USER_ID,RAWG_GAME_ID,RATING,COMMENT) VALUES (?,?,?,?)"
    connection.query(sql, [userId, gameId, rating, review], (err, result) => {
      if (err) return reject(err);
      resolve(result);


    })

  })


}

const getReviews = (gameId) => {

  return new Promise((resolve, reject) => {

    const sql = `
    SELECT 
      REVIEWS.rating, 
      REVIEWS.comment, 
      REVIEWS.created_at, 
      USERS.username, 
      USERS.avatar 
    FROM REVIEWS 
    JOIN USERS ON REVIEWS.user_id = USERS.id 
    WHERE REVIEWS.rawg_game_id = ?
    ORDER BY REVIEWS.created_at DESC
  `;
    connection.query(sql, [gameId], (err, result) => {

      if (err) return reject(err);
      resolve(result);

    })

  })


}

module.exports = { connection, insertUser, loginUser, getUserById, updateUser, postReview, getReviews }