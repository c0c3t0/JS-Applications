const url = 'http://localhost:3030/jsonstore/messenger';

const messages = document.querySelector('#messages');
const author = document.querySelector('input[name=author]');
const content = document.querySelector('input[name=content]');
const sendBtn = document.querySelector('#submit');
const refreshBtn = document.querySelector('#refresh');

function attachEvents() {
    refreshBtn.addEventListener('click', showMessages);
    sendBtn.addEventListener('click', sendMessage);
}

async function sendMessage() {
    if (author.value && content.value) {
        let info = {
            author: author.value,
            content: content.value
        }
        await request(url, info);

    } else {
        alert('All fields are required');
    }
    author.value = '';
    content.value = '';
}

async function showMessages() {
    let response = await fetch(url);
    let data = await response.json();

    messages.value = Object.values(data)
        .map(x => `${x.author}: ${x.content}`).join('\n');
}


async function request(url, body) {
    if (body) {
        body = {
            method: 'POST',
            headers: {
                'content-type': 'application/json',
            },
            body: JSON.stringify(body)
        }
    }
    let res = await fetch(url, body);
    return await res.json();
}

attachEvents();
