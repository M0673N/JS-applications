import {html} from "../../../node_modules/lit-html/lit-html.js";
import {repeat} from "../../../node_modules/lit-html/directives/repeat.js";
import {ifDefined} from "../../../node_modules/lit-html/directives/if-defined.js";

let ulTemplate = (data, match) => html`
    <ul>
        ${repeat(data, (i) => i.id, (el, i) => html`
            <li class="${ifDefined(el.includes(match) ? 'active' : undefined)}">${el}</li>`)}
    </ul>`

export default {ulTemplate};