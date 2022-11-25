import { addLike, deleteById, getById, getTotalCount, liked } from '../api/data.js';
import { html, nothing } from '../lit.js';

const detailsTemplate = (data, isOwner, isLogged, hasLiked, totalCount) => html`
<section id="detailsPage">
    <div id="detailsBox">
        <div class="detailsInfo">
            <h1>Title: ${data.title}</h1>
            <div>
                <img src=${data.imageUrl} />
            </div>
        </div>

        <div class="details">
            <h3>Theater Description</h3>
            <p>${data.description}</p>
            <h4>Date: ${data.date}</h4>
            <h4>Author: ${data.author}</h4>
            <div class="buttons">
                ${isOwner
        ? html`
                <a @click=${deleteItem} class="btn-delete" href="#">Delete</a>
                <a class="btn-edit" href="/edit/${data._id}">Edit</a>`
        : nothing}
                ${isLogged && !isOwner && hasLiked == 0
               ? html`
                <a @click=${onLike} class="btn-like" href="#">Like</a>`
        : nothing}
            </div>
            <p class="likes">Likes: ${totalCount}</p>
        </div>
    </div>
</section>`;

let ctx = null;

export async function showDetails(context) {
    ctx = context;
    const theaterId = ctx.params.id;
    const data = await getById(theaterId);
    const totalCount = await getTotalCount(theaterId);

    const user = JSON.parse(sessionStorage.getItem('user'));
    const isOwner = user ? user._id === data._ownerId : false;
    const isLogged = !user ? false : true;
    let hasLiked = 0;

    if (isLogged && !isOwner) {
        hasLiked = await liked(theaterId, user._id);
    }

    ctx.render(detailsTemplate(data, isOwner, isLogged, hasLiked, totalCount));
}

async function onLike() {
    await addLike({ theaterId });
    ctx.page.redirect(`/details/${ctx.params.id}`);
}

async function deleteItem() {
    const confirmed = confirm('Are you sure you want to delete this item?');
    if (confirmed) {
        await deleteById(ctx.params.id);
        ctx.page.redirect('/');
    }
}
