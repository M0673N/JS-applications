if (window.location.pathname.includes('login')) {
    let [registerFormEl, loginFormEl] = document.querySelectorAll('form');
    let notificationElReg = document.createElement('p');
    notificationElReg.style.color = 'red';
    registerFormEl.appendChild(notificationElReg);
    let notificationElLog = document.createElement('p');
    notificationElLog.style.color = 'red';
    loginFormEl.appendChild(notificationElLog);
    let registerUrl = 'http://localhost:3030/users/register';
    let loginUrl = 'http://localhost:3030/users/login';

    registerFormEl.addEventListener('submit', async function (event) {
        event.preventDefault();
        let formData = new FormData(registerFormEl);
        let email = formData.get('email');
        let password = formData.get('password');
        let rePass = formData.get('rePass');

        if (password !== rePass) {
            notificationElReg.textContent = 'Passwords do not match';
            return;
        }
        try {
            let response = await fetch(registerUrl, {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({
                    email,
                    password
                })
            })
                .then(data => data.json())
            if (response.code) {
                throw new Error(response.message);
            }

            let accessToken = response.accessToken;
            let id = response._id;

            localStorage.setItem('accessToken', accessToken);
            localStorage.setItem('id', id);
            registerFormEl.reset();
            notificationElReg.textContent = '';
            window.location.href = 'homeLogged.html';
        } catch (error) {
            notificationElReg.textContent = error.message;
        }
    })

    loginFormEl.addEventListener('submit', async function (event) {
        event.preventDefault();
        let formData = new FormData(loginFormEl);
        let email = formData.get('email');
        let password = formData.get('password');

        try {
            let response = await fetch(loginUrl, {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({
                    email,
                    password
                })
            })
                .then(data => data.json())
            if (response.code) {
                throw new Error(response.message);
            }

            let accessToken = response.accessToken;
            let id = response._id;

            localStorage.setItem('accessToken', accessToken);
            localStorage.setItem('id', id);
            loginFormEl.reset();
            notificationElLog.textContent = '';
            window.location.href = 'homeLogged.html';
        } catch (error) {
            notificationElLog.textContent = error.message;
        }
    })

} else if (window.location.pathname.includes('homeLogged')) {
    let createUrl = 'http://localhost:3030/data/furniture';
    let ordersUrl = 'http://localhost:3030/data/orders';
    let createFormEl = document.querySelector('form');
    let logoutBtn = document.querySelector('#logoutBtn');
    let buyBtn = document.querySelectorAll('button')[1];
    let allOrdersBtn = document.querySelectorAll('button')[2];
    let templateRow = document.querySelector('tbody tr').cloneNode(true);
    let tableBody = document.querySelector('tbody');

    let [furnitureSpan, priceSpan] = document.querySelectorAll('div.orders span');
    furnitureSpan.textContent = '';
    priceSpan.textContent = `0 $`;

    async function loadData() {
        try {
            let data = await fetch('http://localhost:3030/data/furniture').then(data => data.json());
            tableBody.textContent = ''; // resetting the table
            for (const item of data) {
                let newRow = templateRow.cloneNode(true);
                let [name, price, factor] = newRow.querySelectorAll('p');
                let img = newRow.querySelector('img');
                name.textContent = item.name;
                price.textContent = item.price;
                factor.textContent = item.factor;
                img.src = item.img;
                tableBody.appendChild(newRow);
            }
        } catch (error) {
            '...'
        }

    }

    async function loadPrice(event) {
        try {
            let response = await fetch(`http://localhost:3030/data/orders?where=_ownerId%3D"${localStorage.getItem('id')}"`)
                .then(data => data.json());
            let price = 0;
            let allItems = [];

            for (const order of response) {
                for (const item of order.order) {
                    allItems.push(item.name);
                    price += item.price;
                }
            }
            furnitureSpan.textContent = allItems.join(', ');
            priceSpan.textContent = `${price} $`;
        } catch (error) {
            '...'
        }
    }

    (async function firstLoad() {
        await loadData();
        // await loadPrice();
    })();

    createFormEl.addEventListener('submit', async function (event) {
        event.preventDefault();
        let formData = new FormData(createFormEl);
        let dataToSend = {
            name: formData.get('name'),
            price: formData.get('price'),
            factor: formData.get('factor'),
            img: formData.get('img')
        }
        try {
            fetch(createUrl, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'X-Authorization': localStorage.getItem('accessToken')
                },
                body: JSON.stringify(dataToSend)
            })
                .then(_ => loadData());
            createFormEl.reset();
        } catch (error) {
            '...'
        }
    });

    logoutBtn.addEventListener('click', async function (event) {
        try {
            let response = await fetch('http://localhost:3030/users/logout', {
                method: 'GET',
                headers: {'X-Authorization': localStorage.getItem('accessToken')}
            })
            if (response.ok) {
                localStorage.removeItem('accessToken');
                localStorage.removeItem('id');
                window.location.href = 'home.html';
            }
        } catch (error) {
            '...'
        }
    });

    buyBtn.addEventListener('click', async function (event) {
        let allFurniture = Array.from(document.querySelectorAll('tbody tr'));
        let checkedFurniture = allFurniture.filter(el => el.querySelector('input').checked);
        let result = [];
        checkedFurniture.forEach(el =>
            result.push({
                name: el.querySelectorAll('p')[0].textContent,
                price: Number(el.querySelectorAll('p')[1].textContent)
            }));
        try {
            fetch(ordersUrl, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'X-Authorization': localStorage.getItem('accessToken')
                },
                body: JSON.stringify({order: result})
            })
            checkedFurniture.forEach(el => el.querySelector('input').checked = false)
        } catch (error) {
            '...'
        }
    });

    allOrdersBtn.addEventListener('click', loadPrice);

} else if (window.location.pathname.includes('home')) {
    let templateRow = document.querySelector('tbody tr').cloneNode(true);
    let tableBody = document.querySelector('tbody');

    async function loadData() {
        try {
            let data = await fetch('http://localhost:3030/data/furniture').then(data => data.json());
            tableBody.textContent = ''; // resetting the table
            for (const item of data) {
                let newRow = templateRow.cloneNode(true);
                let [name, price, factor] = newRow.querySelectorAll('p');
                let img = newRow.querySelector('img');
                let checkBox = newRow.querySelector('input');
                checkBox.disabled = true;
                name.textContent = item.name;
                price.textContent = item.price;
                factor.textContent = item.factor;
                img.src = item.img;
                tableBody.appendChild(newRow);
            }
        } catch (error) {
            '...'
        }
    }

    (async function firstLoad() {
        await loadData()
    })();
}