import { showDetails } from "./details.js";
import { showSection } from "./dom.js";

const sections = document.querySelectorAll('.view-section');

export function showEdit(movie) {
    showSection(sections[3]);
    editMovie(movie);
}

async function editMovie(movie) {
    const response = await fetch(`http://localhost:3030/data/movies/${movie._id}`);
    const data = await response.json();

    sections[3].querySelector('[name="title"]').value = data.title;
    sections[3].querySelector('[name="description"]').value = data.description;
    sections[3].querySelector('[name="img"]').value = data.img;

    const form = document.querySelector('#edit-movie form');
    form.addEventListener('submit', (e) => submitEditMovie(e, data));
}

async function submitEditMovie(e, movie) {
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
        const response = await fetch(`http://localhost:3030/data/movies/${movie._id}`, {
            method: 'PUT',
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
        showDetails(movie._id);

    } catch (error) {
        alert(error.message);
    }
}
