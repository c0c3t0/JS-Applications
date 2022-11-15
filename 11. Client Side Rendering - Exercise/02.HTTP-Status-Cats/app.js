import { html, render } from './node_modules/lit-html/lit-html.js';
import { cats } from './catSeeder.js';

const section = document.querySelector('#allCats');

const template = html`
    <ul>
        ${cats.map(cat => createCatCard(cat))}
    </ul>`;

function createCatCard(cat) {
    const catTemplate = html`
    <li>
        <img src="../images/${cat.imageLocation}.jpg " width="250" height="250" alt="Card image cap">
        <div class="info">
            <button class="showBtn" @click=${showDetails}>Show status code</button>
            <div class="status" style="display: none" id=${cat.id}>
                <h4>Status Code: ${cat.statusCode}</h4>
                <p>${cat.statusMessage}</p>
            </div>
        </div>
    </li>`

    return catTemplate;
}

render(template, section);

function showDetails(e) {
    e.preventDefault();
    const button = e.target;
    const parent = e.target.parentElement;
    const details = parent.querySelector('.status');

    if (details.style.display === 'block') {
        details.style.display = 'none';
        button.textContent = 'Show status code';
    } else {
        details.style.display = 'block';
        button.textContent = 'Hide status code';
    };
}
