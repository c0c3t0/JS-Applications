import { html } from '../lit.js';
import { register } from '../api/user.js';

const registerTemplate = html`
<section id="register-page" class="register">
    <form @submit=${getFormData} id="register-form" action="" method="">
        <fieldset>
            <legend>Register Form</legend>
            <p class="field">
                <label for="email">Email</label>
                <span class="input">
                    <input type="text" name="email" id="email" placeholder="Email">
                </span>
            </p>
            <p class="field">
                <label for="password">Password</label>
                <span class="input">
                    <input type="password" name="password" id="password" placeholder="Password">
                </span>
            </p>
            <p class="field">
                <label for="repeat-pass">Repeat Password</label>
                <span class="input">
                    <input type="password" name="confirm-pass" id="repeat-pass" placeholder="Repeat Password">
                </span>
            </p>
            <input class="button submit" type="submit" value="Register">
        </fieldset>
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
    if (!data.email || !data.password || !data['confirm-pass']) {
        alert('All fields are required!');
        return;
    }
    if (data.password !== data['confirm-pass']) {
        alert('Passwords don\'t match!');
        return;
    }

    await register(data.email, data.password);
    e.target.reset();
    ctx.updateNavigation();
    ctx.page.redirect('/');
}
