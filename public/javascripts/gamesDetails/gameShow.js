
import { updateUser } from "../indexFunctions/register-login/auth.js";

AOS.init({
    duration: 1200,

});

//datos a usar
const myAccount = document.getElementById('myAccount');

const logOut = document.getElementById('logout');

const game = window.gameData;
console.log(game); // objeto completo

console.log(user);


const buttonSearchGame = document.getElementById('searchGame');

const goBack = document.getElementById('goBack');

goBack.addEventListener('mouseover', () => {

    goBack.style.animation = 'none'; // quitar animación
    goBack.offsetHeight; // forzar reflujo (reinicio del estilo)
    goBack.style.animation = 'showUp 0.4s ease-out'; // volver a aplicarla

})

setInterval(() => {
    showReviewsComplete();
}, 30000);



goBack.addEventListener('click', () => {

    window.location.href = "/dashboard"

})


buttonSearchGame.addEventListener('click', () => {

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




});


document.addEventListener('DOMContentLoaded', () => {

    const imageSrc = document.getElementById('img-data-user');
    imageSrc.src = user.avatar;

    showInformation();

    document.getElementById('gameName').textContent = game.name;
    const released = document.getElementById('releaseDate');
    released.textContent = `Released at: ${game.released}`
    released.style.color = "white";
    released.style.fontFamily = "play";
    released.style.fontSize = '3vh';
    released.style.fontWeight = '500';
    released.style.marginTop = '10px';
    
    

    document.getElementById('game-cover').src = game.background_image;

    let cleanDescription = game.description_raw;
    //Limpiamos la sección Español--> Se podría hacer despues en ingles
    const index = cleanDescription.indexOf('Español');
    if (index !== -1) {
        cleanDescription = cleanDescription.substring(0, index).trim();
    }

    document.getElementById('game-description').textContent = cleanDescription;

    //debugging
    console.log(game.description);

    showReviewsComplete();


    showReviews();



})
//Toda la información de los juegos
function showInformation() {

    const platformLogos = {
        pc: 'https://img.icons8.com/color/48/windows-10.png',
        playstation: 'https://img.icons8.com/color/48/play-station.png',
        xbox: 'https://img.icons8.com/fluency/48/xbox.png',
        android: 'https://img.icons8.com/color/48/android-os.png',
        mac: 'https://img.icons8.com/color/48/mac-logo.png',
        nintendo: 'https://img.icons8.com/color/48/nintendo-switch-handheld.png'
    };

    const divData = document.getElementById('dataGame');
    divData.style.display = "flex";
    divData.style.gap="20px";
    const platformIconsDiv = document.getElementById('platformIcons');
    platformIconsDiv.style.display = 'flex';
    platformIconsDiv.style.flexDirection = 'row';
    platformIconsDiv.style.alignItems = 'center';





    if (game.parent_platforms) {
        game.parent_platforms.forEach(p => {
            const slug = p.platform.slug;
            const logoUrl = platformLogos[slug]; // platformLogos debe ser un objeto como {'pc': 'url', 'playstation': 'url', ...}

            if (logoUrl) {
                const img = document.createElement('img');
                img.src = logoUrl;
                img.alt = p.platform.name;
                img.style.width = '30px';
                img.style.height = '30px';
                img.style.objectFit = 'contain';
                img.style.marginRight = '5px';
                platformIconsDiv.appendChild(img);
            }
        });
    }


    const h1Name = document.getElementById('gameName');
    h1Name.textContent = game.name;
    h1Name.style.textAlign = "center";
    h1Name.style.fontFamily = "play";
    h1Name.style.fontSize = "6vh";
    h1Name.style.color = "white";

    const dataBod = {

        gameId: game.id

    }
    const requestOptions = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(dataBod)
    };

    fetch('getGames/mostrarScreenshots', requestOptions)
        .then(response => {

            if (!response.ok) {

                throw new Error("Error en la solicitud");

            }

            return response.json();

        })
        .then(screenShots => {


            const capturesContainer = document.getElementById('captures-container');

            screenShots.forEach(photo => {
                const img = document.createElement('img');
                img.src = photo.image;
                capturesContainer.appendChild(img);
            });

        })

    fetch('/getGames/mostrarTrailers', requestOptions)
        .then(response => {

            if (!response.ok) {

                throw new Error("Error en la solicitud");

            }

            return response.json();


        })
        .then(trailers => {


            const videoContainer = document.getElementById('videos-container');

            if (trailers.length === 0) {

                document.getElementById('trailers').textContent = "";


            }

            trailers.slice(0, 3).forEach(trailer => {

                console.log(trailer.data.max)
                const video = document.createElement('video');
                video.src = trailer.data.max;
                console.log(trailer.preview)
                video.controls = true;
                video.autoplay = true;
                video.muted = true

                videoContainer.appendChild(video);

            })


        })


}

