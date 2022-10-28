import { htmlGenerator } from './dom.js';

const main = document.querySelector('main');

export async function showCatalog(catalog) {
    main.replaceChildren();

    const section = htmlGenerator('section', '', '', main);

    try {
        const response = await fetch('http://localhost:3030/jsonstore/cookbook/recipes')
        const data = await response.json();

        Object.values(data)
            .forEach(x => {
                const article = htmlGenerator('article', '', 'preview', section);
                const div = htmlGenerator('div', '', 'title', article);
                htmlGenerator('h2', x.name, '', div);
                const div2 = htmlGenerator('div', '', 'small', article);
                const img = htmlGenerator('img', '', '', div2);
                img.setAttribute('src', x.img);

                article.addEventListener('click', () => reciepeDetails(x._id, article));
            });

        if (!response.ok) {
            throw new Error(response.message);
        }

    } catch (error) {
        alert(error.message);
    }
}

async function reciepeDetails(id, recipe) {
    try {
        const response = await fetch(`http://localhost:3030/jsonstore/cookbook/details/${id}`)
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
        const buttonsDiv = htmlGenerator('div', '', 'controls', article);
        const editBtn = htmlGenerator('button', '\u270E Edit', '', buttonsDiv);
        const deleteBtn = htmlGenerator('button', '\u2716 Delete', '', buttonsDiv);

        // editBtn.addEventListener('click', editRecipe);
        // deleteBtn.addEventListener('click', deleteRecipe);
        recipe.replaceWith(article);

    } catch (error) {
        alert(error.message);
    }

}