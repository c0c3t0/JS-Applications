import { page } from './lit.js';
import { showCatalog } from './views/catalog.js';
import { showCreate } from './views/create.js';
import { showDetails } from './views/details.js';
import { showEdit } from './views/edit.js';
import { showHome } from './views/home.js';
import { showLogin } from './views/login.js';
import { showRegister } from './views/register.js';


page('/index', '/');
page('/', showHome);

page('/login', showLogin);
page('/register', showRegister);

page('/catalog', showCatalog);
page('/create', showCreate);
page('/details/:id', showDetails);
page('/edit/:id', showEdit);
// page('/my-furniture', showMyFurniture);

page.start(); 

