import services from "../../src/services.js";

async function submitHandler(event) {
    event.preventDefault();
    let formData = new FormData(event.currentTarget);
    let data = {email: formData.get('email'), password: formData.get('password')};
    try {
        await services.login(data);
        location.href = '/';
    } catch (error) {
        alert(error.message);
    }
}

export default {submitHandler};