import { updateUser } from "../indexFunctions/register-login/auth.js";




//Sección para coger datos generales

const myAccount = document.getElementById('myAccount');


const logOut = document.getElementById('logout');

const buttonSearchGame = document.getElementById('searchGame');

buttonSearchGame.addEventListener('click', (e) => {

    e.preventDefault();

    const inputSearch = document.getElementById('default-search');

    const value = inputSearch.value;

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



                const p = document.createElement('p');
                p.textContent = "ESRB Rating" + " " + game.esrb_rating;
                p.style.fontFamily = "play";
                p.style.color = "white";
                p.style.fontSize = "70%";



                div.appendChild(img);
                div.appendChild(h2);

                divDetails.appendChild(p);
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




document.addEventListener('DOMContentLoaded', () => {

    getGames();
    const h1Title = document.getElementById('welcome-user');
    h1Title.textContent = 'WELCOME ' + user.username;

    const imageSrc = document.getElementById('img-data-user');
    imageSrc.src = user.avatar;

})





function getGames() {
    const divContent = document.getElementById('welcome-Games-content');

    const loaderWrapper = document.createElement('div');
    loaderWrapper.style.gridColumn = '1 / -1'; // Ocupar todas las columnas
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
    loaderWrapper.appendChild(loader)
    divContent.appendChild(loaderWrapper);


    fetch('getGames/mostrarAll')
        .then(response => {

            if (!response.ok) {

                throw new Error("Error while loading games");

            }

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



                const p = document.createElement('p');
                p.textContent = "ESRB Rating" + " " + game.esrb_rating;
                p.style.fontFamily = "play";
                p.style.color = "white";
                p.style.fontSize = "70%";



                div.appendChild(img);
                div.appendChild(h2);

                divDetails.appendChild(p);
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
    img.id="avatarUser";
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