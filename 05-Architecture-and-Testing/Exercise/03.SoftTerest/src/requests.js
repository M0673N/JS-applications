function requests(method, url, data, token) {
    let options = {
        method,
        headers: {},
    }

    if (method === 'POST' || method === 'PUT') {
        options.headers = {"Content-Type": "application/json"};
        options.body = JSON.stringify(data)
    }
    if (token) {
        Object.assign(options.headers, {"X-Authorization": localStorage.getItem('accessToken')});
    }

    return fetch(url, options);
}

let get = requests.bind(null, 'GET');
let post = requests.bind(null, 'POST');
let put = requests.bind(null, 'PUT');
let del = requests.bind(null, 'DELETE');

export default {get, post, put, del};