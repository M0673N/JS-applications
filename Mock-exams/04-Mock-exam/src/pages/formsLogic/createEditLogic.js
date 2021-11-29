import CRUDService from "../../services/CRUDService.js";

function fieldValidator(data) {
    let invalidFields = false;

    const fields = {
        brand: data.brand.trim().length > 0,
        model: data.model.trim().length > 0,
        description: data.description.trim().length > 0,
        year: data.year.trim().length > 0 && !isNaN(data.year),
        imageUrl: data.imageUrl.trim().length > 0,
        price: data.price.trim().length > 0 && !isNaN(data.year)
    }

    for (const [name, value] of Object.entries(fields)) {
        if (!value) {
            invalidFields = true;
            break;
        }
    }

    if (invalidFields) {
        alert('Empty fields');
        return false;
    }
    return true;
}

async function submitHandler(formType, event, context, id) {
    event.preventDefault();
    let formData = new FormData(event.currentTarget);
    let data = Object.fromEntries([...formData.entries()]);
    if (!fieldValidator(data)) {
        return;
    }
    data.year = Number(data.year);
    data.price = Number(data.price);
    try {
        if (formType === 'create') {
            await CRUDService.createItem(data);
            context.page.redirect('/dashboard');
        } else if (formType === 'edit') {
            await CRUDService.updateItem(data, id);
            context.page.redirect(`/details-${id}`);
        }
    } catch (error) {
        alert(error.message);
    }
}

let createFormHandler = submitHandler.bind(null, 'create');
let editFormHandler = submitHandler.bind(null, 'edit');

export default {createFormHandler, editFormHandler};