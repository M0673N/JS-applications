let loadBtn = document.getElementById('loadBooks');
let submitBtn = document.querySelectorAll('button')[5];
let tableBody = document.querySelector('tbody');
let formEl = document.querySelector('form');

function buildRow(id, book) {
    let newTr = document.createElement('tr');

    let titleTd = document.createElement('td');
    titleTd.textContent = book.title;
    newTr.appendChild(titleTd);

    let authorTd = document.createElement('td');
    authorTd.textContent = book.author;
    newTr.appendChild(authorTd);

    let buttonsTd = document.createElement('td');

    let editBtn = document.createElement('button');
    editBtn.textContent = 'Edit';
    editBtn.addEventListener('click', editBtnHandler);
    buttonsTd.appendChild(editBtn);

    let deleteBtn = document.createElement('button');
    deleteBtn.textContent = 'Delete';
    deleteBtn.addEventListener('click', deleteBtnHandler);
    buttonsTd.appendChild(deleteBtn);

    newTr.appendChild(buttonsTd);
    newTr.setAttribute('data-id', id);
    return newTr;
}

function loadData() {
    fetch('http://localhost:3030/jsonstore/collections/books')
        .then(data => data.json())
        .then(data => {
            tableBody.textContent = ''; // reseting the table
            for (const [id, book] of Object.entries(data)) {
                let newTr = buildRow(id, book);
                tableBody.appendChild(newTr);
            }
        })
        .catch(err => {
            '...'
        });
}

function submitBtnHandler(event) {
    event.preventDefault();
    let formData = new FormData(formEl);
    let author = formData.get('author');
    let title = formData.get('title');
    if (title === '' || author === '') {
        return
    }
    formEl.reset()

    fetch('http://localhost:3030/jsonstore/collections/books', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
            author,
            title
        })
    })
        .then(_ => loadData())
        .catch(err => {
            '...'
        });
}

function deleteBtnHandler(event) {
    fetch(`http://localhost:3030/jsonstore/collections/books/${event.target.parentElement.parentElement.dataset.id}`, {
        method: 'DELETE',
    }).then(_ => event.target.parentElement.parentElement.remove())
        .catch(error => {
            '...'
        })

}

function editBtnHandler(event) {
    let title = event.target.parentElement.parentElement.querySelectorAll('td')[0].textContent;
    let author = event.target.parentElement.parentElement.querySelectorAll('td')[1].textContent;
    let [titleEl, authorEl] = formEl.querySelectorAll('input');
    titleEl.value = title;
    authorEl.value = author;
    let heading = formEl.querySelector('h3');
    heading.textContent = 'Edit FORM';

    submitBtn.style.display = 'none';
    saveBtn.setAttribute('data-id', event.target.parentElement.parentElement.dataset.id);
    saveBtn.style.display = '';
}

function saveBtnHandler(event) {
    event.preventDefault();
    let formData = new FormData(formEl);
    let author = formData.get('author');
    let title = formData.get('title');
    if (title === '' || author === '') {
        return
    }
    formEl.reset()
    let heading = formEl.querySelector('h3');
    heading.textContent = 'FORM';
    event.target.style.display = 'none';
    submitBtn.style.display = '';

    fetch(`http://localhost:3030/jsonstore/collections/books/${event.target.dataset.id}`, {
        method: 'PUT',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
            author,
            title
        })
    })
        .then(_ => loadData())
        .catch(err => {
            '...'
        });
}


tableBody.textContent = ''; // resetting the table
let saveBtn = document.createElement('button');
saveBtn.textContent = 'Save';
saveBtn.style.display = 'none';
saveBtn.addEventListener('click', saveBtnHandler);
formEl.appendChild(saveBtn);

loadBtn.addEventListener('click', loadData);
submitBtn.addEventListener('click', submitBtnHandler);