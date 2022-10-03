const userNav = document.querySelector('#user');
const guestNav = document.querySelector('#guest');
const greetingMsg = document.querySelector('.email span');
const logoutBtn = document.querySelector('#logout');
const loadBtn = document.querySelector('.load');
const catches = document.querySelector('#catches');
const addBtn = document.querySelector('.add');
const addForm = document.querySelector('#addForm');



async function getCatches() {
    try {
        let response = await fetch('http://localhost:3030/data/catches');
        let data = await response.json();

        if (!response.ok || response.status != 200) {
            throw new Error(data.message);
        }

        catches.replaceChildren();
        Object.values(data).forEach(x => {
            console.log(x);
            let catchDiv = htmlGenerator('div', '', catches, 'catch');
            htmlGenerator('label', 'Angler', catchDiv);
            htmlGenerator('input', '', catchDiv, 'angler', 'text', `${x.angler}`);
            htmlGenerator('label', 'Weight', catchDiv);
            htmlGenerator('input', '', catchDiv, 'weight', 'text', `${x.weight}`);

            htmlGenerator('label', 'Species', catchDiv);
            htmlGenerator('input', '', catchDiv, 'species', 'text', `${x.species}`);

            htmlGenerator('label', 'Location', catchDiv);
            htmlGenerator('input', '', catchDiv, 'location', 'text', `${x.location}`);
            htmlGenerator('label', 'Bait', catchDiv);
            htmlGenerator('input', '', catchDiv, 'bait', 'text', `${x.bait}`);
            htmlGenerator('label', 'Capture Time', catchDiv);
            htmlGenerator('input', '', catchDiv, 'captureTime', 'text', `${x.captureTime}`);
            let updateBtn = htmlGenerator('button', 'Update', catchDiv, 'update');
            updateBtn.setAttribute('data-id', `${x._id}`);
            updateBtn.setAttribute('owner-id', `${x._ownerId}`);
            let deleteBtn = htmlGenerator('button', 'Delete', catchDiv, 'delete');
            deleteBtn.setAttribute('data-id', `${x._id}`);
            deleteBtn.setAttribute('owner-id', `${x._ownerId}`);
        })
        toggleBtns();
    } catch (error) {
        console.error(error.message);
    }
}

async function createCatch(e) {
    e.preventDefault();

    let dataForm = new FormData(e.target);
    let angler = dataForm.get('angler');
    let weight = dataForm.get('weight');
    let species = dataForm.get('species');
    let location = dataForm.get('location');
    let bait = dataForm.get('bait');
    let captureTime = dataForm.get('captureTime');

    if (!angler || !weight || !species || !location || !bait || !captureTime) {
        alert('All fields are required!');
        return;
    }

    try {
        let response = await fetch('http://localhost:3030/data/catches', {
            method: 'POST',
            headers: { 'content-type': 'application/json', 'X-Authorization': sessionStorage.getItem('accessToken') },
            body: JSON.stringify({ angler, weight, species, location, bait, captureTime })
        })
        let data = await response.json();

        if (response.status != 200 || !response.ok) {
            throw new Error(data.message);
        }
    } catch (error) {
        console.error(error.message);
    }

    getCatches();
}

async function logout() {
    await fetch('http://localhost:3030/users/logout', {
        method: 'GET',
        headers: {
            'X-Authorization': sessionStorage.getItem('accessToken')
        }
    })
    sessionStorage.clear();
    window.location.href = './index.html';
}

window.addEventListener('load', async () => {
    if (sessionStorage.accessToken) {
        userNav.style.display = 'inline-block';
        guestNav.style.display = 'none';
        greetingMsg.textContent = sessionStorage.getItem('email');
        logoutBtn.addEventListener('click', logout);
        addBtn.disabled = false;
    } else {
        userNav.style.display = 'none';
        guestNav.style.display = 'inline-block';
        greetingMsg.textContent = 'guest';
    }
    loadBtn.addEventListener('click', getCatches);
    addForm.addEventListener('submit', createCatch);
})

function toggleBtns() {
    const allBtns = catches.querySelectorAll('button');

    allBtns.forEach(button => {
        if (sessionStorage._id === button.getAttribute('owner-id')) {
            button.disabled = false;
        } else {
            button.disabled = true;
        }
    })
}

function htmlGenerator(tag, text, parent, className, type, value) {
    let el = document.createElement(tag);
    el.textContent = text;

    if (parent) {
        parent.appendChild(el);
    }
    if (className) {
        el.className = className;
    }
    if (type) {
        el.type = type;
    }
    if (value) {
        el.value = value;
    }
    return el;
}
