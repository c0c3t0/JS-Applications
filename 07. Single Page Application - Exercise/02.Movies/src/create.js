import { showHome } from "./app.js";
import { showSection } from "./dom.js";

const sections = document.querySelectorAll('.view-section');
const form = document.querySelector('#add-movie-form');
form.addEventListener('submit', addMovie);

export function showCreateMovie() {
    showSection(sections[1]);
}

async function addMovie(e) {
    e.preventDefault();

    const data = new FormData(e.target);
    const title = data.get('title');
    const description = data.get('description');
    const img = data.get('img');

    if (title === '' || description === '' || img === '') {
        alert('All fields are required');
        return;
    }

    const token = sessionStorage.getItem('accessToken');

    try {
        const response = await fetch('http://localhost:3030/data/movies', {
            method: 'POST',
            headers: {
                'content-type': 'application/json',
                'X-Authorization': token
            },
            body: JSON.stringify({
                title,
                description,
                img
            })
        });
        if (!response.ok) {
            const data = await response.json();
            throw new Error(data.message);
        }
        showHome();
        form.reset();

    } catch (error) {
        alert(error.message);
    }
}
