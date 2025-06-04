import { updateUser } from "../indexFunctions/register-login/auth.js";




//Sección para coger datos generales y funciones

const myAccount = document.getElementById('myAccount');
const addFriends = document.getElementById('addFriends');
const myFriends = document.getElementById('myFriends');
const logOut = document.getElementById('logout');

const buttonSearchGame = document.getElementById('searchGame');

let currentPage = 1;
let isLoading = false;



document.addEventListener('DOMContentLoaded', () => {

    getGames();
    const h1Title = document.getElementById('welcome-user');
    h1Title.textContent = 'WELCOME ' + user.username;

    const imageSrc = document.getElementById('img-data-user');
    imageSrc.src = user.avatar;

})





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
                            img.style.width = '30px';
                            img.style.height = '30px';
                            img.style.objectFit = 'contain';
                            platformIconsDiv.appendChild(img);
                        }
                    });
                }






                div.appendChild(img);
                div.appendChild(h2);

                divDetails.appendChild(platformIconsDiv);


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


buttonSearchGame.addEventListener('click', (e) => {
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


    e.preventDefault();

    const inputSearch = document.getElementById('default-search');

    const value = inputSearch.value;

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
                            img.style.width = '30px';
                            img.style.height = '30px';
                            img.style.objectFit = 'contain';
                            platformIconsDiv.appendChild(img);
                        }
                    });
                }







          



                div.appendChild(img);
                div.appendChild(h2);

                divDetails.appendChild(platformIconsDiv);

   
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

})



//funciones 

myAccount.addEventListener('click', () => {


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
})

logOut.addEventListener('click', () => {

    fetch('users/logout')
        .then(() => {
            // Redirige al inicio o login después de cerrar sesión
            window.location.href = '/';
        })
        .catch((err) => {
            console.error('Error al cerrar sesión', err);
        });



})



addFriends.addEventListener('click', () => {
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
});

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


    fetch('users/sendFriendship', requestOptions)
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

    fetch('users/getFriends')
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
                    const userCard = createUserCard(user);
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
        .then(data => {


            showFriend();


        })



}