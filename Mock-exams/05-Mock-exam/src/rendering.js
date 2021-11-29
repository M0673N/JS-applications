import CRUDService from "./services/CRUDService.js";
import {render} from "/node_modules/lit-html/lit-html.js";
import {detailsPageTemplate} from "./pages/detailsPageTemplate.js";
import {editPageTemplate} from "./pages/editPageTemplate.js";
import {registerPageTemplate} from "./pages/registerPageTemplate.js";
import {createPageTemplate} from "./pages/createPageTemplate.js";
import {loginPageTemplate} from "./pages/loginPageTemplate.js";
import {homePageTemplate} from "./pages/homePageTemplate.js";

let targetEl = document.querySelector('body');

async function home(context, next) {
    let data = await CRUDService.getAllItems();
    function objectSorter(obj) {
        let arr = Object.entries(obj);
        arr.sort((a, b) => b[1].bought.length - a[1].bought.length);
        return Object.fromEntries(arr)
    }
    data = objectSorter(data);
    render(homePageTemplate(data, context), targetEl);
}

async function details(context, next) {
    let data = await CRUDService.getSingleItem(context.params.id);
    render(detailsPageTemplate(data, context), targetEl);
}

async function edit(context, next) {
    let data = await CRUDService.getSingleItem(context.params.id);
    render(editPageTemplate(data, context), targetEl);
}

function register(context, next) {
    render(registerPageTemplate(context), targetEl);
}

function create(context, next) {
    render(createPageTemplate(context), targetEl);
}

function login(context, next) {
    render(loginPageTemplate(context), targetEl);
}

export default {register, create, login, details, edit, home}