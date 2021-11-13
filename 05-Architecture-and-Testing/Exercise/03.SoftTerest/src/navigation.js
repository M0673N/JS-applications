let [homePage, registerPage, loginPage, createPage] = document.querySelectorAll('div.container.home.wrapper.my-md-5.pl-md-5');
let dashboardPage = document.querySelector('#dashboard-holder');
let descriptionPage = document.querySelector('div.container.home.some');
let allPages = [homePage, registerPage, loginPage, createPage, dashboardPage, dashboardPage, descriptionPage];
let navBar = document.querySelector('nav');

function navigateToHomePage() {
    allPages.forEach(el => el.remove());
    navBar.insertAdjacentElement("afterend", homePage);
}

function navigateToRegisterPage() {
    allPages.forEach(el => el.remove());
    navBar.insertAdjacentElement("afterend", registerPage);
}

function navigateToLoginPage() {
    allPages.forEach(el => el.remove());
    navBar.insertAdjacentElement("afterend", loginPage);
}

function navigateToCreatePage() {
    allPages.forEach(el => el.remove());
    navBar.insertAdjacentElement("afterend", createPage);
}

function navigateToDashboardPage() {
    allPages.forEach(el => el.remove());
    navBar.insertAdjacentElement("afterend", dashboardPage);
}

function navigateToDescriptionPage() {
    allPages.forEach(el => el.remove());
    navBar.insertAdjacentElement("afterend", descriptionPage);
}

export default {
    navigateToHomePage,
    navigateToRegisterPage,
    navigateToLoginPage,
    navigateToCreatePage,
    navigateToDashboardPage,
    navigateToDescriptionPage
}
