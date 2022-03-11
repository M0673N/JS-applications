import {html} from "/node_modules/lit-html/lit-html.js";
import {footer, navBar} from "./common.js";

const dashboardCardTemplate = (el) => html`
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

export const dashboardPageTemplate = (data, context) => html`
    ${navBar({dashboard: 'active'}, context)}
    <main id="site-content">
        <section id="car-listings">
            <h1>Car Listings</h1>
            <div class="listings">
                ${data.length !== 0 ? data.map(el => dashboardCardTemplate(el)) : html`<p class="no-cars">No cars in
                    database.</p>`}
            </div>
        </section>
    </main>
    ${footer()}`