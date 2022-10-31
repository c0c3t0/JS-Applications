import { showCatalog } from './catalog.js';
import { showSection, setActiveNav } from './dom.js';

const form = document.querySelector('#create form');
form.addEventListener('submit', createReciepe);

const section = document.querySelector('#create');

export function showCreate() {
    showSection(section);
    setActiveNav('createLink');
}

async function createReciepe(e) {
    e.preventDefault();

    const data = new FormData(e.target);
    const name = data.get('name');
    const img = data.get('img');
    const ingredients = data.get('ingredients').split('\n');
    const steps = data.get('steps').split('\n');

    if (name === '' || img === '' || ingredients === '' || steps === '') {
        alert('All fields are required');
        return;
    }

    const token = sessionStorage.getItem('accessToken');

    try {
        const response = await fetch('http://localhost:3030/data/recipes', {
            method: 'POST',
            headers: {
                'content-type': 'application/json',
                'X-Authorization': token
            },
            body: JSON.stringify({
                name,
                img,
                ingredients,
                steps
            })
        });
        if (!response.ok) {
            const data = await response.json();
            throw new Error(data.message);
        }
        showCatalog();

    } catch (error) {
        alert(error.message);
    }
}
