import { html } from '../lit.js';
import { login } from '../api/user.js';

let page;

export function showLogin(ctx) {
    page = ctx.page;
    ctx.render(loginTemplate());
}

function getFormData(e) {
    e.preventDefault();
    const formData = new FormData(e.target);
    const { email, password } = Object.fromEntries(formData);
    if (!email || !password) {
        alert('All fields are required!');
        return;
    }

    login(email, password);
    e.target.reset();
    page.redirect('/catalog');
}

function loginTemplate() {
    return html`
    <div class="row space-top">
        <div class="col-md-12">
            <h1>Login User</h1>
            <p>Please fill all fields.</p>
        </div>
    </div>
    <form @submit=${getFormData}>
        <div class="row space-top">
            <div class="col-md-4">
                <div class="form-group">
                    <label class="form-control-label" for="email">Email</label>
                    <input class="form-control" id="email" type="text" name="email">
                </div>
                <div class="form-group">
                    <label class="form-control-label" for="password">Password</label>
                    <input class="form-control" id="password" type="password" name="password">
                </div>
                <input type="submit" class="btn btn-primary" value="Login" />
            </div>
        </div>
    </form>`;
}
