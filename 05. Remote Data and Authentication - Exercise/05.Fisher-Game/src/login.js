const form = document.querySelector('form');
const notification = form.querySelector('.notification');

form.addEventListener('submit', login);

async function login(e) {
    e.preventDefault();

    let formData = new FormData(e.target);

    let email = formData.get('email');
    let password = formData.get('password');

    if (email == '' || password == '') {
        notification.textContent = 'All fields are required!'
        return;
    }

    try {
        let response = await fetch('http://localhost:3030/users/login', {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify({
                email,
                password
            })
        })
        let data = await response.json();

        if (!response.ok || response.status != 200) {
            form.reset();
            throw new Error(error.message)
        }

        sessionStorage.setItem('accessToken', data.accessToken);
        sessionStorage.setItem('email', data.email);
        sessionStorage.setItem('username', data.username);
        sessionStorage.setItem('_id', data._id);
        window.location.href = './index.html'

    } catch (error) {
        notification.textContent = error.message;
    }
}