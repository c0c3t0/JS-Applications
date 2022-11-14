import { login } from '../api/user.js';

const section = document.querySelector('#loginView');
const form = section.querySelector('form');
form.addEventListener('submit', onSubmit);
let ctx = null;

export function showLogin(context) {
    ctx = context;
    context.showSection(section);
}

async function onSubmit(e) {
    e.preventDefault();
    const formData = new FormData(e.target);

    const { email, password } = Object.fromEntries(formData);

    await login( email, password );
    form.reset();
    ctx.goTo('/');
}