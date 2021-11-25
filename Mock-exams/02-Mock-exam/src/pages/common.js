import {html} from "/node_modules/lit-html/lit-html.js";
import {ifDefined} from "/node_modules/lit-html/directives/if-defined.js";
import authService from "../services/authService.js";

async function logout(event) {
    event.preventDefault();
    try {
        await authService.logout();
        location.href = '/home';
    } catch (error) {
        alert(error.message);
    }
}

const loggedIn = (active) => html`
    <div id="user">
        <a href="/create" class="${ifDefined(active.create)}">Create Game</a>
        <a href="" @click="${logout}">Logout</a>
    </div>`

const guest = (active) => html`
    <div id="guest">
        <a href="/login" class="${ifDefined(active.login)}">Login</a>
        <a href="/register" class="${ifDefined(active.register)}">Register</a>
    </div>`


export const navBar = (active) => html`
    <header>
        <h1><a class="home ${active.home ? active.home : ''}" href="/home">GamesPlay</a></h1>
        <nav>
            <a href="/dashboard">All games</a>
            ${authService.isAuthenticated() ? loggedIn(active) : guest(active)}
        </nav>
    </header>`