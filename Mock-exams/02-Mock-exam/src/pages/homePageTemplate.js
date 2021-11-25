import {html} from "/node_modules/lit-html/lit-html.js";
import {navBar} from "./common.js";

export const cardTemplate = (el) => html`
    <div class="game">
        <div class="image-wrap">
            <img src="${el.imageUrl}">
        </div>
        <h3>${el.title}</h3>
        <div class="rating">
            <span>☆</span><span>☆</span><span>☆</span><span>☆</span><span>☆</span>
        </div>
        <div class="data-buttons">
            <a href="/details-${el._id}" class="btn details-btn">Details</a>
        </div>
    </div>`

export const homePageTemplate = (data) => html`
    ${navBar({home: 'active'})}
    <main>
        <section id="welcome-world">
            <div class="welcome-message">
                <h2>ALL new games are</h2>
                <h3>Only in GamesPlay</h3>
            </div>
            <img src="/images/four_slider_img01.png" alt="hero">
            <div id="home-page">
                <h1>Latest Games</h1>
                ${data.length !== 0 ? data.map(el => cardTemplate(el)) : html`<p class="no-articles">No games yet</p>`}
            </div>
        </section>
    </main>`