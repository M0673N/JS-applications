import CRUDService from "./services/CRUDService.js";
import {render} from "/node_modules/lit-html/lit-html.js";
import {homePageTemplate} from "./pages/homePageTemplate.js";
import {detailsPageTemplate} from "./pages/detailsPageTemplate.js";
import {editPageTemplate} from "./pages/editPageTemplate.js";
import {registerPageTemplate} from "./pages/registerPageTemplate.js";
import {createPageTemplate} from "./pages/createPageTemplate.js";
import {loginPageTemplate} from "./pages/loginPageTemplate.js";
import {myItemsPageTemplate} from "./pages/profilePageTemplate.js";
import authService from "./services/authService.js";

let targetEl = document.querySelector('#container');

async function profile(context, next) {
    let data = await CRUDService.getFilteredItems();
    render(myItemsPageTemplate(data, context), targetEl);
}

async function home(context, next) {
    let data = await CRUDService.getSortedItems();
    render(homePageTemplate(data, context), targetEl);
}

async function details(context, next) {
    let likes, data, alreadyLiked;
    if (authService.isAuthenticated()) {
        [likes, data, alreadyLiked] = await Promise.all([CRUDService.getLikes(context.params.id),
            CRUDService.getSingleItem(context.params.id),
            CRUDService.getFilteredLikes(context.params.id)]);
    } else {
        [likes, data] = await Promise.all([CRUDService.getLikes(context.params.id),
            CRUDService.getSingleItem(context.params.id)]);
        alreadyLiked = 0;
    }
    render(detailsPageTemplate(data, context, likes, alreadyLiked), targetEl);
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

export default {register, create, login, details, edit, home, profile}