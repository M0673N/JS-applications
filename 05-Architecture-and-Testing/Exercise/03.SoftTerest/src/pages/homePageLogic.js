import navigation from "../navigation.js";
import rendering from "../rendering.js";

let homePage = document.querySelector('div.container.home.wrapper.my-md-5.pl-md-5');
let button = homePage.querySelector('a');


button.addEventListener('click', async function (event) {
    event.preventDefault();
    navigation.navigateToDashboardPage();
    await rendering.renderDashboard();
});
