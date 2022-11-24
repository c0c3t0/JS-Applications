import { getMyItems } from "../api/data.js";
import { html } from "../lit.js";

const myItemsTemplate = (data, user) => html`
<section id="my-books-page" class="my-books">
    <h1>My Books</h1>
    ${data.length > 0 
    ? html`<ul class="my-books-list">${data.map(item => myItemsCardTemplate(item))}</ul>` 
    : html`<p class="no-books">No books in database!</p>`}
</section>`;

const myItemsCardTemplate = (item) => html`
<li class="otherBooks">
    <h3>${item.title}</h3>
    <p>Type: ${item.type}</p>
    <p class="img"><img src=${item.imageUrl}></p>
    <a class="button" href="/details/${item._id}">Details</a>
</li>`;

let ctx;

export async function showProfile(context) {
    ctx = context;
    const user = JSON.parse(sessionStorage.getItem('user'));
    const data = await getMyItems(user._id);
    ctx.render(myItemsTemplate(data, user));
}
