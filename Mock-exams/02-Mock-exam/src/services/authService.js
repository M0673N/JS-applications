import request from "./requests.js";
import endpoints from "./endpoints.js";

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

function isAuthenticated() {
    return Boolean(localStorage.getItem('accessToken'));
}

function getUserData() {
    return {
        accessToken: localStorage.getItem('accessToken'),
        userEmail: localStorage.getItem('userEmail'),
        userId: localStorage.getItem('userId')
    }
}

export default {
    login,
    register,
    logout,
    isAuthenticated,
    getUserData
};