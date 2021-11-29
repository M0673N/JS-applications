import {html} from "/node_modules/lit-html/lit-html.js";
import {footer, navBar} from "./common.js";
import createEditLogic from "./formsLogic/createEditLogic.js";

export const createPageTemplate = (context) => html`
    ${navBar({create: 'active'}, context)}
    <main>
        <h1>Create New Offer</h1>
        <p class="message"></p>
        <form @submit="${event => createEditLogic.createFormHandler(event, context)}">
            <div>
                <input type="text" name="name" placeholder="Name...">
            </div>
            <div>
                <input type="text" name="price" placeholder="Price...">
            </div>
            <div>
                <input type="text" name="imageUrl" placeholder="Image url...">
            </div>
            <div>
                <textarea name="description" placeholder="Give us some description about this offer..."></textarea>
            </div>
            <div>
                <input type="text" name="brand" placeholder="Brand...">
            </div>
            <div>
                <button>Create</button>
            </div>
        </form>
    </main>
    ${footer()}`