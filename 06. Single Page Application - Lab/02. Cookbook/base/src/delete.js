import { htmlGenerator } from "./dom.js";

const section = document.querySelector('#details');

export async function deleteRecipe(recipe) {
    const confirmed = confirm(`Are you sure you want to delete ${recipe.name}?`);

    if (confirmed) {
        const token = sessionStorage.getItem('accessToken');

        try {
            const response = await fetch(`http://localhost:3030/data/recipes/${recipe._id}`, {
                method: 'DELETE',
                headers: {
                    'X-Authorization': token
                }
            });

            if (response.status != 200) {
                const error = await response.json();
                throw new Error(error.message);
            }

            section.replaceChildren();
            const article = htmlGenerator('article');
            htmlGenerator('h2', 'Recipe Deleted', '', article);
            section.appendChild(article);
            
        } catch (error) {
            alert(error.message);
        }
    }
}
