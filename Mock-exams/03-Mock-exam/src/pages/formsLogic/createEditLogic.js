import CRUDService from "../../services/CRUDService.js";

function fieldValidator(data) {
    let invalidFields = false;

    const fields = {
        title: data.title.trim().length > 0,
        description: data.description.trim().length > 0,
        type: data.type.trim().length > 0,
        imageUrl: data.imageUrl.trim().length > 0
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

async function submitHandler(formType, event, id, context) {
    event.preventDefault();
    let formData = new FormData(event.currentTarget);
    let data = Object.fromEntries([...formData.entries()]);

    if (!fieldValidator(data)) {
        return;
    }

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