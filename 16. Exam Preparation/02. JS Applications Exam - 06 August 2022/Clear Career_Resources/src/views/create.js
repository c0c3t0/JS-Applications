import { createItem } from '../api/data.js';
import { html } from '../lit.js';

const createTemplate = html`
<section id="create">
    <div class="form">
        <h2>Create Offer</h2>
        <form @submit=${getFormData} class="create-form">
            <input type="text" name="title" id="job-title" placeholder="Title" />
            <input type="text" name="imageUrl" id="job-logo" placeholder="Company logo url" />
            <input type="text" name="category" id="job-category" placeholder="Category" />
            <textarea id="job-description" name="description" placeholder="Description" rows="4" cols="50"></textarea>
            <textarea id="job-requirements" name="requirements" placeholder="Requirements" rows="4"
                cols="50"></textarea>
            <input type="text" name="salary" id="job-salary" placeholder="Salary" />

            <button type="submit">post</button>
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
    const { title, imageUrl, category, description, requirements, salary } = data;


    if (!title, !imageUrl, !category, !description, !requirements, !salary) {
        alert('All fields are required!');
        return;
    }

    await createItem(data);
    e.target.reset();
    ctx.page.redirect('/dashboard');
}
