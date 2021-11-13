import navigation from "../navigation.js";
import services from "../services.js";
import rendering from "../rendering.js";

async function submitHandler(event) {
    event.preventDefault();
    let formData = new FormData(formEl);
    let title = formData.get('title');
    let description = formData.get('description');
    let img = formData.get('imageURL');

    if (title.length < 6) {
        alert('The title must be at least 6 characters long.');
        return;
    }
    if (description.length < 10) {
        alert('The description must be at least 10 characters long.');
        return;
    }
    if (img.length < 5) {
        alert('The image URL must be at least 5 characters long.');
        return;
    }

    try {
        await services.createIdea({title, description, img});
        formEl.reset();

        navigation.navigateToDashboardPage();
        await rendering.renderDashboard();
    } catch (error) {
        alert(error.message)
    }
}

let formEl = document.querySelector('form.form-idea.col-md-5');
formEl.addEventListener('submit', submitHandler);