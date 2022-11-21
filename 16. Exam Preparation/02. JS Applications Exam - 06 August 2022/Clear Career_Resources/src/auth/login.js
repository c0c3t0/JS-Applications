import { html } from '../lit.js';
import { login } from '../api/user.js';

const loginTemplate = html`
    <section id="login">
        <div class="form">
            <h2>Login</h2>
            <form @submit=${getFormData} class="login-form">
                <input type="text" name="email" id="email" placeholder="email" />
                <input type="password" name="password" id="password" placeholder="password" />
                <button type="submit">login</button>
                <p class="message">
                    Not registered? <a href="/create">Create an account</a>
                </p>
            </form>
        </div>
    </section>`;

let ctx = null;

export function showLogin(context) {
    ctx = context;
    ctx.render(loginTemplate);
}

async function getFormData(e) {
    e.preventDefault();
    const formData = new FormData(e.target);
    const { email, password } = Object.fromEntries(formData);
    if (!email || !password) {
        alert('All fields are required!');
        return;
    }

    await login(email, password);
    e.target.reset();
    ctx.updateNavigation();
    ctx.page.redirect('/dashboard');
}
