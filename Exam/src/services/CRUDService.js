import request from "./requests.js";
import endpoints from "./endpoints.js";

async function getSingleItem(id) {
    return await request.get(`${endpoints.itemsUrl}/${id}`);
}

async function getAllItems() {
    return await request.get(endpoints.itemsUrl);
}

async function getFilteredItems(query) {
    return await request.get(`${endpoints.itemsUrl}?where=name%20LIKE%20%22${query}%22`);
}

async function getSortedItems() {
    return await request.get(`${endpoints.itemsUrl}?sortBy=_createdOn%20desc&distinct=name`);
}

async function createItem(data) {
    return await request.post(endpoints.itemsUrl, data, true);
}

async function deleteItem(id) {
    return await request.del(`${endpoints.itemsUrl}/${id}`, '', true);
}

async function updateItem(data, id) {
    return await request.put(`${endpoints.itemsUrl}/${id}`, data, true);
}

export default {
    getSingleItem,
    getFilteredItems,
    getAllItems,
    createItem,
    deleteItem,
    updateItem,
    getSortedItems,
}