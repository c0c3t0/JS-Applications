import { getAllMovies } from './catalog.js';
import { showCreateMovie } from './create.js';
import { showSection } from './dom.js';
import { showLogin } from './login.js';
import { logout } from './logout.js';
import { showRegister } from './register.js';

window.addEventListener('load', showHome);

const nav = document.querySelector('nav');
const sections = document.querySelectorAll('.view-section');

export function showHome() {
    showNavigation();
    showSection(sections[0]);
    document.querySelector('#add-movie-button a').addEventListener('click', showCreateMovie);
    getAllMovies();
}

export function showNavigation() {
    if (!sessionStorage.getItem('accessToken')) {
        [...nav.querySelectorAll('.user')].map(el => { el.style.display = 'none' });
        [...nav.querySelectorAll('.guest')].map(el => { el.style.display = 'block' });
        sections[0].querySelector('section#add-movie-button').style.display = 'none';
    } else {
        const email = sessionStorage.getItem('userEmail');
        nav.querySelector('#welcome-msg').textContent = `Welcome, ${email}`;

        [...nav.querySelectorAll('.user')].map(el => { el.style.display = 'block' });
        [...nav.querySelectorAll('.guest')].map(el => { el.style.display = 'none' });
        sections[0].querySelector('section#add-movie-button').style.display = 'block';
    }
}

const anchorTags = {
    "homeLink": showHome,
    "logoutLink": logout,
    "loginLink": showLogin,
    "registerLink": showRegister,
};
navLinks();

function navLinks() {
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
