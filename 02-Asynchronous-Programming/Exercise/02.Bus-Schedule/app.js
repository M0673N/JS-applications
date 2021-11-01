function solve() {
    let departEl = document.querySelector('#depart');
    let arriveEl = document.querySelector('#arrive');
    let infoEl = document.querySelector('.info');
    let baseUrl = 'http://localhost:3030/jsonstore/bus/schedule';
    let nextStop = 'depot';
    let currentStop = '';

    function getData() {
        let data = fetch(`${baseUrl}/${nextStop}`)
            .then(response => response.json())
        return data;
    }

    function errorHandler(err) {
        departEl.disabled = true;
        arriveEl.disabled = true;
        infoEl.textContent = 'Error';
    }

    function depart() {
        getData()
            .then(data => {
                departEl.disabled = true;
                arriveEl.disabled = false;
                infoEl.textContent = `Next stop ${data.name}`;
                currentStop = data.name;
                nextStop = data.next;
            })
            .catch(errorHandler);
    }

    function arrive() {
        getData()
            .then(data => {
                departEl.disabled = false;
                arriveEl.disabled = true;
                infoEl.textContent = `Arriving at ${currentStop}`;
            })
            .catch(errorHandler);
    }

    return {
        depart,
        arrive
    };
}

let result = solve();