import { createItem } from '../api/data.js';
import { html } from '../lit.js';

const createTemplate = html`
<section id="create-page" class="auth">
    <form @submit=${getFormData} id="create">
        <div class="container">

            <h1>Create Game</h1>
            <label for="leg-title">Legendary title:</label>
            <input type="text" id="title" name="title" placeholder="Enter game title...">

            <label for="category">Category:</label>
            <input type="text" id="category" name="category" placeholder="Enter game category...">

            <label for="levels">MaxLevel:</label>
            <input type="number" id="maxLevel" name="maxLevel" min="1" placeholder="1">

            <label for="game-img">Image:</label>
            <input type="text" id="imageUrl" name="imageUrl" placeholder="Upload a photo...">

            <label for="summary">Summary:</label>
            <textarea name="summary" id="summary"></textarea>
            <input class="btn submit" type="submit" value="Create Game">
        </div>
    </form>
</section>
`;

let ctx = null;

export async function showCreate(context) {
    ctx = context;
    ctx.render(createTemplate);
}

async function getFormData(e) {
    e.preventDefault();
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData);
    const { title, category, maxLevel, imageUrl, summary } = data;

    if (!title || !category || !maxLevel ||  !imageUrl || !summary) {
        alert('All fields are required!');
        return;
    }

    await createItem(data);
    e.target.reset();
    ctx.page.redirect('/');
}
