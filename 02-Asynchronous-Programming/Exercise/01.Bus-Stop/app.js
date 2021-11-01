function getInfo() {
    let baseUrl = 'http://localhost:3030/jsonstore/bus/businfo';
    let stopIdEl = document.querySelector('#stopId');
    let stopNameEl = document.querySelector('#stopName');
    let busesListEl = document.querySelector('#buses');
    Array.from(busesListEl.children).forEach(el => el.remove());

    fetch(baseUrl + `/${stopIdEl.value}`)
        .then(response => response.json())
        .then(data => {
            stopIdEl.value = '';
            stopNameEl.textContent = data.name;
            for (const [busId, time] of Object.entries(data.buses)) {
                let newLiEl = document.createElement('li');
                newLiEl.textContent = `Bus ${busId} arrives in ${time}`;
                busesListEl.appendChild(newLiEl);
            }
        })
        .catch(error => {
            stopNameEl.textContent = 'Error';
        })
}