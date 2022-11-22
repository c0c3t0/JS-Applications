import { getMyItems } from "../api/data.js";
import { html } from "../lit.js";

const myItemsTemplate = (data) => html`
<section id="my-posts-page">
    <h1 class="title">My Posts</h1>
    ${data.length === 0 ? html`<h1 class="title no-posts-title">You have no posts yet!</h1>`
    : data.map(myItemsCardTemplate)}
</section>`;

const myItemsCardTemplate = (item) => html`
<div class="my-posts">
    <div class="post">
        <h2 class="post-title">${item.title}</h2>
        <img class="post-image" src=${item.imageUrl} alt="Material Image">
        <div class="btn-wrapper">
            <a href="/details/${item._id}" class="details-btn btn">Details</a>
        </div>
    </div>
</div>`;

let ctx;

export async function showMyItems(context) {
    ctx = context;
    const user = JSON.parse(sessionStorage.getItem('user'));
    const userId = user && user._id;
    const data = await getMyItems(userId);
    ctx.render(myItemsTemplate(data));
}
