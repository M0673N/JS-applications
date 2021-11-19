import services from "../../src/services.js";

async function deleteHandler(id, event) {
    event.preventDefault();
    if (confirm('Are you sure you want to delete this item?')) {
        await services.deleteFurniture(id)
        location.href = '/';
    }
}

export default {deleteHandler};