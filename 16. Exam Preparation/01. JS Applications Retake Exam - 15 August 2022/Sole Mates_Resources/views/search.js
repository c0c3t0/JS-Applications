import { searchItem } from "../api/data.js";
import { html, nothing } from "../lit.js";

const searchTemplate = (data, isLogged) => html`
<section id="search">
    <h2>Search by Brand</h2>

    <form @submit=${getFormData} class="search-wrapper cf">
        <input id="#search-input" type="text" name="search" placeholder="Search here..." required />
        <button type="submit">Search</button>
    </form>

    <h3>Results:</h3>

    <div id="search-container">
        <ul class="card-wrapper">
            ${data && data.length !== 0 ? data.map(item => itemCard(item, isLogged)) : nothing}
            ${data && data.length === 0 ? html`<h2>There are no results found.</h2>` : nothing};
        </ul>
    </div>
</section>`;

const itemCard = (item, isLogged) => html`
<li class="card">
    <img src=${item.imageUrl} alt="travis" />
    <p>
        <strong>Brand: </strong><span class="brand">${item.brand} </span>
    </p>
    <p>
        <strong>Model: </strong><span class="model">${item.model} </span>
    </p>
    <p><strong>Value:</strong><span class="value">${item.value} </span>$</p>
    ${!isLogged ? nothing : html`<a class="details-btn" href="/details/${item._id}">Details</a>`}
</li>`;

let ctx = null;

async function getFormData(e) {
    e.preventDefault();
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData);
    const userData = JSON.parse(sessionStorage.getItem('user'));
    const isLogged = !userData ? false : true;

    if (!data.search) {
        alert('What are you searching for?');
        return;
    }

    const results = await searchItem(data.search);
    ctx.render(searchTemplate(results, isLogged));
    e.target.reset();
}

export async function showSearch(context) {
    ctx = context;
    ctx.render(searchTemplate());
}
