import request from "./requests.js";
import endpoints from "./endpoints.js";

// Authorisation
async function login(data) {
    let response = await request.post(endpoints.loginUrl, data).then(response => response.json());
    if (response.code !== undefined) {
        throw new Error(response.message);
    }
    localStorage.setItem('accessToken', response.accessToken);
    localStorage.setItem('email', response.email);
    localStorage.setItem('personId', response._id);
}

async function register(data) {
    let response = await request.post(endpoints.registerUrl, data).then(response => response.json());
    if (response.code !== undefined) {
        throw new Error(response.message);
    }
    localStorage.setItem('accessToken', response.accessToken);
    localStorage.setItem('email', response.email);
    localStorage.setItem('personId', response._id);
}

async function logout() {
    await request.get(endpoints.logoutUrl, '', true);
    localStorage.clear();
}


// CRUD
async function getIdea(id) {
    return await request.get(`${endpoints.ideasUrl}/${id}`).then(response => response.json());
}

async function getAllIdeas() {
    return await request.get(endpoints.sortedIdeasUrl).then(response => response.json());
}

async function createIdea(data) {
    return await request.post(endpoints.ideasUrl, data, true);
}

async function deleteIdea(id) {
    return await request.del(`${endpoints.ideasUrl}/${id}`, '', true);
}

async function updateIdea(id, data) {
    return await request.put(`${endpoints.ideasUrl}/${id}`, data, true);
}

export default {login, register, logout, getIdea, createIdea, deleteIdea, updateIdea, getAllIdeas};