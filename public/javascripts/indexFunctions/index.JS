
//Importaciones de funciones:
import { registerProcess } from "./register-login/auth.js";
import { loginProcess } from "./register-login/auth.js";
//Biblioteca AOS
AOS.init({
    duration: 1200,

});

document.addEventListener("DOMContentLoaded", () => {

    writingContent();

})
const index = document.getElementById('index-init');
//Crearemos la función TypeWriting
function writingContent() {

    const divGeneral = document.getElementById('index-init');

    const content = document.createElement('div');
    content.id = 'title-content';

    const h1 = document.createElement('h1');
    h1.textContent = "Welcome to";
    h1.id="welcome-rank"

    const h3 = document.createElement('h3');
    h3.textContent = "PixelRank";
    h3.id = 'title-rank';

    content.appendChild(h1);

    content.appendChild(h3);

    divGeneral.appendChild(content);

    typeWriting();
    gameCards();
}




function typeWriting() {

    const content = document.getElementById('title-content');

    var contadorLetras = 0;

    var textoEscribir = "PixelRank is a platform that allows users to discover, explore, and learn about thousands of video games across all genres. Whether you're a casual player or a dedicated gamer, PixelRank helps you stay informed and connected to the world of gaming.";


    const datos = document.createElement('p');
    datos.id = 'content';


    content.appendChild(datos);

    var velocidad = 50;

    const button = document.createElement('button');
    button.textContent = "Get Started";
    button.classList.add("button-85");

    button.addEventListener('click', () => {

        registerModal();


    })
    content.appendChild(button);


    var intervalo = setInterval(function () {

        if (contadorLetras < textoEscribir.length) {

            datos.textContent += textoEscribir[contadorLetras];
            contadorLetras++;
        } else {
            clearInterval(intervalo);  // Detengo el intervalo si escribe todos los datos
        }
    }, velocidad);


}




function gameCards() {

    const divGeneralCards = document.createElement('div'); //Div que contendrá todos los videojuegos como tarjetas
    divGeneralCards.id = 'divGeneralCards';

    const divVideoGames = document.createElement('div');
    divVideoGames.id = 'divVideoGamesCards'
    divVideoGames.setAttribute('data-aos', 'fade-up')
    document.body.appendChild(divGeneralCards);


    const divSectionTitle = document.createElement('div');
    divSectionTitle.id = 'divGeneralCardsTitle';

    divGeneralCards.appendChild(divSectionTitle);
    divGeneralCards.appendChild(divVideoGames);

    const datos = document.createElement('h2');
    datos.id = 'content-discover'
    datos.setAttribute('data-aos', 'fade-up')

    var textoEscribir = "Discover more than 800.000 games!";

    var contadorLetras = 0;

    var velocidad = 50;

    divSectionTitle.appendChild(datos);

    var intervalo = setInterval(function () {

        if (contadorLetras < textoEscribir.length) {

            datos.textContent += textoEscribir[contadorLetras];
            contadorLetras++;
        } else {
            clearInterval(intervalo);  // Detengo el intervalo si escribe todos los datos
        }
    }, velocidad);


    fetch('getGames/mostrar')
        .then(response => {
            if (!response.ok) {
                throw new Error("Error en la solicitud");
            }
            return response.json();
        })
        .then(data => {


            //Si lo que recibo es un array

            data.forEach(game => {

                const div = document.createElement('div');
                div.id = 'cardVideogames';

                const img = document.createElement('img');
                img.id = 'images';
                img.src = game.background_image;

                const h2 = document.createElement('h2');
                h2.textContent = game.name;
                h2.id = 'cardVideogames-Title';



                div.appendChild(img);
                div.appendChild(h2);


                divVideoGames.appendChild(div);

            });



        })
        .catch(error => {
            console.error('Error:', error);
        });





}

//Como manipulo el DOM de manera dinámica, si lo hago estático se quedá en una posición no deseada.



//Datos sobre los botones iniciales

const buttonLogin = document.getElementById('login-button');
const buttonRegister = document.getElementById('register-button');

buttonRegister.addEventListener('click', () => {

    registerModal();


});


buttonLogin.addEventListener('click', () => {


    loginModal();


});

/*Se necesita un servidor local para ejecutar modulares
import {registerProcess,loginProcess} from './register-login/register-login.js';
*/

