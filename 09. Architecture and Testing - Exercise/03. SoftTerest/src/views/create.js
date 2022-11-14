import { createIdea } from "../api/data.js";

const section = document.querySelector('#createView');
const form = section.querySelector('form');
form.addEventListener('submit', onSubmit);
let ctx;

export function showCreate(context) {
    ctx = context;
    context.showSection(section);
}

async function onSubmit(e) {
    e.preventDefault();

    const formData = new FormData(e.target);
    const { title, description, imageURL } = Object.fromEntries(formData);

    if (title.length < 6) {
        alert('Title should be at least 6 charecters long!');
        return;
    }

    if (description < 10) {
        alert('Description should be at least 10 charecters long!');
        return;
    }

    if (imageURL.length < 5) {
        alert('Image should be at least 5 charecters long!');
        return;
    }

    await createIdea({ title, description, img: imageURL });
    form.reset();
    ctx.goTo('/catalog');
}