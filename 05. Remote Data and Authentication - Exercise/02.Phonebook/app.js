const url = 'http://localhost:3030/jsonstore/phonebook';

const phonebook = document.querySelector('#phonebook');
const person = document.querySelector('#person');
const phone = document.querySelector('#phone');

function attachEvents() {
    document.querySelector('#btnLoad').addEventListener('click', getPhones);
    document.querySelector('#btnCreate').addEventListener('click', setPhone);
}

async function getPhones() {
    const response = await fetch(url);
    const data = await response.json();

    phonebook.replaceChildren();
    Object.values(data).forEach(x => {
        let li = htmlGenerator('li', `${x.person}: ${x.phone}`, phonebook);
        let deleteBtn = htmlGenerator('button', 'Delete', li);
        deleteBtn.id = x._id;
        deleteBtn.addEventListener('click', (e) => deletePhone(e));
    })
}

async function setPhone() {
    if (person.value && phone.value) {
        let info = {
            person: person.value,
            phone: phone.value
        }
        await request(url, info);
        getPhones();

        person.value = '';
        phone.value = '';

    } else{
        alert('All fields are required');
    }
}

async function deletePhone(e) {
    let id = e.target.id;
    e.target.parentNode.remove();

    await fetch(`${url}/${id}}`, {
        method: 'DELETE',
    });
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

attachEvents();
