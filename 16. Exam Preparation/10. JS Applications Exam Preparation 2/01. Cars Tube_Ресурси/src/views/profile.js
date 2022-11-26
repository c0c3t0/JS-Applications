import { getMyItems } from "../api/data.js";
import { html } from "../lit.js";

const myItemsTemplate = (data, user) => html`
<section id="my-listings">
    <h1>My car listings</h1>
    <div class="listings">
        ${data.length > 0
        ? data.map(item => myItemsCardTemplate(item))
        : html`<p class="no-cars"> You haven't listed any cars yet.</p>`}
    </div>
</section>`;

const myItemsCardTemplate = (item) => html`
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

export async function showProfile(context) {
    ctx = context;
    const user = JSON.parse(sessionStorage.getItem('user'));
    const data = await getMyItems(user._id);
    ctx.render(myItemsTemplate(data, user));
}
