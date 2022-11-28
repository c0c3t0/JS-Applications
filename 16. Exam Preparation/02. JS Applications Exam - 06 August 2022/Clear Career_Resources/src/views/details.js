import { applied, apply, deleteById, getById, getTotalCount } from '../api/data.js';
import { html, nothing } from '../lit.js';

const detailsTemplate = (data, isOwner, isLogged, hasApplied, totalCount) => html`
<section id="details">
    <div id="details-wrapper">
        <img id="details-img" src=${data.imageUrl} alt="example1" />
        <p id="details-title">${data.title}</p>
        <p id="details-category">
            Category: <span id="categories">${data.category}</span>
        </p>
        <p id="details-salary">
            Salary: <span id="salary-number">${data.salary}</span>
        </p>
        <div id="info-wrapper">
            <div id="details-description">
                <h4>Description</h4>
                <span>${data.description}</span>
            </div>
            <div id="details-requirements">
                <h4>Requirements</h4>
                <span>${data.requirements}</span>
            </div>
        </div>
        <p>Applications: <strong id="applications">${totalCount}</strong></p>

        <div id="action-buttons">
        ${isOwner
            ? html`
            <a href="/edit/${data._id}" id="edit-btn">Edit</a>
            <a @click=${deleteItem} href="#" id="delete-btn">Delete</a>`
        : nothing}
        ${isLogged && !isOwner && hasApplied == 0 
            ? html`<a @click=${onApply} href="#" id="apply-btn">Apply</a>` 
        : nothing}
        </div>
    </div>
</section>`;

let ctx = null;

export async function showDetails(context) {
    ctx = context;
    const offerId = ctx.params.id;
    const data = await getById(offerId);
    const totalCount = await getTotalCount(offerId);

    const user = JSON.parse(sessionStorage.getItem('user'));
    const isOwner = user ? user._id === data._ownerId : false;
    const isLogged = !user ? false : true;
    let hasApplied = 0;

    if (isLogged && !isOwner) {
        hasApplied = await applied(offerId, user._id);
    }

    ctx.render(detailsTemplate(data, isOwner, isLogged, hasApplied, totalCount));
}

async function onApply(e) {
    e.preventDefault();
    const offerId = ctx.params.id;
    await apply({ offerId });
    ctx.page.redirect(`/details/${ctx.params.id}`)
}

async function deleteItem(e) {
    e.preventDefault();
    const confirmed = confirm('Are you sure you want to delete this item?');
    if (confirmed) {
        await deleteById(ctx.params.id);
        ctx.page.redirect('/dashboard');
    }
}

