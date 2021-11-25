import CRUDService from "./services/CRUDService.js";
import authService from "./services/authService.js";
import {render} from "./../node_modules/lit-html/lit-html.js";
import {dashboardPageTemplate} from "./pages/dashboardPageTemplate.js";
import {detailsPageTemplate} from "./pages/detailsPageTemplate.js";
import {editPageTemplate} from "./pages/editPageTemplate.js";
import {registerPageTemplate} from "./pages/registerPageTemplate.js";
import {createPageTemplate} from "./pages/createPageTemplate.js";
import {loginPageTemplate} from "./pages/loginPageTemplate.js";
import {homePageTemplate} from "./pages/homePageTemplate.js";
import {profilePageTemplate} from "./pages/profilePageTemplate.js";

let targetDiv = document.querySelector('#container')

async function dashboard(context, next) {
    let data = await CRUDService.getSortedItems();
    render(dashboardPageTemplate(data), targetDiv);
}

async function home(context, next) {
    render(homePageTemplate(), targetDiv);
}

async function details(context, next) {
    let data = await CRUDService.getSingleItem(context.params.id);
    render(detailsPageTemplate(data, context.params.id), targetDiv);
}

async function edit(context, next) {
    let data = await CRUDService.getSingleItem(context.params.id);
    render(editPageTemplate(data), targetDiv);
}

async function profile(context, next) {
    let data = await CRUDService.getFilteredItems(authService.getUserData().id);
    render(profilePageTemplate(data), targetDiv);
}

function register(context, next) {
    render(registerPageTemplate(), targetDiv);
}

function create(context, next) {
    render(createPageTemplate(), targetDiv);
}

function login(context, next) {
    render(loginPageTemplate(), targetDiv);
}

export default {dashboard, register, create, login, profile, details, edit, home}