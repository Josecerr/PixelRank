import { updateUser } from "../indexFunctions/register-login/auth.js";






//Sección para coger datos generales y funciones


const myAccount = document.getElementById('myAccount');
const addFriends = document.getElementById('addFriends');
const myFriends = document.getElementById('myFriends');
const logOut = document.getElementById('logout');
const myLibrary = document.getElementById('myLibrary');
const pixelRank = document.getElementById('titleDashboard');

const user = document.getElementById('userLogged');

const buttonSearchGame = document.getElementById('searchGame');



export function initDashboard(user) {

    document.addEventListener('DOMContentLoaded', () => {



        const paramsPlatform = new URLSearchParams(window.location.search);
        const platform = paramsPlatform.get('platform');

        const params = new URLSearchParams(window.location.search);
        const search = params.get('search');

        const paramsGenres = new URLSearchParams(window.location.search);
        const genres = paramsGenres.get('genre');


        if (platform) {
            filterGamesByPlatform(platform);
        } else if (search) {
            buscarJuego(search);
        } else if (genres) {
            filterGamesByGenre(genres);
        } else {
            getGames();
        }

        const socket = io(); 
        window.currentUserId = user.id;
        window.socket = socket;
        const h1Title = document.getElementById('welcome-user');

        if (h1Title) {
            h1Title.textContent = 'WELCOME ' + user.username;
        }


        const imageSrc = document.getElementById('img-data-user');
        imageSrc.src = user.avatar;









        myAccount.addEventListener('click', () => {

            console.log(user);
            showMyAccount(user);


        })



    })


}
//Mostrar todos los juegos
function getGames() {
    // Logos



    const platformLogos = {
        pc: 'https://img.icons8.com/color/48/windows-10.png',
        playstation: 'https://img.icons8.com/color/48/play-station.png',
        xbox: 'https://img.icons8.com/fluency/48/xbox.png',
        android: 'https://img.icons8.com/color/48/android-os.png',
        mac: 'https://img.icons8.com/color/48/mac-logo.png',
        nintendo: 'https://img.icons8.com/color/48/nintendo-switch-handheld.png'
    };





    const divContent = document.getElementById('welcome-Games-content');

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

    fetch('getGames/mostrarAll')
        .then(response => {
            if (!response.ok) throw new Error("Error while loading games");
            return response.json();
        })
        .then(data => {
            divContent.innerHTML = '';

            data.forEach(game => {
                const div = document.createElement('div');
                div.id = 'cardVideogames';

                const img = document.createElement('img');
                img.id = 'images';
                img.src = game.background_image;

                const h2 = document.createElement('h2');
                h2.textContent = game.name;
                h2.id = 'cardVideogames-Title';

                const genres = document.createElement('p');
                genres.textContent = game.genres.map(g => g.name).join(', ');
                genres.style.color = "white";
                genres.style.textAlign = "center";
                genres.style.fontFamily = "play";


                const divDetails = document.createElement('div');
                divDetails.style.alignItems = "left";
                divDetails.style.width = "100%";
                divDetails.style.alignContent = "center";
                divDetails.style.alignItems = "center";
                divDetails.style.justifyContent = "center";
                divDetails.style.justifyItems = "center";

                const platformIconsDiv = document.createElement('div');
                platformIconsDiv.style.display = 'flex';
                platformIconsDiv.style.gap = '5px';
                platformIconsDiv.style.marginTop = '5px';

                if (game.parent_platforms) {
                    game.parent_platforms.forEach(p => {
                        const slug = p.platform.slug;
                        const logoUrl = platformLogos[slug];
                        if (logoUrl) {
                            const img = document.createElement('img');
                            img.src = logoUrl;
                            img.alt = p.platform.name;
                            img.style.width = '20px';
                            img.style.height = '20px';
                            img.style.objectFit = 'contain';
                            platformIconsDiv.appendChild(img);
                        }
                    });
                }


                const pRating = document.createElement('p');
                pRating.textContent = 'Loading rating...';
                pRating.style.color = '#ffc107'; // Amarillo tipo estrella
                pRating.style.fontWeight = 'bold';
                pRating.style.fontSize = '14px';
                pRating.style.padding = '6px 12px';
                pRating.style.background = 'rgba(0, 0, 0, 0.6)';
                pRating.style.border = '1px solid #ffc107';
                pRating.style.borderRadius = '10px';
                pRating.style.textAlign = 'center';
                pRating.style.marginTop = '8px';
                pRating.style.boxShadow = '0 0 5px #ffc107aa';



                fetch(`/users/rating/${game.id}`)
                    .then(res => res.json())
                    .then(data => {
                        if (data && data.average_rating !== null) {
                            pRating.textContent = `Rating ${parseFloat(data.average_rating).toFixed(1)} ⭐`;
                        } else {
                            divDetails.removeChild(pRating);
                            pRating.textContent = '';
                        }
                    })
                    .catch(() => {
                        pRating.textContent = 'Error loading rating';
                    });





                div.appendChild(img);
                div.appendChild(h2);

                divDetails.appendChild(platformIconsDiv);
                divDetails.appendChild(pRating);
                divDetails.appendChild(genres);
                div.appendChild(divDetails);

                divContent.appendChild(div);

                div.addEventListener('mouseover', () => {
                    div.style.cursor = 'pointer';
                });

                div.addEventListener('mouseout', () => {
                    div.style.cursor = 'default';
                });

                div.addEventListener('click', () => {
                    window.location.href = `/showGame?id=${game.id}`;
                });
            });
        });
}




