import { html } from './node_modules/lit-html/lit-html.js';
import { loadBooks } from './views/catalog.js';
import { showEditForm } from './views/edit.js';
import { deleteBook } from './views/delete.js';
import { getFormData } from './views/create.js';

const tableBodyTemplate = html`
    <body>
        <button id="loadBooks" @click=${loadBooks}>LOAD ALL BOOKS</button>
        <table>
            <thead>
                <tr>
                    <th>Title</th>
                    <th>Author</th>
                    <th>Action</th>
                </tr>
            </thead>
            <tbody>
    
            </tbody>
        </table>
    </body>
`;

const createFormTemplate = html`
    <form @submit=${getFormData} id="add-form">
        <h3>Add book</h3>
        <label>TITLE</label>
        <input type="text" name="title" placeholder="Title...">
        <label>AUTHOR</label>
        <input type="text" name="author" placeholder="Author...">
        <input type="submit" value="Submit">
    </form>
`;

const editFormTemplate = 
    html`
    <form id="edit-form" style="display: none">
        <input type="hidden" name="id">
        <h3>Edit book</h3>
        <label>TITLE</label>
        <input type="text" name="title" placeholder="Title...">
        <label>AUTHOR</label>
        <input type="text" name="author" placeholder="Author...">
        <input type="submit" value="Save">
    </form>
`;

function tableRow(books){
    return html`
    ${Object.entries(books).map(([_, info]) => html
        `<tr id="${info[0]}">
            <td>${info[1].title}</td>
            <td>${info[1].author}</td>
            <td>
                <button @click=${showEditForm}>Edit</button>
                <button @click=${deleteBook}>Delete</button>
            </td>
        </tr>`
    )}`;
}

export {tableBodyTemplate, createFormTemplate, editFormTemplate, tableRow};
