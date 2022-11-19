import { logout } from './api/user.js';
import { page, render } from './lit.js';
import { showCatalog } from './views/catalog.js';
import { showCreate } from './views/create.js';
import { showDetails } from './views/details.js';
import { showEdit } from './views/edit.js';
import { showLogin } from './views/login.js';
import { showMyFurniture } from './views/ownerCatalog.js';
import { showRegister } from './views/register.js';

const root = document.querySelector('.container');
document.getElementById('logoutBtn').addEventListener('click', onLogout);

page(decorateContext)
page('/index', '/catalog');
page('/', showCatalog);

page('/login', showLogin);
page('/register', showRegister);

page('/catalog', showCatalog);
page('/create', showCreate);
page('/details/:id', showDetails);
page('/edit/:id', showEdit);
page('/my-furniture', showMyFurniture);

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
        document.querySelector('#user').style.display = 'inline-block';
        document.querySelector('#guest').style.display = 'none';
    } else {
        document.querySelector('#user').style.display = 'none';
        document.querySelector('#guest').style.display = 'inline-block';
    }
}

function onLogout() {
    logout();
    updateNavigation();
    page.redirect('/');
}