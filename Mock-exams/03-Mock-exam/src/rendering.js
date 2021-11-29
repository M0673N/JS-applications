import CRUDService from "./services/CRUDService.js";
import {render} from "/node_modules/lit-html/lit-html.js";
import {dashboardPageTemplate} from "./pages/dashboardPageTemplate.js";
import {detailsPageTemplate} from "./pages/detailsPageTemplate.js";
import {editPageTemplate} from "./pages/editPageTemplate.js";
import {registerPageTemplate} from "./pages/registerPageTemplate.js";
import {createPageTemplate} from "./pages/createPageTemplate.js";
import {loginPageTemplate} from "./pages/loginPageTemplate.js";
import {homePageTemplate} from "./pages/homePageTemplate.js";
import {myItemsPageTemplate} from "./pages/myItems.js";
import authService from "./services/authService.js";

let targetEl = document.querySelector('#container');

async function dashboard(context, next) {
    let data = await CRUDService.getSortedItems();
    render(dashboardPageTemplate(data, context), targetEl);
}

async function myItems(context, next) {
    let data = await CRUDService.getFilteredItems();
    render(myItemsPageTemplate(data, context), targetEl);
}

async function home(context, next) {
    let data = await CRUDService.getSortedItems();
    render(homePageTemplate(data, context), targetEl);
}

async function details(context, next) {
    let data = await CRUDService.getSingleItem(context.params.id);
    let likes = await CRUDService.getLikes(context.params.id);
    let alreadyLiked = false;
    if (authService.getUserData().userId){
        alreadyLiked = await CRUDService.getFilteredLikes(context.params.id);
    }
    render(detailsPageTemplate(data, likes, alreadyLiked, context), targetEl);
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

export default {dashboard, register, create, login, details, edit, home, myItems}