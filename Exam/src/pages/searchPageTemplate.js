import {html} from "/node_modules/lit-html/lit-html.js";
import {footer, navBar} from "./common.js";
import authService from "../services/authService.js";

const searchCardTemplate = (el) => html`
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

function clickHandler(event, context) {
    let query = document.querySelector('#search-input').value;
    context.page.redirect(`search-${query}`);
}

const resultTemplate = (data) => html`
    <div class="search-result">
        ${data.length !== 0 ? data.map(el => searchCardTemplate(el)) : html`<p class="no-result">No
            result.</p>`}
    </div>`

export const searchPageTemplate = (data, context) => html`
    ${navBar({search: 'active'}, context)}
    <main id="main-content">
        <section id="searchPage">
            <h1>Search by Name</h1>

            <div class="search">
                <input id="search-input" type="text" name="search" placeholder="Enter desired albums's name">
                <button class="button-list" @click="${event => clickHandler(event, context)}">Search</button>
            </div>

            <h2>Results:</h2>

            ${data === null ? '' : resultTemplate(data)}
        </section>
    </main>
    ${footer()}`