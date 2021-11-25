import {html} from "../../node_modules/lit-html/lit-html.js";
import {cardTemplate, footerTemplate, navBar} from "./common.js";

export const dashboardPageTemplate = (data) => html`
    ${navBar({dashboard: 'active'})}
    <main>
        <section id="meme-feed">
            <h1>All Memes</h1>
            <div id="memes">
                ${data.length !== 0 ? data.map(el => cardTemplate(el)) : html`<p class="no-memes">No memes in database.</p>`}
            </div>
        </section>
    </main>
    ${footerTemplate()}`