import { getById, updateById } from '../api/data.js';
import { html } from '../lit.js';

const editTemplate = (item) => html`
<section id="edit-listing">
    <div class="container">

        <form @submit=${getFormData} id="edit-form">
            <h1>Edit Car Listing</h1>
            <p>Please fill in this form to edit an listing.</p>
            <hr>

            <p>Car Brand</p>
            <input type="text" placeholder="Enter Car Brand" name="brand" .value=${item.brand}>

            <p>Car Model</p>
            <input type="text" placeholder="Enter Car Model" name="model" .value=${item.model}>

            <p>Description</p>
            <input type="text" placeholder="Enter Description" name="description" .value=${item.description}>

            <p>Car Year</p>
            <input type="number" placeholder="Enter Car Year" name="year" .value=${item.year}>

            <p>Car Image</p>
            <input type="text" placeholder="Enter Car Image" name="imageUrl" .value=${item.imageUrl}>

            <p>Car Price</p>
            <input type="number" placeholder="Enter Car Price" name="price" .value=${item.price}>

            <hr>
            <input type="submit" class="registerbtn" value="Edit Listing">
        </form>
    </div>
</section>`;

let ctx = null;

export async function showEdit(context) {
    ctx = context;
    const data = await getById(ctx.params.id);
    console.log(data);
    context.render(editTemplate(data));
}

async function getFormData(e) {
    e.preventDefault();
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData);
    let { brand, model, description, year, imageUrl, price } = data;
    year = Number(year);
    price = Number(price);

    if (!brand || !model || !description || !year || !imageUrl || !price) {
        alert('All fields are required!');
        return;
    }
    if (year < 0) {
        alert('Year must be a positive integer!');
        return;
    }
    if (price < 0) {
        alert('Price must be a positive integer!');
        return;
    }

    await updateById(ctx.params.id, { brand, model, description, year, imageUrl, price });
    e.target.reset();
    ctx.page.redirect(`/details/${ctx.params.id}`);
}
