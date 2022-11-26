import { html } from '../lit.js';
import { login } from '../api/user.js';

const loginTemplate = html`
    <section id="loginPage">
        <form @submit=${getFormData}>
            <fieldset>
                <legend>Login</legend>
    
                <label for="email" class="vhide">Email</label>
                <input id="email" class="email" name="email" type="text" placeholder="Email">
    
                <label for="password" class="vhide">Password</label>
                <input id="password" class="password" name="password" type="password" placeholder="Password">
    
                <button type="submit" class="login">Login</button>
    
                <p class="field">
                    <span>If you don't have profile click <a href="#">here</a></span>
                </p>
            </fieldset>
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
    ctx.page.redirect('/dashboard');
}