function registerModal() {

    index.textContent = "";

    var gamecards = document.getElementById('divGeneralCards');
    document.body.removeChild(gamecards);
    document.body.style.overflow = 'hidden';

    const modal = document.createElement('div');
    modal.id = "modal-register-login";
    modal.style.position = 'fixed';
    modal.style.top = 0;
    modal.style.left = 0;
    modal.style.width = '100%';
    modal.style.height = '100vh';
    modal.style.display = 'flex';
    modal.style.flexDirection = 'column';
    modal.style.alignItems = 'center';
    modal.style.justifyContent = 'center';
    modal.style.backgroundColor = 'rgba(0,0,0,0.5)';
    modal.style.zIndex = '1000';


    const titulo = document.createElement('h1');
    titulo.id = 'register-title';
    titulo.textContent = "PixelRank";
    titulo.style.color = 'white';
    titulo.style.marginBottom = '20px';
    titulo.style.textShadow = '1px 1px 4px black';

    const contenido = document.createElement('div');
    contenido.id = 'register-content';
    contenido.style.background = '#fff';
    contenido.style.padding = '30px';
    contenido.style.borderRadius = '10px';
    contenido.style.boxShadow = '0 5px 15px rgba(0,0,0,0.3)';
    contenido.style.width = '400px';
    contenido.style.display = 'flex';
    contenido.style.flexDirection = 'column';
    contenido.style.alignItems = 'center';
    contenido.style.gap = '15px';
    contenido.style.position = 'relative';

    const form = document.createElement('form');
    form.id = "register-form";
    form.style.display = 'flex';
    form.style.flexDirection = 'column';
    form.style.width = '100%';
    form.style.gap = '10px';

    const usernameLabel = document.createElement('label');
    usernameLabel.textContent = "Username";
    const usernameInput = document.createElement('input');
    usernameInput.type = "text";
    usernameInput.name = "username";
    usernameInput.required = true;
    usernameInput.style.padding = '8px';
    usernameInput.style.border = '1px solid #ccc';
    usernameInput.style.borderRadius = '4px';

    form.appendChild(usernameLabel);
    form.appendChild(usernameInput);

    const emailLabel = document.createElement('label');
    emailLabel.textContent = "Email";
    const emailInput = document.createElement('input');
    emailInput.type = "email";
    emailInput.name = "email";
    emailInput.required = true;
    emailInput.style.padding = '8px';
    emailInput.style.border = '1px solid #ccc';
    emailInput.style.borderRadius = '4px';

    form.appendChild(emailLabel);
    form.appendChild(emailInput);

    const passwordLabel = document.createElement('label');
    passwordLabel.textContent = "Password";
    const passwordInput = document.createElement('input');
    passwordInput.type = "password";
    passwordInput.name = "password";
    passwordInput.required = true;
    passwordInput.style.padding = '8px';
    passwordInput.style.border = '1px solid #ccc';
    passwordInput.style.borderRadius = '4px';

    form.appendChild(passwordLabel);
    form.appendChild(passwordInput);

    const repeatPasswordLabel = document.createElement('label');
    repeatPasswordLabel.textContent = "Repeat Password";
    const repeatPasswordInput = document.createElement('input');
    repeatPasswordInput.type = "password";
    repeatPasswordInput.name = "repeatPassword";
    repeatPasswordInput.required = true;
    repeatPasswordInput.style.padding = '8px';
    repeatPasswordInput.style.border = '1px solid #ccc';
    repeatPasswordInput.style.borderRadius = '4px';

    form.appendChild(repeatPasswordLabel);
    form.appendChild(repeatPasswordInput);

    const submitBtn = document.createElement('button');
    submitBtn.id = 'register-button';
    submitBtn.type = 'submit';
    submitBtn.textContent = 'Register';
    submitBtn.style.padding = '10px';
    submitBtn.style.border = 'none';
    submitBtn.style.backgroundColor = 'black';
    submitBtn.style.color = 'white';
    submitBtn.style.borderRadius = '4px';
    submitBtn.style.cursor = 'pointer';

    const errorMessage = document.createElement('div');
    errorMessage.id = 'error-message';
    errorMessage.style.color = 'red';
    errorMessage.style.fontSize = '14px';
    errorMessage.style.marginTop = '10px';

    submitBtn.addEventListener('click', (event) => {
        event.preventDefault();

        if (document.getElementById('error-message')) {
            errorMessage.textContent = '';
        }

        if (usernameInput.value.trim() && emailInput.value.trim() && passwordInput.value.trim() && repeatPasswordInput.value.trim()) {

            if (passwordInput.value !== repeatPasswordInput.value) {

                errorMessage.textContent = "";
                errorMessage.textContent = "The passwords don't match!";
                form.appendChild(errorMessage);

            } else {

                registerProcess(usernameInput.value, emailInput.value, passwordInput.value);

            }

        } else {
            errorMessage.textContent = "";
            errorMessage.textContent = "No blank fields allowed!";
            form.appendChild(errorMessage);
        }
    });

    form.appendChild(submitBtn);
    contenido.appendChild(form);

    const cerrar = document.createElement('button');
    cerrar.innerHTML = '&times;';
    cerrar.style.cursor = 'pointer';
    cerrar.style.fontSize = '24px';
    cerrar.style.position = 'absolute';
    cerrar.style.top = '10px';
    cerrar.style.right = '10px';
    cerrar.style.color = 'red';
    cerrar.style.background = 'transparent';
    cerrar.style.border = 'none';

    cerrar.addEventListener('click', () => {
        document.body.removeChild(modal);
        document.body.style.overflow = 'auto';
        writingContent();
    });


    modal.appendChild(titulo);
    modal.appendChild(contenido);
    contenido.appendChild(cerrar);
    document.body.appendChild(modal);
}


