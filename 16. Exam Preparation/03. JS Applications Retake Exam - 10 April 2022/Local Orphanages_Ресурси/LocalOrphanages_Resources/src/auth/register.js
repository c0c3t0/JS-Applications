import { html } from '../lit.js';
import { register } from '../api/user.js';

const registerTemplate = html`
<section id="register-page" class="auth">
    <form @submit=${getFormData} id="register">
        <h1 class="title">Register</h1>

        <article class="input-group">
            <label for="register-email">Email: </label>
            <input type="email" id="register-email" name="email">
        </article>

        <article class="input-group">
            <label for="register-password">Password: </label>
            <input type="password" id="register-password" name="password">
        </article>

        <article class="input-group">
            <label for="repeat-password">Repeat Password: </label>
            <input type="password" id="repeat-password" name="repeatPassword">
        </article>

        <input type="submit" class="btn submit-btn" value="Register">
    </form>
</section>`;

let ctx = null;

export function showRegister(context) {
    ctx = context;
    ctx.render(registerTemplate);
}

async function getFormData(e) {
    e.preventDefault();
    const formData = new FormData(e.target);
    const { email, password, repeatPassword } = Object.fromEntries(formData);

    if (!email || !password || !repeatPassword) {
        alert('All fields are required!');
        return;
    }
    if (password !== repeatPassword) {
        alert('Passwords don\'t match!');
        return;
    }

    await register(email, password);
    e.target.reset();
    ctx.updateNavigation();
    ctx.page.redirect('/');
}
