import CRUDService from "./services/CRUDService.js";
import {render} from "/node_modules/lit-html/lit-html.js";
import {dashboardPageTemplate} from "./pages/dashboardPageTemplate.js";
import {detailsPageTemplate} from "./pages/detailsPageTemplate.js";
import {editPageTemplate} from "./pages/editPageTemplate.js";
import {registerPageTemplate} from "./pages/registerPageTemplate.js";
import {createPageTemplate} from "./pages/createPageTemplate.js";
import {loginPageTemplate} from "./pages/loginPageTemplate.js";
import {homePageTemplate} from "./pages/homePageTemplate.js";
import {searchPageTemplate} from "./pages/searchPageTemplate.js";

let targetEl = document.querySelector('#box');

async function dashboard(context, next) {
    let data = await CRUDService.getSortedItems();
    render(dashboardPageTemplate(data, context), targetEl);
}

async function home(context, next) {
    let data = await CRUDService.getSortedItems();
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

async function search(context, next) {
    let data;
    if (context.params.id === 'null') {
        data = null;
    } else {
        data = await CRUDService.getFilteredItems(context.params.id);
    }
    render(searchPageTemplate(data, context), targetEl);
}

export default {dashboard, register, create, login, details, edit, home, search}