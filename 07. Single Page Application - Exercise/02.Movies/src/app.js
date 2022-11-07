import { showSection } from './dom.js';
import { showLogin } from './login.js';
import { showRegister } from './register.js';
import { getAllMovies } from './catalog.js';

window.addEventListener('load', showHome);

const nav = document.querySelector('nav');

const sections = document.querySelectorAll('.view-section');
// sections = [
//    V homeSection,
//      addMovieSection,
//      movieExampleSection,
//      editMovieSection,
//    V formLoginSection,
//    V formSignInSection

function showHome() {
    showNavigation();
    showSection(sections[0]);
    getAllMovies();
}

function showNavigation() {
    navLinks();
    // TODO: add greeting message
    if (!sessionStorage.getItem('accessToken')) {
        [...nav.querySelectorAll('.user')].map(e => { e.style.display = 'none' });
        [...nav.querySelectorAll('.guest')].map(e => { e.style.display = 'block' });
    } else {
        [...nav.querySelectorAll('.user')].map(e => { e.style.display = 'block' });
        [...nav.querySelectorAll('.guest')].map(e => { e.style.display = 'none' });
    }
}

const anchorTags = {
    "homeLink": showHome,
    // "logoutLink": logout,
    "loginLink": showLogin,
    "registerLink": showRegister,
};

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

