import { html } from '../lit.js';
import { getAllItems } from "../api/data.js";

const dashboardTemplate = (data) => html`
<section id="dashboard">
    <h2 class="dashboard-title">Services for every animal</h2>
    <div class="animals-dashboard">
        ${data.length > 0 
            ? data.map(itemCard) 
            : html`
            <div>
                <p class="no-pets">No pets in dashboard</p>
        </div>`}
    </div>
</section>`;

const itemCard = (item) => html`
<div class="animals-board">
    <article class="service-img">
        <img class="animal-image-cover" src=${item.image}>
    </article>
    <h2 class="name">${item.name}</h2>
    <h3 class="breed">${item.breed}</h3>
    <div class="action">
        <a class="btn" href="/details/${item._id}">Details</a>
    </div>
</div>`;

let ctx;

export async function showDashboard(context) {
    ctx = context;
    const data = await getAllItems();
    ctx.render(dashboardTemplate(data));
}
