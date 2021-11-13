import dashboardPageLogic from "./pages/dashboardPageLogic.js";
import endpoints from "./endpoints.js";
import services from "./services.js";

// dashboard rendering
let dashboard = document.querySelector('#dashboard-holder');
let templateEl = dashboard.querySelector('div').cloneNode(true);
let noIdeasTemplate = dashboard.querySelector('h1');

function fillEl(data) {
    let newCard = templateEl.cloneNode(true);
    let title = newCard.querySelector('p');
    title.textContent = data.title;
    let img = newCard.querySelector('img');
    img.src = data.img;
    let btn = newCard.querySelector('a');
    btn.dataset.id = data._id;
    btn.addEventListener('click', dashboardPageLogic.detailsBtnHandler)
    return newCard;
}

async function renderDashboard() {
    let data = await services.getAllIdeas(endpoints.sortedIdeasUrl);
    dashboard.textContent = '';
    if (data) {
        for (const elData of data) {
            let newCard = fillEl(elData);
            dashboard.appendChild(newCard);
        }
    } else {
        dashboard.appendChild(noIdeasTemplate.cloneNode(true));
    }
}

// navbar rendering
let [_, _2, createEl, logoutEl, loginEl, registerEL] = document.querySelectorAll('a');
let allNavBarEls = [createEl, logoutEl, loginEl, registerEL];
let navBarUl = document.querySelector('.navbar-nav.ml-auto');

function renderNavBar() {
    if (localStorage.getItem('accessToken')) {
        allNavBarEls.forEach(el => el.remove());
        navBarUl.appendChild(createEl);
        navBarUl.appendChild(logoutEl);
    } else {
        allNavBarEls.forEach(el => el.remove());
        navBarUl.appendChild(loginEl);
        navBarUl.appendChild(registerEL);
    }
}

export default {renderDashboard, renderNavBar}