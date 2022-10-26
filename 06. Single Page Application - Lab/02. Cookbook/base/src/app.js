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
        cards.forEach(card => main.appendChild(card));
    }

    showNav();


    const anchorTags = {
        catalogLink: showCatalog,
        loginLink,
        registerLink
    }

    function showNav(){
        nav.addEventListener('click', (e) => {
            if(e.target.tagName === 'A') {
                if(anchorTags[e.target.id]) {
                    e.preventDefault();
                    anchorTags[e.target.id]();          // debug this
                }
            }
        })
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
                } else {
                    console.error(response.json())
                }
            })
    }
});



