import { deleteById, donate, donateByUser, getById, getTotalCount } from '../api/data.js';
import { html, nothing } from '../lit.js';

const detailsTemplate = (data, isOwner, isLogged, hasDonate, totalCount) => html`
<section id="details-page">
    <h1 class="title">Post Details</h1>

    <div id="container">
        <div id="details">
            <div class="image-wrapper">
                <img src=${data.imageUrl} alt="Material Image" class="post-image">
            </div>
            <div class="info">
                <h2 class="title post-title">${data.title}</h2>
                <p class="post-description">Description: ${data.description}</p>
                <p class="post-address">Address: ${data.address}</p>
                <p class="post-number">Phone number: ${data.phone}</p>
                <p class="donate-Item">Donate Materials: ${totalCount}</p>
                ${isLogged 
                    ? html`<div class="btns">
                        ${isOwner
                            ? html`<a href="/edit/${data._id}" class="edit-btn btn">Edit</a>
                            <a @click=${deleteItem} href="javascript:void(0)" class="delete-btn btn">Delete</a></div>`
                        : nothing}
                        ${!isOwner && hasDonate == 0 
                            ? html`<a @click=${onDonate} href="#" class="donate-btn btn">Donate</a></div>`
                        : nothing}`
                : nothing}
            </div>
        </div>
    </div>
</section>`;

let ctx = null;

export async function showDetails(context) {
    ctx = context;
    const postId = ctx.params.id;
    const data = await getById(postId);
    const totalCount = await getTotalCount(postId);

    const user = JSON.parse(sessionStorage.getItem('user'));
    const isOwner = user ? user._id === data._ownerId : false;
    const isLogged = !user ? false : true;
    let hasDonate = 0;

    if (isLogged && !isOwner) {
        hasDonate = await donateByUser(postId, user._id);
    }

    ctx.render(detailsTemplate(data, isOwner, isLogged, hasDonate, totalCount));
}

async function onDonate() {
    const postId = ctx.params.id;
    await donate({ postId });
    ctx.redirect('/details/${ctx.params.id}');
}

async function deleteItem() {
    const confirmed = confirm('Are you sure you want to delete this item?');
    if (confirmed) {
        await deleteById(ctx.params.id);
        ctx.page.redirect('/');
    }
}
