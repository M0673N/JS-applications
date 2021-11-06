import {getTime} from "./helpers.js";

let formEl = document.querySelector('form');
let postUrl = 'http://localhost:3030/jsonstore/collections/myboard/posts';
let topicsDiv = document.querySelector('.topic-title');
let templateDiv = document.querySelector('.topic-container').cloneNode(true);
templateDiv.style.display = 'block';

function fillDiv(data) {
    let newDiv = templateDiv.cloneNode(true);
    let headingEl = newDiv.querySelector('h2');
    let anchorEl = newDiv.querySelector('a');
    let usernameEl = newDiv.querySelector('span');
    let dateEl = newDiv.querySelector('time');

    headingEl.textContent = data.title;
    usernameEl.textContent = data.username;
    dateEl.textContent = data.date;
    anchorEl.addEventListener('click', function (event) {
        event.preventDefault();
        sessionStorage.setItem('anchorId', data._id);
        window.location.href = 'theme-content.html';
    });

    return newDiv;
}

async function loadData() {
    topicsDiv.textContent = '';
    let data = await fetch(postUrl).then(data => data.json());
    let fragment = document.createDocumentFragment();
    for (const el of Object.values(data)) {
        let newDiv = fillDiv(el);
        fragment.appendChild(newDiv);
    }
    topicsDiv.appendChild(fragment);
}

formEl.addEventListener('submit', async function (event) {
    event.preventDefault();
    if (event.target.classList.contains('cancel')) {
        formEl.reset();
        return;
    }
    let formData = new FormData(formEl);
    let title = formData.get('topicName');
    let username = formData.get('username');
    let postText = formData.get('postText');
    if (!title || !username || !postText) {
        return;
    }
    let date = getTime();

    await fetch(postUrl, {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({title, username, postText, date})
    })
        .then(_ => loadData());
    formEl.reset();
})

loadData();