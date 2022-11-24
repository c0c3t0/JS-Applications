import { html } from '../lit.js';
import { getAllItems } from "../api/data.js";

const dashboardTemplate = (data) => html`
<section id="dashboard-page" class="dashboard">
    <h1>Dashboard</h1>
    ${data.length > 0 
    ? html`<ul class="other-books-list">${data.map(item => itemCard(item))}</ul>` 
    : html` < p class="no-books" > No books in database!</p > `}
</section>`;

const itemCard = (item) => html`
<li class="otherBooks">
    <h3>${item.title}</h3>
    <p>Type: ${item.type}</p>
    <p class="img"><img src=${item.imageUrl}></p>
    <a class="button" href="/details/${item._id}">Details</a>
</li>`;

let ctx;

export async function showDashboard(context) {
    ctx = context;
    const data = await getAllItems();
    ctx.render(dashboardTemplate(data));
}
