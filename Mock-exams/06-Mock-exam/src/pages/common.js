import {html} from "/node_modules/lit-html/lit-html.js";
import authService from "../services/authService.js";
import helpers from "../helpers.js";

async function logout(event, context) {
    event.preventDefault();
    try {
        await authService.logout();
        helpers.showMessage('success', 'Successful logout');
        context.page.redirect('/login')
    } catch (error) {
        helpers.showMessage('error', error.message);
    }
}

const loggedIn = (active, context) => html`
    <li class="nav-item">
        <a class="nav-link">Welcome, ${authService.getUserData().userEmail}</a>
    </li>
    <li class="nav-item">
        <a class="nav-link" href="" @click="${event => logout(event, context)}">Logout</a>
    </li>`

const guest = (active) => html`
    <li class="nav-item">
        <a class="nav-link ${active.login ? active.login : ''}" href="/login">Login</a>
    </li>
    <li class="nav-item">
        <a class="nav-link ${active.register ? active.register : ''}" href="/register">Register</a>
    </li>`

export const navBar = (active, context) => html`
    <nav class="navbar navbar-expand-lg navbar-dark bg-dark ">
        <a class="navbar-brand text-light" href="/home">Movies</a>
        <ul class="navbar-nav ml-auto ">${authService.isAuthenticated() ? loggedIn(active, context) : guest(active)}
        </ul>
    </nav>
    <section class="notifications" style="display: none;">
        <p class="notification-message" id="errorBox">Message...</p>
    </section>
    <section class="notifications" style="display: none;background-color:rgba(1, 131, 29, 0.541);">
        <p class="notification-message" id="successBox">Message...</p>
    </section>`

export const footer = () => html`
    <footer class="page-footer font-small">
        <div class="footer-copyright text-center py-3">© 2020
            <a href="https://softuni.bg/trainings/2840/js-applications-june-2020/internal" class="text-dark">JS
                Applications</a>
        </div>
    </footer>`