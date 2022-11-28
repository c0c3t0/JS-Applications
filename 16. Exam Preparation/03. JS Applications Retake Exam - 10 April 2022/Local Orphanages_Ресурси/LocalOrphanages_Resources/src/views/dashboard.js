import { html } from '../lit.js';
import { getAllItems } from "../api/data.js";

const dashboardTemplate = (data) => html`
<section id="dashboard-page">
    <h1 class="title">All Posts</h1>
    ${data.length > 0 
        ? html`<div class="all-posts">${data.map(itemCard)}</div>` 
        : html`<h1 class="title no-posts-title">No posts yet!</h1>`}
</section>`;

const itemCard = (item) => html`
<div class="post">
    <h2 class="post-title">${item.title}</h2>
    <img class="post-image" src=${item.imageUrl} alt="Material Image">
    <div class="btn-wrapper">
        <a href="/details/${item._id}" class="details-btn btn">Details</a>
    </div>
</div>`;

let ctx;

export async function showDashboard(context) {
    ctx = context;
    const data = await getAllItems();
    ctx.render(dashboardTemplate(data));
}
