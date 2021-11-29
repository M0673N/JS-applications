import authService from "../../services/authService.js";
import helpers from "../../helpers.js";

function fieldValidator(data, formType) {
    if (data.email.length < 1 || data.password.length < 6) {
        helpers.showMessage('error', 'Invalid fields');
        return false;
    }
    if (formType === 'register') {
        if (data['repeatPassword'] !== data.password) {
            helpers.showMessage('error', 'Passwords do not match');
            return false;
        }
    }

    return true;
}

async function submitHandler(formType, event, context) {
    event.preventDefault();
    let formData = new FormData(event.currentTarget);
    let data = Object.fromEntries([...formData.entries()]);

    if (!fieldValidator(data, formType)) {
        return;
    }

    data = {email: data.email, password: data.password};
    try {
        if (formType === 'register') {
            await authService.register(data);
            helpers.showMessage('success', 'Successful registration!');
        } else if (formType === 'login') {
            await authService.login(data);
            helpers.showMessage('success', 'Login successful.');
        }
        context.page.redirect('/home');
    } catch (error) {
        helpers.showMessage('error', error.message);
    }
}

let loginFormHandler = submitHandler.bind(null, 'login');
let registerFormHandler = submitHandler.bind(null, 'register');

export default {loginFormHandler, registerFormHandler};