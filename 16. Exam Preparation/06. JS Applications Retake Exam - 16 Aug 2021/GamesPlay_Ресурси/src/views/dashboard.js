import { html } from '../lit.js';
import { getAllItems } from "../api/data.js";

const dashboardTemplate = (data) => html`
<section id="catalog-page">
    <h1>All Games</h1>
    ${data.length > 0 ? data.map(itemCard) : html`<h3 class="no-articles">No articles yet</h3>`}
</section>`;

const itemCard = (item) => html`
<div class="allGames">
    <div class="allGames-info">
        <img src=${item.imageUrl}>
        <h6>${item.category}</h6>
        <h2>${item.title}</h2>
        <a href="/details/${item._id}" class="details-button">Details</a>
    </div>
</div>`;

let ctx;

export async function showDashboard(context) {
    ctx = context;
    const data = await getAllItems();
    ctx.render(dashboardTemplate(data));
}
