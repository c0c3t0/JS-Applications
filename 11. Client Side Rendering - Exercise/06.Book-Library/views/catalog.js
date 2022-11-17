import { render } from '../node_modules/lit-html/lit-html.js';
import { getBooks } from '../api.js';
import { tableRow } from '../templates.js';


export async function loadBooks() {
    const tableBody = document.querySelector('tbody');

    const books = await getBooks();
    render(tableRow(Object.entries(books)), tableBody);
}
