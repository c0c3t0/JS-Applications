import { getTopics } from './load.js';

const form = document.querySelector('form');

export function getFormData(e) {
    e.preventDefault();

    const dataForm = new FormData(e.target);
    const title = dataForm.get('topicName');
    const username = dataForm.get('username');
    const post = dataForm.get('postText');

    if (e.submitter.textContent === 'Post') {
        if (!title || !username || !post) {
            alert('All fields are required!');
            return;
        }
        createTopic(title, username, post);
    }
    form.reset();
}


async function createTopic(title, username, post) {
    try {
        const response = await fetch('http://localhost:3030/jsonstore/collections/myboard/posts', {
            method: 'POST',
            headers: { 'Content-type': 'application/json' },
            body: JSON.stringify({
                title,
                username,
                post,
                date: new Date
            })
        });

        if (!response.ok) {
            const data = await response.json();
            throw new Error(data.message);
        }
        getTopics();

    } catch (error) {
        alert(error.message);
    }
}
