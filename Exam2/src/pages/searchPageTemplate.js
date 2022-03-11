import {html} from "/node_modules/lit-html/lit-html.js";
import {footer, navBar} from "./common.js";

function resultTemplate(data) {
    if (data === '') {
        return '';
    } else if (data.length === 0) {
        return html`<p class="no-cars"> No results.</p>`
    } else {
        let result = [];
        for (const el of data) {
            result.push(html`
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
                </div>`)
        }
        return result;
    }
}

function clickHandler(event, context) {
    let query = document.querySelector('#search-input').value;
    context.page.redirect(`search-${query}`);
}

export const searchPageTemplate = (data, context) => html`
    ${navBar({search: 'active'}, context)}
    <main id="site-content">
        <section id="search-cars">
            <h1>Filter by year</h1>

            <div class="container">
                <input id="search-input" type="text" name="search" placeholder="Enter desired production year">
                <button class="button-list" @click="${event => clickHandler(event, context)}">Search</button>
            </div>

            <h2>Results:</h2>
            <div class="listings">
                ${resultTemplate(data)}
            </div>
        </section>
    </main>
    ${footer()}`