import {html} from "/node_modules/lit-html/lit-html.js";
import {ifDefined} from "/node_modules/lit-html/directives/if-defined.js";
import authService from "../services/authService.js";

async function logout(event, context) {
    event.preventDefault();
    try {
        await authService.logout();
        context.page.redirect('/home')
    } catch (error) {
        alert(error.message);
    }
}

const loggedIn = (active, context) => html`
    <div id="profile">
        <a>Welcome ${authService.getUserData().userName}</a>
        <a href="/myItems" class="${ifDefined(active.myItems)}">My Listings</a>
        <a href="create" class="${ifDefined(active.create)}">Create Listing</a>
        <a href="" @click="${event => logout(event, context)}">Logout</a>
    </div>`

const guest = (active) => html`
    <div id="guest">
        <a href="/login" class="${ifDefined(active.login)}">Login</a>
        <a href="/register" class="${ifDefined(active.register)}">Register</a>
    </div>`

export const navBar = (active, context) => html`
    <header>
        <nav>
            <a class="${ifDefined(active.home)}" href="/home">Home</a>
            <a href="/dashboard" class="${ifDefined(active.dashboard)}">All Listings</a>
            <a href="/search-null" class="${ifDefined(active.search)}">By Year</a>
            ${authService.isAuthenticated() ? loggedIn(active, context) : guest(active)}
        </nav>
    </header>`

export const footer = () => html`
    <footer>
        <p>&copy; All rights reserved</p>
    </footer>`