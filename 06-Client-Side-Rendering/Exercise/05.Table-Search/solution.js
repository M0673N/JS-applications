import {render} from "../../../node_modules/lit-html/lit-html.js";
import templates from "./templates.js";


let endpointUrl = 'http://localhost:3030/jsonstore/advanced/table';
let inputEl = document.querySelector('input');
let info;

fetch(endpointUrl)
    .then(data => data.json())
    .then(data => {
        info = data;
        render(templates.tableRow(Object.values(data)), document.querySelector('tbody'))
    });


(function solve() {
    document.querySelector('#searchBtn').addEventListener('click', onClick);

    function onClick() {
        let search = inputEl.value;
        let infoCopy = JSON.parse(JSON.stringify(info));
        for (const row of Object.values(infoCopy)) {
            for (const cell of Object.values(row)) {
                if (cell.toLowerCase().includes(search.toLowerCase())) {
                    row.matched = true;
                }
            }
        }
        render(templates.tableRow(Object.values(infoCopy)), document.querySelector('tbody'));
        inputEl.value = '';
    }
})();