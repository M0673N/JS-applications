import {html} from "/node_modules/lit-html/lit-html.js";
import {footer, navBar} from "./common.js";
import authService from "../services/authService.js";
import CRUDService from "../services/CRUDService.js";

async function deleteHandler(event, context, id) {
    event.preventDefault();
    if (confirm('Are you sure you want to delete this item?')) {
        try {
            await CRUDService.deleteItem(id);
            context.page.redirect('/profile');
        } catch (error) {
            alert(error.message);
        }
    }
}

const buttonsTemplate = (context, id) => html`
    <a class="btn-delete" @click=${event => deleteHandler(event, context, id)}">Delete</a>
    <a class="btn-edit" href="/edit-${id}">Edit</a>`

export const detailsPageTemplate = (data, context, likes, alreadyLiked) => html`
    ${navBar({}, context)}
    <main id="content">
        <section id="detailsPage">
            <div id="detailsBox">
                <div class="detailsInfo">
                    <h1>Title: ${data.title}</h1>
                    <div>
                        <img src="${data.imageUrl}"/>
                    </div>
                </div>

                <div class="details">
                    <h3>Theater Description</h3>
                    <p>${data.description}</p>
                    <h4>Date: ${data.date}</h4>
                    <h4>Author: ${data.author}</h4>
                    <div class="buttons">
                        ${data._ownerId === authService.getUserData().userId ? buttonsTemplate(context, data._id) : authService.isAuthenticated() && !alreadyLiked ? html`
                            <a class="btn-like" href="#">Like</a>` : ''}
                        <span class="likes">Like: ${likes}</span>
                    </div>
                </div>
            </div>
        </section>
    </main>
    ${footer()}`