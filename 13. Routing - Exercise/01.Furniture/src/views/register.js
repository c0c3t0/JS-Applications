import { html } from '../lit.js';
import { register } from '../api/user.js';

let page;

export function showRegister(ctx) {
    page = ctx.page;
    ctx.render(registerTemplate());
}

function getFormData(e) {
    e.preventDefault();
    const formData = new FormData(e.target);
    const { email, password, rePass } = Object.fromEntries(formData);
    if (!email || !password || !rePass) {
        alert('All fields are required!');
        return;
    }
    if(password !== rePass){
        alert('Passwords don\'t match!');
        return;
    }

    register(email, password);
    e.target.reset();
    page.redirect('/catalog');
}

function registerTemplate() {
    return html`
    <div class="row space-top">
            <div class="col-md-12">
                <h1>Register New User</h1>
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
                    <div class="form-group">
                        <label class="form-control-label" for="rePass">Repeat</label>
                        <input class="form-control" id="rePass" type="password" name="rePass">
                    </div>
                    <input type="submit" class="btn btn-primary" value="Register" />
                </div>
            </div>
        </form>`;
}
