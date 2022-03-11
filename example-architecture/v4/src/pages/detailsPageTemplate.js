import {html} from "/node_modules/lit-html/lit-html.js";
import {footer, navBar} from "./common.js";
import authService from "../services/authService.js";
import CRUDService from "../services/CRUDService.js";

async function deleteHandler(event, context, id) {
    event.preventDefault();
    if (confirm('Are you sure you want to delete this item?')) {
        try {
            await CRUDService.deleteItem(id);
            context.page.redirect('/dashboard');
        } catch (error) {
            alert(error.message);
        }
    }
}

const buttonsTemplate = (context, id) => html`
    <div class="listings-buttons">
        <a href="/edit-${id}" class="button-list">Edit</a>
        <a href="" class="button-list" @click=${event => deleteHandler(event, context, id)}">Delete</a>
    </div>`

export const detailsPageTemplate = (data, context) => html`
    ${navBar({}, context)}
    <main id="site-content">
        <section id="listing-details">
            <h1>Details</h1>
            <div class="details-info">
                <img src="${data.imageUrl}">
                <hr>
                <ul class="listing-props">
                    <li><span>Brand:</span>${data.brand}</li>
                    <li><span>Model:</span>${data.model}</li>
                    <li><span>Year:</span>${data.year}</li>
                    <li><span>Price:</span>${data.price}$</li>
                </ul>

                <p class="description-para">${data.description}</p>

                ${data._ownerId === authService.getUserData().userId ? buttonsTemplate(context, data._id) : ''}
            </div>
        </section>
    </main>
    ${footer()}`