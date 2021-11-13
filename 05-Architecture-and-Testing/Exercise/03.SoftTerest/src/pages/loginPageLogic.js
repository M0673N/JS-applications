import navigation from "../navigation.js";
import services from "../services.js";
import rendering from "../rendering.js";

async function submitHandler(event) {
    event.preventDefault();
    let formData = new FormData(formEl);
    let email = formData.get('email');
    let password = formData.get('password');

    try {
        await services.login({email, password});

        formEl.reset();

        rendering.renderNavBar();
        navigation.navigateToHomePage();
    } catch (error) {
        alert(error.message);
    }
}

let formEl = document.querySelectorAll('form.form-user.col-md-7')[1];
formEl.addEventListener('submit', submitHandler);