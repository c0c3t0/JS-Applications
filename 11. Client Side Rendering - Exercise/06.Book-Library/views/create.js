import { loadBooks } from "./catalog.js";
import { createBook } from "../api.js";

export async function getFormData(e) {
    e.preventDefault();
    const formData = new FormData(e.target);
    const { title, author } = Object.fromEntries(formData);
    if (!title || !author) {
        alert('All fields are required!');
        return;
    }

    await createBook({ title, author });
    e.target.reset();
    loadBooks();
}
