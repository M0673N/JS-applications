import navigation from "../navigation.js";
import rendering from "../rendering.js";
import services from "../services.js";

let [icon, dashboardEl, createEl, logoutEl, loginEl, registerEL] = document.querySelectorAll('a');

async function logoutHandler(event) {
    event.preventDefault();
    try {
        await services.logout();

        rendering.renderNavBar();
        navigation.navigateToHomePage();
    } catch (error) {
        alert(error.message);
    }
}

icon.addEventListener('click', function (event) {
    event.preventDefault();
    navigation.navigateToHomePage();
});
registerEL.addEventListener('click', function (event) {
    event.preventDefault();
    navigation.navigateToRegisterPage();
});
loginEl.addEventListener('click', function (event) {
    event.preventDefault();
    navigation.navigateToLoginPage();
});
createEl.addEventListener('click', function (event) {
    event.preventDefault();
    navigation.navigateToCreatePage();
});
dashboardEl.addEventListener('click', async function (event) {
    event.preventDefault();
    navigation.navigateToDashboardPage();
    await rendering.renderDashboard();
});
logoutEl.addEventListener('click', logoutHandler);