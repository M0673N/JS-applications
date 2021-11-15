import {render} from "../../../node_modules/lit-html/lit-html.js";
import templates from "./templates.js";


let selectEl = document.querySelector('select');
let [inputEl, submitBtn] = document.querySelectorAll('input');
let endpointUrl = 'http://localhost:3030/jsonstore/advanced/dropdown';

function displayData(data) {
    let allOptions = [];
    for (const el of Object.values(data)) {
        allOptions.push(templates.option(el._id, el.text));
    }
    render(allOptions, selectEl);
}

fetch(endpointUrl)
    .then(data => data.json())
    .then(data => {
        displayData(data);
    });

async function addItem(event) {
    event.preventDefault();
    await fetch(endpointUrl, {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({text: inputEl.value})
    });
    let data = await fetch(endpointUrl).then(data => data.json());
    displayData(data);
    inputEl.value = '';
}

submitBtn.addEventListener('click', addItem);