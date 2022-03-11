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
    return await request.get(`${endpoints.itemsUrl}?where=_ownerId%3D%22${authService.getUserData().userId}%22&sortBy=_createdOn%20desc`);
}

async function getSortedItems() {
    return await request.get(`${endpoints.itemsUrl}?sortBy=_createdOn%20desc&distinct=title`);
}

async function searchCars(query) {
    return await request.get(`${endpoints.itemsUrl}?where=year%3D${query}`);
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

async function getLikes(theaterId) {
    return await request.get(`${endpoints.likesUrl}?where=theaterId%3D%22${theaterId}%22&distinct=_ownerId&count`);
}

async function getFilteredLikes(theaterId) {
    return await request.get(`${endpoints.likesUrl}?where=theaterId%3D%22${theaterId}%22%20and%20_ownerId%3D%22${authService.getUserData().userId}%22&count`);
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
    getSortedItems,
    getFilteredLikes,
    createLike,
    getLikes,
    searchCars
}