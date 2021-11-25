import {html} from "../../node_modules/lit-html/lit-html.js";
import {ifDefined} from "../../node_modules/lit-html/directives/if-defined.js";
import authService from "../services/authService.js";

async function logoutHandler(event) {
    event.preventDefault();
    try {
        await authService.logout();
        location.href = '/home';
    } catch (error) {
        alert(error.message);
    }
}

const loggedIn = (active) => html`
    <div class="user">
        <a href="/create" class="${ifDefined(active.create)}">Create Meme</a>
        <div class="profile">
            <span>Welcome, ${authService.getUserData().email}</span>
            <a href="/profile" class="${ifDefined(active.profile)}">My Profile</a>
            <a href="" @click="${logoutHandler}">Logout</a>
        </div>
    </div>`

const guest = (active) => html`
    <div class="guest">
        <div class="profile">
            <a class="${ifDefined(active.login)}" href="/login">Login</a>
            <a class="${ifDefined(active.register)}" href="/register">Register</a>
        </div>
        <a class="${ifDefined(active.home)}" href="/home">Home Page</a>
    </div>`


export const navBar = (active) => html`
    <nav>
        <a class="${ifDefined(active.dashboard)}" href="/dashboard">All Memes</a>
        ${authService.isAuthenticated() ? loggedIn(active) : guest(active)}
    </nav>`

export const cardTemplate = (el) => html`
    <div class="meme">
        <div class="card">
            <div class="info">
                <p class="meme-title">${el.title}</p>
                <img class="meme-image" alt="meme-img" src="${el.imageUrl}">
            </div>
            <div id="data-buttons">
                <a class="button" href="/details-${el._id}">Details</a>
            </div>
        </div>
    </div>`


export const myCardTemplate = (el) => html`
    <div class="user-meme">
        <p class="user-meme-title">${el.title}</p>
        <img class="userProfileImage" alt="meme-img" src="${el.imageUrl}">
        <a class="button" href="/details-${el._id}">Details</a>
    </div>`

export const footerTemplate = () => html`
    <footer class="footer">
        <p>Created by SoftUni Delivery Team</p>
    </footer>`