import {html} from "/node_modules/lit-html/lit-html.js";
import {footer, navBar} from "./common.js";
import authService from "../services/authService.js";
import CRUDService from "../services/CRUDService.js";

async function deleteHandler(event, id, context) {
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

const buttonsTemplate = (id, context) => html`
    <a class="button" href="/edit-${id}">Edit</a>
    <a class="button" href="" @click=${event => deleteHandler(event, id, context)}">Delete</a>`


async function likeHandler(event, bookId, context) {
    event.preventDefault();
    await CRUDService.createLike({bookId});
    context.page.redirect(`/details-${bookId}`);
}

export const detailsPageTemplate = (data, likes, alreadyLiked, context) => html`
    ${navBar({}, context)}
    <main id="site-content">
        <section id="details-page" class="details">
            <div class="book-information">
                <h3>${data.title}</h3>
                <p class="type">Type: ${data.type}</p>
                <p class="img"><img src="${data.imageUrl}"></p>
                <div class="actions">
                    ${data._ownerId === authService.getUserData().userId ? buttonsTemplate(data._id, context) : ''}
                    ${data._ownerId !== authService.getUserData().userId
                    && authService.getUserData().userId
                    && !alreadyLiked ? html`<a class="button" href="" @click="${event => likeHandler(event, data._id, context)}">Like</a>` : ''}
                    <div class="likes">
                        <img class="hearts" src="/images/heart.png">
                        <span id="total-likes">Likes: ${likes}</span>
                    </div>

                </div>
            </div>
            <div class="book-description">
                <h3>Description:</h3>
                <p>${data.description}</p>
            </div>
        </section>
    </main>
    ${footer()}`