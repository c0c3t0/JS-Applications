import { getMyItems } from "../api/data.js";
import { html } from "../lit.js";

const myItemsTemplate = (data, user) => html`
<section id="user-profile-page" class="user-profile">
    <article class="user-info">
        <img id="user-avatar-url" alt="user-profile" src="/images/${user.gender}.png">
        <div class="user-content">
            <p>Username: ${user.username}</p>
            <p>Email: ${user.email}</p>
            <p>My memes count: ${data.length}</p>
        </div>
    </article>
    <h1 id="user-listings-title">User Memes</h1>
    <div class="user-meme-listings">
        ${data.length > 0 ? data.map(myItemsCardTemplate) : html`<p class="no-memes">No memes in database.</p>`}
    </div>
</section>`;

const myItemsCardTemplate = (item) => html`
<div class="user-meme">
    <p class="user-meme-title">${item.title}</p>
    <img class="userProfileImage" alt="meme-img" src=${item.imageUrl}>
    <a class="button" href="/details/${item._id}">Details</a>
</div>`;

let ctx;

export async function showProfile(context) {
    ctx = context;
    const user = JSON.parse(sessionStorage.getItem('user'));
    const data = await getMyItems(user._id);
    ctx.render(myItemsTemplate(data, user));
}
