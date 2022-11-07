import { showSection } from './dom.js';
import { showLogin } from './login.js';
import { logout } from './logout.js';
import { showRegister } from './register.js';
import { getAllMovies } from './catalog.js';
import { showCreateMovie } from './create.js';

window.addEventListener('load', showHome);

const nav = document.querySelector('nav');
const sections = document.querySelectorAll('.view-section');
// sections = [
//    V homeSection,
//    V addMovieSection,
//      movieExampleSection,
//      editMovieSection,
//    V formLoginSection,
//    V formSignInSection

export function showHome() {
    showNavigation();

    if (!sessionStorage.getItem('accessToken')) {
        sections[0].querySelector('h1.text-center').style.display = 'none';
        sections[0].querySelector('section#add-movie-button').style.display = 'none';
    } else {
        sections[0].querySelector('h1.text-center').style.display = 'block';
        sections[0].querySelector('section#add-movie-button').style.display = 'block';
    }

    showSection(sections[0]);
    document.querySelector('#add-movie-button a').addEventListener('click', showCreateMovie);
    getAllMovies();
}

function showNavigation() {
    navLinks();
    // TODO: add greeting message
    if (!sessionStorage.getItem('accessToken')) {
        [...nav.querySelectorAll('.user')].map(el => { el.style.display = 'none' });
        [...nav.querySelectorAll('.guest')].map(el => { el.style.display = 'block' });
    } else {
        const email = sessionStorage.getItem('userEmail');
        nav.querySelector('#welcome-msg').textContent = `Welcome, ${email}`;

        [...nav.querySelectorAll('.user')].map(el => { el.style.display = 'block' });
        [...nav.querySelectorAll('.guest')].map(el => { el.style.display = 'none' });
    }
}

const anchorTags = {
    "homeLink": showHome,
    "logoutLink": logout,
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
