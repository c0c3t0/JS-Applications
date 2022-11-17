import { deleteBookById } from '../api.js';
import { loadBooks } from "./catalog.js";


export async function deleteBook(e) {
    e.preventDefault();
    const id = e.target.parentElement.parentElement.id;

    await deleteBookById(id);

    loadBooks();
}