//Para filtrar por plataformas
document.querySelectorAll('.platform-list li').forEach(item => {
    item.addEventListener('click', () => {
        const platform = item.getAttribute('data-platform');

        // Limpiar clases previas
        document.querySelectorAll('.platform-list li').forEach(li => {
            li.classList.remove('selected');
        });

        // Añadir clase al seleccionado
        item.classList.add('selected');

        // Mostrar texto seleccionado (opcional)
        const selectedPlatformText = document.getElementById('selected-platform');
        if (selectedPlatformText) {
            selectedPlatformText.textContent = `Selected platform: ${item.textContent.trim()}`;
        }

        // Llamar a tu función que filtra
        filterGamesByPlatform(platform);
        ;
    });
});

//Para filtrar por generos
document.querySelectorAll('.genre-list li').forEach(item => {
    item.addEventListener('click', () => {
        const genre = item.getAttribute('data-genre');

        // Elimina clase .selected de todos
        document.querySelectorAll('.genre-list li').forEach(li => {
            li.classList.remove('selected');
        });

        // Añade clase al actual
        item.classList.add('selected');

        // Filtra por género
        filterGamesByGenre(genre);

        // Mostrar el género seleccionado (opcional)
        const genreTitle = document.getElementById('selected-genre');
        if (genreTitle) {
            genreTitle.textContent = `Selected genre: ${item.textContent.trim()}`;
        }
    });
});





function filterGamesByPlatform(platform) {

    const divContent = document.getElementById('welcome-Games-content');
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





    const platformLogos = {
        pc: 'https://img.icons8.com/color/48/windows-10.png',
        playstation: 'https://img.icons8.com/color/48/play-station.png',
        xbox: 'https://img.icons8.com/fluency/48/xbox.png',
        android: 'https://img.icons8.com/color/48/android-os.png',
        mac: 'https://img.icons8.com/color/48/mac-logo.png',
        nintendo: 'https://img.icons8.com/color/48/nintendo-switch-handheld.png'
    };

    const dataBod = {

        platform: platform

    }
    const requestOptions = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(dataBod)
    };

    fetch('getGames/mostrarPorPlataformas', requestOptions)
        .then(response => {

            if (!response.ok) {

                throw new Error("Error showing by platforms");

            }

            return response.json();


        })
        .then(result => {
            const divContent = document.getElementById('welcome-Games-content');
            divContent.textContent = "";
            result.forEach(game => {

                const div = document.createElement('div');
                div.id = 'cardVideogames';

                const img = document.createElement('img');
                img.id = 'images';
                img.src = game.background_image;

                const h2 = document.createElement('h2');
                h2.textContent = game.name;
                h2.id = 'cardVideogames-Title';

                const genres = document.createElement('p');
                genres.textContent = game.genres.map(g => g.name).join(', ');
                genres.style.color = "white";
                genres.style.textAlign = "center";
                genres.style.fontFamily = "play";

                const divDetails = document.createElement('div');
                divDetails.style.alignItems = "left";
                divDetails.style.width = "100%";
                divDetails.style.alignContent = "center";
                divDetails.style.alignItems = "center";
                divDetails.style.justifyContent = "center";
                divDetails.style.justifyItems = "center";

                const platformIconsDiv = document.createElement('div');
                platformIconsDiv.style.display = 'flex';
                platformIconsDiv.style.gap = '5px';
                platformIconsDiv.style.marginTop = '5px';

                if (game.parent_platforms) {
                    game.parent_platforms.forEach(p => {
                        const slug = p.platform.slug;
                        const logoUrl = platformLogos[slug];
                        if (logoUrl) {
                            const img = document.createElement('img');
                            img.src = logoUrl;
                            img.alt = p.platform.name;
                            img.style.width = '20px';
                            img.style.height = '20px';
                            img.style.objectFit = 'contain';
                            platformIconsDiv.appendChild(img);
                        }
                    });
                }











                div.appendChild(img);
                div.appendChild(h2);

                divDetails.appendChild(platformIconsDiv);


                div.appendChild(divDetails);
                div.appendChild(genres);

                divContent.appendChild(div);

                div.addEventListener('mouseover', () => {
                    div.style.cursor = 'pointer';

                });

                div.addEventListener('mouseout', () => {
                    div.style.cursor = 'default';
                });

                div.addEventListener('click', () => {


                    window.location.href = `/showGame?id=${game.id}`;




                })

            });


        })







}
function filterGamesByGenre(genre) {

    const divContent = document.getElementById('welcome-Games-content');
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

    const platformLogos = {
        pc: 'https://img.icons8.com/color/48/windows-10.png',
        playstation: 'https://img.icons8.com/color/48/play-station.png',
        xbox: 'https://img.icons8.com/fluency/48/xbox.png',
        android: 'https://img.icons8.com/color/48/android-os.png',
        mac: 'https://img.icons8.com/color/48/mac-logo.png',
        nintendo: 'https://img.icons8.com/color/48/nintendo-switch-handheld.png'
    };

    const dataBod = {

        genre: genre

    }
    const requestOptions = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(dataBod)
    };

    fetch('getGames/filterByGenre', requestOptions)
        .then(response => {

            if (!response.ok) {

                throw new Error("Error getting games");

            }

            return response.json();

        })

        .then(result => {

            const divContent = document.getElementById('welcome-Games-content');
            divContent.textContent = "";
            result.forEach(game => {

                const div = document.createElement('div');
                div.id = 'cardVideogames';

                const img = document.createElement('img');
                img.id = 'images';
                img.src = game.background_image;

                const h2 = document.createElement('h2');
                h2.textContent = game.name;
                h2.id = 'cardVideogames-Title';


                const genres = document.createElement('p');
                genres.textContent = game.genres.map(g => g.name).join(', ');
                genres.style.color = "white";
                genres.style.textAlign = "center";
                genres.style.fontFamily = "play";

                const divDetails = document.createElement('div');
                divDetails.style.alignItems = "left";
                divDetails.style.width = "100%";
                divDetails.style.alignContent = "center";
                divDetails.style.alignItems = "center";
                divDetails.style.justifyContent = "center";
                divDetails.style.justifyItems = "center";

                const platformIconsDiv = document.createElement('div');
                platformIconsDiv.style.display = 'flex';
                platformIconsDiv.style.gap = '5px';
                platformIconsDiv.style.marginTop = '5px';

                if (game.parent_platforms) {
                    game.parent_platforms.forEach(p => {
                        const slug = p.platform.slug;
                        const logoUrl = platformLogos[slug];
                        if (logoUrl) {
                            const img = document.createElement('img');
                            img.src = logoUrl;
                            img.alt = p.platform.name;
                            img.style.width = '20px';
                            img.style.height = '20px';
                            img.style.objectFit = 'contain';
                            platformIconsDiv.appendChild(img);
                        }
                    });
                }



                const pRating = document.createElement('p');
                pRating.textContent = 'Loading rating...';
                pRating.style.color = '#ffc107'; // Amarillo tipo estrella
                pRating.style.fontWeight = 'bold';
                pRating.style.fontSize = '14px';
                pRating.style.padding = '6px 12px';
                pRating.style.background = 'rgba(0, 0, 0, 0.6)';
                pRating.style.border = '1px solid #ffc107';
                pRating.style.borderRadius = '10px';
                pRating.style.textAlign = 'center';
                pRating.style.marginTop = '8px';
                pRating.style.boxShadow = '0 0 5px #ffc107aa';



                fetch(`/users/rating/${game.id}`)
                    .then(res => res.json())
                    .then(data => {
                        if (data && data.average_rating !== null) {
                            pRating.textContent = `Rating ${parseFloat(data.average_rating).toFixed(1)} ⭐`;
                        } else {
                            divDetails.removeChild(pRating);
                            pRating.textContent = '';
                        }
                    })
                    .catch(() => {
                        pRating.textContent = 'Error loading rating';
                    });




                div.appendChild(img);
                div.appendChild(h2);

                divDetails.appendChild(platformIconsDiv);
                divDetails.appendChild(pRating);
                divDetails.appendChild(genres);


                div.appendChild(divDetails);


                divContent.appendChild(div);

                div.addEventListener('mouseover', () => {
                    div.style.cursor = 'pointer';

                });

                div.addEventListener('mouseout', () => {
                    div.style.cursor = 'default';
                });

                div.addEventListener('click', () => {


                    window.location.href = `/showGame?id=${game.id}`;




                })

            });


        })





}


