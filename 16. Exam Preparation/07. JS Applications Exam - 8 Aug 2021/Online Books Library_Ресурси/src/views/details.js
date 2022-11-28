import {  addLike, deleteById, getById, getTotalCount, liked } from '../api/data.js';
import { html, nothing } from '../lit.js';

const detailsTemplate = (data, isOwner, isLogged, hasLiked, totalCount) => html`
<section id="details-page" class="details">
    <div class="book-information">
        <h3>${data.title}</h3>
        <p class="type">Type: ${data.type}</p>
        <p class="img"><img src=${data.imageUrl}></p>
        <div class="actions">
            <div id="action-buttons">
                ${isOwner
        ? html`
                <a href="/edit/${data._id}" class="button">Edit</a>
                <a @click=${deleteItem} href="#" class="button">Delete</a>`
        : nothing}
                ${isLogged && !isOwner && hasLiked == 0 
        ? html`
                <a @click=${onLike} class="button" href="#">Like</a>`
        : nothing}
               
                <div class="likes">
                    <img class="hearts" src="/images/heart.png">
                    <span id="total-likes">Likes: ${totalCount}</span>
                </div>
            </div>
        </div>
        <div class="book-description">
            <h3>Description:</h3>
            <p>${data.description}</p>
        </div>
</section>
`;

let ctx = null;

export async function showDetails(context) {
    ctx = context;
    const bookId = ctx.params.id;
    const data = await getById(bookId);
    const totalCount = await getTotalCount(bookId);


    const user = JSON.parse(sessionStorage.getItem('user'));
    const isOwner = user ? user._id === data._ownerId : false;
    const isLogged = !user ? false : true;
    let hasLiked = 0;

    if (isLogged && !isOwner) {
        hasLiked = await liked(bookId, user._id);
    }

    ctx.render(detailsTemplate(data, isOwner, isLogged, hasLiked, totalCount));
}

async function onLike() {
    const bookId = ctx.params.id;
    await addLike({ bookId });
    ctx.page.redirect(`/details/${bookId}`);
}

async function deleteItem() {
    const confirmed = confirm('Are you sure you want to delete this item?');
    if (confirmed) {
        await deleteById(ctx.params.id);
        ctx.page.redirect('/');
    }
}

