import { html } from '../lit.js';
import { register } from '../api/user.js';

const registerTemplate = html`
<section id="register">
    <div class="container">
        <form @submit=${getFormData} id="register-form">
            <h1>Register</h1>
            <p>Please fill in this form to create an account.</p>
            <hr>

            <p>Username</p>
            <input type="text" placeholder="Enter Username" name="username" required>

            <p>Password</p>
            <input type="password" placeholder="Enter Password" name="password" required>

            <p>Repeat Password</p>
            <input type="password" placeholder="Repeat Password" name="repeatPass" required>
            <hr>

            <input type="submit" class="registerbtn" value="Register">
        </form>
        <div class="signin">
            <p>Already have an account?
                <a href="/login">Sign in</a>.
            </p>
        </div>
    </div>
</section>`;

let ctx = null;

export function showRegister(context) {
    ctx = context;
    ctx.render(registerTemplate);
}

async function getFormData(e) {
    e.preventDefault();
    const formData = new FormData(e.target);
    const { username, password, repeatPass } = Object.fromEntries(formData);

    if (!username || !password || !repeatPass) {
        alert('All fields are required!');
        return;
    }
    if (password !== repeatPass) {
        alert('Passwords don\'t match!');
        return;
    }

    await register(username, password);
    e.target.reset();
    ctx.updateNavigation();
    ctx.page.redirect('/dashboard');
}
