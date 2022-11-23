import { getById, updateById } from '../api/data.js';
import { html } from '../lit.js';
import { notification } from './notifications.js';

const editTemplate = (item) => html`
<section id="edit-meme">
    <form @submit=${getFormData} id="edit-form">
        <h1>Edit Meme</h1>
        <div class="container">
            <label for="title">Title</label>
            <input id="title" type="text" placeholder="Enter Title" name="title" .value=${item.title}>
            <label for="description">Description</label>
            <textarea id="description" placeholder="Enter Description" name="description" .value=${item.description}></textarea>
            <label for="imageUrl">Image Url</label>
            <input id="imageUrl" type="text" placeholder="Enter Meme ImageUrl" name="imageUrl" .value=${item.imageUrl}>
            <input type="submit" class="registerbtn button" value="Edit Meme">
        </div>
    </form>
</section>`;

let ctx = null;

export async function showEdit(context) {
    ctx = context;
    const data = await getById(ctx.params.id);
    context.render(editTemplate(data));
}

async function getFormData(e) {
    e.preventDefault();
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData);
    const { title, description, imageUrl} = data;

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
    
    await updateById(ctx.params.id, data);
    e.target.reset();
    ctx.page.redirect(`/details/${ctx.params.id}`);
}