pixelRank.addEventListener('mouseover', () => {

    pixelRank.style.cursor = 'pointer';

})

pixelRank.addEventListener('click', () => {

    window.location.href = "/dashboard";


})



buttonSearchGame.addEventListener('click', (e) => {

    e.preventDefault();
    const inputSearch = document.getElementById('default-search');

    const value = inputSearch.value;
    //Si el valor de busqueda existe, usamos la función, si no, "recargamos" página.
    if (value) {
        buscarJuego(value);
    } else {

        window.location.href = "/dashboard";

    }

})


function buscarJuego(value) {

    const divContent = document.getElementById('welcome-Games-content');
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





    const platformLogos = {
        pc: 'https://img.icons8.com/color/48/windows-10.png',
        playstation: 'https://img.icons8.com/color/48/play-station.png',
        xbox: 'https://img.icons8.com/fluency/48/xbox.png',
        android: 'https://img.icons8.com/color/48/android-os.png',
        mac: 'https://img.icons8.com/color/48/mac-logo.png',
        nintendo: 'https://img.icons8.com/color/48/nintendo-switch-handheld.png'
    };

    const dataBod = {

        nombreJuego: value

    }
    const requestOptions = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(dataBod)
    };

    fetch('getGames/busquedaJuego', requestOptions)
        .then(response => {

            if (!response.ok) {

                throw new Error("Error en la solicitud");

            }

            return response.json();

        })

        .then(result => {
            const divContent = document.getElementById('welcome-Games-content');
            divContent.textContent = "";
            result.forEach(game => {

                const div = document.createElement('div');
                div.id = 'cardVideogames';

                const img = document.createElement('img');
                img.id = 'images';
                img.src = game.background_image;

                const h2 = document.createElement('h2');
                h2.textContent = game.name;
                h2.id = 'cardVideogames-Title';


                const genres = document.createElement('p');
                genres.textContent = game.genres.map(g => g.name).join(', ');
                genres.style.color = "white";
                genres.style.textAlign = "center";
                genres.style.fontFamily = "play";

                const divDetails = document.createElement('div');
                divDetails.style.alignItems = "left";
                divDetails.style.width = "100%";
                divDetails.style.alignContent = "center";
                divDetails.style.alignItems = "center";
                divDetails.style.justifyContent = "center";
                divDetails.style.justifyItems = "center";

                const platformIconsDiv = document.createElement('div');
                platformIconsDiv.style.display = 'flex';
                platformIconsDiv.style.gap = '5px';
                platformIconsDiv.style.marginTop = '5px';

                if (game.parent_platforms) {
                    game.parent_platforms.forEach(p => {
                        const slug = p.platform.slug;
                        const logoUrl = platformLogos[slug];
                        if (logoUrl) {
                            const img = document.createElement('img');
                            img.src = logoUrl;
                            img.alt = p.platform.name;
                            img.style.width = '20px';
                            img.style.height = '20px';
                            img.style.objectFit = 'contain';
                            platformIconsDiv.appendChild(img);
                        }
                    });
                }



                const pRating = document.createElement('p');
                pRating.textContent = 'Loading rating...';
                pRating.style.color = '#ffc107'; // Amarillo tipo estrella
                pRating.style.fontWeight = 'bold';
                pRating.style.fontSize = '14px';
                pRating.style.padding = '6px 12px';
                pRating.style.background = 'rgba(0, 0, 0, 0.6)';
                pRating.style.border = '1px solid #ffc107';
                pRating.style.borderRadius = '10px';
                pRating.style.textAlign = 'center';
                pRating.style.marginTop = '8px';
                pRating.style.boxShadow = '0 0 5px #ffc107aa';



                fetch(`/users/rating/${game.id}`)
                    .then(res => res.json())
                    .then(data => {
                        if (data && data.average_rating !== null) {
                            pRating.textContent = `Rating ${parseFloat(data.average_rating).toFixed(1)} ⭐`;
                        } else {
                            divDetails.removeChild(pRating);
                            pRating.textContent = '';
                        }
                    })
                    .catch(() => {
                        pRating.textContent = 'Error loading rating';
                    });




                div.appendChild(img);
                div.appendChild(h2);

                divDetails.appendChild(platformIconsDiv);
                divDetails.appendChild(pRating);
                divDetails.appendChild(genres);


                div.appendChild(divDetails);


                divContent.appendChild(div);

                div.addEventListener('mouseover', () => {
                    div.style.cursor = 'pointer';

                });

                div.addEventListener('mouseout', () => {
                    div.style.cursor = 'default';
                });

                div.addEventListener('click', () => {


                    window.location.href = `/showGame?id=${game.id}`;




                })

            });


        })





}


