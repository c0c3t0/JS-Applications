let city = document.querySelector("#location");
let divForecast = document.querySelector("#forecast");
let current = document.querySelector("#current");
let upcoming = document.querySelector("#upcoming");
let baseUrl = 'http://localhost:3030/jsonstore/forecaster';
let code = '';

let weatherSymbols = {
    "Sunny": '\u2600',
    "Partly sunny": '\u26c5',
    "Overcast": '\u2601',
    "Rain": '\u2602',
    "Degrees": '\u00b0'
}


function attachEvents() {
    let getButton = document.querySelector("#submit");
    getButton.addEventListener('click', getForecast);
}

async function getForecast() {
    try {
        if (city.value) {
            code = await getCode();
            let today = await getTodayForecast();

            if (current.children[1]) {
                current.children[1].remove();
                upcoming.children[1].remove();
            }
            divForecast.style.display = 'block';
            upcoming.style.display = 'block';
            current.querySelector('.label').textContent = "Current conditions"

            let [condition, high, low] = Object.values(today.forecast);
            let divForecasts = htmlGenerator('div', '', current, 'forecasts')
            htmlGenerator('span', `${weatherSymbols[condition]}`, divForecasts, 'condition symbol');
            let spanCondition = htmlGenerator('span', '', divForecasts, 'condition');
            htmlGenerator('span', today.name, spanCondition, 'forecast-data');
            htmlGenerator('span', `${low}${weatherSymbols["Degrees"]}/${high}${weatherSymbols["Degrees"]}`, spanCondition, 'forecast-data');
            htmlGenerator('span', condition, spanCondition, 'forecast-data');

            let threeDay = await getThreeDayForecast();
            let divForecastInfo = htmlGenerator('div', '', upcoming, 'forecast-info');
            for (let day of Object.values(threeDay.forecast)) {
                let spanUpcoming = htmlGenerator('span', '', divForecastInfo, 'upcoming');
                htmlGenerator('span', `${weatherSymbols[day.condition]}`, spanUpcoming, 'symbol');
                htmlGenerator('span', `${day.low}${weatherSymbols["Degrees"]}/${day.high}${weatherSymbols["Degrees"]}`, spanUpcoming, 'forecast-data');
                htmlGenerator('span', day.condition, spanUpcoming, 'forecast-data');
            }

        } else {
            throw new Error();
        }
    } catch (error) {
        return clearInfo();
    }
}

async function getCode() {
    let response = await fetch(`${baseUrl}/locations`);
    let data = await response.json();
    code = '';

    Object.values(data).forEach(x => {
        if (x.name === city.value) {
            code = x.code;
        };
    });
    city.value = '';

    return code;
}

async function getTodayForecast() {
    let response = await fetch(`${baseUrl}/today/${code}`);
    if (!response.ok) {
        throw new Error();
    }
    let json = await response.json();
    if (!json) {
        throw new Error();
    }

    return json;
}

async function getThreeDayForecast() {
    let response = await fetch(`${baseUrl}/upcoming/${code}`);
    if (!response.ok) {
        throw new Error();
    }
    let json = response.json();
    if (!json) {
        throw new Error();
    }

    return json;
}

function htmlGenerator(tagName, text, parent, className) {
    let el = document.createElement(tagName);
    el.textContent = text;
    el.className = className;

    if (parent) {
        parent.appendChild(el);
    }

    return el;
}

function clearInfo() {
    current.querySelector('.label').textContent = "Error"
    upcoming.style.display = 'none';
}

attachEvents()


