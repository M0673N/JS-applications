function attachEvents() {
    let phoneBookEl = document.getElementById('phonebook');
    let loadBtn = document.getElementById('btnLoad');
    let createBtn = document.getElementById('btnCreate');
    let [personEl, phoneEl] = document.querySelectorAll('input');

    function buildLi(el) {
        let newLi = document.createElement('li');
        newLi.textContent = `${el.person}: ${el.phone}`;

        let newBtn = document.createElement('button');
        newBtn.textContent = 'Delete';
        newBtn.addEventListener('click', deleteHandler);

        newLi.setAttribute('data-id', el._id);
        newLi.appendChild(newBtn);

        return newLi;
    }

    async function loadHandler(event) {
        try {
            let data = await fetch('http://localhost:3030/jsonstore/phonebook').then(data => data.json());
            phoneBookEl.textContent = ''; // resetting the list
            for (const el of Object.values(data)) {
                let newLi = buildLi(el)
                phoneBookEl.appendChild(newLi);
            }
        } catch {
            '...'
        }
    }

    function deleteHandler(event) {
        fetch(`http://localhost:3030/jsonstore/phonebook/${event.target.parentElement.dataset.id}`, {method: 'DELETE'})
            .catch(error => {
                '...'
            })
        event.target.parentElement.remove();
    }

    function createHandler(event) {
        let person = personEl.value;
        let phone = phoneEl.value;
        personEl.value = '';
        phoneEl.value = '';

        fetch('http://localhost:3030/jsonstore/phonebook', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                person,
                phone
            })
        }).then(data => loadHandler())
            .catch(error => {
                '...'
            })
    }

    loadBtn.addEventListener('click', loadHandler);
    createBtn.addEventListener('click', createHandler);
}

attachEvents();