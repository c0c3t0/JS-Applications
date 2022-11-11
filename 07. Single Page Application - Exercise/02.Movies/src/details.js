import { htmlGenerator, showSection } from "./dom.js";
import { deleteMovie } from "./delete.js";
import { showEdit } from "./edit.js";
import { likeMovie, dislikeMovie, counterLikes, isMovieLiked } from "./likes.js";

const sections = document.querySelectorAll('.view-section');

export function showDetails(id) {
    showSection(sections[2]);
    movieDetails(id);
}

export async function movieDetails(id) {
    const userId = sessionStorage.getItem('userId');
    const token = sessionStorage.getItem('accessToken');

    try {
        const response = await fetch(`http://localhost:3030/data/movies/${id}`);
        const data = await response.json();
        const isLiked = await isMovieLiked(id, userId);
        const totalLikes = await counterLikes(data._id);

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

        const anchorDelete = htmlGenerator('a', 'Delete', 'btn btn-danger', divCol4);
        anchorDelete.setAttribute('href', '#');
        anchorDelete.setAttribute('id', id);
        anchorDelete.addEventListener('click', deleteMovie);
        anchorDelete.style.visibility = 'hidden';

        const anchorEdit = htmlGenerator('a', 'Edit', 'btn btn-warning', divCol4);
        anchorEdit.setAttribute('href', '#');
        anchorEdit.setAttribute('id', id);
        anchorEdit.addEventListener('click', () => showEdit(data));
        anchorEdit.style.visibility = 'hidden';

        const likeBtn = htmlGenerator('a', '', '', divCol4);
        likeBtn.setAttribute('href', '#');
        likeBtn.style.visibility = 'hidden';

        htmlGenerator('span', `Liked ${totalLikes}`, 'enrolled-span', divCol4);
        
        if (userId !== null && data._ownerId === userId) {
            anchorDelete.style.visibility = 'visible';
            anchorEdit.style.visibility = 'visible';
        }

        if (userId !== null && data._ownerId !== userId) {
            if (isLiked.length > 0) {
                likeBtn.textContent = 'Dislike';
                likeBtn.className = 'btn btn-danger';
                likeBtn.addEventListener('click', async () => dislikeMovie(data._id, isLiked[0]._id));

            } else {
                likeBtn.textContent = 'Like';
                likeBtn.className = 'btn btn-primary';
                likeBtn.addEventListener('click', () => likeMovie(data._id));
            }

            likeBtn.style.visibility = 'visible';
        }


    } catch (error) {
        alert(error.message);
    }
}
