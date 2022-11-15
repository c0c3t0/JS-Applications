import { html, render } from './node_modules/lit-html/lit-html.js';
import { towns } from './towns.js';

const root = document.querySelector('#towns');
document.querySelector('button').addEventListener('click', search);
const result = document.querySelector('#result');

update();

function createUl(allTowns, match) {
   const template = html`
   <ul>
      ${allTowns.map(allTowns => createLi(allTowns, match))}
   </ul>`;

   return template;
}


function createLi(town, match) {
   return html`
      <li class="${town.includes(match) 
      ? "active" 
      : ""
      }">${town}</li>`
}

function update(text) {
   const ul = createUl(towns, text)

   render(ul, root);
}

function search(e) {
   e.preventDefault();
   const input = document.querySelector('#searchText');
   const text = input.value;
   update(text);
   counter();
}

function counter() {
   const matches = document.querySelectorAll('.active');
   const showCount = matches ? html`<p>${matches.length} matches found</p>`: '';
   render(showCount, result);
}
