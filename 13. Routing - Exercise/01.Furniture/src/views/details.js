import { deleteById, getById } from '../api/data.js';
import { html, nothing } from '../lit.js';

const detailsTemplate = (data, isOwner) => html`
<div class="row space-top">
    <div class="col-md-12">
        <h1>Furniture Details</h1>
    </div>
</div>
<div class="row space-top">
    <div class="col-md-4">
        <div class="card text-white bg-primary">
            <div class="card-body">
                <img src=.${data.img} />
            </div>
        </div>
    </div>
    <div class="col-md-4">
        <p>Make: <span>${data.make}</span></p>
        <p>Model: <span>${data.model}</span></p>
        <p>Year: <span>${data.year}</span></p>
        <p>Description: <span>${data.description}</span></p>
        <p>Price: <span>${data.price} $</span></p>
        <p>Material: <span>${data.material}</span></p>
        ${isOwner
        ? html`
        <div>
            <a href=/edit/${data._id} class="btn btn-info">Edit</a>
            <a href=”#” @click=${deleteItem} class="btn btn-red">Delete</a>
        </div>`
        : nothing}
    </div>
</div>
`;

let ctx = null;

export async function showDetails(context) {
    ctx = context;
    const id = ctx.params.id;
    const data = await getById(id);
    const user = JSON.parse(sessionStorage.getItem('user'));
    const isOwner = user._id === data._ownerId;

    ctx.render(detailsTemplate(data, isOwner));
}

async function deleteItem(e) {
    e.preventDefault();
    const confirmed = confirm('Are you sure you want to delete this item?');
    if (confirmed) {
        await deleteById(ctx.params.id);
        ctx.page.redirect('/catalog');
    }
}
