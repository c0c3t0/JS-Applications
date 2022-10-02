window.onload = attachEvents;

const url = 'http://localhost:3030/jsonstore/collections/students';
const tBody = document.querySelector("#results tbody");
const form = document.querySelector('#form');

function attachEvents() {
    form.addEventListener('submit', createStudent);
    getStudents();
}

async function getStudents() {
    let response = await fetch(url);
    let data = await response.json();

    tBody.replaceChildren();
    Object.values(data).forEach(x => {
        let tr = htmlGenerator('tr', '', tBody);
        htmlGenerator('td', `${x.firstName}`, tr);
        htmlGenerator('td', `${x.lastName}`, tr);
        htmlGenerator('td', `${x.facultyNumber}`, tr);
        htmlGenerator('td', `${x.grade}`, tr);
    })
}

async function createStudent(e) {
    e.preventDefault();

    let info = new FormData(e.target);
    let firstName = info.get('firstName');
    let lastName = info.get('lastName');
    let facultyNumber = info.get('facultyNumber');
    let grade = info.get('grade');

    if (!firstName || !lastName || !facultyNumber || !grade) {
        alert('All fields are required!');
    } else {
        let studentData = {
            firstName,
            lastName,
            facultyNumber,
            grade
        }
        await request(url, studentData);
        getStudents();
    }
}

async function request(url, body) {
    if (body) {
        let post = {
            method: 'POST',
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify(body)
        }
        let response = await fetch(url, post);
        return await response.json();
    }
}

function htmlGenerator(tag, content, parent) {
    let el = document.createElement(tag);
    el.textContent = content;

    if (parent) {
        parent.appendChild(el);
    }
    return el;
}