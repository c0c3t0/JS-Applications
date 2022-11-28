import { addComment, deleteById, getAllComments, getById } from '../api/data.js';
import { html, nothing } from '../lit.js';

const detailsTemplate = (data, isOwner, isLogged, allComs) => html`
<section id="game-details">
    <h1>Game Details</h1>
    <div class="info-section">

        <div class="game-header">
            <img class="game-img" src=${data.imageUrl} />
            <h1>${data.title}</h1>
            <span class="levels">MaxLevel: ${data.maxLevel}</span>
            <p class="type">${data.category}</p>
        </div>

        <p class="text">${data.summary}</p>
        <!-- Bonus ( for Guests and Users ) -->
        <div class="details-comments">
            <h2>Comments:</h2>
            ${allComs.length > 0 
                ? html `<ul>${allComs.map(item => html`<li class="comment"><p>Content: ${item.comment}</p></li>`)}</ul>` 
                : html`<p class="no-comment">No comments.</p>`}
        </div>
        ${isOwner ? html`
        <div class="buttons">
            <a href="/edit/${data._id}" class="button">Edit</a>
            <a @click=${deleteItem} href="#" class="button">Delete</a>
        </div>`
        : nothing}
        <!-- Bonus -->
        <!-- Add Comment ( Only for logged-in users, which is not creators of the current game ) -->
        ${ isLogged && !isOwner ? html`
        <article class="create-comment">
            <label>Add new comment:</label>
            <form @submit=${getCommentData} class="form">
                <textarea name="comment" placeholder="Comment......"></textarea>
                <input class="btn submit" type="submit" value="Add Comment">
            </form>
        </article>` : nothing};

</section>`;

let ctx = null;

export async function showDetails(context) {
    ctx = context;
    const gameId = ctx.params.id;
    const data = await getById(gameId);
    console.log(data);
    const allComs = await getAllComments(gameId);
    let coms = allComs.forEach(element =>console.log(element));

    const user = JSON.parse(sessionStorage.getItem('user'));
    const isOwner = user ? user._id === data._ownerId : false;
    const isLogged = !user ? false : true;

    ctx.render(detailsTemplate(data, isOwner, isLogged, allComs));
  
}

async function getCommentData(e) {
    e.preventDefault();
    const gameId = ctx.params.id;
    const formData = new FormData(e.target);
    const comment = formData.get('comment');
    console.log(comment);
    if(!comment) {
        alert('Enter your comment');
        return;
    }

    await addComment(gameId, comment);
    e.target.reset();
    ctx.page.redirect(`/details/${gameId}`);
}


async function deleteItem() {
    const confirmed = confirm('Are you sure you want to delete this item?');
    if (confirmed) {
        await deleteById(ctx.params.id);
        ctx.page.redirect('/');
    }
}
