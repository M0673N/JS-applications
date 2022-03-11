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
    <div class="actionBtn">
        <a href="/edit-${id}" class="edit">Edit</a>
        <a href="" class="remove" @click=${event => deleteHandler(event, context, id)}">Delete</a>
    </div>`

export const detailsPageTemplate = (data, context) => html`
    ${navBar({}, context)}
    <main id="main-content">
        <section id="detailsPage">
            <div class="wrapper">
                <div class="albumCover">
                    <img src="${data.imgUrl}">
                </div>
                <div class="albumInfo">
                    <div class="albumText">

                        <h1>Name: ${data.name}</h1>
                        <h3>Artist: ${data.artist}</h3>
                        <h4>Genre: ${data.genre}</h4>
                        <h4>Price: ${data.price}</h4>
                        <h4>Date: ${data.releaseDate}</h4>
                        <p>Description: ${data.description}</p>
                    </div>
                    ${data._ownerId === authService.getUserData().userId ? buttonsTemplate(context, data._id) : ''}
                </div>
            </div>
        </section>
    </main>
    ${footer()}`