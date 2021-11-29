import CRUDService from "../../services/CRUDService.js";
import authService from "../../services/authService.js";

function fieldValidator(data) {
    let invalidFields = false;

    const fields = {
        name: data.name.trim().length > 0,
        price: data.price.trim().length > 0,
        imageUrl: data.imageUrl.trim().length > 0,
        description: data.description.trim().length > 0,
        brand: data.brand.trim().length > 0
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

async function submitHandler(formType, event, context, incomingData) {
    event.preventDefault();
    let formData = new FormData(event.currentTarget);
    let data = Object.fromEntries([...formData.entries()]);
    if (!fieldValidator(data)) {
        return;
    }
    data.price = Number(data.price);
    if (formType === 'create') {
        data._ownerId = authService.getUserData().userId;
        data.bought = [];
    }
    if (formType === 'edit') {
        data._id = incomingData._id;
        data.bought = incomingData.bought;
        data._ownerId = incomingData._ownerId;
    }

    try {
        if (formType === 'create') {
            await CRUDService.createItem(data);
            context.page.redirect('/home');
        } else if (formType === 'edit') {
            await CRUDService.updateItem(data, data._id);
            context.page.redirect(`/details-${data._id}`);
        }
    } catch (error) {
        alert(error.message);
    }
}

let createFormHandler = submitHandler.bind(null, 'create');
let editFormHandler = submitHandler.bind(null, 'edit');

export default {createFormHandler, editFormHandler};