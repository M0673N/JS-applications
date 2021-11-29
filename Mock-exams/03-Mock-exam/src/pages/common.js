import {html} from "/node_modules/lit-html/lit-html.js";
import {ifDefined} from "/node_modules/lit-html/directives/if-defined.js";
import authService from "../services/authService.js";

async function logout(event, context) {
    event.preventDefault();
    try {
        await authService.logout();
        context.page.redirect('/dashboard')
    } catch (error) {
        alert(error.message);
    }
}

const loggedIn = (active, context) => html`
    <div id="user">
        <span>Welcome, ${authService.getUserData().userEmail}</span>
        <a class="button ${active.myItems ? active.myItems : ''}" href="/myItems">My Books</a>
        <a class="button ${active.create ? active.create : ''}" href="/create">Add Book</a>
        <a class="button" href="" @click="${event => logout(event, context)}">Logout</a>
    </div>`

const guest = (active) => html`
    <div id="guest">
        <a class="button ${active.login ? active.login : ''}" href="/login">Login</a>
        <a class="button ${active.register ? active.register : ''}" href="/register">Register</a>
    </div>`

export const navBar = (active, context) => html`
    <header id="site-header">
        <nav class="navbar">
            <section class="navbar-dashboard">
                <a href="/dashboard" class="${ifDefined(active.dashboard)}">Dashboard</a>
                ${authService.isAuthenticated() ? loggedIn(active, context) : guest(active)}
            </section>
        </nav>
    </header>`

export const footer = () => html`
    <footer id="site-footer">
        <p>@OnlineBooksLibrary</p>
    </footer>`