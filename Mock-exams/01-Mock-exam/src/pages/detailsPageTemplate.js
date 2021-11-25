import {html} from "../../node_modules/lit-html/lit-html.js";
import {footerTemplate, navBar} from "./common.js";
import authService from "../services/authService.js";
import CRUDService from "../services/CRUDService.js";

async function deleteHandler(event, id) {
    event.preventDefault();
    if (confirm('Are you sure you want to delete this item?')) {
        try {
            await CRUDService.deleteItem(id);
            location.href = '/dashboard';
        } catch (error) {
            alert(error.message);
        }
    }
}

const buttonsTemplate = (id) => html`
    <a class="button warning" href="/edit-${id}">Edit</a>
    <button class="button danger" @click=${event => deleteHandler(event, id)}>Delete</button>`

export const detailsPageTemplate = (data, id) => html`
    ${navBar({edit: 'active'})}
    <main>
        <section id="meme-details">
            <h1>Meme Title: ${data.title}</h1>
            <div class="meme-details">
                <div class="meme-img">
                    <img alt="meme-alt" src="${data.imageUrl}">
                </div>
                <div class="meme-description">
                    <h2>Meme Description</h2>
                    <p>${data.description}</p>
                    ${data._ownerId === authService.getUserData().id ? buttonsTemplate(id) : ''}
                </div>
            </div>
        </section>
    </main>
    ${footerTemplate()}`