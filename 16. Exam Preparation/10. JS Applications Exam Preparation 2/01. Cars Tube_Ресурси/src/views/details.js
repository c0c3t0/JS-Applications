import { deleteById, getById } from '../api/data.js';
import { html, nothing } from '../lit.js';

const detailsTemplate = (data, isOwner, isLogged) => html`
<section id="listing-details">
    <h1>Details</h1>
    <div class="details-info">
        <img src=${data.imageUrl}>
        <hr>
        <ul class="listing-props">
            <li><span>Brand:</span>${data.brand}</li>
            <li><span>Model:</span>${data.model}</li>
            <li><span>Year:</span>${data.year}</li>
            <li><span>Price:</span>${data.price}$</li>
        </ul>

        <p class="description-para">${data.description}</p>

        ${isOwner
                ? html`
        <div class="listings-buttons">
            <a href="/edit/${data._id}" class="button-list">Edit</a>
            <a @click=${deleteItem} href="#" class="button-list">Delete</a>
        </div>`
                : nothing}
    </div>
</section>`;

let ctx = null;

export async function showDetails(context) {
    ctx = context;
    const offerId = ctx.params.id;
    const data = await getById(offerId);

    const user = JSON.parse(sessionStorage.getItem('user'));
    const isOwner = user ? user._id === data._ownerId : false;
    const isLogged = !user ? false : true;
   
    ctx.render(detailsTemplate(data, isOwner, isLogged));
}

async function deleteItem(e) {
    e.preventDefault();
    const confirmed = confirm('Are you sure you want to delete this item?');
    if (confirmed) {
        await deleteById(ctx.params.id);
        ctx.page.redirect('/dashboard');
    }
}
