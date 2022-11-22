import { createItem } from '../api/data.js';
import { html } from '../lit.js';

const createTemplate = html`
<section id="create-page" class="auth">
    <form @submit=${getFormData} id="create">
        <h1 class="title">Create Post</h1>

        <article class="input-group">
            <label for="title">Post Title</label>
            <input type="title" name="title" id="title">
        </article>

        <article class="input-group">
            <label for="description">Description of the needs </label>
            <input type="text" name="description" id="description">
        </article>

        <article class="input-group">
            <label for="imageUrl"> Needed materials image </label>
            <input type="text" name="imageUrl" id="imageUrl">
        </article>

        <article class="input-group">
            <label for="address">Address of the orphanage</label>
            <input type="text" name="address" id="address">
        </article>

        <article class="input-group">
            <label for="phone">Phone number of orphanage employee</label>
            <input type="text" name="phone" id="phone">
        </article>

        <input type="submit" class="btn submit" value="Create Post">
    </form>
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
    const { title, description, imageUrl, address, phone } = data;

    if (!title || !description || !imageUrl || !address || !phone) {
        alert('All fields are required!');
        return;
    }

    await createItem(data);
    e.target.reset();
    ctx.page.redirect('/');
}
