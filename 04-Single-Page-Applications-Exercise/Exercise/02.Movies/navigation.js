import {displayHomePage, hideHomePage} from "./homePageDisplayLogic.js";
import {displayAddMoviePage, hideAddMoviePage} from "./addMoviePageDisplayLogic.js";
import {displayMovieDetailsPage, hideMovieDetailsPage} from "./detailsPageDisplayLogic.js";
import {displayEditMoviePage, hideEditMoviePage} from "./editMoviePageDisplayLogic.js";
import {displayLoginPage, hideLoginPage} from "./loginPageDisplayLogic.js";
import {displayRegisterPage, hideRegisterPage} from "./registerPageDisplayLogic.js";
import {loadMovies} from "./helpers.js";

export function renderHomePage() {
    loadMovies();
    displayHomePage();
    hideAddMoviePage();
    hideMovieDetailsPage();
    hideEditMoviePage();
    hideLoginPage();
    hideRegisterPage();
}

export function renderRegisterPage() {
    displayRegisterPage();
    hideHomePage();
    hideAddMoviePage();
    hideMovieDetailsPage();
    hideEditMoviePage();
    hideLoginPage();
}

export function renderLoginPage() {
    displayLoginPage();
    hideHomePage();
    hideAddMoviePage();
    hideMovieDetailsPage();
    hideEditMoviePage();
    hideRegisterPage();
}

export function renderDetailsPage() {
    displayMovieDetailsPage();
    hideLoginPage();
    hideHomePage();
    hideAddMoviePage();
    hideEditMoviePage();
    hideRegisterPage();
}

export function renderAddMoviePage() {
    displayAddMoviePage();
    hideMovieDetailsPage();
    hideLoginPage();
    hideHomePage();
    hideEditMoviePage();
    hideRegisterPage();
}

export function renderEditMoviePage() {
    displayEditMoviePage();
    hideAddMoviePage();
    hideMovieDetailsPage();
    hideLoginPage();
    hideHomePage();
    hideRegisterPage();
}