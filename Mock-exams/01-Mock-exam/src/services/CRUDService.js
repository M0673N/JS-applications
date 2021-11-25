import request from "./requests.js";
import endpoints from "./endpoints.js";

async function getSingleItem(id) {
    return await request.get(`${endpoints.itemsUrl}/${id}`);
}

async function getAllItems() {
    return await request.get(endpoints.itemsUrl);
}

async function getSortedItems() {
    return await request.get(`${endpoints.itemsUrl}?sortBy=_createdOn%20desc`);
}

async function getFilteredItems(id) {
    return await request.get(`${endpoints.itemsUrl}?where=_ownerId%3D%22${id}%22&sortBy=_createdOn%20desc`);
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

export default {getSingleItem, getSortedItems, getAllItems, createItem, deleteItem, updateItem, getFilteredItems}