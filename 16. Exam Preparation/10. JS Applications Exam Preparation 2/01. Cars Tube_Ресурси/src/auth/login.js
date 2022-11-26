import { html } from '../lit.js';
import { login } from '../api/user.js';

const loginTemplate = html`
<section id="login">
    <div class="container">
        <form @submit=${getFormData} id="login-form" action="#" method="post">
            <h1>Login</h1>
            <p>Please enter your credentials.</p>
            <hr>

            <p>Username</p>
            <input placeholder="Enter Username" name="username" type="text">

            <p>Password</p>
            <input type="password" placeholder="Enter Password" name="password">
            <input type="submit" class="registerbtn" value="Login">
        </form>
        <div class="signin">
            <p>Dont have an account?
                <a href="/register">Sign up</a>.
            </p>
        </div>
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
    const { username, password } = Object.fromEntries(formData);
    if (!username || !password) {
        alert('All fields are required!');
        return;
    }

    await login(username, password);
    e.target.reset();
    ctx.updateNavigation();
    ctx.page.redirect('/dashboard');
}
