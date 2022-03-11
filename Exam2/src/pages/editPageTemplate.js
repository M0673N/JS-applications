import {html} from "/node_modules/lit-html/lit-html.js";
import {navBar} from "./common.js";
import createEditLogic from "./formsLogic/createEditLogic.js";

export const editPageTemplate = (data, context) => html`
    ${navBar({edit: 'active'}, context)}
    <main id="content">
        <section id="editPage">
            <form class="theater-form" @submit="${event => createEditLogic.editFormHandler(event, context, data._id)}">
                <h1>Edit Theater</h1>
                <div>
                    <label for="title">Title:</label>
                    <input id="title" name="title" type="text" placeholder="Theater name" .value="${data.title}">
                </div>
                <div>
                    <label for="date">Date:</label>
                    <input id="date" name="date" type="text" placeholder="Month Day, Year" .value="${data.date}">
                </div>
                <div>
                    <label for="author">Author:</label>
                    <input id="author" name="author" type="text" placeholder="Author"
                           .value="${data.author}">
                </div>
                <div>
                    <label for="description">Theater Description:</label>
                    <textarea id="description" name="description"
                              placeholder="Description">${data.description}</textarea>
                </div>
                <div>
                    <label for="imageUrl">Image url:</label>
                    <input id="imageUrl" name="imageUrl" type="text" placeholder="Image Url"
                           .value="${data.imageUrl}">
                </div>
                <button class="btn" type="submit">Submit</button>
            </form>
        </section>
    </main>`