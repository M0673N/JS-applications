import {html} from "/node_modules/lit-html/lit-html.js";
import {repeat} from "/node_modules/lit-html/directives/repeat.js";
import {cardTemplate, navBar} from "../common.js";

export const myFurniturePageTemplate = (data) => html`
    ${navBar({myFurniture: 'active'})}
    <div class="container">
        <div class="row space-top">
            <div class="col-md-12">
                <h1>My Furniture</h1>
                <p>This is a list of your publications.</p>
            </div>
        </div>
        <div class="row space-top">
            ${repeat(data, (i) => i.id, (el, i) => cardTemplate(el))}
        </div>
    </div>`