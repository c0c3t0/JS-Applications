import { deleteById, donate, getById, getTotalCount, isDonate } from '../api/data.js';
import { html, nothing } from '../lit.js';

const detailsTemplate = (data, isOwner, isLogged, hasDonate, totalCount) => html`
<section id="detailsPage">
    <div class="details">
        <div class="animalPic">
            <img src=${data.image}>
        </div>
        <div>
            <div class="animalInfo">
                <h1>Name: ${data.name}</h1>
                <h3>Breed: ${data.breed}</h3>
                <h4>Age: ${data.age}</h4>
                <h4>Weight: ${data.weight}</h4>
                <h4 class="donation">Donation: ${totalCount !==0 ? totalCount + '00' : '0'}$</h4>
            </div>
            ${isLogged ? html`<div class="actionBtn">
                ${isOwner
                ? html`
                    <a href="/edit/${data._id}" class="edit">Edit</a>
                    <a @click=${deleteItem} href="#" class="remove">Delete</a>`
                : nothing}
                ${!isOwner && hasDonate == 0 
                ? html`<a @click=${onDonate} href="#" class="donate">Donate</a>` 
                : nothing}
            </div>`: nothing}
        </div>
    </div>
</section>`;

let ctx = null;

export async function showDetails(context) {
    ctx = context;
    const petId = ctx.params.id;
    const data = await getById(petId);
    const totalCount = await getTotalCount(petId);

    const user = JSON.parse(sessionStorage.getItem('user'));
    const isOwner = user ? user._id === data._ownerId : false;
    const isLogged = !user ? false : true;
    let hasDonate = 0;

    if (isLogged && !isOwner) {
        hasDonate = await isDonate(petId, user._id);

    }

    ctx.render(detailsTemplate(data, isOwner, isLogged, hasDonate, totalCount));
}

async function onDonate(e) {
    e.preventDefault();
    const petId = ctx.params.id;
    await donate({ petId });
    ctx.page.redirect(`/details/${petId}`);
}

async function deleteItem(e) {
    e.preventDefault();
    const confirmed = confirm('Are you sure you want to delete this item?');
    if (confirmed) {
        await deleteById(ctx.params.id);
        ctx.page.redirect('/');
    }
}
