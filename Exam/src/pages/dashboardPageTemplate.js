import {html} from "/node_modules/lit-html/lit-html.js";
import {footer, navBar} from "./common.js";
import authService from "../services/authService.js";

const dashboardCardTemplate = (el) => html`
    <div class="card-box">
        <img src="${el.imgUrl}">
        <div>
            <div class="text-center">
                <p class="name">Name: ${el.name}</p>
                <p class="artist">Artist: ${el.artist}</p>
                <p class="genre">Genre: ${el.genre}</p>
                <p class="price">Price: $${el.price}</p>
                <p class="date">Release Date: ${el.releaseDate}</p>
            </div>
            <div class="btn-group">
                ${authService.isAuthenticated() ? html`<a href="/details-${el._id}" id="details">Details</a>` : ''}
            </div>
        </div>
    </div>`

export const dashboardPageTemplate = (data, context) => html`
    ${navBar({dashboard: 'active'}, context)}
    <main id="main-content">
        <section id="catalogPage">
            <h1>All Albums</h1>
            ${data.length !== 0 ? data.map(el => dashboardCardTemplate(el)) : html`<p>No Albums in Catalog!</p>`}
        </section>
    </main>
    ${footer()}`