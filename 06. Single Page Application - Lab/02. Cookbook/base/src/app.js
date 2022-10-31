import { showCatalog } from './catalog.js';
import { showLogin } from './login.js';
import { showRegister } from './register.js'
import { logout } from './logout.js';
import { showCreate } from './create.js';

window.addEventListener('load', async () => {
    const nav = document.querySelector('nav');
    showNav();

    if (sessionStorage.getItem('accessToken') !== null) {
        document.querySelector('#user').style.display = 'inline-block';
        document.querySelector('#guest').style.display = 'none';
    } else {
        document.querySelector('#user').style.display = 'none';
        document.querySelector('#guest').style.display = 'inline-block';
    }

    showCatalog();

    const anchorTags = {
        catalogLink: showCatalog,
        createLink: showCreate,
        loginLink: showLogin,
        registerLink: showRegister,
        logoutBtn: logout
    };

    function showNav() {
        nav.addEventListener('click', (e) => {
            if (e.target.tagName === 'A') {
                const view = anchorTags[e.target.id];
                if (typeof view === 'function') {
                    e.preventDefault();
                    view();
                }
            }
        });
    }
})
