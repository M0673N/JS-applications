import {html} from "/node_modules/lit-html/lit-html.js";
import {footer, navBar} from "./common.js";

export const homePageTemplate = (data, context) => html`
    ${navBar({home: 'active'}, context)}
    <main id="main-content">
        <section id="welcomePage">
            <div id="welcome-message">
                <h1>Welcome to</h1>
                <h1>My Music Application!</h1>
            </div>

            <div class="music-img">
                <img src="/images/musicIcons.webp">
            </div>
        </section>
    </main>
    ${footer()}`