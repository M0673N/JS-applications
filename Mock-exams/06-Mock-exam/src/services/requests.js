async function requests(method, url, body, authorized) {
    let response = {};
    let options = {
        method,
        headers: {},
    }

    if (body) {
        options.headers["Content-Type"] = "application/json";
        options.body = JSON.stringify(body)
    }
    if (authorized) {
        options.headers["X-Authorization"] = localStorage.getItem('accessToken');
    }

    try {
        response = await fetch(url, options);
    } catch (error) {
        throw new Error(error.message);
    }

    if (!response.ok) {
        response = await response.json();
        throw new Error(response.message);
    }

    try {
        return await response.json();
    } catch (error) {
        return response;
    }
}

let get = requests.bind(null, 'GET');
let post = requests.bind(null, 'POST');
let put = requests.bind(null, 'PUT');
let del = requests.bind(null, 'DELETE');

export default {get, post, put, del};