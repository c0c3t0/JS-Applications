import { htmlGenerator, setActiveNav, showSection } from './dom.js';
import { showEdit } from './edit.js';
import { deleteRecipe } from './delete.js';

const main = document.querySelector('main');

const section = document.querySelector('#details');

export function showDetails(id) {
    showSection(section);
    recipeDetails(id);
    setActiveNav();
}

export async function recipeDetails(id) {
    try {
        const response = await fetch(`http://localhost:3030/data/recipes/${id}`);
        const data = await response.json();

        if (!response.ok) {
            throw new Error(response.message);
        }

        const article = htmlGenerator('article', '', 'preview', main);

        htmlGenerator('h2', data.name, '', article);
        const divBand = htmlGenerator('div', '', 'band', article);
        const divThumb = htmlGenerator('div', '', 'thumb', divBand);

        const img = htmlGenerator('img', '', '', divThumb);
        img.setAttribute('src', data.img);

        const divIngredients = htmlGenerator('div', '', 'ingredients', divBand);
        htmlGenerator('h3', 'Ingredients:', '', divIngredients);
        const ul = htmlGenerator('ul', '', '', divIngredients);
        data.ingredients.forEach(ingr => {
            htmlGenerator('li', ingr, '', ul);
        })

        const divDescription = htmlGenerator('div', '', 'description', article);
        htmlGenerator('h3', 'Preparation:', '', divDescription);
        data.steps.forEach(step => {
            htmlGenerator('p', step, '', divDescription);
        });

        const userId = sessionStorage.getItem('userId');

        if (userId !== null && data._ownerId === userId) {
            const buttonsDiv = htmlGenerator('div', '', 'controls', article);
            const editBtn = htmlGenerator('button', '\u270E Edit', '', buttonsDiv);
            const deleteBtn = htmlGenerator('button', '\u2716 Delete', '', buttonsDiv);

            editBtn.addEventListener('click', () => showEdit(data));
            deleteBtn.addEventListener('click', () => deleteRecipe(data));
        }

        section.replaceChildren();
        section.appendChild(article);

    } catch (error) {
        alert(error.message);
    }
}
