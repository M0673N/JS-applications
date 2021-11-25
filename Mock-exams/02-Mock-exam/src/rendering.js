import CRUDService from "./services/CRUDService.js";
import {render} from "/node_modules/lit-html/lit-html.js";
import {dashboardPageTemplate} from "./pages/dashboardPageTemplate.js";
import {detailsPageTemplate} from "./pages/detailsPageTemplate.js";
import {editPageTemplate} from "./pages/editPageTemplate.js";
import {registerPageTemplate} from "./pages/registerPageTemplate.js";
import {createPageTemplate} from "./pages/createPageTemplate.js";
import {loginPageTemplate} from "./pages/loginPageTemplate.js";
import {homePageTemplate} from "./pages/homePageTemplate.js";

let targetEl = document.querySelector('#box')

async function dashboard(context, next) {
    let data = await CRUDService.getSortedItems();
    render(dashboardPageTemplate(data), targetEl);
}

async function home(context, next) {
    let data = await CRUDService.getSortedItems();
    render(homePageTemplate(data), targetEl);
}

async function details(context, next) {
    let data = await CRUDService.getSingleItem(context.params.id);
    let comments =  await CRUDService.getFilteredComments(context.params.id);
    render(detailsPageTemplate(data, comments), targetEl);
}

async function edit(context, next) {
    let data = await CRUDService.getSingleItem(context.params.id);
    render(editPageTemplate(data), targetEl);
}

function register(context, next) {
    render(registerPageTemplate(), targetEl);
}

function create(context, next) {
    render(createPageTemplate(), targetEl);
}

function login(context, next) {
    render(loginPageTemplate(), targetEl);
}

export default {dashboard, register, create, login, details, edit, home}