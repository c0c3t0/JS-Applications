function solve() {
    let infoBox = document.querySelector("#info span")
    let departBtn = document.querySelector("#depart");
    let arriveBtn = document.querySelector("#arrive");
    let stopId = 'depot';

    function depart() {

        fetch(`http://localhost:3030/jsonstore/bus/schedule/${stopId}`)
            .then(response => {
                if (!response.ok) {
                    throw new Error("Error")
                }
                return response.json();
            })
            .then(data => {
                console.log(data);
                departBtn.setAttribute('disabled', 'disabled');
                arriveBtn.removeAttribute('disabled');
                infoBox.textContent = `Next stop ${data.name}`
            })
            .catch(() => {
                infoBox.textContent = "Error";
                departBtn.setAttribute('disabled', 'disabled');
                arriveBtn.setAttribute('disabled', 'disabled');
            })
    }

    function arrive() {
        fetch(`http://localhost:3030/jsonstore/bus/schedule/${stopId}`)
            .then(response => { return response.json(); })
            .then(data => {
                console.log(data);
                arriveBtn.setAttribute('disabled', 'disabled');
                departBtn.removeAttribute('disabled');
                stopId = data.next;

                infoBox.textContent = `Arriving at ${data.name}`
            })
            .catch(() => {
                infoBox.textContent = "Error";
                departBtn.setAttribute('disabled', 'disabled');
                arriveBtn.setAttribute('disabled', 'disabled');
            })
    }

    return {
        depart,
        arrive
    };
}

let result = solve();