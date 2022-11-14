import { getIdeas } from "../api/data.js";
import { htmlGenerator } from "../api/dom.js";

const section = document.querySelector('#dashboard-holder');

export function showCatalog(context) {
    context.showSection(section);
    loadIdeas();
}

async function loadIdeas() {
    const ideas = await getIdeas();
    if (ideas.length === 0) {
        section.replaceChildren(htmlGenerator('h1', section, 'No ideas yet! Be the first one :)'));
    } else {
        section.replaceChildren(...ideas.map(createIdeaCard));
    }
}

function createIdeaCard(idea) {
    const div = htmlGenerator('div', section, '', 'card overflow-hidden current-card details');
    div.style.width = '20rem';
    div.style.height = '18rem';

    const div2 = htmlGenerator('div', div, '', 'card-body');
    htmlGenerator('p', div2, idea.title, 'card-text');

    const img = htmlGenerator('img', div, '', 'card-image');
    img.src = idea.img;
    img.alt = 'Card image cap';

    const a = htmlGenerator('a', div, 'Details', 'btn');

    return div;
}