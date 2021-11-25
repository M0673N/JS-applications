import {html} from "/node_modules/lit-html/lit-html.js";
import {navBar} from "./common.js";
import createEditLogic from "./formsLogic/createEditLogic.js";

export const editPageTemplate = (data) => html`
    ${navBar({edit: 'active'})}
    <main>
        <section id="edit-page" class="auth">
            <form id="edit" @submit="${event => createEditLogic.editFormHandler(event, data._id)}">
                <div class="container">

                    <h1>Edit Game</h1>
                    <label for="leg-title">Legendary title:</label>
                    <input type="text" id="title" name="title" .value="${data.title}">

                    <label for="category">Category:</label>
                    <input type="text" id="category" name="category" .value="${data.category}">

                    <label for="levels">MaxLevel:</label>
                    <input type="number" id="maxLevel" name="maxLevel" min="1" .value="${data.maxLevel}">

                    <label for="game-img">Image:</label>
                    <input type="text" id="imageUrl" name="imageUrl" .value="${data.imageUrl}">

                    <label for="summary">Summary:</label>
                    <textarea name="summary" id="summary">${data.summary}</textarea>
                    <input class="btn submit" type="submit" value="Edit Game">

                </div>
            </form>
        </section>
    </main>`