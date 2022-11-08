import { showHome } from "./app.js";
import { showSection } from "./dom.js";

const sections = document.querySelectorAll('.view-section');
const registerForm = document.querySelector('#register-form');

export function showRegister() {
    showSection(sections[5]);
    registerForm.addEventListener('submit', registerUser);
}

async function registerUser(e) {
    e.preventDefault();

    const formData = new FormData(e.target);
    const email = formData.get('email');
    const password = formData.get('password');
    const repeatPassword = formData.get('repeatPassword');

    if (email === '' || password === '' || repeatPassword === '') {
        alert('All fields are required!');
        return;
    }
    if (password.length < 6) {
        alert('Password should be at least 6 charecters long!');
        return;
    }
    if (password !== repeatPassword) {
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
            registerForm.reset();
            throw new Error(data.message);
        }

        sessionStorage.setItem('accessToken', data.accessToken);
        sessionStorage.setItem('userId', data._id);
        sessionStorage.setItem('userEmail', data.email);

        showHome();
        registerForm.reset();

    } catch (error) {
        alert(error.message);
    }
}
