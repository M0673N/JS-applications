import {getTime} from "./helpers.js";

let headingEl = document.querySelector('h2');
let postEl = document.querySelector('.header');
let postUsernameEl = postEl.querySelector('span');
let postTimeEl = document.querySelector('time');
let postContentEl = document.querySelector('p.post-content');
let postId = sessionStorage.getItem('anchorId');
let postUrl = 'http://localhost:3030/jsonstore/collections/myboard/posts/';
let formEl = document.querySelector('form');
let commentTemplateDiv = document.querySelector('#user-comment').cloneNode(true);
let commentsUrl = 'http://localhost:3030/jsonstore/collections/myboard/comments';
let commentsDiv = document.querySelector('div.comment');

function filterComments(data) {
    let result = [];
    for (const el of Object.values(data)) {
        if (el.postId === postId) {
            result.push(el)
        }
    }
    return result;
}

function fillDiv(data) {
    let newDiv = commentTemplateDiv.cloneNode(true);
    newDiv.style.display = 'block';
    let usernameEl = newDiv.querySelector('strong');
    let dateEl = newDiv.querySelector('time');
    let contentEl = newDiv.querySelectorAll('p')[1];

    usernameEl.textContent = data.username;
    dateEl.textContent = data.date.replace('T', ' ').split('.')[0];
    contentEl.textContent = data.comment;
    return newDiv;
}

async function loadComments() {
    let data = await fetch(commentsUrl).then(data => data.json());
    data = filterComments(data);
    let fragment = document.createDocumentFragment();
    for (const el of data) {
        let newDiv = fillDiv(el);
        fragment.appendChild(newDiv);
    }
    Array.from(commentsDiv.children).slice(2).forEach(el => el.remove());
    commentsDiv.appendChild(fragment);
}

fetch(`${postUrl}${postId}`)
    .then(data => data.json())
    .then(data => {
        headingEl.textContent = data.title;
        postUsernameEl.textContent = data.username;
        postTimeEl.textContent = data.date.replace('T', ' ').split('.')[0];
        postContentEl.textContent = data.postText;
        postEl.style.display = 'block';
    })

formEl.addEventListener('submit', function (event) {
    event.preventDefault();
    let formData = new FormData(formEl);
    let username = formData.get('username');
    let comment = formData.get('postText');
    if (!username || !comment) {
        return;
    }
    let date = getTime()

    fetch('http://localhost:3030/jsonstore/collections/myboard/comments', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({username, comment, postId, date})
    })
        .then(_ => loadComments())
    formEl.reset();
});

loadComments();