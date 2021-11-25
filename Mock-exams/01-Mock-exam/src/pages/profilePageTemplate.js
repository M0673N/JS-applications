import {html} from "../../node_modules/lit-html/lit-html.js";
import {footerTemplate, myCardTemplate, navBar} from "./common.js";
import authService from "../services/authService.js";

export const profilePageTemplate = (data) => html`
    ${navBar({profile: 'active'})}
    <main>
        <section id="user-profile-page" class="user-profile">
            <article class="user-info">
                <img id="user-avatar-url" alt="user-profile" src="/images/${authService.getUserData().gender}.png">
                <div class="user-content">
                    <p>Username: ${authService.getUserData().username}</p>
                    <p>Email: ${authService.getUserData().email}</p>
                    <p>My memes count: ${data.length}</p>
                </div>
            </article>
            <h1 id="user-listings-title">User Memes</h1>
            <div class="user-meme-listings">
                ${data.length !== 0 ? data.map(el => myCardTemplate(el)) : html`<p class="no-memes">No memes in database.</p>`}
            </div>
        </section>
    </main>
    ${footerTemplate()}`