import authService from "../../services/authService.js";

function fieldValidator(data, formType) {
    if (data.email === '' || data.password === '' || data['conf-pass'] === '') {
        alert('Empty fields');
        return false;
    }
    if (formType === 'register') {
        if (data['conf-pass'] !== data.password) {
            alert('Passwords do not match');
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
        } else if (formType === 'login') {
            await authService.login(data);
        }
        context.page.redirect('/home');
    } catch (error) {
        alert(error.message);
    }
}

let loginFormHandler = submitHandler.bind(null, 'login');
let registerFormHandler = submitHandler.bind(null, 'register');

export default {loginFormHandler, registerFormHandler};