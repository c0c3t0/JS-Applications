import { getNewest } from "../api/data.js";
import { html } from "../lit.js";

const homeTemplate = (data) => html`
<section id="welcome-world">

    <div class="welcome-message">
        <h2>ALL new games are</h2>
        <h3>Only in GamesPlay</h3>
    </div>
    <img src="./images/four_slider_img01.png" alt="hero">

    <div id="home-page">
        <h1>Latest Games</h1>
        ${data.length > 0 ? data.map(itemCardTemplate) : html`<p class="no-articles">No games yet</p>`}
    </div>
</section>`;

const itemCardTemplate = (item) => html`
    <div class="game">
        <div class="image-wrap">
            <img src=${item.imageUrl}>
        </div>
        <h3>${item.title}</h3>
        <div class="rating">
            <span>☆</span><span>☆</span><span>☆</span><span>☆</span><span>☆</span>
        </div>
        <div class="data-buttons">
            <a href="/details/${item._id}" class="btn details-btn">Details</a>
        </div>
    </div>`

export async function showHome(context) {
    const data = await getNewest();
    context.render(homeTemplate(data));
}
