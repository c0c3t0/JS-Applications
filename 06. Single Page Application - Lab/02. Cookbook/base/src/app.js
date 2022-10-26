import { getRecipes, createRecipePreview } from './catalog.js';


window.addEventListener('load', async () => {
    setUserNav();
    showCatalog();

    const main = document.querySelector('main');
    const nav = document.querySelector('nav');

    async function showCatalog() {
        const recipes = await getRecipes();
        const cards = recipes.map(createRecipePreview);

        main.innerHTML = '';
        cards.forEach(c => main.appendChild(c));

    }





    function setUserNav() {
        if (sessionStorage.getItem('accessToken') !== null) {
            document.querySelector('#user').style.display = 'inline-block';
            document.querySelector('#guest').style.display = 'none';
        } else {
            document.querySelector('#user').style.display = 'none';
            document.querySelector('#guest').style.display = 'inline-block';
        }
    }

    function logout() {
        fetch('http://localhost:3030/users/logout', {
            method: 'GET',
            headers: {
                'X-Authorization': sessionStorage.getItem('accessToken')
            }
        })
            .then(response => {
                if (response.ok) {
                    sessionStorage.removeItem('accessToken');
                    // window.location.pathname = '06. Single Page Application - Lab/02. Cookbook/base/index.html';
                } else {
                    console.error(response.json())
                }
            })
    }
});



