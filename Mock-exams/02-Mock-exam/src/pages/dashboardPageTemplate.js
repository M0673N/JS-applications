import {html} from "/node_modules/lit-html/lit-html.js";
import {navBar} from "./common.js";

const dashboardCardTemplate = (el) => html`
    <div class="allGames">
        <div class="allGames-info">
            <img src="${el.imageUrl}">
            <h6>${el.category}</h6>
            <h2>${el.title}</h2>
            <a href="/details-${el._id}" class="details-button">Details</a>
        </div>
    </div>`

export const dashboardPageTemplate = (data) => html`
    ${navBar({dashboard: 'active'})}
    <main>
        <section id="catalog-page">
            <h1>All Games</h1>
            ${data.length !== 0 ? data.map(el => dashboardCardTemplate(el)) : html`<h3 class="no-articles">No articles yet</h3>`}
        </section>
    </main>`