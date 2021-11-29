import {html} from "/node_modules/lit-html/lit-html.js";
import {footer, navBar} from "./common.js";
import authService from "../services/authService.js";

const notLoggedIn = () => html`
    <main>
        <div class="container">
            <div class="about-us">
                <div>
                    <img src="/publicc/shoes.jpg" alt="">
                    <img src="/publicc/shoes2.jpg" alt="">
                </div>
                <p>
                    <a href="/register">Register Now</a> and Try it!
                </p>
            </div>
        </div>
    </main>`

const shoeCard = (el) => html`
    <div class="shoe">
        <img src="${el.imageUrl}">
        <h3>${el.brand} ${el.name}</h3>
        <a href="/details-${el._id}">Buy it for $${el.price}</a>
    </div>`

const loggedIn = (data) => html`
    <main>
        <div class="shoes">
            ${Object.values(data).length === 0 ? 'No shoes to display. Be the first to create a new offer' : Object.values(data).map(el => shoeCard(el))}
        </div>
    </main>`

export const homePageTemplate = (data, context) => html`
    ${navBar({home: 'active'}, context)}
    ${authService.isAuthenticated() ? loggedIn(data) : notLoggedIn()}
    ${footer()}`