import {html} from "/node_modules/lit-html/lit-html.js";
import authService from "../services/authService.js";

async function logout(event, context) {
    event.preventDefault();
    try {
        await authService.logout();
        context.page.redirect('/login')
    } catch (error) {
        alert(error.message);
    }
}

export const navBar = (active, context) => html`
    <header>
        <nav>
            <ul>
                <li>
                    ${authService.isAuthenticated() ? html`<a href="/create">Create new offer</a>` : ''}
                </li>
                ${!authService.isAuthenticated() ? html`
                    <li class="site-logo">Shoe</li>` : ''}
                <li>
                    <a href="/home">
                        <img src="/publicc/sneakers.png" alt="">
                    </a>
                </li>
                ${!authService.isAuthenticated() ? html`
                    <li class="site-logo">Shelf</li>` : ''}
                ${authService.isAuthenticated() ? html`
                    <li>Welcome, ${authService.getUserData().userEmail} |
                        <a href="" @click="${event => logout(event, context)}">Logout</a>
                    </li>` : ''}

            </ul>
        </nav>
    </header>`

export const footer = () => html`
    <footer>
        <p><a href="https://softuni.bg">Software University</a> - JS Applications @ 2020</p>
    </footer>`