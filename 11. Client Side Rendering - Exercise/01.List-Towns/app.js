import {html, render} from './node_modules/lit-html/lit-html.js';

const root = document.querySelector('#root');
const form = document.querySelector('form');
form.addEventListener('submit', onSubmit);

function onSubmit(e){
    e.preventDefault();

    const formData = new FormData(e.target);
    let towns = formData.get('towns');
    towns = towns.split(', ');
    renderList(towns);
    form.reset();
}

function renderList(towns){
    const result = createList(towns);
    render(result, root);
}

function createList(towns) {
    const ul = html`<ul>
        ${towns.map(town => html`<li>${town}</li>`)}</ul>`
    return ul
}
