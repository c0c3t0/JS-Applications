window.addEventListener('load', () => {
    getAllRecipes();
});

function getAllRecipes() {
    fetch('http://localhost:3030/jsonstore/cookbook/recipes')
        .then(response => {
            return response.json();
        })
        .then(data => {
            document.querySelector('main p').remove();
            let main = document.querySelector('main');

            Object.values(data)
                .forEach(x => {
                    let article = htmlGenerator('article', '', 'preview', main);
                    let div = htmlGenerator('div', '', 'title', article);
                    htmlGenerator('h2', x.name, '', div);
                    let div2 = htmlGenerator('div', '', 'small', article);
                    let img = htmlGenerator('img', '', '', div2);
                    img.setAttribute('src', x.img);

                    article.addEventListener('click', () => reciepeDetails(x._id, article));
                })
        })
}

function reciepeDetails(id, recipe) {
    fetch(`http://localhost:3030/jsonstore/cookbook/details/${id}`)
        .then(responce => {
            return responce.json();
        })
        .then(data => {
            let main = document.querySelector('main');

            let article = htmlGenerator('article', '', 'preview', main);
            htmlGenerator('h2', data.name, '', article);
            let divBand = htmlGenerator('div', '', 'band', article);
            let divThumb = htmlGenerator('div', '', 'thumb', divBand);
            let img = htmlGenerator('img', '', '', divThumb);
            img.setAttribute('src', data.img);
            let divIngredients = htmlGenerator('div', '', 'ingredients', divBand);
            htmlGenerator('h3', 'Ingredients:', '', divIngredients);
            let ul = htmlGenerator('ul', '', '', divIngredients);
            data.ingredients.forEach(ingr => {
                htmlGenerator('li', ingr, '', ul);
            })
            let divDescription = htmlGenerator('div', '', 'description', article);
            htmlGenerator('h3', 'Preparation:', '', divDescription);
            data.steps.forEach(step => {
                htmlGenerator('p', step, '', divDescription);
            })
            recipe.replaceWith(article);

        })
}

function htmlGenerator(tagName, content, nameOfClass, parent) {
    let el = document.createElement(tagName);
    el.textContent = content;

    if (nameOfClass) {
        el.className = nameOfClass;
    }

    if (parent) {
        parent.appendChild(el);
    }

    return el;

}