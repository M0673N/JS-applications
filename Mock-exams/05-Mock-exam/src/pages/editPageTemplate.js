import {html} from "/node_modules/lit-html/lit-html.js";
import {navBar} from "./common.js";
import createEditLogic from "./formsLogic/createEditLogic.js";

export const editPageTemplate = (data, context) => html`
    ${navBar({edit: 'active'}, context)}
    <main>
        <h1>Edit Offer</h1>
        <p class="message"></p>
        <form @submit="${event => createEditLogic.editFormHandler(event, context, data)}">
            <div>
                <input type="text" placeholder="Name..." name="name" .value="${data.name}">
            </div>
            <div>
                <input type="text" placeholder="Price..." name="price" .value="${data.price}">
            </div>
            <div>
                <input type="text" placeholder="Image url..." name="imageUrl" .value="${data.imageUrl}">
            </div>
            <div>
                <textarea placeholder="Give us some description about this offer..." name="description">${data.description}</textarea>
            </div>
            <div>
                <input type="text" placeholder="Brand..." .value="${data.brand}" name="brand">
            </div>
            <div>
                <button>Edit</button>
            </div>
        </form>
    </main>`