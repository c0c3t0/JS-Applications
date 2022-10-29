import { htmlGenerator, setActiveNav } from './dom.js';
import { showDetails } from './details.js';

const main = document.querySelector('main');

export async function showCatalog() {
    main.replaceChildren();
    setActiveNav('catalogLink');

    const section = htmlGenerator('section', '', '', main);

    try {
        const response = await fetch('http://localhost:3030/data/recipes')
        const data = await response.json();

        if(!response.ok) {
            throw new Error(response.message);
        }

        Object.values(data)
            .forEach(x => {
                const article = htmlGenerator('article', '', 'preview', section);
                const div = htmlGenerator('div', '', 'title', article);
                htmlGenerator('h2', x.name, '', div);
                const div2 = htmlGenerator('div', '', 'small', article);
                const img = htmlGenerator('img', '', '', div2);
                img.setAttribute('src', x.img);

                article.addEventListener('click', () => showDetails(x._id));
            });

        if (!response.ok) {
            throw new Error(response.message);
        }

    } catch (error) {
        alert(error.message);
    }
}
