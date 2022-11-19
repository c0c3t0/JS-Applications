import { getMyItems } from "../api/data.js";
import { html } from "../lit.js";

const myFurnitureTemplate = (data) => html`
<div class="row space-top">
    <div class="col-md-12">
        <h1>My Furniture</h1>
        <p>This is a list of your publications.</p>
    </div>
</div>
<div class="row space-top">
    ${Object.values(data).map(i => myFurnitureCardTemplate(i))}
</div>
    `;

const myFurnitureCardTemplate = (item) => html`
<div class="col-md-4">
    <div class="card text-white bg-primary">
        <div class="card-body">
            <img src=${item.img} />
            <p>${item.description}</p>
            <footer>
                <p>Price: <span>${item.price} $</span></p>
            </footer>
            <div>
                <a href="/details/${item._id}" class="btn btn-info">Details</a>
            </div>
        </div>
    </div>
</div>`;

let ctx;

export async function showMyFurniture(context) {
    ctx = context;
    const data = await getMyItems();
    ctx.render(myFurnitureTemplate(data));
}
