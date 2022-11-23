import { deleteById, getById } from '../api/data.js';
import { html, nothing } from '../lit.js';

const detailsTemplate = (data, isOwner) => html`
<section id="meme-details">
    <h1>Meme Title: ${data.title}</h1>
    <div class="meme-details">
        <div class="meme-img">
            <img alt="meme-alt" src=${data.imageUrl}>
        </div>
        <div class="meme-description">
            <h2>Meme Description</h2>
            <p>${data.description} </p>

            ${isOwner
        ? html`
            <a href="/edit/${data._id}" class="button warning">Edit</a>
            <a @click=${deleteItem} class="button danger">Delete</a>`
        : nothing}
        </div>
    </div>
</section>`;

let ctx = null;

export async function showDetails(context) {
    ctx = context;
    const id = ctx.params.id;
    const data = await getById(id);

    const user = JSON.parse(sessionStorage.getItem('user'));
    const isOwner = user ? user._id === data._ownerId : false;

    ctx.render(detailsTemplate(data, isOwner));
}

async function deleteItem(e) {
    e.preventDefault();
    const confirmed = confirm('Are you sure you want to delete this item?');
    if (confirmed) {
        await deleteById(ctx.params.id);
        ctx.page.redirect('/dashboard');
    }
}
