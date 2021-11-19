import services from "../../src/services.js";

async function submitHandler(event) {
    event.preventDefault();
    let formData = new FormData(event.currentTarget);
    let make = formData.get('make');
    let model = formData.get('model');
    let year = Number(formData.get('year'));
    let description = formData.get('description');
    let price = Number(formData.get('price'));
    let material = formData.get('material');
    let img = formData.get('img');

    let invalidFields = false;
    if (make.length < 4) {
        invalidFields = true;
        document.querySelector('#new-make').classList.add('is-invalid');
        document.querySelector('#new-make').classList.remove('is-valid');
    } else {
        document.querySelector('#new-make').classList.add('is-valid');
        document.querySelector('#new-make').classList.remove('is-invalid');
    }

    if (model.length < 4) {
        invalidFields = true;
        document.querySelector('#new-model').classList.add('is-invalid');
        document.querySelector('#new-model').classList.remove('is-valid');
    } else {
        document.querySelector('#new-model').classList.add('is-valid');
        document.querySelector('#new-model').classList.remove('is-invalid');
    }

    if (year < 1950 || year > 2050) {
        invalidFields = true;
        document.querySelector('#new-year').classList.add('is-invalid');
        document.querySelector('#new-year').classList.remove('is-valid');
    } else {
        document.querySelector('#new-year').classList.add('is-valid');
        document.querySelector('#new-year').classList.remove('is-invalid');
    }

    if (description.length < 10) {
        invalidFields = true;
        document.querySelector('#new-description').classList.add('is-invalid');
        document.querySelector('#new-description').classList.remove('is-valid');
    } else {
        document.querySelector('#new-description').classList.add('is-valid');
        document.querySelector('#new-description').classList.remove('is-invalid');
    }

    if (price < 0) {
        invalidFields = true;
        document.querySelector('#new-price').classList.add('is-invalid');
        document.querySelector('#new-price').classList.remove('is-valid');
    } else {
        document.querySelector('#new-price').classList.add('is-valid');
        document.querySelector('#new-price').classList.remove('is-invalid');
    }

    if (img.length < 1) {
        invalidFields = true;
        document.querySelector('#new-image').classList.add('is-invalid');
        document.querySelector('#new-image').classList.remove('is-valid');
    } else {
        document.querySelector('#new-image').classList.add('is-valid');
        document.querySelector('#new-image').classList.remove('is-invalid');
    }

    if (invalidFields) {
        alert('Invalid fields');
        return;
    }

    let data = {
        make,
        model,
        year,
        description,
        price,
        material,
        img
    };
    try {
        await services.createFurniture(data);
        location.href = '/';
    } catch (error) {
        alert(error.message);
    }
}

export default {submitHandler};