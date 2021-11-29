import CRUDService from "./services/CRUDService.js";
import {render} from "/node_modules/lit-html/lit-html.js";
import {detailsPageTemplate} from "./pages/detailsPageTemplate.js";
import {editPageTemplate} from "./pages/editPageTemplate.js";
import {registerPageTemplate} from "./pages/registerPageTemplate.js";
import {createPageTemplate} from "./pages/createPageTemplate.js";
import {loginPageTemplate} from "./pages/loginPageTemplate.js";
import {homePageTemplate} from "./pages/homePageTemplate.js";
import authService from "./services/authService.js";

let targetEl = document.querySelector('#container');

async function home(context, next) {
    let data = await CRUDService.getAllItems();
    render(homePageTemplate(data, context), targetEl);
}

async function search(context, next) {
    let data = await CRUDService.getFilteredItems(context.params.id);
    render(homePageTemplate(data, context), targetEl);
}

async function details(context, next) {
    let data = await CRUDService.getSingleItem(context.params.id);
    let likes = await CRUDService.getLikes(context.params.id);
    let liked = 0;
    if (authService.isAuthenticated()) {
        liked = await CRUDService.likedOrNot(context.params.id);
    }
    render(detailsPageTemplate(data, context, likes, liked), targetEl);
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

export default {register, create, login, details, edit, home, search}