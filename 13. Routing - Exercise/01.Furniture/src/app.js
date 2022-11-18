import { logout } from './api/user.js';
import { page, render } from './lit.js';
import { showCatalog } from './views/catalog.js';
import { showCreate } from './views/create.js';
import { showDetails } from './views/details.js';
import { showEdit } from './views/edit.js';
import { showHome } from './views/home.js';
import { showLogin } from './views/login.js';
import { showRegister } from './views/register.js';

const root = document.querySelector('.container');
document.getElementById('logoutBtn').addEventListener('click', onLogout);

page('/index', renderer, '/');
page('/', renderer, showHome);

page('/login', renderer, showLogin);
page('/register', renderer, showRegister);

page('/catalog', renderer, showCatalog);
page('/create', renderer, showCreate);
page('/details/:id', renderer, showDetails);
page('/edit/:id', renderer, showEdit);
// page('/my-furniture', renderer, showMyFurniture);

page.start();

function renderer(ctx, next) {
    ctx.render = (content) => render(content, root);
    next();
}

function onLogout() {
    logout();
    // updateUserNav();
    page.redirect('/');
}