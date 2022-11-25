import { getById, updateById } from '../api/data.js';
import { html } from '../lit.js';

const editTemplate = (item) => html`
<section id="editPage">
    <form @submit=${getFormData} class="theater-form">
        <h1>Edit Theater</h1>
        <div>
            <label for="title">Title:</label>
            <input id="title" name="title" type="text" placeholder="Theater name" .value=${item.title}>
        </div>
        <div>
            <label for="date">Date:</label>
            <input id="date" name="date" type="text" placeholder="Month Day, Year" .value=${item.date}>
        </div>
        <div>
            <label for="author">Author:</label>
            <input id="author" name="author" type="text" placeholder="Author" .value=${item.author}>
        </div>
        <div>
            <label for="description">Theater Description:</label>
            <textarea id="description" name="description" placeholder="Description">${item.description}</textarea>
        </div>
        <div>
            <label for="imageUrl">Image url:</label>
            <input id="imageUrl" name="imageUrl" type="text" placeholder="Image Url" .value=${item.imageUrl}>
        </div>
        <button class="btn" type="submit">Submit</button>
    </form>
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
    const { title, date, author, description, imageUrl } = data;


    if (!title || !date || !author || !description || !imageUrl) {
        alert('All fields are required!');
        return;
    }

    await updateById(ctx.params.id, data);
    e.target.reset();
    ctx.page.redirect(`/details/${ctx.params.id}`);
}
