import { searchItem } from "../api/data.js";
import { html } from "../lit.js";


const searchTemplate = html`
<section id="search-cars">
            <h1>Filter by year</h1>

            <div class="container">
                <input id="search-input" type="text" name="search" placeholder="Enter desired production year">
                <button @click=${onSearch} class="button-list">Search</button>
            </div>

    <h2>Results:</h2>
</section>`;

const showDataTemplate = (searchTemplate, data) => html`${searchTemplate}
    <div class="listings">
        ${data.length === 0 ? html`<p class="no-cars"> No results.</p>` : data.map(item => itemCard(item))}
    </div>`;

const itemCard = (item) => html`
<div class="listing">
    <div class="preview">
        <img src=${item.imageUrl}>
    </div>
    <h2>${item.brand} ${item.model}</h2>
    <div class="info">
        <div class="data-info">
            <h3>Year: ${item.year}</h3>
            <h3>Price: ${item.price} $</h3>
        </div>
        <div class="data-buttons">
            <a href="/details/${item._id}" class="button-carDetails">Details</a>
        </div>
    </div>
</div>`;

let ctx = null;

async function onSearch() {
    const btn = document.querySelector('#search-input');
    const query = btn.value;
    if (!query) {
        alert('Enter an year');
        return;
    }
    console.log(query);

    const results = await searchItem(query);
    console.log(query);
    console.log(results);

    ctx.render(showDataTemplate(searchTemplate, results));
    btn.value = '';
}

export async function showSearch(context) {
    ctx = context;
    ctx.render(searchTemplate);
}
