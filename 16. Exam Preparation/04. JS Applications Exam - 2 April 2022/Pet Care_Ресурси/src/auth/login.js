import { html } from '../lit.js';
import { login } from '../api/user.js';

const loginTemplate = html`
    <section id="loginPage">
        <form @submit=${getFormData} class="loginForm">
            <img src="./images/logo.png" alt="logo" />
            <h2>Login</h2>
    
            <div>
                <label for="email">Email:</label>
                <input id="email" name="email" type="text" placeholder="steven@abv.bg" value="">
            </div>
    
            <div>
                <label for="password">Password:</label>
                <input id="password" name="password" type="password" placeholder="********" value="">
            </div>
    
            <button class="btn" type="submit">Login</button>
    
            <p class="field">
                <span>If you don't have profile click <a href="/register">here</a></span>
            </p>
        </form>
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
    ctx.page.redirect('/');
}
