import {render} from "../../../node_modules/lit-html/lit-html.js";
import {cats} from "./catSeeder.js";
import templates from "./templates.js";

let section = document.querySelector('#allCats');

render(templates.allCats(cats), section);