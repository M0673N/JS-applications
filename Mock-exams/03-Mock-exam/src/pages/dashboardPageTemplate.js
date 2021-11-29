import {html} from "/node_modules/lit-html/lit-html.js";
import {footer, navBar} from "./common.js";

const dashboardCardTemplate = (el) => html`
    <li class="otherBooks">
        <h3>${el.title}</h3>
        <p>Type: ${el.type}</p>
        <p class="img"><img src="${el.imageUrl}"></p>
        <a class="button" href="/details-${el._id}">Details</a>
    </li>`

const dashboardListTemplate = (data) => html`
    <ul class="other-books-list">
        ${data.map(el => dashboardCardTemplate(el))}
    </ul>`

export const dashboardPageTemplate = (data, context) => html`
    ${navBar({dashboard: 'active'}, context)}
    <main id="site-content">
        <section id="dashboard-page" class="dashboard">
            <h1>Dashboard</h1>
            ${data.length !== 0 ? dashboardListTemplate(data) : html`<p class="no-books">No books in database!</p>`}
        </section>
    </main>
    ${footer()}`