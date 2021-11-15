import {html} from "../../../node_modules/lit-html/lit-html.js";
import {repeat} from "../../../node_modules/lit-html/directives/repeat.js";
import {ifDefined} from "../../../node_modules/lit-html/directives/if-defined.js";

let tableRow = (data) =>
    html`
        ${repeat(data, (i) => i.id, (el, i) => html`
            <tr class="${ifDefined(el.matched ? 'select' : undefined)}">
                <td>${el.firstName} ${el.lastName}</td>
                <td>${el.email}</td>
                <td>${el.course}</td>
            </tr>
        `)}`

export default {tableRow};