import {html} from "/node_modules/lit-html/lit-html.js";
import {footer, navBar} from "./common.js";
import authService from "../services/authService.js";

const cardTemplate = (el) => html`
    <div class="card mb-4">
        <img class="card-img-top"
             src="${el.img}"
             alt="Card image cap" width="400">
        <div class="card-body">
            <h4 class="card-title">${el.title}</h4>
        </div>
        <div class="card-footer">
            <a href="/details-${el._id}">
                <button type="button" class="btn btn-info">Details</button>
            </a>
        </div>
    </div>`

function searchHandler(event, context) {
    event.preventDefault();
    let formData = new FormData(event.currentTarget);
    context.page.redirect(`/search-${formData.get('title')}`);
    event.target.reset();
}

const loggedInTemplate = (data, context) => html`<h1 class="text-center">Movies</h1>
<section>
    <a href="/create" class="btn btn-warning ">Add Movie</a>
    <form class="search float-right" @submit="${event => searchHandler(event, context)}">
        <label>Search: </label>
        <input type="text" name="title">
        <input type="submit" class="btn btn-info" value="Search">
    </form>
</section>

<div class=" mt-3 ">
    <div class="row d-flex d-wrap">
        <div class="card-deck d-flex justify-content-center">
            ${data.length !== 0 ? data.map(el => cardTemplate(el)) : html`
                <div>No movies...</div>`}
        </div>
    </div>
</div>`

export const homePageTemplate = (data, context) => html`
    ${navBar({home: 'active'}, context)}
    <div class="jumbotron jumbotron-fluid text-light" style="background-color: #343a40;">
        <img src="https://s.studiobinder.com/wp-content/uploads/2019/06/Best-M-Night-Shyamalan-Movies-and-Directing-Style-StudioBinder.jpg"
             class="img-fluid" alt="Responsive image">
        <h1 class="display-4">Movies</h1>
        <p class="lead">Unlimited movies, TV shows, and more. Watch anywhere. Cancel anytime.</p>
    </div>
    ${authService.isAuthenticated() ? loggedInTemplate(data, context) : ''}
    ${footer()}`