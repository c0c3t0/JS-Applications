import { html } from '../lit.js';
import { register } from '../api/user.js';

const registerTemplate = html`
<section id="registerPage">
    <form @submit=${getFormData} class="registerForm">
        <h2>Register</h2>
        <div class="on-dark">
            <label for="email">Email:</label>
            <input id="email" name="email" type="text" placeholder="steven@abv.bg" value="">
        </div>

        <div class="on-dark">
            <label for="password">Password:</label>
            <input id="password" name="password" type="password" placeholder="********" value="">
        </div>

        <div class="on-dark">
            <label for="repeatPassword">Repeat Password:</label>
            <input id="repeatPassword" name="repeatPassword" type="password" placeholder="********" value="">
        </div>

        <button class="btn" type="submit">Register</button>

        <p class="field">
            <span>If you have profile click <a href="/login">here</a></span>
        </p>
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
