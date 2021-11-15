import {html} from "../../../node_modules/lit-html/lit-html.js";
import {repeat} from "../../../node_modules/lit-html/directives/repeat.js";

function clickHandler(event) {
    event.target.textContent = event.target.textContent === 'Show status code' ? 'Hide status code' : 'Show status code';
    event.target.parentElement.querySelector('div').style.display =
        event.target.parentElement.querySelector('div').style.display === 'none' ? '' : 'none';
}

let card = (cat) => html`
    <li>
        <img src="./images/${cat.imageLocation}.jpg" width="250" height="250" alt="Card image cap">
        <div class="info">
            <button class="showBtn" @click="${clickHandler}">Show status code</button>
            <div class="status" style="display: none" id="${cat.id}">
                <h4>Status Code: ${cat.statusCode}</h4>
                <p>${cat.statusMessage}</p>
            </div>
        </div>
    </li>
`

let allCats = (data) => html`
    <ul>
        ${repeat(data, (i) => i.id, (el, i) => card(el))}
    </ul>`

export default {allCats};