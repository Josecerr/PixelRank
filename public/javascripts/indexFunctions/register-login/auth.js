



export function registerProcess(username, email, password) {
    const dataBod = {
        username: username,
        email: email,
        password: password
    };

    fetch('http://localhost:3000/users/register', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(dataBod)
    })
        .then(response => {

            if (!response.ok) {

                throw new Error("Error while registering, no data ");

            }

            return response.json();



        })
        .then(data => {
            if (data.success) {
                console.log(data.user);
                localStorage.setItem('user', JSON.stringify(data.user));
                window.location.href = '/dashboard'; // Redirige a la vista del dashboard
            }

            //No se debe hacer nada aqui realmente, ya que todo lo lleva el backend


        })
        .catch(error => {
            console.error('Error while registering:', error);
        });
}


export function loginProcess(email, password, errorMessage) {

    const dataBod = {

        email: email,
        password: password


    }

    fetch('http://localhost:3000/users/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        credentials: 'include',
        body: JSON.stringify(dataBod)
    })
        .then(response => response.json())
        .then(data => {

            const form = document.getElementById('register-form');



            //Al llevarlo el backend, no hace falta ningun control aqui. solo asegurarnos de que las solicitudes son correctas
            if (data.success) {
                console.log(data.user);

                window.location.href = '/dashboard'; // Redirige a la vista del dashboard
            } else {


                errorMessage.textContent = data.message;

                form.appendChild(errorMessage);


            }

        })
        .catch(error => {
            console.error('Error login', error);
        });

}

export function updateUser(userId, avatarInput) {

    const formData = new FormData();
    formData.append('userId', userId);
    formData.append('avatar', avatarInput.files[0]);

    fetch('http://localhost:3000/users/update', {
        method: 'POST',
        body: formData
    })
        .then(response => {
            if (!response.ok) {
                throw new Error('Error al actualizar el usuario');
            }
            return response.json();
        })
        .then(data => {
            console.log('Avatar actualizado:', data);




            document.getElementById('img-data-user').src = data.avatar + '?t=' + new Date().getTime();

            document.getElementById('avatarUser').src = data.avatar;

            const modal = document.getElementById('modal-edit-account');

            document.body.removeChild(modal);

            window.location.reload();

        })
        .catch(error => {
            console.error('Error:', error);
            
        });
}

