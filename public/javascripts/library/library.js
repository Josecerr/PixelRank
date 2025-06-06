import { showMyAccount } from "../dashboard/dashboard.js";
import { logOutUser } from "../dashboard/dashboard.js";
import { searchFriendsByUsername } from "../dashboard/dashboard.js";
import { showFriend } from "../dashboard/dashboard.js";

//Primero los botones principales

const myAccount = document.getElementById('myAccount');
const logOut = document.getElementById('logout');
const addFriends = document.getElementById('addFriends');
const myFriends = document.getElementById('myFriends');
const pixelRank = document.getElementById('titleDashboard');
const buttonSearchGame = document.getElementById('searchGame');



document.addEventListener('DOMContentLoaded', () => {

    const imageSrc = document.getElementById('img-data-user');
    imageSrc.src = user.avatar;


    showLibrary(user);

})

pixelRank.addEventListener('click', () => {

    window.location.href = "/dashboard";


})




myAccount.addEventListener('click', () => {

    showMyAccount(user);


})

logOut.addEventListener('click', () => {

    logOutUser();



})
myFriends.addEventListener('click', () => {

    showFriend();

})

addFriends.addEventListener('click', () => {


    searchFriendsByUsername();

})

buttonSearchGame.addEventListener('click', (e) => {



    e.preventDefault();

    const inputSearch = document.getElementById('default-search');

    const value = inputSearch.value;

    if (value) {

        window.location.href = `/dashboard?search=${encodeURIComponent(value)}`;
    } else {

        window.location.href = `/dashboard`;

    }

});


function showLibrary() {



    const divContent = document.getElementById('games-library');

    const loaderWrapper = document.createElement('div');
    loaderWrapper.style.gridColumn = '1 / -1';
    loaderWrapper.style.display = 'flex';
    loaderWrapper.style.justifyContent = 'center';
    loaderWrapper.style.height = '100%';

    const loader = document.createElement('div');
    loader.id = 'games-loader';
    loader.style.border = '6px solid #f3f3f3';
    loader.style.borderTop = '6px solid #3498db';
    loader.style.borderRadius = '50%';
    loader.style.width = '40px';
    loader.style.height = '40px';
    loader.style.animation = 'spin 1s linear infinite';
    loader.style.margin = '50px auto';
    loader.style.display = 'block';

    divContent.innerHTML = '';
    loaderWrapper.appendChild(loader);
    divContent.appendChild(loaderWrapper);


    fetch('/users/getLibrary')
        .then(response => {
            if (!response.ok) throw new Error('Error al obtener la biblioteca');
            return response.json();
        })
        .then(juegos => {
            const container = document.getElementById('games-library');
            container.innerHTML = ''; // Limpiar por si acaso

            // Elegir 4 juegos aleatorios con imagen
            const juegosConImagen = juegos.filter(j => j.background_image);
            const juegosAleatorios = juegosConImagen
                .sort(() => 0.5 - Math.random())
                .slice(0, 4);

            // Header con fondo de 4 juegos
            const header = document.createElement('div');
            header.className = 'library-header';
            header.innerHTML = `
          <div class="grid-images">
            ${juegosAleatorios.map(j => `
              <div class="grid-image" style="background-image: url('${j.background_image}')"></div>
            `).join('')}
          </div>
          <div class="header-overlay">
            <div class="header-content">
              <p>${juegos.length} GAMES</p>
              <h1>Your Library ${user.username}</h1>
            </div>
          </div>
        `;
            container.appendChild(header);

            // Grid de los  juegos
            const juegosContainer = document.createElement('div');
            juegosContainer.className = 'library-grid';

            juegos.forEach(juego => {
                if (!juego.background_image) return;

                const card = document.createElement('div');
                card.className = 'game-card';
                card.innerHTML = `
            <img src="${juego.background_image}" alt="${juego.name}">
            <div class="game-info">
              <h3>${juego.name}</h3>
              <p>${juego.genres?.map(g => g.name).join(', ') || ''}</p>
            </div>
          `;

                card.addEventListener('click', () => {



                    window.location.href = `/showGame?id=${juego.id}`;


                })
                juegosContainer.appendChild(card);
            });

            container.appendChild(juegosContainer);
        })
        .catch(err => {
            console.error(err);
            window.location.href = "/error";
        });
}



