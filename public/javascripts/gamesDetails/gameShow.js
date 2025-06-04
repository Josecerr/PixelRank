
import { showMyAccount } from "../dashboard/dashboard.js";
import { logOutUser } from "../dashboard/dashboard.js";
import { searchFriendsByUsername } from "../dashboard/dashboard.js";
import { showFriend } from "../dashboard/dashboard.js";


AOS.init({
    duration: 1200,

});

//datos a usar
const myAccount = document.getElementById('myAccount');
const logOut = document.getElementById('logout');
const addFriends = document.getElementById('addFriends');
const myFriends = document.getElementById('myFriends');
const myLibrary=document.getElementById('myLibrary');


const game = window.gameData;
console.log(game); // objeto completo




const buttonSearchGame = document.getElementById('searchGame');

const goBack = document.getElementById('goBack');

goBack.addEventListener('mouseover', () => {

    goBack.style.animation = 'none';
    goBack.offsetHeight;
    goBack.style.animation = 'showUp 0.4s ease-out'; // volver a aplicarla

})

setInterval(() => {
    showReviewsComplete();
}, 30000);



goBack.addEventListener('click', () => {

    window.location.href = "/dashboard"

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
    //Limpiamos la sección Español
    const index = cleanDescription.indexOf('Español');
    if (index !== -1) {
        cleanDescription = cleanDescription.substring(0, index).trim();
    }

    document.getElementById('game-description').textContent = cleanDescription;

    //debugging
    console.log(game.description);





    showReviewsComplete();



    showReviews();

    verifyGameLibrary();


})

let alreadyLibrary = false;
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
    divData.style.gap = "20px";
    const platformIconsDiv = document.getElementById('platformIcons');
    platformIconsDiv.style.display = 'flex';
    platformIconsDiv.style.flexDirection = 'row';
    platformIconsDiv.style.alignItems = 'center';





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

    const addToLibraryContainer = document.createElement('div');
    addToLibraryContainer.style.display = 'flex';
    addToLibraryContainer.style.alignItems = 'center';
    addToLibraryContainer.style.backgroundColor = '#ffffff';
    addToLibraryContainer.style.borderRadius = '12px';
    addToLibraryContainer.style.padding = '10px 14px';
    addToLibraryContainer.style.fontFamily = 'Arial, sans-serif';
    addToLibraryContainer.style.width = 'fit-content';
    addToLibraryContainer.style.boxShadow = '0 2px 8px rgba(0,0,0,0.1)';
    addToLibraryContainer.style.cursor = 'pointer';
    addToLibraryContainer.style.transition = 'transform 0.2s ease';
    addToLibraryContainer.style.gap = '10px';
    addToLibraryContainer.style.border = '1px solid #ddd';
    addToLibraryContainer.id = "libraryContainer";

    // Efecto hover (opcional)
    addToLibraryContainer.addEventListener('mouseenter', () => {
        addToLibraryContainer.style.transform = 'scale(1.02)';
    });
    addToLibraryContainer.addEventListener('mouseleave', () => {
        addToLibraryContainer.style.transform = 'scale(1)';
    });

    // Texto
    const textInfo=document.createElement('p');

    textInfo.innerHTML = `
  <span id="addToText" style="font-size: 0.75rem; color: #888;">Add to</span><br>
  <strong id="libraryLabel" style="font-size: 1rem; color: #222;">My games</strong>
`;
    textInfo.style.lineHeight = '1.2';

    // Botón redondo con "+"
    const addButton = document.createElement('div');
    addButton.textContent = '+';
    addButton.style.background = 'linear-gradient(145deg, #a2db34, #70bf00)';
    addButton.style.color = '#fff';
    addButton.style.fontSize = '1.2rem';
    addButton.style.width = '32px';
    addButton.style.height = '32px';
    addButton.style.display = 'flex';
    addButton.style.alignItems = 'center';
    addButton.style.justifyContent = 'center';
    addButton.style.borderRadius = '50%';
    addButton.style.boxShadow = '0 2px 6px rgba(0,0,0,0.2)';
    addButton.style.flexShrink = '0';
    addButton.style.transition = 'background 0.3s ease';
    addButton.id = "addToLibraryGame";

    addButton.addEventListener('mouseenter', () => {
        addButton.style.background = 'linear-gradient(145deg, #b6f542, #7fd000)';
    });
    addButton.addEventListener('mouseleave', () => {
        addButton.style.background = 'linear-gradient(145deg, #a2db34, #70bf00)';
    });

    addToLibraryContainer.addEventListener('click', () => {

        if (alreadyLibrary) return;

        addToMyLibrary(addButton);

    });


    addToLibraryContainer.appendChild(textInfo);
    addToLibraryContainer.appendChild(addButton);


    reviewGame.appendChild(textArea);
    reviewGame.appendChild(addToLibraryContainer);


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

function verifyGameLibrary() {
    const addButton = document.getElementById('addToLibraryGame');

    const dataBod = {

        gameID: game.id


    }
    const requestOptions = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(dataBod)
    };

    fetch('users/verifyLibrary', requestOptions)
        .then(response => {

            if (!response.ok) {

                throw new Error("Error verifying the library");

            }
            return response.json();

        })

        .then(result => {

            if (result.success) {
                if (result.data) {

                    addButton.textContent = "✓";
                    addButton.style.pointerEvents = 'none';
                    addButton.style.cursor = 'default';
                    alreadyLibrary = true;
                    document.getElementById('addToText').textContent = 'Library';
                    document.getElementById('libraryLabel').textContent = 'Already added';


                }

            } else {

                addToMyLibrary(buttonAdd);

            }


        })

}

function addToMyLibrary(buttonAdd) {
    const status = "Pending";

    const dataBod = {

        gameID: game.id,
        status: status
    }
    const requestOptions = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(dataBod)
    };

    fetch('users/addToLibrary', requestOptions)
        .then(response => {

            if (!response.ok) {

                throw new Error("Error adding to my library");

            }
            return response.json();

        })

        .then(result => {

            if (result.success) {

                buttonAdd.textContent = "✓"
                verifyGameLibrary();
            }




        }).catch(error => {

            console.error('Fetch error:', error);

        });


}

function generatePastelColor() {
    const hue = Math.floor(Math.random() * 360);
    const saturation = Math.floor(Math.random() * 30) + 70;
    const lightness = Math.floor(Math.random() * 20) + 70;
    return `hsl(${hue}, ${saturation}%, ${lightness}%)`;
}

myAccount.addEventListener('click', () => {

    showMyAccount();


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
myLibrary.addEventListener('click',()=>{

    window.location.href='myLibrary';


})