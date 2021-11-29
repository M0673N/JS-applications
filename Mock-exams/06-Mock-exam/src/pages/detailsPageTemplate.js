import {html} from "/node_modules/lit-html/lit-html.js";
import {footer, navBar} from "./common.js";
import authService from "../services/authService.js";
import CRUDService from "../services/CRUDService.js";
import helpers from "../helpers.js";

async function deleteHandler(event, context, id) {
    event.preventDefault();
    if (confirm('Are you sure you want to delete this item?')) {
        try {
            await CRUDService.deleteItem(id);
            helpers.showMessage('success', 'Deleted successfully')
            context.page.redirect('/home');
        } catch (error) {
            helpers.showMessage('error', error.message);
        }
    }
}

const buttonsTemplate = (context, data) => html`
    <a class="btn btn-danger" href="" @click="${event => deleteHandler(event, context, data._id)}">Delete</a>
    <a class="btn btn-warning" href="/edit-${data._id}">Edit</a>`

const likeTemplate = (context, data, likes, likeHandler, liked) => html`
    ${!liked ? html`<a class="btn btn-primary" href=""
                       @click="${event => likeHandler(event, context, data)}">Like</a>` :
            html`<span class="enrolled-span">Liked ${likes}</span>`}`

async function likeHandler(event, context, data) {
    event.preventDefault();
    let dataToSend = {movieId: context.params.id}
    await CRUDService.createLike(dataToSend);
    context.page.redirect(`/details-${data._id}`)
}

export const detailsPageTemplate = (data, context, likes, liked) => html`
    ${navBar({}, context)}
    <div class="container">
        <div class="row bg-light text-dark">
            <h1>Movie title: ${data.title}</h1>

            <div class="col-md-8">
                <img class="img-thumbnail" src="${data.img}" alt="Movie">
            </div>
            <div class="col-md-4 text-center">
                <h3 class="my-3 ">Movie Description</h3>
                <p>${data.description}</p>
                ${data._ownerId === authService.getUserData().userId ? buttonsTemplate(context, data)
                        : likeTemplate(context, data, likes, likeHandler, liked)}
            </div>
        </div>
    </div>
    ${footer()}`