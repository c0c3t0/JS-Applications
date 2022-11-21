import { createItem } from '../api/data.js';
import { html } from '../lit.js';

const createTemplate = html`
<section id="create">
    <div class="form">
        <h2>Add item</h2>
        <form @submit=${getFormData} class="create-form">
            <input type="text" name="brand" id="shoe-brand" placeholder="Brand" />
            <input type="text" name="model" id="shoe-model" placeholder="Model" />
            <input type="text" name="imageUrl" id="shoe-img" placeholder="Image url" />
            <input type="text" name="release" id="shoe-release" placeholder="Release date" />
            <input type="text" name="designer" id="shoe-designer" placeholder="Designer" />
            <input type="text" name="value" id="shoe-value" placeholder="Value" />

            <button type="submit">post</button>
        </form>
    </div>
</section>`

let ctx = null;

export async function showCreate(context) {
    ctx = context;
    ctx.render(createTemplate);
}

async function getFormData(e) {
    e.preventDefault();
    const formData = new FormData(e.target);
    const { brand, model, imageUrl, release, designer, value } = Object.fromEntries(formData);

    if (!brand, !model, !imageUrl, !release, !designer, !value){
        alert('All fields are required!');
        return;
    }

    await createItem({ brand, model, imageUrl, release, designer, value });
    e.target.reset();
    ctx.page.redirect('/dashboard');
}
