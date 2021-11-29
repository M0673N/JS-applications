import request from "./requests.js";
import endpoints from "./endpoints.js";
import authService from "./authService.js";

async function getSingleItem(id) {
    return await request.get(`${endpoints.itemsUrl}/${id}`);
}

async function getAllItems() {
    return await request.get(endpoints.itemsUrl);
}

async function getFilteredItems(title) {
    return await request.get(`${endpoints.itemsUrl}?where=title%3D%22${title}%22`);
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

async function getLikes(movieId) {
    return await request.get(`${endpoints.likesUrl}?where=movieId%3D%22${movieId}%22&count`);
}

async function likedOrNot(movieId) {
    return await request.get(`${endpoints.likesUrl}?where=movieId%3D%22${movieId}%22%20and%20_ownerId%3D%22${authService.getUserData().userId}%22&count`);
}

async function createLike(data) {
    return await request.post(endpoints.likesUrl, data, true);
}

export default {
    getSingleItem,
    getFilteredItems,
    getAllItems,
    createItem,
    deleteItem,
    updateItem,
    getLikes,
    createLike,
    likedOrNot
}