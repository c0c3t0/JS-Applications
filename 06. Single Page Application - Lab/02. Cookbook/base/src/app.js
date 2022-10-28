import { showCatalog } from './catalog.js';
import { showLogin } from './login.js';
import { showRegister } from './register.js'


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

    const anchorTags = {
        catalogLink: showCatalog,
        loginLink: showLogin,
        registerLink: showRegister
    }

    function showNav() {
        nav.addEventListener('click', (e) => {
            if (e.target.tagName === 'A') {
                const view = anchorTags[e.target.id];
                if (typeof view === 'function') {
                    e.preventDefault();
                    view();          // debug this
                }
            }
        })
    }









    function logout() {
        fetch('http://localhost:3030/users/logout', {
            method: 'GET',
            headers: {
                'X-Authorization': sessionStorage.getItem('accessToken')
            }
        })
            .then(response => {
                if (response.ok) {
                    sessionStorage.removeItem('accessToken');
                } else {
                    console.error(response.json())
                }
            })
    }
});



