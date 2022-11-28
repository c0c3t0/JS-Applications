import { getById, updateById } from '../api/data.js';
import { html } from '../lit.js';

const editTemplate = (item) => html`
<section id="edit">
    <div class="form">
        <h2>Edit Offer</h2>
        <form @submit=${getFormData} class="edit-form">
            <input type="text" name="title" id="job-title" placeholder="Title" value=${item.title} />
            <input type="text" name="imageUrl" id="job-logo" placeholder="Company logo url" value=${item.imageUrl} />
            <input type="text" name="category" id="job-category" placeholder="Category" value=${item.category} />
            <textarea id="job-description" name="description" placeholder="Description" rows="4" cols="50"
                >${item.description} </textarea>
            <textarea id="job-requirements" name="requirements" placeholder="Requirements" rows="4" cols="50"
                >${item.requirements}</textarea>
            <input type="text" name="salary" id="job-salary" placeholder="Salary" value=${item.salary} />

            <button type="submit">post</button>
        </form>
    </div>
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
    const { title, imageUrl, category, description, requirements, salary } = data;


    if (!title, !imageUrl, !category, !description, !requirements, !salary) {
        alert('All fields are required!');
        return;
    }

    await updateById(ctx.params.id, { title, imageUrl, category, description, requirements, salary });
    e.target.reset();
    ctx.page.redirect(`/details/${ctx.params.id}`);
}
