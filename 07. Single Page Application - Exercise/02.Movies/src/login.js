import { showSection } from "./dom.js";
import { showHome } from "./app.js";

const sections = document.querySelectorAll('.view-section');
const loginForm = document.querySelector('#login-form');

export function showLogin() {
    showSection(sections[4]);
    loginForm.addEventListener('submit', loginUser);
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
            alert('Invalid credentials!');
            loginForm.reset();
            return;
        }

        sessionStorage.setItem('accessToken', data.accessToken);
        sessionStorage.setItem('userId', data._id);
        sessionStorage.setItem('userEmail', data.email);

        showHome();
        loginForm.reset();

    } catch (error) {
        alert(error.message);
    }
}
