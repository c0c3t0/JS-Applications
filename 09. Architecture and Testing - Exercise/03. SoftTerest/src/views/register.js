import { register } from "../api/user.js";

const section = document.querySelector('#registerView');
const form = section.querySelector('form');
form.addEventListener('submit', onRegister);
let ctx;

export function showRegister(context) {
    ctx = context;
    context.showSection(section);
}

async function onRegister(e) {
    e.preventDefault();
    const formData = new FormData(e.target);

    const { email, password, repeatPassword } = Object.fromEntries(formData);

    if (email.length < 3) {
        alert('Please enter a valid email address!');
        return;
    }
    if (password.length < 3) {
        alert('Password should be 3 characters long at least!');
        return;
    }
    if (password !== repeatPassword) {
        alert('Passwords don\'t match!');
        return;
    }
    await register(email, password);
    ctx.goTo('/');
}