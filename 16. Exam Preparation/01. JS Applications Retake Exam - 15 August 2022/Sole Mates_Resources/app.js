import { logout } from './api/user.js';
import { page, render } from './lit.js';
import { showDashboard } from './views/dashboard.js';
import { showCreate } from './views/create.js';
import { showDetails } from './views/details.js';
import { showEdit } from './views/edit.js';
import { showLogin } from './auth/login.js';
import { showRegister } from './auth/register.js';
import { showHome } from './views/home.js';
import { showSearch } from './views/search.js';

const nav = document.querySelector('nav');
const root = document.querySelector('main');

page(decorateContext);
page('/index', '/');
page('/', showHome);

page('/login', showLogin);
page('/register', showRegister);
page('/logout', onLogout);

page('/dashboard', showDashboard);
page('/create', showCreate);
page('/details/:id', showDetails);
page('/edit/:id', showEdit);
page('/search', showSearch);

page.start();
updateNavigation();

function decorateContext(ctx, next) {
    ctx.updateNavigation = updateNavigation;
    ctx.render = (content) => render(content, root);
    next();
}
 
function updateNavigation() {
    const user = sessionStorage.getItem('user');
    if (user) {
        nav.querySelector('.user').style.display = 'inline-block';
        nav.querySelector('.guest').style.display = 'none';
    } else {
        nav.querySelector('.user').style.display = 'none';
        nav.querySelector('.guest').style.display = 'inline-block';
    }
}

async function onLogout() {
    await logout();
    updateNavigation(); 
    page.redirect('/dashboard');
}