//funciones página


function showMyAccount(user) {


    if (document.getElementById('modal-edit-account')) return;

    const modal = document.createElement('div');
    modal.id = "modal-edit-account";
    modal.style.position = 'fixed';
    modal.style.top = 0;
    modal.style.left = 0;
    modal.style.width = '100%';
    modal.style.height = '100vh';
    modal.style.display = 'flex';
    modal.style.flexDirection = 'column';
    modal.style.alignItems = 'center';
    modal.style.justifyContent = 'center';
    modal.style.backgroundColor = 'rgba(0,0,0,0.6)';
    modal.style.zIndex = '1000';

    const title = document.createElement('h1');
    title.textContent = "My Account";
    title.style.fontFamily = "'Pixelify Sans', sans-serif";
    title.style.color = 'white';
    title.style.marginBottom = '20px';
    title.style.textShadow = '1px 1px 4px black';
    title.style.fontSize = '4vh';

    const content = document.createElement('div');
    content.style.background = '#fff';
    content.style.padding = '30px';
    content.style.borderRadius = '20px';
    content.style.boxShadow = '0 5px 20px rgba(0,0,0,0.4)';
    content.style.width = '400px';
    content.style.display = 'flex';
    content.style.flexDirection = 'column';
    content.style.alignItems = 'center';
    content.style.gap = '15px';
    content.style.fontFamily = "'Play', sans-serif";
    content.style.position = 'relative';


    const form = document.createElement('form');
    form.style.display = 'flex';
    form.style.flexDirection = 'column';
    form.style.gap = '12px';
    form.style.width = '100%';

    const img = document.createElement('img');
    img.id = "avatarUser";
    img.src = user.avatar;
    img.style.width = '20%';
    img.style.height = '20%'


    const avatarLabel = document.createElement('label');
    avatarLabel.textContent = "Profile Picture:";
    const avatarInput = document.createElement('input');
    avatarInput.type = "file";
    avatarInput.name = "avatar";
    avatarInput.accept = "image/*";
    avatarInput.style.padding = '5px';

    // Username
    const usernameLabel = document.createElement('label');
    usernameLabel.textContent = "Username:";
    const usernameInput = document.createElement('input');
    usernameInput.type = "text";
    usernameInput.name = "username";
    usernameInput.required = true;
    usernameInput.value = user.username || "";
    usernameInput.style.padding = '10px';
    usernameInput.style.borderRadius = '8px';
    usernameInput.disabled = true
    usernameInput.textContent = user.username;



    // Error Message
    const errorMessage = document.createElement('div');
    errorMessage.style.color = 'red';
    errorMessage.style.fontSize = '14px';

    // Submit
    const submitBtn = document.createElement('button');
    submitBtn.type = 'submit';
    submitBtn.textContent = "Save Changes";
    submitBtn.style.padding = '10px';
    submitBtn.style.backgroundColor = 'black';
    submitBtn.style.color = 'white';
    submitBtn.style.border = 'none';
    submitBtn.style.borderRadius = '8px';
    submitBtn.style.cursor = 'pointer';

    submitBtn.addEventListener('mouseenter', () => {
        submitBtn.style.backgroundColor = '#002bff';
    });

    submitBtn.addEventListener('mouseleave', () => {
        submitBtn.style.backgroundColor = 'black';
    });

    submitBtn.addEventListener('click', (e) => {

        e.preventDefault();

        updateUser(user.id, avatarInput);


    })
    form.appendChild(img);
    form.appendChild(avatarInput);
    form.appendChild(usernameLabel);
    form.appendChild(usernameInput);
    form.appendChild(errorMessage);
    form.appendChild(submitBtn);


    // Cerrar
    const closeBtn = document.createElement('button');
    closeBtn.innerHTML = '&times;';
    closeBtn.style.position = 'absolute';
    closeBtn.style.top = '10px';
    closeBtn.style.right = '10px';
    closeBtn.style.background = 'transparent';
    closeBtn.style.border = 'none';
    closeBtn.style.fontSize = '28px';
    closeBtn.style.cursor = 'pointer';
    closeBtn.style.color = 'red';

    closeBtn.addEventListener('click', () => {
        document.body.removeChild(modal);
        document.body.style.overflow = 'auto';
    });

    content.appendChild(closeBtn);
    content.appendChild(form);

    modal.appendChild(title);
    modal.appendChild(content);

    document.body.appendChild(modal);


}




