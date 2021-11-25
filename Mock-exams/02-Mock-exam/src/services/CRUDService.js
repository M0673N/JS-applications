import request from "./requests.js";
import endpoints from "./endpoints.js";
import authService from "./authService.js";

async function getSingleItem(id) {
    return await request.get(`${endpoints.itemsUrl}/${id}`);
}

async function getAllItems() {
    return await request.get(endpoints.itemsUrl);
}

async function getFilteredItems() {
    return await request.get(`${endpoints.itemsUrl}?where=_ownerId%3D%22${authService.getUserData().userId}%22`);
}

async function getSortedItems() {
    return await request.get(`${endpoints.itemsUrl}?sortBy=_createdOn%20desc&distinct=category`);
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

async function getFilteredComments(gameId) {
    return await request.get(`${endpoints.commentsUrl}?where=gameId%3D%22${gameId}%22`);
}

async function createComment(data) {
    return await request.post(endpoints.commentsUrl, data, true);
}

export default {
    getSingleItem,
    getFilteredItems,
    getAllItems,
    createItem,
    deleteItem,
    updateItem,
    getSortedItems,
    getFilteredComments,
    createComment
}