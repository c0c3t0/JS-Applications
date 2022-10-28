import { showCatalog } from "./catalog.js";
import { showSection } from "./dom.js";

const section = document.querySelector('#register');

const registerForm = document.querySelector('#register form');
registerForm.addEventListener('submit', registerUser);

export function showRegister() {
    showSection(section);
}

async function registerUser(e) {
    e.preventDefault();

    let formData = new FormData(e.target);

    let email = formData.get('email');
    let password = formData.get('password');
    let rePass = formData.get('rePass');

    if (email === '' || password === '' || rePass === '') {
        alert('All fields are required!');
        return;
    }
    if(password !== rePass){
        alert('Passwords don\'t match');
        return;
    }

    try {
        const response = await fetch('http://localhost:3030/users/register', {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify({
                email,
                password
            })
        });
        const data = await response.json();
        if (!response.ok) {
            form.reset();
            throw new Error(data.message);
        }

        sessionStorage.setItem('accessToken', data.accessToken);
        sessionStorage.setItem('userId', data._id);
        sessionStorage.setItem('userEmail', data.email);

        document.querySelector('#user').style.display = 'inline-block';
        document.querySelector('#guest').style.display = 'none';

        showCatalog();

    } catch (error) {
        alert(error.message);
    }

}
