import { html } from '../lit.js';
import { getAllItems } from "../api/data.js";

const dashboardTemplate = (data) => html`
<section id="car-listings">
    <h1>Car Listings</h1>
    <div class="listings">
        ${data.length > 0 ? data.map(itemCard) : html`<p class="no-cars">No cars in database.</p>`}
</section>`;

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

let ctx;

export async function showDashboard(context) {
    ctx = context;
    const data = await getAllItems();
    ctx.render(dashboardTemplate(data));
}