logOut.addEventListener('click', () => {

    logOutUser();

})

function logOutUser() {

    fetch('/users/logout')
        .then(() => {

            window.location.href = '/';
        })
        .catch((err) => {
            console.error('Error al cerrar sesión', err);
        });


}






addFriends.addEventListener('click', () => {

    searchFriendsByUsername();

});

function searchFriendsByUsername() {
    if (document.getElementById('modal-add-friends')) return;
    const modal = document.createElement('div');
    modal.id = "modal-add-friends";
    modal.style.position = 'fixed';
    modal.style.top = 0;
    modal.style.left = 0;
    modal.style.width = '100vw';
    modal.style.height = '100vh';
    modal.style.display = 'flex';
    modal.style.alignItems = 'center';
    modal.style.justifyContent = 'center';
    modal.style.backgroundColor = 'rgba(0, 0, 0, 0.6)';
    modal.style.zIndex = '1000';
    modal.style.padding = '5%';

    const title = document.createElement('h1');
    title.textContent = "Add Friends";
    title.style.fontFamily = "'Pixelify Sans', sans-serif";
    title.style.color = 'black';
    title.style.marginBottom = '2vh';
    title.style.textShadow = '1px 1px 4px black';
    title.style.fontSize = '3.5vh';

    const content = document.createElement('div');
    content.style.background = '#fff';
    content.style.padding = '4%';
    content.style.borderRadius = '15px';
    content.style.boxShadow = '0 5px 20px rgba(0, 0, 0, 0.4)';
    content.style.width = '90%';
    content.style.maxWidth = '500px';
    content.style.height = '70vh';
    content.style.display = 'flex';
    content.style.flexDirection = 'column';
    content.style.alignItems = 'center';
    content.style.gap = '2vh';
    content.style.fontFamily = "'Play', sans-serif";
    content.style.position = 'relative';
    content.style.overflow = 'hidden';

    // Input de búsqueda
    const input = document.createElement('input');
    input.type = 'text';
    input.placeholder = 'Search by username...';
    input.style.padding = '1.5vh';
    input.style.width = '100%';
    input.style.borderRadius = '8px';
    input.style.border = '1px solid #ccc';
    input.style.fontSize = '2vh';

    // Contenedor de resultados simulados
    const results = document.createElement('div');
    results.style.width = '100%';
    results.style.flex = '1'; // Ocupa el espacio restante
    results.style.overflowY = 'auto';
    results.style.display = 'flex';
    results.style.flexDirection = 'column';
    results.style.gap = '1.5vh';
    results.style.paddingRight = '0.5rem';

    input.addEventListener('input', () => {
        const query = input.value.trim();

        if (query.length < 2) return;

        fetch(`/users/search?username=${encodeURIComponent(query)}`)
            .then(response => {
                if (!response.ok) throw new Error("Error buscando usuarios");
                return response.json();
            })
            .then(users => {
                results.innerHTML = '';

                if (users.length === 0) {
                    const noRes = document.createElement('p');
                    noRes.textContent = 'No users found.';
                    results.appendChild(noRes);
                    return;
                }

                users.forEach(u => {

                    const userDiv = document.createElement('div');
                    userDiv.style.display = 'flex';
                    userDiv.style.justifyContent = 'space-between';
                    userDiv.style.alignItems = 'center';
                    userDiv.style.borderBottom = '1px solid #ddd';
                    userDiv.style.padding = '5px 0';


                    const infoContainer = document.createElement('div');
                    infoContainer.style.display = 'flex';
                    infoContainer.style.alignItems = 'center';
                    infoContainer.style.gap = '10px';


                    const avatarImg = document.createElement('img');
                    avatarImg.src = u.avatar;
                    avatarImg.alt = `${u.username}'s avatar`;
                    avatarImg.style.width = '40px';
                    avatarImg.style.height = '40px';
                    avatarImg.style.borderRadius = '50%';
                    avatarImg.style.objectFit = 'cover';


                    const userInfo = document.createElement('span');
                    userInfo.textContent = `${u.username} (${u.email})`;

                    infoContainer.appendChild(avatarImg);
                    infoContainer.appendChild(userInfo);


                    const addBtn = document.createElement('button');
                    addBtn.textContent = 'Add';
                    addBtn.style.padding = '5px 10px';
                    addBtn.style.backgroundColor = '#3498db';
                    addBtn.style.color = '#fff';
                    addBtn.style.border = 'none';
                    addBtn.style.borderRadius = '5px';
                    addBtn.style.cursor = 'pointer';

                    addBtn.addEventListener('click', () => {

                        sendFriendship(u.id, addBtn);


                    });

                    userDiv.appendChild(infoContainer);
                    userDiv.appendChild(addBtn);
                    results.appendChild(userDiv);
                });
            })
            .catch(err => {
                console.error(err);
            });
    });



    // Botón cerrar
    const closeBtn = document.createElement('button');
    closeBtn.innerHTML = '&times;';
    closeBtn.style.position = 'absolute';
    closeBtn.style.top = '10px';
    closeBtn.style.right = '10px';
    closeBtn.style.background = 'transparent';
    closeBtn.style.border = 'none';
    closeBtn.style.fontSize = '28px';
    closeBtn.style.cursor = 'pointer';
    closeBtn.style.color = 'red';
    closeBtn.addEventListener('click', () => {
        document.body.removeChild(modal);
        document.body.style.overflow = 'auto';
    });
    content.appendChild(title);
    content.appendChild(closeBtn);
    content.appendChild(input);
    content.appendChild(results);


    modal.appendChild(content);
    document.body.appendChild(modal);



}

