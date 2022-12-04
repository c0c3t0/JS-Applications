import { html } from '../lit.js';
import { register } from '../api/user.js';

const registerTemplate = html`
    <section id="register">
        <div class="form">
          <h2>Register</h2>
          <form @submit=${getFormData} class="login-form">
            <input type="text" name="email" id="register-email" placeholder="email" />
            <input type="password" name="password" id="register-password" placeholder="password" />
            <input type="password" name="re-password" id="repeat-password" placeholder="repeat password" />
            <button type="submit">register</button>
            <p class="message">Already registered? <a href="/login">Login</a></p>
          </form>
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
    const data = Object.fromEntries(formData);
    console.log(data)
    if (!data.email || !data.password || !data['re-password']) {
        alert('All fields are required!');
        return;
    }
    if (data.password !== data['re-password']) {
        alert('Passwords don\'t match!');
        return;
    }

    await register(data.email, data.password);
    e.target.reset();
    ctx.updateNavigation();
    ctx.page.redirect('/dashboard');
}
