import {html, render} from "../../../node_modules/lit-html/lit-html.js";
import {repeat} from "../../../node_modules/lit-html/directives/repeat.js";

let endpointUrl = 'http://localhost:3030/jsonstore/collections/books';

async function loadBooks() {
    let body = document.querySelector('body');
    let data = await fetch(endpointUrl).then(data => data.json());
    let fragment = document.createDocumentFragment();
    body.textContent = '';
    render([table(Object.entries(data)), addForm()], fragment);
    body.appendChild(fragment);
}

async function editBookHandler(event) {
    let formEl = document.querySelector('form');
    let title = event.target.parentElement.parentElement.querySelectorAll('td')[0].textContent;
    let author = event.target.parentElement.parentElement.querySelectorAll('td')[1].textContent;
    let fragment = document.createDocumentFragment();
    render(editForm(title, author, event.target.dataset.id), fragment);
    formEl.replaceWith(fragment.children[0]);
}

async function deleteBookHandler(event) {
    await fetch(`${endpointUrl}/${event.target.dataset.id}`, {method: 'DELETE'});
    event.target.parentElement.parentElement.remove();
}

let table = (data) =>
    html`
        <button id="loadBooks" @click="${loadBooks}">LOAD ALL BOOKS</button>
        <table>
            <thead>
            <tr>
                <th>Title</th>
                <th>Author</th>
                <th>Action</th>
            </tr>
            </thead>
            <tbody>
            ${repeat(data, (i) => i.id, (book, i) => html`
                <tr>
                    <td>${book[1].title}</td>
                    <td>${book[1].author}</td>
                    <td>
                        <button @click="${editBookHandler}" data-id="${book[0]}">Edit</button>
                        <button @click="${deleteBookHandler}" data-id="${book[0]}">Delete</button>
                    </td>
                </tr>
            `)}
            </tbody>
        </table>`

async function submitHandler(event) {
    event.preventDefault();
    let [titleEl, authorEl] = event.target.parentElement.querySelectorAll('input');
    let author = authorEl.value;
    let title = titleEl.value;
    titleEl.value = '';
    authorEl.value = '';
    await fetch(endpointUrl, {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({author, title})
    });
    await loadBooks();
}

let addForm = () => html`
    <form id="add-form">
        <h3>Add book</h3>
        <label>TITLE</label>
        <input type="text" name="title" placeholder="Title...">
        <label>AUTHOR</label>
        <input type="text" name="author" placeholder="Author...">
        <input type="submit" value="Submit" @click="${submitHandler}">
    </form>`

async function saveHandler(event) {
    event.preventDefault();
    let [_, titleEl, authorEl] = event.target.parentElement.querySelectorAll('input');
    let author = authorEl.value;
    let title = titleEl.value;
    titleEl.value = '';
    authorEl.value = '';
    await fetch(`${endpointUrl}/${event.target.dataset.id}`, {
        method: 'PUT',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({author, title})
    });
    await loadBooks();
}

let editForm = (title, author, id) => html`
    <form id="edit-form">
        <input type="hidden" name="id">
        <h3>Edit book</h3>
        <label>TITLE</label>
        <input type="text" name="title" placeholder="Title..." value="${title}">
        <label>AUTHOR</label>
        <input type="text" name="author" placeholder="Author..." value="${author}">
        <input type="submit" value="Save" @click="${saveHandler}" data-id="${id}">
    </form>`

export default {table, addForm, editForm};