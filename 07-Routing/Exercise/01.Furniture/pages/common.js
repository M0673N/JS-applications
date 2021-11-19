import {html} from "/node_modules/lit-html/lit-html.js";
import {ifDefined} from "/node_modules/lit-html/directives/if-defined.js";

const loggedIn = (active) => html`
    <div id="user">
        <a id="createLink" href="/create" class="${ifDefined(active.create)}">Create Furniture</a>
        <a id="profileLink" href="/my-furniture" class="${ifDefined(active.myFurniture)}">My Publications</a>
        <a id="logoutBtn" href="/logout" class="${ifDefined(active.logout)}">Logout</a>
    </div>`

const guest = (active) => html`
    <div id="guest">
        <a id="loginLink" href="/login" class="${ifDefined(active.login)}">Login</a>
        <a id="registerLink" href="/register" class="${ifDefined(active.register)}">Register</a>
    </div>`


export const navBar = (active) => html`
    <header>
        <h1><a href="/">Furniture Store</a></h1>
        <nav>
            <a id="catalogLink" href="/" class="${ifDefined(active.dashboard)}">Dashboard</a>
            ${localStorage.getItem('accessToken') ? loggedIn(active) : guest(active)}
        </nav>
    </header>`

export const cardTemplate = (el) => html`
    <div class="col-md-4">
        <div class="card text-white bg-primary">
            <div class="card-body">
                <img src="${el.img}"/>
                <p>${el.description}</p>
                <footer>
                    <p>Price: <span>${el.price} $</span></p>
                </footer>
                <div>
                    <a href="details/${el._id}" class="btn btn-info">Details</a>
                </div>
            </div>
        </div>
    </div>
`