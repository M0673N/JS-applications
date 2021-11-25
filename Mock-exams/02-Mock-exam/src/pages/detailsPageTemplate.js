import {html} from "/node_modules/lit-html/lit-html.js";
import {navBar} from "./common.js";
import authService from "../services/authService.js";
import CRUDService from "../services/CRUDService.js";
import commentsLogic from "./formsLogic/commentsLogic.js";

async function deleteHandler(event, id) {
    event.preventDefault();
    if (confirm('Are you sure you want to delete this item?')) {
        try {
            await CRUDService.deleteItem(id);
            location.href = '/home';
        } catch (error) {
            alert(error.message);
        }
    }
}

const buttonsTemplate = (id) => html`
    <div class="buttons">
        <a href="/edit-${id}" class="button">Edit</a>
        <a href="" class="button" @click=${event => deleteHandler(event, id)}>Delete</a>
    </div>`

const commentTemplate = (el) => html`
    <li class="comment">
        <p>Content: ${el.comment}</p>
    </li>`

const createCommentTemplate = (gameId) => html`
    <article class="create-comment">
        <label>Add new comment:</label>
        <form class="form" @submit="${event => commentsLogic.submitHandler(event, gameId)}">
            <textarea name="comment" placeholder="Comment......"></textarea>
            <input class="btn submit" type="submit" name="comment" value="Add Comment">
        </form>
    </article>`

export const detailsPageTemplate = (data, comments) => html`
    ${navBar({})}
    <main>
        <section id="game-details">
            <h1>Game Details</h1>
            <div class="info-section">

                <div class="game-header">
                    <img class="game-img" src="${data.imageUrl}"/>
                    <h1>${data.title}</h1>
                    <span class="levels">MaxLevel: ${data.maxLevel}</span>
                    <p class="type">${data.category}</p>
                </div>

                <p class="text">${data.summary}</p>

                <div class="details-comments">
                    <h2>Comments:</h2>
                    <ul>
                        ${comments.length !== 0 ? comments.map(el => commentTemplate(el)) : html`<p class="no-comment">
                            No
                            comments.</p>`}
                    </ul>
                </div>
                ${data._ownerId === authService.getUserData().userId ? buttonsTemplate(data._id) : ''}
            </div>
            ${authService.getUserData().userId && data._ownerId !== authService.getUserData().userId ? createCommentTemplate(data._id) : ''}
        </section>
    </main>`