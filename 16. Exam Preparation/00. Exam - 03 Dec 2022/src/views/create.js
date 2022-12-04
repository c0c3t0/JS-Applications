import { createItem } from '../api/data.js';
import { html } from '../lit.js';

const createTemplate = html`
<section id="create">
    <div class="form">
        <h2>Add Album</h2>
        <form @submit=${getFormData} class="create-form">
            <input type="text" name="singer" id="album-singer" placeholder="Singer/Band" />
            <input type="text" name="album" id="album-album" placeholder="Album" />
            <input type="text" name="imageUrl" id="album-img" placeholder="Image url" />
            <input type="text" name="release" id="album-release" placeholder="Release date" />
            <input type="text" name="label" id="album-label" placeholder="Label" />
            <input type="text" name="sales" id="album-sales" placeholder="Sales" />

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
    // e.preventDefault();
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData);
    const { singer, album, imageUrl, release, label, sales } = data;

    if (!singer || !album || !imageUrl || !release || !label || !sales) {
        alert('All fields are required!');
        return;
    }

    await createItem(data);
    e.target.reset();
    ctx.page.redirect('/dashboard');
}