function sendFriendship(userFriendID, addBtn) {

    const dataBod = {
        userFriendID: userFriendID


    }

    const requestOptions = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(dataBod)
    };


    fetch('/users/sendFriendship', requestOptions)
        .then(response => {

            if (!response.ok) {

                throw new Error("Error en la solicitud");

            }

            return response.json();

        })
        .then(data => {
            if (data.success) {

                addBtn.disabled = true;
                addBtn.textContent = 'Sent';

            }

        })


}

myFriends.addEventListener('click', () => {

    showFriend();

})

function showFriend() {

    if (document.getElementById('modal-add-friends')) return;


    const modal = document.createElement('div');
    modal.id = "modal-add-friends";
    modal.style.position = 'fixed';
    modal.style.top = 0;
    modal.style.left = 0;
    modal.style.width = '100vw';
    modal.style.height = '100vh';
    modal.style.display = 'flex';
    modal.style.alignItems = 'center';
    modal.style.justifyContent = 'center';
    modal.style.backgroundColor = 'rgba(0, 0, 0, 0.6)';
    modal.style.zIndex = '1000';
    modal.style.padding = '5%';

    const content = document.createElement('div');
    content.style.background = '#fff';
    content.style.padding = '4%';
    content.style.borderRadius = '15px';
    content.style.boxShadow = '0 5px 20px rgba(0, 0, 0, 0.4)';
    content.style.width = '90%';
    content.style.maxWidth = '500px';
    content.style.height = '70vh';
    content.style.display = 'flex';
    content.style.flexDirection = 'column';
    content.style.alignItems = 'center';
    content.style.gap = '2vh';
    content.style.fontFamily = "'Play', sans-serif";
    content.style.position = 'relative';
    content.style.overflowY = 'auto';

    const title = document.createElement('h1');
    title.textContent = "My friends";
    title.style.fontFamily = "'Pixelify Sans', sans-serif";
    title.style.color = 'black';
    title.style.marginBottom = '2vh';
    title.style.textShadow = '1px 1px 4px black';
    title.style.fontSize = '3.5vh';
    content.appendChild(title);

    fetch('/users/getFriends')
        .then(response => {
            if (!response.ok) {
                throw new Error("Error getting friends");
            }
            return response.json();
        })
        .then(result => {
            //Los filtro 
            const solicitudesPendientes = result.filter(r => r.estado === 'pendiente');
            const amigosAceptados = result.filter(r => r.estado === 'aceptado');

            if (solicitudesPendientes.length > 0) {
                const pendientesTitle = document.createElement('h3');
                pendientesTitle.textContent = "Solicitudes pendientes";
                pendientesTitle.style.marginTop = '20px';
                pendientesTitle.style.alignSelf = 'flex-start';
                pendientesTitle.style.color = '#f0ad4e';
                pendientesTitle.style.fontSize = '1.1rem';
                content.appendChild(pendientesTitle);

                solicitudesPendientes.forEach(user => {
                    const userCard = createUserCard(user);
                    content.appendChild(userCard);
                });
            }

            if (amigosAceptados.length > 0) {
                const amigosTitle = document.createElement('h3');
                amigosTitle.textContent = "Amigos";
                amigosTitle.style.marginTop = '20px';
                amigosTitle.style.alignSelf = 'flex-start';
                amigosTitle.style.color = '#5cb85c';
                amigosTitle.style.fontSize = '1.1rem';
                content.appendChild(amigosTitle);

                amigosAceptados.forEach(user => {
                    const userCard = createUserCardAccepted(user);

                    userCard.addEventListener('mouseover', () => {

                        userCard.style.cursor = 'pointer';

                    })

                    userCard.addEventListener('click', () => {

                        showOthersLibrary(user);


                    })

                    content.appendChild(userCard);
                });
            }
        });

    const closeBtn = document.createElement('button');
    closeBtn.innerHTML = '&times;';
    closeBtn.style.position = 'absolute';
    closeBtn.style.top = '10px';
    closeBtn.style.right = '10px';
    closeBtn.style.background = 'transparent';
    closeBtn.style.border = 'none';
    closeBtn.style.fontSize = '28px';
    closeBtn.style.cursor = 'pointer';
    closeBtn.style.color = 'red';
    closeBtn.addEventListener('click', () => {
        document.body.removeChild(modal);
        document.body.style.overflow = 'auto';
    });
    content.appendChild(closeBtn);

    modal.appendChild(content);
    document.body.appendChild(modal);

    function createUserCard(result) {
        const userDiv = document.createElement('div');
        userDiv.style.display = 'flex';
        userDiv.style.justifyContent = 'space-between';
        userDiv.style.alignItems = 'center';
        userDiv.style.borderBottom = '1px solid #ddd';
        userDiv.style.padding = '5px 0';
        userDiv.style.width = '100%';

        const infoContainer = document.createElement('div');
        infoContainer.style.display = 'flex';
        infoContainer.style.alignItems = 'center';
        infoContainer.style.gap = '10px';

        const avatarImg = document.createElement('img');
        avatarImg.src = result.avatar;
        avatarImg.alt = `${result.username}'s avatar`;
        avatarImg.style.width = '40px';
        avatarImg.style.height = '40px';
        avatarImg.style.borderRadius = '50%';
        avatarImg.style.objectFit = 'cover';

        const userInfo = document.createElement('span');
        userInfo.textContent = `${result.username} (${result.email})`;

        const estadoBtn = document.createElement('button');
        estadoBtn.textContent = result.estado;
        estadoBtn.style.marginLeft = '10px';
        estadoBtn.style.padding = '4px 8px';
        estadoBtn.style.border = 'none';
        estadoBtn.style.borderRadius = '4px';
        estadoBtn.style.backgroundColor = result.estado === 'pendiente' ? '#f0ad4e' : '#eee';
        estadoBtn.style.color = result.estado === 'pendiente' ? 'white' : 'black';
        estadoBtn.style.cursor = 'default';

        estadoBtn.addEventListener('click', () => {

            acceptFriendShip(result.IDFriendship, estadoBtn);



        });

        const userInfoContainer = document.createElement('div');
        userInfoContainer.style.display = 'flex';
        userInfoContainer.style.alignItems = 'center';
        userInfoContainer.style.gap = '10px';

        userInfoContainer.appendChild(userInfo);
        userInfoContainer.appendChild(estadoBtn);

        infoContainer.appendChild(avatarImg);
        infoContainer.appendChild(userInfoContainer);
        userDiv.appendChild(infoContainer);

        return userDiv;
    }
    function createUserCardAccepted(result) {
        const userDiv = document.createElement('div');
        userDiv.style.display = 'flex';
        userDiv.style.justifyContent = 'space-between';
        userDiv.style.alignItems = 'center';
        userDiv.style.borderBottom = '1px solid #ddd';
        userDiv.style.padding = '5px 0';
        userDiv.style.width = '100%';

        const infoContainer = document.createElement('div');
        infoContainer.style.display = 'flex';
        infoContainer.style.alignItems = 'center';
        infoContainer.style.gap = '10px';

        const avatarImg = document.createElement('img');
        avatarImg.src = result.avatar;
        avatarImg.alt = `${result.username}'s avatar`;
        avatarImg.style.width = '40px';
        avatarImg.style.height = '40px';
        avatarImg.style.borderRadius = '50%';
        avatarImg.style.objectFit = 'cover';

        const userInfo = document.createElement('span');
        userInfo.textContent = `${result.username} (${result.email})`;

        const userInfoContainer = document.createElement('div');
        userInfoContainer.style.display = 'flex';
        userInfoContainer.style.alignItems = 'center';
        userInfoContainer.style.gap = '10px';

        userInfoContainer.appendChild(userInfo);

        infoContainer.appendChild(avatarImg);
        infoContainer.appendChild(userInfoContainer);
        userDiv.appendChild(infoContainer);


        const chatButton = document.createElement('button');
        chatButton.textContent = 'Chat';
        chatButton.style.padding = '6px 12px';
        chatButton.style.backgroundColor = '#007bff';
        chatButton.style.color = 'white';
        chatButton.style.border = 'none';
        chatButton.style.borderRadius = '6px';
        chatButton.style.cursor = 'pointer';


        chatButton.addEventListener('click', (e) => {
            e.stopPropagation();

            chatModal(result);

        });

        userDiv.appendChild(chatButton);

        return userDiv;
    }




}

