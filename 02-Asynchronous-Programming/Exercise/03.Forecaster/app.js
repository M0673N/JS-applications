function attachEvents() {
    let locationEl = document.querySelector('#location');
    let buttonEl = document.querySelector('#submit');
    let todayEl = document.querySelector('#current');
    let upcomingEl = document.querySelector('#upcoming');
    let hiddensEl = document.querySelector('#forecast');

    let mapper = {
        'Sunny': '☀',
        'Partly sunny': '⛅',
        'Overcast': '☁',
        'Rain': '☂',
        'degrees': '°'
    }

    function clearInfo() {
        Array.from(todayEl.querySelectorAll('div.forecasts')).forEach(el => el.remove());
        Array.from(upcomingEl.querySelectorAll('div.forecast-info')).forEach(el => el.remove());
        Array.from(hiddensEl.querySelectorAll('div#err')).forEach(el => el.remove());
    }

    function showDivs() {
        Array.from(document.querySelectorAll('.label')).forEach(el => el.style.display = 'block')
    }

    function hideDivs() {
        Array.from(document.querySelectorAll('.label')).forEach(el => el.style.display = 'none')
    }

    buttonEl.addEventListener('click', async function (event) {
        try {
            let locationsData = await fetch('http://localhost:3030/jsonstore/forecaster/locations')
                .then(data => data.json());
            let cityCode = locationsData.find(el => el.name === locationEl.value).code;
            let today = fetch('http://localhost:3030/jsonstore/forecaster/today/' + cityCode)
                .then(data => data.json());
            let forecast = fetch('http://localhost:3030/jsonstore/forecaster/upcoming/' + cityCode)
                .then(data => data.json());
            [today, forecast] = await Promise.all([today, forecast]);

            clearInfo();
            showDivs();

            let forecastDiv = document.createElement('div');
            forecastDiv.className = 'forecasts';

            let conditionSymbolSpan = document.createElement('span');
            conditionSymbolSpan.className = 'condition symbol';
            conditionSymbolSpan.textContent = mapper[today.forecast.condition];
            forecastDiv.appendChild(conditionSymbolSpan);

            let conditionSpan = document.createElement('span');
            conditionSpan.className = 'condition';

            let nameSpan = document.createElement('span');
            nameSpan.className = 'forecast-data';
            nameSpan.textContent = today.name;
            conditionSpan.appendChild(nameSpan)

            let temprSpan = document.createElement('span');
            temprSpan.className = 'forecast-data';
            temprSpan.textContent = `${today.forecast.low}${mapper.degrees}/${today.forecast.high}${mapper.degrees}`;
            conditionSpan.appendChild(temprSpan);

            let condSpan = document.createElement('span');
            condSpan.className = 'forecast-data';
            condSpan.textContent = today.forecast.condition;
            conditionSpan.appendChild(condSpan);

            forecastDiv.appendChild(conditionSpan);
            todayEl.appendChild(forecastDiv);
            hiddensEl.style.display = 'block';


            let forecastInfoDiv = document.createElement('div');
            forecastInfoDiv.className = 'forecast-info';

            for (const day of forecast.forecast) {
                let upcomingSpan = document.createElement('span');
                upcomingSpan.className = 'upcoming';

                let symbolSpan = document.createElement('span');
                symbolSpan.className = 'symbol';
                symbolSpan.textContent = mapper[day.condition];
                upcomingSpan.appendChild(symbolSpan);

                let temprSpan = document.createElement('span');
                temprSpan.className = 'forecast-data';
                temprSpan.textContent = `${day.low}${mapper.degrees}/${day.high}${mapper.degrees}`;
                upcomingSpan.appendChild(temprSpan);

                let condSpan = document.createElement('span');
                condSpan.className = 'forecast-data';
                condSpan.textContent = day.condition;
                upcomingSpan.appendChild(condSpan);

                forecastInfoDiv.appendChild(upcomingSpan);
            }
            upcomingEl.appendChild(forecastInfoDiv);
        } catch (error) {
            clearInfo();
            hideDivs();
            let errodDiv = document.createElement('div');
            errodDiv.textContent = 'Error';
            errodDiv.id = 'err';
            errodDiv.className = 'label';
            errodDiv.style.textAlign = "center";
            hiddensEl.appendChild(errodDiv);
            hiddensEl.style.display = 'block';
        }
    });
}

attachEvents();