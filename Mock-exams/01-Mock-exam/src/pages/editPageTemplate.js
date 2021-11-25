import {html} from "../../node_modules/lit-html/lit-html.js";
import {footerTemplate, navBar} from "./common.js";
import createEditLogic from "./formsLogic/createEditLogic.js";

export const editPageTemplate = (data) => html`
    ${navBar({edit: 'active'})}
    <main>
        <section id="notifications">
            <div id="errorBox" class="notification">
                <span>MESSAGE</span>
            </div>
        </section>
        <section id="edit-meme">
            <form id="edit-form" @submit="${event => createEditLogic.editFormHandler(event, data._id)}">
                <h1>Edit Meme</h1>
                <div class="container">
                    <label for="title">Title</label>
                    <input id="title" type="text" placeholder="Enter Title" name="title" .value="${data.title}">
                    <label for="description">Description</label>
                    <textarea id="description" placeholder="Enter Description"
                              name="description">${data.description}</textarea>
                    <label for="imageUrl">Image Url</label>
                    <input id="imageUrl" type="text" placeholder="Enter Meme ImageUrl" name="imageUrl"
                           .value="${data.imageUrl}">
                    <input type="submit" class="registerbtn button" value="Edit Meme">
                </div>
            </form>
        </section>
    </main>
    ${footerTemplate()}`