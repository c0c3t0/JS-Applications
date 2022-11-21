import { getById, updateById } from '../api/data.js';
import { html } from '../lit.js';

const editTemplate = (data) => html`
<section id="edit">
    <div class="form">
        <h2>Edit item</h2>
        <form @submit=${getFormData} class="edit-form">
            <input type="text" name="brand" id="shoe-brand" placeholder="Brand" value=${data.brand} />
            <input type="text" name="model" id="shoe-model" placeholder="Model" value=${data.model} />
            <input type="text" name="imageUrl" id="shoe-img" placeholder="Image url" value=${data.imageUrl} />
            <input type="text" name="release" id="shoe-release" placeholder="Release date" value=${data.release} />
            <input type="text" name="designer" id="shoe-designer" placeholder="Designer" value=${data.designer} />
            <input type="text" name="value" id="shoe-value" placeholder="Value" value=${data.value} />

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
    const { brand, model, imageUrl, release, designer, value } = Object.fromEntries(formData);

    if (!brand, !model, !imageUrl, !release, !designer, !value) {
        alert('All fields are required!');
        return;
    }

    await updateById(ctx.params.id, { brand, model, imageUrl, release, designer, value });
    e.target.reset();
    ctx.page.redirect(`/details/${ctx.params.id}`);
}
