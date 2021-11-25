import {html} from "../../node_modules/lit-html/lit-html.js";
import {footerTemplate, navBar} from "./common.js";
import createEditLogic from "./formsLogic/createEditLogic.js";

export const createPageTemplate = () => html`
    ${navBar({create: 'active'})}
    <main>
        <section id="notifications">
            <div id="errorBox" class="notification">
                <span>MESSAGE</span>
            </div>
        </section>
        <section id="create-meme">
            <form id="create-form" @submit="${createEditLogic.createFormHandler}">
                <div class="container">
                    <h1>Create Meme</h1>
                    <label for="title">Title</label>
                    <input id="title" type="text" placeholder="Enter Title" name="title">
                    <label for="description">Description</label>
                    <textarea id="description" placeholder="Enter Description" name="description"></textarea>
                    <label for="imageUrl">Meme Image</label>
                    <input id="imageUrl" type="text" placeholder="Enter meme ImageUrl" name="imageUrl">
                    <input type="submit" class="registerbtn button" value="Create Meme">
                </div>
            </form>
        </section>
    </main>
    ${footerTemplate()}`