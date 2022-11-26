import { createItem } from '../api/data.js';
import { html } from '../lit.js';

const createTemplate = html`
<section id="create-listing">
    <div class="container">
        <form @submit=${getFormData} id="create-form">
            <h1>Create Car Listing</h1>
            <p>Please fill in this form to create an listing.</p>
            <hr>

            <p>Car Brand</p>
            <input type="text" placeholder="Enter Car Brand" name="brand">

            <p>Car Model</p>
            <input type="text" placeholder="Enter Car Model" name="model">

            <p>Description</p>
            <input type="text" placeholder="Enter Description" name="description">

            <p>Car Year</p>
            <input type="number" placeholder="Enter Car Year" name="year">

            <p>Car Image</p>
            <input type="text" placeholder="Enter Car Image" name="imageUrl">

            <p>Car Price</p>
            <input type="number" placeholder="Enter Car Price" name="price">

            <hr>
            <input type="submit" class="registerbtn" value="Create Listing">
        </form>
    </div>
</section>`;

let ctx = null;

export async function showCreate(context) {
    ctx = context;
    ctx.render(createTemplate);
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

    

    await createItem({ brand, model, description, year, imageUrl, price });
    e.target.reset();
    ctx.page.redirect('/dashboard');
}
