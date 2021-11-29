import {html} from "/node_modules/lit-html/lit-html.js";
import {footer, navBar} from "./common.js";

const myItemsCardTemplate = (el) => html`
    <li class="otherBooks">
        <h3>${el.title}</h3>
        <p>Type: ${el.type}</p>
        <p class="img"><img src="${el.imageUrl}"></p>
        <a class="button" href="/details-${el._id}">Details</a>
    </li>`

const myItemsListTemplate = (data) => html`
    <ul class="my-books-list">
        ${data.map(el => myItemsCardTemplate(el))}
    </ul>`

export const myItemsPageTemplate = (data, context) => html`
    ${navBar({myItems: 'active'}, context)}
    <main id="site-content">
        <section id="my-books-page" class="my-books">
            <h1>My Books</h1>
            ${data.length !== 0 ? myItemsListTemplate(data) : html`<p class="no-books">No books in database!</p>`}
        </section>
    </main>
    ${footer()}`