import { logout } from './api/user.js';
import { page, render } from './lit.js';
import { showDashboard } from './views/dashboard.js';
import { showCreate } from './views/create.js';
import { showDetails } from './views/details.js';
import { showEdit } from './views/edit.js';
import { showLogin } from './auth/login.js';
import { showRegister } from './auth/register.js';
import { showHome } from './views/home.js';
import { showProfile } from './views/profile.js';
import { showSearch } from './views/search.js';

const root = document.querySelector('#site-content');
const nav = document.querySelector('nav');

page(decorateContext)
page('/index.html', showHome);
page('/', showHome);

page('/login', showLogin);
page('/register', showRegister);
page('/logout', onLogout);

page('/dashboard', showDashboard);
page('/create', showCreate);
page('/details/:id', showDetails);
page('/edit/:id', showEdit);
page('/profile', showProfile);
page('/sorting', showSearch);

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
        nav.querySelector('.greet').textContent = `Welcome ${user.username}`;
        nav.querySelector('#profile').style.display = 'inline-block';
        nav.querySelector('#guest').style.display = 'none';
    } else {
        nav.querySelector('#profile').style.display = 'none';
        nav.querySelector('#guest').style.display = 'inline-block';
    }
}

async function onLogout() {
    await logout();
    updateNavigation();
    page.redirect('/');
}
