import { showSection } from "./dom.js";
import { showCatalog } from "./catalog.js";

const section = document.querySelector('#edit');

export function showEdit(data) {
    showSection(section);
    editRecipe(data)
}

async function editRecipe(recipe) {
    const response = await fetch(`http://localhost:3030/data/recipes/${recipe._id}`);
    const data = await response.json();

    section.querySelector('label [name="name"]').value = data.name;
    section.querySelector('label [name="img"]').value = data.img;
    section.querySelector('[name="ingredients"]').value = data.ingredients.join('\n');
    section.querySelector('[name="steps"]').value = data.steps.join('\n');

    const form = document.querySelector('#edit form');
    form.addEventListener('submit', (e) => submitEditRecipe(e, data));
}

async function submitEditRecipe(e, recipe){
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
        const response = await fetch(`http://localhost:3030/data/recipes/${recipe._id}`, {
            method: 'PUT',
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
