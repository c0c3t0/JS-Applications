document.querySelector('#logout').style.display = 'none';
const form = document.querySelector('form');
const notification = document.querySelector('.notification');

form.addEventListener('submit', registerUser);

async function registerUser(e) {
    e.preventDefault();

    const formData = new FormData(e.target);

    let email = formData.get('email');
    let password = formData.get('password');
    let rePass = formData.get('rePass');

    if (password !== rePass) {
        notification.textContent = 'Passwords don\'t match';
        return;
    }
    if (!email || !password || !rePass) {
        notification.textContent = 'All fields are required!'
        return;
    }

    try {
        let response = await fetch('http://localhost:3030/users/register', {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify({ 
                email, 
                password })
        })
        let data = await response.json();

        if (!response.ok || response.status != 200) {
            form.reset();
            throw new Error(data.message);
        }
        
        sessionStorage.setItem('accessToken', data.accessToken);
        sessionStorage.setItem('username', data.username);
        sessionStorage.setItem('email', data.email);
        sessionStorage.setItem('_id', data._id);

        window.location.href = './index.html';

    } catch (error) {
        notification.textContent = error.message;
    }
}
