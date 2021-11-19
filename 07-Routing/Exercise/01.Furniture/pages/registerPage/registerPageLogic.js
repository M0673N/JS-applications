import services from "../../src/services.js";

async function submitHandler(event) {
    event.preventDefault();
    let formData = new FormData(event.currentTarget);
    if (formData.get('rePass') !== formData.get('password')) {
        alert('Passwords do not match');
        return;
    }
    let data = {email: formData.get('email'), password: formData.get('password')};
    try {
        await services.register(data);
        location.href = '/';
    } catch (error) {
        alert(error.message);
    }
}

export default {submitHandler};