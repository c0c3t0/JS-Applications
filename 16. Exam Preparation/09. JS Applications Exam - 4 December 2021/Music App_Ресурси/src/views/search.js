import { searchItem } from "../api/data.js";
import { html, nothing } from "../lit.js";

const searchTemplate = html`
<section id="searchPage">
    <h1>Search by Name</h1>

    <div class="search">
        <input id="search-input" type="text" name="search" placeholder="Enter desired albums's name">
        <button @click=${onSearch} class="button-list">Search</button>
    </div>

    <h2>Results:</h2>
</section>`;

const showDataTemplate = (searchTemplate, data) => html`${searchTemplate}
    <div class="search-result">
        ${data && data.length !== 0 ? data.map(item => itemCard(item)) : nothing}
    </div>
    
    <div id="search-container">
        <ul class="card-wrapper">
            ${data && data.length === 0 ? html`<h2>No result.</h2>` : nothing};
        </ul>
    </div>`

const itemCard = (item) => html`
<div class="card-box">
    <img src=${item.imgUrl}>
    <div>
        <div class="text-center">
            <p class="name">Name: ${item.name}</p>
            <p class="artist">Artist: ${item.author}</p>
            <p class="genre">Genre: ${item.genre}</p>
            <p class="price">Price: $${item.price}</p>
            <p class="date">Release Date: ${item.releaseDate}</p>
        </div>
        ${JSON.parse(sessionStorage.getItem('user')) 
        ? html`
        <div class="btn-group">
            <a href="/details/${item._id}" id="details">Details</a>
        </div>` : nothing}
    </div>
</div>`;

let ctx = null;

async function onSearch() {
    const btn = document.querySelector('#search-input');
    const query = btn.value;
    if (!query) {
        alert('What are you searching for?');
        return;
    }

    const results = await searchItem(query);
    console.log(results);

    ctx.render(showDataTemplate(searchTemplate, results));
    btn.value = '';
}

export async function showSearch(context) {
    ctx = context;
    ctx.render(searchTemplate);
}
