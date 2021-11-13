let baseUrl = 'http://localhost:3030';
let registerUrl = `${baseUrl}/users/register`;
let loginUrl = `${baseUrl}/users/login`;
let logoutUrl = `${baseUrl}/users/logout`;

let sortedIdeasUrl = `${baseUrl}/data/ideas?select=_id%2Ctitle%2Cimg&sortBy=_createdOn%20desc`;
let ideasUrl = `${baseUrl}/data/ideas`;

export default {baseUrl, registerUrl, loginUrl, logoutUrl, ideasUrl, sortedIdeasUrl};