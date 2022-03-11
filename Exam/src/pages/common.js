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
    <li><a href="/create" class="${ifDefined(active.create)}">Create Album</a></li>
    <li><a href="" @click="${event => logout(event, context)}">Logout</a></li>`

const guest = (active) => html`
    <li><a href="/login" class="${ifDefined(active.login)}">Login</a></li>
    <li><a href="/register" class="${ifDefined(active.register)}">Register</a></li>`

export const navBar = (active, context) => html`
    <header>
        <nav>
            <img src="/images/headphones.png">
            <a href="/home">Home</a>
            <ul>
                <li><a href="/dashboard">Catalog</a></li>
                <li><a href="/search-null">Search</a></li>
                ${authService.isAuthenticated() ? loggedIn(active, context) : guest(active)}
            </ul>
        </nav>
    </header>`

export const footer = () => html`
    <footer>
        <div>
            &copy;SoftUni Team 2021. All rights reserved.
        </div>
    </footer>`