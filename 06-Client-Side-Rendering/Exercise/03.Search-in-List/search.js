import {towns} from "./towns.js";
import {render} from "../../../node_modules/lit-html/lit-html.js";
import templates from "./templates.js";

let townsDiv = document.querySelector('#towns');
render(templates.ulTemplate(towns), townsDiv);

let searchBtn = document.querySelector('button');
let inputEl = document.querySelector('input');
let resultDiv = document.querySelector('#result');

function search() {
    render(templates.ulTemplate(towns, inputEl.value.toLowerCase()), townsDiv);

    let matches = 0;
    for (const el of towns) {
        if (el.includes(inputEl.value.toLowerCase())) {
            matches++;
        }
    }
    resultDiv.textContent = `${matches} matches found`;
    inputEl.value = '';
}

searchBtn.addEventListener('click', search);