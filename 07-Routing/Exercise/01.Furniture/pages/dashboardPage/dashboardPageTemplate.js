import {html} from "/node_modules/lit-html/lit-html.js";
import {repeat} from "/node_modules/lit-html/directives/repeat.js";
import {cardTemplate, navBar} from "../common.js";

export const dashboardPageTemplate = (data) => html`
    ${navBar({dashboard: 'active'})}
    <div class="container">
        <div class="row space-top">
            <div class="col-md-12">
                <h1>Welcome to Furniture System</h1>
                <p>Select furniture from the catalog to view details.</p>
            </div>
        </div>
        <div class="row space-top">
            ${repeat(data, (i) => i.id, (el, i) => cardTemplate(el))}
        </div>
    </div>`