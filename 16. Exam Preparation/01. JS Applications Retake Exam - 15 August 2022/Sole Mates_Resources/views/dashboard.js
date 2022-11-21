import { html } from '../lit.js';
import { getAllItems } from "../api/data.js";

const dashboardTemplate = (data) => html`
<section id="dashboard">
    <h2>Collectibles</h2>
    <ul class="card-wrapper">
        ${data.length > 0 ? data.map(createItemCard) : html`<h2>There are no items added yet.</h2>`}
    </ul>
</section>`;

const createItemCard = (item) => html`
<li class="card">
    <img src=${item.imageUrl} alt="travis" />
    <p>
        <strong>Brand: </strong><span class="brand">${item.brand}</span>
    </p>
    <p>
        <strong>Model: </strong><span class="model">${item.model}</span>
    </p>
    <p><strong>Value:</strong><span class="value">${item.value}</span>$</p>
    <a class="details-btn" href="/details/${item._id}">Details</a>
</li>`;

export async function showDashboard(ctx) {
    const data = await getAllItems();
    ctx.render(dashboardTemplate(data));
}
