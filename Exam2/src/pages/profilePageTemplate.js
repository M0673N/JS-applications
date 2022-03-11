import {html} from "/node_modules/lit-html/lit-html.js";
import {footer, navBar} from "./common.js";
import authService from "../services/authService.js";

const myItemsCardTemplate = (el) => html`
    <div class="eventBoard">
        <div class="event-info">
            <img src="${el.imageUrl}">
            <h2>${el.title}</h2>
            <h6>${el.date}</h6>
            <a href="/details-${el._id}" class="details-button">Details</a>
        </div>
    </div>`

export const myItemsPageTemplate = (data, context) => html`
    ${navBar({myItems: 'active'}, context)}
    <main id="content">
        <section id="profilePage">
            <div class="userInfo">
                <div class="avatar">
                    <img src="/images/profilePic.png">
                </div>
                <h2>${authService.getUserData().userEmail}</h2>
            </div>
            <div class="board">
                ${data.length !== 0 ? data.map(el => myItemsCardTemplate(el)) : html`
                    <div class="no-events">
                        <p>This user has no events yet!</p>
                    </div>`}
            </div>
        </section>
    </main>
    ${footer()}`