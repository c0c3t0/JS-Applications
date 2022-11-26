import { deleteById, getById } from '../api/data.js';
import { html, nothing } from '../lit.js';

const detailsTemplate = (data, isOwner) => html`
<section id="detailsPage">
    <div class="wrapper">
        <div class="albumCover">
            <img src=${data.imgUrl}>
        </div>
        <div class="albumInfo">
            <div class="albumText">

                <h1>Name: ${data.name}</h1>
                <h3>Artist: ${data.artist}</h3>
                <h4>Genre: ${data.genre}</h4>
                <h4>Price: $${data.price}</h4>
                <h4>Date: ${data.releaseDate}</h4>
                <p>Description: ${data.description} </p>
            </div>
            ${isOwner
            ? html`
            <div class="actionBtn">
                <a href="/edit/${data._id}" class="edit">Edit</a>
                <a @click=${deleteItem} href="#" class="remove">Delete</a>
            </div>` : nothing}
        </div>
    </div>
</section>`;

let ctx = null;

export async function showDetails(context) {
    ctx = context;
    const id = ctx.params.id;
    const data = await getById(id);
    console.log(data);

    const user = JSON.parse(sessionStorage.getItem('user'));
    const isOwner = user ? user._id === data._ownerId : false;

    ctx.render(detailsTemplate(data, isOwner));
}

async function deleteItem() {
    const confirmed = confirm('Are you sure you want to delete this item?');
    if (confirmed) {
        await deleteById(ctx.params.id);
        ctx.page.redirect('/dashboard');
    }
}
