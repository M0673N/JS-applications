import {html} from "/node_modules/lit-html/lit-html.js";
import {footer, navBar} from "./common.js";
import authService from "../services/authService.js";
import CRUDService from "../services/CRUDService.js";

async function deleteHandler(event, context, id) {
    event.preventDefault();
    if (confirm('Are you sure you want to delete this item?')) {
        try {
            await CRUDService.deleteItem(id);
            context.page.redirect('/home');
        } catch (error) {
            alert(error.message);
        }
    }
}

async function buyHandler(event, context, data) {
    data.bought.push(authService.getUserData().userEmail);
    await CRUDService.updateItem(data, data._id);
    context.page.redirect(`/details-${data._id}`)
}

export const detailsPageTemplate = (data, context) => html`
    ${navBar({}, context)}
    <main>
        <div class="offer-details">
            <h1>${data.brand} ${data.name}</h1>
            <div class="info">
                <img src="${data.imageUrl}"
                     alt="">
                <div class="description">${data.description}
                    <br>
                    <br>
                    <p class="price">$${data.price}</p>
                </div>
            </div>
            <div class="actions">
                ${data._ownerId === authService.getUserData().userId ? html`
                            <a href="/edit-${data._id}">Edit</a>
                            <a @click=${event => deleteHandler(event, context, data._id)}">Delete</a>`
                        : !data.bought.includes(authService.getUserData().userEmail) ? html`
                                    <a @click="${event => buyHandler(event, context, data)}">Buy</a>`
                                : html`
                                    <span>You bought it</span>`}
            </div>
        </div>
    </main>
    ${footer()}`