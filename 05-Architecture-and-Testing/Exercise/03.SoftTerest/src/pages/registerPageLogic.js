import navigation from "../navigation.js";
import services from "../services.js";
import rendering from "../rendering.js";

async function submitHandler(event) {
    event.preventDefault();
    let formData = new FormData(formEl);
    let email = formData.get('email');
    let password = formData.get('password');
    let rePass = formData.get('repeatPassword');

    if (email.length < 3 || !/[!@#$%^&*(),.?":{}|<>]/.test(email)) {
        alert('Enter a valid email address.');
        return;
        // the tests use john@abv.bg as email which contradicts the validation rule !/\d/.test(email)
    }
    if (password.length < 3) {
        alert('Passwords must be at least 3 characters long.');
        return;
    }
    if (password !== rePass) {
        alert('Passwords do not match.');
        return;
    }

    try {
        await services.register({email, password});

        formEl.reset();

        rendering.renderNavBar();
        navigation.navigateToHomePage();
    } catch (error) {
        alert(error.message)
    }
}

let formEl = document.querySelector('form.form-user.col-md-7');
formEl.addEventListener('submit', submitHandler);