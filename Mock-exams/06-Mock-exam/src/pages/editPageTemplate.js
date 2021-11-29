import {html} from "/node_modules/lit-html/lit-html.js";
import {footer, navBar} from "./common.js";
import createEditLogic from "./formsLogic/createEditLogic.js";

export const editPageTemplate = (data, context) => html`
    ${navBar({edit: 'active'}, context)}
    <form class="text-center border border-light p-5" action="#" method=""
          @submit="${event => createEditLogic.editFormHandler(event, context, data._id, data)}">
        <h1>Edit Movie</h1>
        <div class="form-group">
            <label for="title">Movie Title</label>
            <input type="text" class="form-control" placeholder="Movie Title" .value="${data.title}" name="title">
        </div>
        <div class="form-group">
            <label for="description">Movie Description</label>
            <textarea class="form-control" placeholder="Movie Description..."
                      name="description">${data.description}</textarea>
        </div>
        <div class="form-group">
            <label for="imageUrl">Image url</label>
            <input type="text" class="form-control" placeholder="Image Url" .value="${data.img}" name="img">
        </div>
        <button type="submit" class="btn btn-primary">Submit</button>
    </form>
    ${footer()}`