import request from "./requests.js";
import endpoints from "./endpoints.js";

// Authorisation
async function login(data) {
    let response = await request.post(endpoints.loginUrl, data);
    localStorage.setItem('accessToken', response.accessToken);
    localStorage.setItem('userEmail', response.email);
    localStorage.setItem('userId', response._id);
}

async function register(data) {
    let response = await request.post(endpoints.registerUrl, data);
    localStorage.setItem('accessToken', response.accessToken);
    localStorage.setItem('userEmail', response.email);
    localStorage.setItem('userId', response._id);
}

async function logout() {
    await request.get(endpoints.logoutUrl, '', true);
    localStorage.clear();
}


// CRUD
async function furnitureDetails(id) {
    return await request.get(`${endpoints.furnitureUrl}/${id}`);
}

async function getAllFurniture() {
    return await request.get(endpoints.furnitureUrl);
}

async function getMyFurniture() {
    return await request.get(`${endpoints.furnitureUrl}?where=_ownerId%3D%22${localStorage.getItem('userId')}%22`);
}

async function createFurniture(data) {
    return await request.post(endpoints.furnitureUrl, data, true);
}

async function deleteFurniture(id) {
    return await request.del(`${endpoints.furnitureUrl}/${id}`, '', true);
}

async function updateFurniture(id, data) {
    return await request.put(`${endpoints.furnitureUrl}/${id}`, data, true);
}

export default {
    login,
    register,
    logout,
    furnitureDetails,
    getAllFurniture,
    getMyFurniture,
    updateFurniture,
    deleteFurniture,
    createFurniture
};