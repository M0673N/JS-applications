import {html} from "../../../node_modules/lit-html/lit-html.js";
import {repeat} from "../../../node_modules/lit-html/directives/repeat.js";

let ulTemplate = (data) =>
    html`
        <ul>
            ${repeat(data, (i) => i.id, (el, i) => html`
                <li>${el}</li>
            `)}
        </ul>`

export default {ulTemplate};