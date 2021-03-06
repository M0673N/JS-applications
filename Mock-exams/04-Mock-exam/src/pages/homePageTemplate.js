import {html} from "/node_modules/lit-html/lit-html.js";
import {footer, navBar} from "./common.js";

export const homePageTemplate = (data, context) => html`
    ${navBar({home: 'active'}, context)}
    <main id="site-content">
        <section id="main">
            <div id="welcome-container">
                <h1>Welcome To Car Tube</h1>
                <img class="hero" src="/images/car-png.webp" alt="carIntro">
                <h2>To see all the listings click the link below:</h2>
                <div>
                    <a href="/dashboard" class="button">Listings</a>
                </div>
            </div>
        </section>
    </main>
    ${footer()}`