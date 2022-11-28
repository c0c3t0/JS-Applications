import { html } from '../lit.js';
import { register } from '../api/user.js';

const registerTemplate = html`
<section id="register-page" class="content auth">
    <form @submit=${getFormData} id="register">
        <div class="container">
            <div class="brand-logo"></div>
            <h1>Register</h1>

            <label for="email">Email:</label>
            <input type="email" id="email" name="email" placeholder="maria@email.com">

            <label for="pass">Password:</label>
            <input type="password" name="password" id="register-password">

            <label for="con-pass">Confirm Password:</label>
            <input type="password" name="confirm-password" id="confirm-password">

            <input class="btn submit" type="submit" value="Register">

            <p class="field">
                <span>If you already have profile click <a href="#">here</a></span>
            </p>
        </div>
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
    const data = Object.fromEntries(formData);
    console.log(data)
    if (!data.email || !data.password || !data['confirm-password']) {
        alert('All fields are required!');
        return;
    }
    if (data.password !== data['confirm-password']) {
        alert('Passwords don\'t match!');
        return;
    }

    await register(data.email, data.password);
    e.target.reset();
    ctx.updateNavigation();
    ctx.page.redirect('/');
}
