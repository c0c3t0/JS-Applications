import { createItem } from '../api/data.js';
import { html } from '../lit.js';
import { notification } from './notifications.js';

const createTemplate = html`
<section id="create-meme">
    <form @submit=${getFormData} id="create-form">
        <div class="container">
            <h1>Create Meme</h1>
            <label for="title">Title</label>
            <input id="title" type="text" placeholder="Enter Title" name="title">
            <label for="description">Description</label>
            <textarea id="description" placeholder="Enter Description" name="description"></textarea>
            <label for="imageUrl">Meme Image</label>
            <input id="imageUrl" type="text" placeholder="Enter meme ImageUrl" name="imageUrl">
            <input type="submit" class="registerbtn button" value="Create Meme">
        </div>
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
    const { title, description, imageUrl } = data;

    if (!title || !description || !imageUrl) {
        notification('All fields are required!');
        return;
    }
    if(!title) {
        notification('Please enter a title!');
        return;
    }
    if(!description) {
        notification('Please enter a description!');
        return;
    }
    if(!imageUrl) {
        notification('Please enter an URL!');
        return;
    }

    await createItem(data);
    e.target.reset();
    ctx.page.redirect('/dashboard');
}
