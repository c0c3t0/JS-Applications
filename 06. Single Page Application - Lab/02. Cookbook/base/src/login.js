import { showCatalog } from "./catalog.js";
import { showSection, setActiveNav } from "./dom.js";

const loginForm = document.querySelector('#login form');
loginForm.addEventListener('submit', loginUser);

const section = document.querySelector('#login');

export function showLogin() {
    showSection(section);
    setActiveNav('loginLink');
}

async function loginUser(e) {
    e.preventDefault();

    const formData = new FormData(e.target);
    const email = formData.get('email');
    const password = formData.get('password');

    if (email === '' || password === '') {
        alert('All fields are required!');
        return;
    }

    try {
        const response = await fetch('http://localhost:3030/users/login', {
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
            throw new Error(response.message);
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
