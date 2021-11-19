import services from "./services.js";
import {render} from "../../../node_modules/lit-html/lit-html.js";
import {dashboardPageTemplate} from "../pages/dashboardPage/dashboardPageTemplate.js";
import {detailsPageTemplate} from "../pages/detailsPage/detailsPageTemplate.js";
import {editPageTemplate} from "../pages/editPage/editPageTemplate.js";
import {myFurniturePageTemplate} from "../pages/myFurniturePage/myFurniturePageTemplate.js";
import {registerPageTemplate} from "../pages/registerPage/registerPageTemplate.js";
import {createPageTemplate} from "../pages/createPage/createPageTemplate.js";
import {loginPageTemplate} from "../pages/loginPage/loginPageTemplate.js";
import createPageLogic from "../pages/createPage/createPageLogic.js";
import detailsPageLogic from "../pages/detailsPage/detailsPageLogic.js";
import editPageLogic from "../pages/editPage/editPageLogic.js";
import registerPageLogic from "../pages/registerPage/registerPageLogic.js";
import loginPageLogic from "../pages/loginPage/loginPageLogic.js";

async function dashboard(context, next) {
    let data = await services.getAllFurniture();
    render(dashboardPageTemplate(data), document.body);
}

async function details(context, next) {
    let data = await services.furnitureDetails(context.params.id);
    let deleteHandler = detailsPageLogic.deleteHandler.bind(null, context.params.id);
    render(detailsPageTemplate(data, deleteHandler, context.params.id), document.body);
}

async function edit(context, next) {
    let data = await services.furnitureDetails(context.params.id);
    let editHandler = editPageLogic.submitHandler.bind(null, context.params.id);
    render(editPageTemplate(data, editHandler), document.body);
}

async function myFurniture(context, next) {
    let data = await services.getMyFurniture();
    render(myFurniturePageTemplate(data), document.body);
}

function register(context, next) {
    render(registerPageTemplate(registerPageLogic.submitHandler), document.body);
}

function create(context, next) {
    render(createPageTemplate(createPageLogic.submitHandler), document.body);
}

function login(context, next) {
    render(loginPageTemplate(loginPageLogic.submitHandler), document.body);
}

async function logout(context, next) {
    await services.logout();
    context.page.redirect('/');
}

export default {dashboard, register, create, login, logout, myFurniture, details, edit}