function acceptFriendShip(IDFriendship, estadoBtn) {

    const dataBod = {

        IDFriendship: IDFriendship

    }

    const requestOptions = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(dataBod)
    };

    fetch('users/acceptFriendship', requestOptions)
        .then(response => {

            if (!response.ok) {

                throw new Error("Error accepting ");

            }

            return response.json();


        })
        .then(result => {

            const existingModal = document.getElementById('modal-add-friends');
            if (existingModal) {
                document.body.removeChild(existingModal);
            }

            showFriend();


        }).catch(err => {

            window.location.href = "error"

        })



}

function showOthersLibrary(user) {
    window.location.href = `/otherLibrary/usersLibrary?friendId=${user.id}`;
}



if (myLibrary) {
    myLibrary.addEventListener('click', () => {
        window.location.href = '/myLibrary';
    });
}

function chatModal(userFriend) {



    const existing = document.getElementById('modal-add-friends');
    if (existing) existing.remove();


    const overlay = document.createElement('div');
    overlay.id = 'chatModal';
    overlay.style.position = 'fixed';
    overlay.style.top = 0;
    overlay.style.left = 0;
    overlay.style.width = '100vw';
    overlay.style.height = '100vh';
    overlay.style.background = 'rgba(0,0,0,0.7)';
    overlay.style.display = 'flex';
    overlay.style.justifyContent = 'center';
    overlay.style.alignItems = 'center';
    overlay.style.zIndex = 1000;

    // Crear el contenedor del modal
    const modal = document.createElement('div');
    modal.style.width = '450px';
    modal.style.maxHeight = '80vh';
    modal.style.background = '#1e1e1e';
    modal.style.borderRadius = '12px';
    modal.style.overflow = 'hidden';
    modal.style.display = 'flex';
    modal.style.flexDirection = 'column';
    modal.style.boxShadow = '0 0 20px rgba(0,0,0,0.5)';
    modal.style.position = 'relative';

    // Cabecera del modal
    const header = document.createElement('div');
    header.style.display = 'flex';
    header.style.alignItems = 'center';
    header.style.padding = '15px';
    header.style.background = '#2a2a2a';

    const avatar = document.createElement('img');
    avatar.src = userFriend.avatar;
    avatar.style.width = '60px';
    avatar.style.height = '60px';
    avatar.style.borderRadius = '50%';
    avatar.style.objectFit = 'cover';
    avatar.style.marginRight = '15px';

    const username = document.createElement('h3');
    username.textContent = "Talking with " + userFriend.username;
    username.style.color = '#fff';
    username.style.margin = 0;

    header.appendChild(avatar);
    header.appendChild(username);

    // Contenedor de mensajes
    const messages = document.createElement('div');
    messages.id = 'chatMessages';
    messages.style.flex = 1;
    messages.style.overflowY = 'auto';
    messages.style.padding = '15px';
    messages.style.background = '#121212';
    messages.style.color = '#fff';
    messages.style.fontSize = '14px';

    // Controles de entrada
    const inputContainer = document.createElement('div');
    inputContainer.style.display = 'flex';
    inputContainer.style.padding = '10px';
    inputContainer.style.background = '#1e1e1e';

    const input = document.createElement('input');
    input.type = 'text';
    input.placeholder = 'Write a message...';
    input.style.flex = 1;
    input.style.padding = '10px';
    input.style.border = 'none';
    input.style.borderRadius = '6px';
    input.style.marginRight = '10px';
    input.style.background = '#2a2a2a';
    input.style.color = '#fff';

    const sendBtn = document.createElement('button');
    sendBtn.textContent = 'Send';
    sendBtn.style.padding = '10px 15px';
    sendBtn.style.background = '#4caf50';
    sendBtn.style.color = '#fff';
    sendBtn.style.border = 'none';
    sendBtn.style.borderRadius = '6px';
    sendBtn.style.cursor = 'pointer';

    inputContainer.appendChild(input);
    inputContainer.appendChild(sendBtn);

    // Botón para cerrar
    const closeBtn = document.createElement('span');
    closeBtn.innerHTML = '&times;';
    closeBtn.style.position = 'absolute';
    closeBtn.style.top = '10px';
    closeBtn.style.right = '15px';
    closeBtn.style.fontSize = '24px';
    closeBtn.style.color = '#fff';
    closeBtn.style.cursor = 'pointer';
    closeBtn.addEventListener('click', () => {
        overlay.remove();
    });

    // Montar todo
    modal.appendChild(header);
    modal.appendChild(messages);
    modal.appendChild(inputContainer);
    modal.appendChild(closeBtn);
    overlay.appendChild(modal);
    document.body.appendChild(overlay);




    // Enviar mensaje (lógica de socket se añade después)
    sendBtn.addEventListener('click', () => {
        const text = input.value.trim();
        if (text) {
            const p = document.createElement('p');
            p.textContent = `Tú: ${text}`;
            messages.appendChild(p);
            input.value = '';
            messages.scrollTop = messages.scrollHeight;

            // Emitimos el mensaje al servidor via socket
            if (window.socket && window.currentUserId) {
                window.socket.emit('privateMessage', {
                    from: window.currentUserId,
                    to: userFriend.id,
                    message: text
                });
            }
        }
    });

    if (window.socket && window.currentUserId) {
        window.socket.on(`messageTo:${window.currentUserId}`, ({ from, message }) => {
            if (from === userFriend.id) {
                const p = document.createElement('p');
                p.textContent = `${userFriend.username}: ${message}`;
                messages.appendChild(p);
                messages.scrollTop = messages.scrollHeight;
            }
        });
    }



}






export { showMyAccount, showFriend, logOutUser, searchFriendsByUsername }