function getInfo() {
    let stopId = document.querySelector("#stopId");
    let divStopName = document.querySelector("#stopName");
    let ulBuses = document.querySelector("#buses");

    document.querySelector("#submit").addEventListener('click', showBusStops);

    // function showBusStops() {
    //     fetch(`http://localhost:3030/jsonstore/bus/businfo/${stopId.value}`)
    //     .then((response) => response.json())
    //     .then((data) => {
    //         ulBuses.replaceChildren();
    
    //         divStopName.textContent = data.name;
    //         for (let bus in data.buses) {
    //             htmlGenerator('li', `Bus ${bus} arrives in ${data.buses[bus]} minutes`, ulBuses)
    //         }
    //     })
    //     .catch((error) => {
    //         ulBuses.replaceChildren();
    //         divStopName.textContent = 'Error';
    //         console.log(error);
    //     })
    // }


    // =========> async/await <=========

    async function showBusStops() {
        try {
            let response = await fetch(`http://localhost:3030/jsonstore/bus/businfo/${stopId.value}`);
            let data = await response.json();
            ulBuses.replaceChildren();

            divStopName.textContent = data.name;
            for (let bus in data.buses) {
                htmlGenerator('li', `Bus ${bus} arrives in ${data.buses[bus]} minutes`, ulBuses)
            }
        } catch (error) {
            ulBuses.replaceChildren();
            divStopName.textContent = 'Error';
        }
    }

}



function htmlGenerator(tagName, content, parent) {
    let el = document.createElement(tagName);
    el.textContent = content;

    if (parent) {
        parent.appendChild(el);
    }

    return el;
}