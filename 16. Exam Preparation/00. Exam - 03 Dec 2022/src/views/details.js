import { addLike, deleteById, getById, getTotalCount, liked } from '../api/data.js';
import { html, nothing } from '../lit.js';

const detailsTemplate = (data, isOwner, isLogged, hasLiked, totalCount) => html`
    <section id="details">
        <div id="details-wrapper">
            <p id="details-title">Album Details</p>
            <div id="img-wrapper">
                <img src=${data.imageUrl} alt="example1" />
            </div>
            <div id="info-wrapper">
                <p><strong>Band:</strong><span id="details-singer">${data.singer}</span></p>
                <p>
                    <strong>Album name:</strong><span id="details-album">${data.album}</span>
                </p>
                <p><strong>Release date:</strong><span id="details-release">${data.release}</span></p>
                <p><strong>Label:</strong><span id="details-label">${data.label}</span></p>
                <p><strong>Sales:</strong><span id="details-sales">${data.sales}</span></p>
            </div>
            <div id="likes">Likes: <span id="likes-count">${totalCount}</span></div>
            ${isLogged && isOwner
           ? html`
            <div id="action-buttons">
                <a href="/edit/${data._id}" id="edit-btn">Edit</a>
                <a @click=${deleteItem} href="#" id="delete-btn">Delete</a>
            </div>`
            : nothing}
            ${isLogged && !isOwner && hasLiked == 0
           ? html`
            <div id="action-buttons">
                <a @click=${onLike} href="#" id="like-btn">Like</a>
            </div>`
            : nothing}
    
        </div>
    </section>`;

let ctx = null;

export async function showDetails(context) {
    ctx = context;
    const albumId = ctx.params.id;
    const data = await getById(albumId);
    const totalCount = await getTotalCount(albumId);

    const user = JSON.parse(sessionStorage.getItem('user'));
    const isOwner = user ? user._id === data._ownerId : false;
    const isLogged = !user ? false : true;
    let hasLiked = 0;

    if (isLogged && !isOwner) {
        hasLiked = await liked(albumId, user._id);
    }

    ctx.render(detailsTemplate(data, isOwner, isLogged, hasLiked, totalCount));
}

async function onLike() {
    const albumId = ctx.params.id;
    await addLike({ albumId });
    ctx.page.redirect(`/details/${ctx.params.id}`)
}

async function deleteItem() {
    const confirmed = confirm('Are you sure you want to delete this item?');
    if (confirmed) {
        await deleteById(ctx.params.id);
        ctx.page.redirect('/dashboard');
    }
}