//Enseñamos la función para enviar tu review

function showReviews() {


    const reviewGame = document.getElementById('review-data');




    const textArea = document.createElement('textarea');
    textArea.placeholder = "Write your review here";
    textArea.style.backgroundColor = "white";









    reviewGame.appendChild(textArea);


    const sendReview = document.getElementById("sendReview");

    sendReview.style.cursor = "pointer";


    sendReview.addEventListener('click', () => {
        const rating = document.querySelector('input[name="rating"]:checked')?.value;


        const dataBod = {

            review: textArea.value,
            userId: user.id,
            gameId: game.id,
            rating: rating

        }

        const requestOptions = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(dataBod)
        };


        fetch('/users/postReview', requestOptions)
            .then(response => {

                if (!response.ok) {

                    throw new Error("Error, no answer in the Backend");

                }

                return response.json();

            })
            .then(data => {

                if (data.success) {

                    const p = document.createElement('p');
                    p.textContent = " ";
                    p.textContent = "Review sent succesfully";
                    p.style.fontFamily = "play";
                    p.style.fontSize = "2vh";
                    p.style.color = "white";

                    reviewGame.appendChild(p);

                    showReviewsComplete();

                }


            })


    })


}
//Enseñamos las reviews
function showReviewsComplete() {

    const reviewData = document.getElementById('show-reviews');
    reviewData.textContent = "";

    const dataBod = {

        gameId: game.id

    }

    const requestOptions = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(dataBod)
    };

    fetch('/getGames/obtenerResenas', requestOptions)
        .then(response => {

            if (!response.ok) {

                throw new Error("Error getting data");

            }

            return response.json();

        })

        .then(result => {

            if (result.length === 0) {



            } else {

                result.forEach(review => {

                    const reviewContainer = document.createElement('div');
                    reviewContainer.setAttribute('data-aos', 'fade-right')
                    reviewContainer.style.display = "flex";
                    reviewContainer.style.alignItems = "flex-start";
                    reviewContainer.style.backgroundColor = "#1c1c1c";
                    reviewContainer.style.borderRadius = "12px";
                    reviewContainer.style.padding = "15px";
                    reviewContainer.style.marginBottom = "15px";
                    reviewContainer.style.gap = "15px";
                    reviewContainer.style.boxShadow = "0 4px 10px rgba(0, 0, 0, 0.5)";

                    // Avatar
                    const avatar = document.createElement('img');
                    avatar.src = review.avatar || '/default-avatar.png';
                    avatar.alt = "User Avatar";
                    avatar.style.width = "60px";
                    avatar.style.height = "60px";
                    avatar.style.borderRadius = "50%";
                    avatar.style.objectFit = "cover";
                    reviewContainer.appendChild(avatar);

                    const content = document.createElement('div');
                    content.style.display = "flex";
                    content.style.flexDirection = "column";
                    content.style.justifyContent = "center";
                    content.style.flex = "1";

                    const username = document.createElement('strong');
                    username.textContent = review.username || "Anonymous";
                    username.style.color = generatePastelColor();
                    username.style.fontSize = "1.2em";
                    username.style.fontFamily = "play";

                    const rating = document.createElement('span');
                    rating.textContent = `Rating: ${review.rating}/5`;
                    rating.style.color = "#ffd900";
                    rating.style.fontFamily = "play";
                    rating.style.marginTop = "4px";

                    const text = document.createElement('p');
                    text.textContent = review.comment;
                    text.style.color = "white";
                    text.style.marginTop = "10px";
                    text.style.fontFamily = "play";
                    text.style.lineHeight = "1.4";

                    content.appendChild(username);
                    content.appendChild(rating);
                    content.appendChild(text);

                    reviewContainer.appendChild(content);
                    reviewData.appendChild(reviewContainer);



                })


            }



        })



}

function generatePastelColor() {
    const hue = Math.floor(Math.random() * 360);
    const saturation = Math.floor(Math.random() * 30) + 70;
    const lightness = Math.floor(Math.random() * 20) + 70;
    return `hsl(${hue}, ${saturation}%, ${lightness}%)`;
}

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

        document.body.removeChild(modal);
        document.body.style.overflow = 'auto';



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