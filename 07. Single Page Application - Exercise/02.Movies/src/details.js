import { htmlGenerator, showSection } from "./dom.js";
import { deleteMovie } from "./delete.js";
import { showEdit } from "./edit.js";

const sections = document.querySelectorAll('.view-section');

export function showDetails(id) {
    showSection(sections[2]);
    movieDetails(id);
}

export async function movieDetails(id) {
    const userId = sessionStorage.getItem('userId');
    try {
        const response = await fetch(`http://localhost:3030/data/movies/${id}`);
        const data = await response.json();

        if (!response.ok) {
            throw new Error(response.message);
        }
        sections[2].replaceChildren();

        const divContainer = htmlGenerator('div', '', 'container', sections[2]);
        const divRow = htmlGenerator('div', '', 'row bg-light text-dark', divContainer);

        htmlGenerator('h1', `Movie title: ${data.title}`, '', divRow);
        const divCol = htmlGenerator('div', '', 'col-md-8', divRow);
        const img = htmlGenerator('img', '', 'img-thumbnail', divCol);
        img.setAttribute('src', data.img);
        img.alt = 'Movie';

        const divCol4 = htmlGenerator('div', '', 'col-md-4 text-center', divRow);
        htmlGenerator('h3', 'Movie Description', 'my-3', divCol4);
        htmlGenerator('p', data.description, '', divCol4);

        if (userId != null && data._ownerId === userId) {
            const anchorDelete = htmlGenerator('a', 'Delete', 'btn btn-danger', divCol4);
            anchorDelete.setAttribute('href', '#');
            anchorDelete.setAttribute('id', id);
            anchorDelete.addEventListener('click', () => deleteMovie(data._id));

            const anchorEdit = htmlGenerator('a', 'Edit', 'btn btn-warning', divCol4);
            anchorEdit.setAttribute('href', '#');
            anchorEdit.setAttribute('id', id);
            anchorEdit.addEventListener('click', () => showEdit(data));

        } else {
            htmlGenerator('a', 'Like', 'btn btn-primary', divCol4);
            htmlGenerator('span', `Liked: ${data}`, 'enrolled-span', divCol4);
        }

    } catch (error) {
        alert(error.message);
    }
}
