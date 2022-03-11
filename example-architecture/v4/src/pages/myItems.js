import {html} from "/node_modules/lit-html/lit-html.js";
import {footer, navBar} from "./common.js";

const myItemsCardTemplate = (el) => html`
    <div class="listing">
        <div class="preview">
            <img src="${el.imageUrl}">
        </div>
        <h2>${el.brand} ${el.model}</h2>
        <div class="info">
            <div class="data-info">
                <h3>Year: ${el.year}</h3>
                <h3>Price: ${el.price} $</h3>
            </div>
            <div class="data-buttons">
                <a href="/details-${el._id}" class="button-carDetails">Details</a>
            </div>
        </div>
    </div>`

export const myItemsPageTemplate = (data, context) => html`
    ${navBar({myItems: 'active'}, context)}
    <main id="site-content">
        <section id="my-listings">
            <h1>My car listings</h1>
            <div class="listings">
                ${data.length !== 0 ? data.map(el => myItemsCardTemplate(el)) : html`<p class="no-cars"> You haven't
                    listed any cars yet.</p>`}
            </div>
        </section>
    </main>
    ${footer()}`