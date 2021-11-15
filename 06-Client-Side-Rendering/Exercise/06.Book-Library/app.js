import {render} from "../../../node_modules/lit-html/lit-html.js";
import templates from "./templates.js";

let endpointUrl = 'http://localhost:3030/jsonstore/collections/books';
let body = document.querySelector('body');

async function renderPage() {
    let data = await fetch(endpointUrl).then(data => data.json());
    render([templates.table(Object.entries(data)), templates.addForm()], body);
}

await renderPage();