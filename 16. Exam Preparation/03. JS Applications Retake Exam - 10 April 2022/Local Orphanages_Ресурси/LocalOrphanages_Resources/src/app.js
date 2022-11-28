import { logout } from './api/user.js';
import { page, render } from './lit.js';
import { showCreate } from './views/create.js';
import { showDetails } from './views/details.js';
import { showEdit } from './views/edit.js';
import { showLogin } from './auth/login.js';
import { showRegister } from './auth/register.js';
import { showProfile } from './views/profile.js';
import { showDashboard } from './views/dashboard.js';

const root = document.querySelector('#main-content');

page(decorateContext)
page('/index.html', showDashboard);
page('/', showDashboard);

page('/login', showLogin);
page('/register', showRegister);
page('/logout', onLogout);

page('/create', showCreate);
page('/details/:id', showDetails);
page('/edit/:id', showEdit);
page('/profile', showProfile);

page.start();
updateNavigation();

function decorateContext(ctx, next) {
    ctx.updateNavigation = updateNavigation;
    ctx.render = (content) => render(content, root);
    next();
}
 
function updateNavigation() {
    const user = JSON.parse(sessionStorage.getItem('user'));
    if (user) {
        document.querySelector('#user').style.display = 'inline-block';
        document.querySelector('#guest').style.display = 'none';
    } else {
        document.querySelector('#user').style.display = 'none';
        document.querySelector('#guest').style.display = 'inline-block';
    }
}

async function onLogout() {
    await logout();
    updateNavigation();
    page.redirect('/');
}
