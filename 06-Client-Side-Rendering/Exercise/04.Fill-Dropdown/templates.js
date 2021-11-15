import {html} from "../../../node_modules/lit-html/lit-html.js";

let option = (id, name) => html`
    <option value="${id}">${name}</option>`;

export default {option};