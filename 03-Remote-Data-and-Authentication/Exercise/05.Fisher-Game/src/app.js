let logoutBtn = document.getElementById('logout');
let addBtn = document.querySelector('button.add');

if (localStorage.getItem('accessToken')) {
    let loginBtn = document.getElementById('login');
    loginBtn.style.display = 'none';
    let registerBtn = document.getElementById('register');
    registerBtn.style.display = 'none';
    let userSpan = document.querySelector('span');
    userSpan.textContent = localStorage.getItem('userName');
    addBtn.disabled = false;

    let logoutUrl = 'http://localhost:3030/users/logout';
    let logoutBtn = document.getElementById('logout');
    logoutBtn.addEventListener('click', async function (event) {
        try {
            event.preventDefault();
            let response = await fetch(logoutUrl, {
                method: 'GET',
                headers: {'X-Authorization': localStorage.getItem('accessToken')}
            });
            if (response.ok) {
                localStorage.removeItem('accessToken');
                localStorage.removeItem('userName');
                localStorage.removeItem('userId');
                window.location.href = 'index.html';
            }
        } catch (error) {
            '...'
        }
    });
} else {
    logoutBtn.style.display = 'none';
}

function fillDiv(data) {
    let newDiv = templateDiv.cloneNode(true);
    newDiv.dataset.id = data._ownerId;
    let [anglerEl, weightEl, speciesEl, locationEl, baitEl, captureTimeEl] = newDiv.querySelectorAll('input');
    anglerEl.value = data.angler;
    weightEl.value = Number(data.weight);
    speciesEl.value = data.species;
    locationEl.value = data.location;
    baitEl.value = data.bait;
    captureTimeEl.value = Number(data.captureTime);
    let [updateBtn, deleteBtn] = newDiv.querySelectorAll('button');
    updateBtn.dataset.id = data._id;
    updateBtn.addEventListener('click', updateBtnHandler);
    deleteBtn.dataset.id = data._id;
    deleteBtn.addEventListener('click', deleteBtnHandler);
    if (data._ownerId !== localStorage.getItem('userId')) {
        updateBtn.disabled = true;
        deleteBtn.disabled = true;
    }
    return newDiv;
}

async function updateBtnHandler(event) {
    try {
        event.preventDefault();
        let [anglerEl, weightEl, speciesEl, locationEl, baitEl, captureTimeEl] = event.target.parentElement.querySelectorAll('input');
        let angler = anglerEl.value;
        let weight = Number(weightEl.value);
        let species = speciesEl.value;
        let llocation = locationEl.value;
        let bait = baitEl.value;
        let captureTime = Number(captureTimeEl.value);

        fetch(`${catchUrl}/${event.target.dataset.id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'X-Authorization': localStorage.getItem('accessToken')
            },
            body: JSON.stringify({
                angler,
                weight,
                species,
                location: llocation,
                bait,
                captureTime
            })
        });
    } catch (error) {
        '...'
    }
}

async function deleteBtnHandler(event) {
    try {
        fetch(`${catchUrl}/${event.target.dataset.id}`, {
            method: 'DELETE',
            headers: {
                'X-Authorization': localStorage.getItem('accessToken')
            }
        })
        event.target.parentElement.remove();
    } catch (error) {
        '...'
    }
}

async function loadData(event) {
    try {
        let data = await fetch(catchUrl).then(data => data.json());
        catchesDiv.textContent = ''; // resetting the div
        for (const el of data) {
            let newDiv = fillDiv(el);
            catchesDiv.appendChild(newDiv);
        }
    } catch (error) {
        '...'
    }
}

let templateDiv = document.querySelector('div.catch').cloneNode(true);
let catchesDiv = document.querySelector('#catches');
catchesDiv.textContent = '';
let loadBtn = document.querySelector('button.load');
let catchUrl = 'http://localhost:3030/data/catches';
loadBtn.addEventListener('click', loadData);

let formEl = document.querySelector('#addForm');
formEl.addEventListener('submit', async function (event) {
    try {
        event.preventDefault();
        let formData = new FormData(formEl);
        let angler = formData.get('angler');
        let weight = Number(formData.get('weight'));
        let species = formData.get('species');
        let llocation = formData.get('location');
        let bait = formData.get('bait');
        let captureTime = Number(formData.get('captureTime'));
        formEl.reset()

        fetch(catchUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'X-Authorization': localStorage.getItem('accessToken')
            },
            body: JSON.stringify({
                angler,
                weight,
                species,
                location: llocation,
                bait,
                captureTime
            })
        }).then(_ => loadData());
    } catch (error) {
        '...'
    }
})