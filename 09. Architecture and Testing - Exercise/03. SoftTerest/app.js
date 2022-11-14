import { logout } from "./src/api/user.js";
import { router } from "./src/router.js";
import { showCatalog } from "./src/views/catalog.js";
import { showCreate } from "./src/views/create.js";
import { showDetails } from "./src/views/details.js";
import { showHome } from './src/views/home.js';
import { showLogin } from "./src/views/login.js";
import { showRegister } from "./src/views/register.js";

const links = {
    '/': showHome,
    '/login': showLogin,
    '/register': showRegister,
    '/create': showCreate,
    '/catalog': showCatalog,
    '/details': showDetails,
    '/logout': async function () {
        await logout();
        onLoad.goTo('/');
    },
}

const onLoad = router(links);
onLoad.goTo('/');