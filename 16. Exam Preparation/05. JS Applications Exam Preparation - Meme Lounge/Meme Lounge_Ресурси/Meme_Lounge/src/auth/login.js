import { html } from '../lit.js';
import { login } from '../api/user.js';
import { notification } from '../views/notifications.js';

const loginTemplate = html`
<section id="login">
    <form @submit=${getFormData} id="login-form">
        <div class="container">
            <h1>Login</h1>
            <label for="email">Email</label>
            <input id="email" placeholder="Enter Email" name="email" type="text">
            <label for="password">Password</label>
            <input id="password" type="password" placeholder="Enter Password" name="password">
            <input type="submit" class="registerbtn button" value="Login">
            <div class="container signin">
                <p>Dont have an account?<a href="/register">Sign up</a>.</p>
            </div>
        </div>
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
        notification('All fields are required!');
        return;
    }
    if(!email) {
        notification('Please enter an email!');
        return;
    }
    if(!password) {
        notification('Please enter a password!');
        return;
    }

    await login(email, password);
    e.target.reset();
    ctx.updateNavigation();
    ctx.page.redirect('/dashboard');
}
