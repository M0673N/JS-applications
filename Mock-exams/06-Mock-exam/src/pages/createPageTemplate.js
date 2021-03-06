import {html} from "/node_modules/lit-html/lit-html.js";
import {footer, navBar} from "./common.js";
import createEditLogic from "./formsLogic/createEditLogic.js";

export const createPageTemplate = (context) => html`
    ${navBar({create: 'active'}, context)}
    <form class="text-center border border-light p-5" action="#" method=""
          @submit="${event => createEditLogic.createFormHandler(event, context)}">
        <h1>Add Movie</h1>
        <div class="form-group">
            <label for="title">Movie Title</label>
            <input type="text" class="form-control" placeholder="Title" name="title" value="">
        </div>
        <div class="form-group">
            <label for="description">Movie Description</label>
            <textarea class="form-control" placeholder="Description" name="description"></textarea>
        </div>
        <div class="form-group">
            <label for="imageUrl">Image url</label>
            <input type="text" class="form-control" placeholder="Image Url" name="img" value="">
        </div>
        <button type="submit" class="btn btn-primary">Submit</button>
    </form>
    ${footer()}`