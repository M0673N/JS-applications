import {render} from "../../../node_modules/lit-html/lit-html.js"; // This is my relative path. Change it if the import doesn't work on your system.
import templates from "./templates.js";

let formEl = document.querySelector('form');
let rootEl = document.querySelector('#root');

formEl.addEventListener('submit', function (event) {
    event.preventDefault();
    let formData = new FormData(formEl);
    let towns = formData.get('towns').split(', ');
    render(templates.ulTemplate(towns), rootEl);
    formEl.reset();
});