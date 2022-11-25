import { getMyItems } from "../api/data.js";
import { html } from "../lit.js";

const myItemsTemplate = (data, user) => html`
<section id="profilePage">
    <div class="userInfo">
        <div class="avatar">
            <img src="./images/profilePic.png">
        </div>
        <h2>${user.email}</h2>
    </div>
    <div class="board">
        ${data.length > 0
           ? data.map(item => myItemsCardTemplate(item))
           : html`<div class="no-events">
                    <p>This user has no events yet!</p>
                </div>`}
    </div>
</section>`;

const myItemsCardTemplate = (item) => html`
<div class="eventBoard">
    <div class="event-info">
        <img src=${item.imageUrl}>
        <h2>${item.title}</h2>
        <h6>${item.date}</h6>
        <a href="/details/${item._id}" class="details-button">Details</a>
    </div>
</div>`;

let ctx;

export async function showProfile(context) {
    ctx = context;
    const user = JSON.parse(sessionStorage.getItem('user'));
    const data = await getMyItems(user._id);
    ctx.render(myItemsTemplate(data, user));
}
