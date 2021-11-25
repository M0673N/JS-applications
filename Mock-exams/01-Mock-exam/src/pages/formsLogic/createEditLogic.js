import CRUDService from "../../services/CRUDService.js";

async function showError(message) {
    let errorSection = document.querySelector('#errorBox');
    errorSection.querySelector('span').textContent = message;
    errorSection.style.display = 'block';
    const sleep = ms => new Promise(resolve => setTimeout(resolve, ms));
    await sleep(3000);
    errorSection.style.display = 'none';
}

function fieldValidator(data) {
    if (data.title.trim() === '' || data.description.trim() === '' || data.imageUrl.trim() === '') {
        throw new Error('Empty fields');
    }
}

async function submitHandler(formType, event, id) {
    event.preventDefault();
    let formData = new FormData(event.currentTarget);
    let data = Object.fromEntries([...formData.entries()]);
    try {
        fieldValidator(data);
        if (formType === 'create') {
            await CRUDService.createItem(data);
            location.href = '/dashboard';
        } else if (formType === 'edit') {
            await CRUDService.updateItem(data, id);
            location.href = `/details-${id}`;
        }
    } catch (error) {
        await showError(error.message);
    }
}

let createFormHandler = submitHandler.bind(null, 'create');
let editFormHandler = submitHandler.bind(null, 'edit');

export default {createFormHandler, editFormHandler};