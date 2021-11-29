import CRUDService from "../../services/CRUDService.js";
import helpers from "../../helpers.js";

function fieldValidator(data) {
    let invalidFields = false;

    const fields = {
        title: data.title.trim().length > 0,
        img: data.img.trim().length > 0,
        description: data.description.trim().length > 0
    }

    for (const [name, value] of Object.entries(fields)) {
        if (!value) {
            invalidFields = true;
            break;
        }
    }

    if (invalidFields) {
        helpers.showMessage('error', 'Empty fields');
        return false;
    }
    return true;
}

async function submitHandler(formType, event, context, id, currentData) {
    event.preventDefault();
    let formData = new FormData(event.currentTarget);
    let data = Object.fromEntries([...formData.entries()]);
    if (!fieldValidator(data)) {
        return;
    }

    if (formType === 'create') {
        data.likes = [];
    } else {
        data.likes = currentData.likes;
    }

    try {
        if (formType === 'create') {
            await CRUDService.createItem(data);
            helpers.showMessage('success', 'Created successfully!');
            context.page.redirect('/home');
        } else if (formType === 'edit') {
            await CRUDService.updateItem(data, id);
            helpers.showMessage('success', 'Eddited successfully');
            context.page.redirect(`/details-${id}`);
        }
    } catch (error) {
        helpers.showMessage('error', error.message);
    }
}

let createFormHandler = submitHandler.bind(null, 'create');
let editFormHandler = submitHandler.bind(null, 'edit');

export default {createFormHandler, editFormHandler};