function loginModal() {
    index.textContent = "";

    var gamecards = document.getElementById('divGeneralCards');
    document.body.removeChild(gamecards);
    document.body.style.overflow = 'hidden';

    const modal = document.createElement('div');
    modal.id = "modal-register-login";
    modal.style.position = 'fixed';
    modal.style.top = 0;
    modal.style.left = 0;
    modal.style.width = '100%';
    modal.style.height = '100vh';
    modal.style.display = 'flex';
    modal.style.flexDirection = 'column';
    modal.style.alignItems = 'center';
    modal.style.justifyContent = 'center';
    modal.style.backgroundColor = 'rgba(0,0,0,0.5)';
    modal.style.zIndex = '1000';


    const titulo = document.createElement('h1');
    titulo.id = 'register-title';
    titulo.textContent = "PixelRank";
    titulo.style.color = 'white';
    titulo.style.marginBottom = '20px';
    titulo.style.textShadow = '1px 1px 4px black';

    const contenido = document.createElement('div');
    contenido.id="login-content"
    contenido.style.background = '#fff';
    contenido.style.padding = '30px';
    contenido.style.borderRadius = '10px';
    contenido.style.boxShadow = '0 5px 15px rgba(0,0,0,0.3)';
    contenido.style.width = '400px';
    contenido.style.display = 'flex';
    contenido.style.flexDirection = 'column';
    contenido.style.alignItems = 'center';
    contenido.style.gap = '15px';


    contenido.style.position = 'relative'; // Esto es importante para que el botón se posicione dentro 

    const form = document.createElement('form');
    form.id = "register-form";
    form.style.display = 'flex';
    form.style.flexDirection = 'column';
    form.style.width = '100%';
    form.style.gap = '10px';

    const emailLabel = document.createElement('label');
    emailLabel.textContent = "Email";
    const emailInput = document.createElement('input');
    emailInput.type = "email";
    emailInput.name = "email";
    emailInput.required = true;
    emailInput.style.padding = '8px';
    emailInput.style.border = '1px solid #ccc';
    emailInput.style.borderRadius = '4px';

    form.appendChild(emailLabel);
    form.appendChild(emailInput);

    const passwordLabel = document.createElement('label');
    passwordLabel.textContent = "Password";
    const passwordInput = document.createElement('input');
    passwordInput.type = "password";
    passwordInput.name = "password";
    passwordInput.required = true;
    passwordInput.style.padding = '8px';
    passwordInput.style.border = '1px solid #ccc';
    passwordInput.style.borderRadius = '4px';

    form.appendChild(passwordLabel);
    form.appendChild(passwordInput);

    const submitBtn = document.createElement('button');
    submitBtn.type = 'submit';
    submitBtn.id = 'register-button'
    submitBtn.textContent = 'Login';
    submitBtn.style.padding = '10px';
    submitBtn.style.border = 'none';
    submitBtn.style.backgroundColor = 'black';
    submitBtn.style.color = 'white';
    submitBtn.style.borderRadius = '4px';
    submitBtn.style.cursor = 'pointer';

    const errorMessage = document.createElement('div');
    errorMessage.id = 'error-message';
    errorMessage.style.color = 'red';
    errorMessage.style.fontSize = '14px';
    errorMessage.style.marginTop = '10px';

    submitBtn.addEventListener('click', (event) => {
        event.preventDefault();

        if (emailInput.value.trim() && passwordInput.value.trim()) {

            loginProcess(emailInput.value, passwordInput.value,errorMessage);


        } else {
            errorMessage.textContent = "";
            errorMessage.textContent = "No blank fields allowed";
            form.appendChild(errorMessage);
        }
    });

    form.appendChild(submitBtn);
    contenido.appendChild(form);


    const cerrar = document.createElement('button');
    cerrar.innerHTML = '&times;';
    cerrar.style.cursor = 'pointer';
    cerrar.style.fontSize = '24px';
    cerrar.style.position = 'absolute';
    cerrar.style.top = '10px';
    cerrar.style.right = '10px';
    cerrar.style.color = 'red';
    cerrar.style.background = 'transparent';
    cerrar.style.border = 'none';

    cerrar.addEventListener('click', () => {
        document.body.removeChild(modal);
        document.body.style.overflow = 'auto';
        writingContent();
    });

    contenido.appendChild(cerrar);

    modal.appendChild(titulo);
    modal.appendChild(contenido);

    document.body.appendChild(modal);
}
