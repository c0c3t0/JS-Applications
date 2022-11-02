import { showComments } from './comments.js';
import { createTopic } from './create.js';
import { htmlGenerator } from './dom.js';

export async function getTopics() {
    const response = await fetch('http://localhost:3030/jsonstore/collections/myboard/posts');
    const data = await response.json();

    Object.values(data).forEach(post => {
        console.log(post);

        const divTopicNameWrapper = htmlGenerator('div', '', 'topic-name-wrapper', document.querySelector('.topic-container'));
        divTopicNameWrapper.id = post._id;

        const divTopicName = htmlGenerator('div', '', 'topic-name', divTopicNameWrapper);
        const aNormal = htmlGenerator('a', '', 'normal', divTopicName);
        aNormal.setAttribute('href', '#');
        htmlGenerator('h2', post.title, '', aNormal);

        const divColumns = htmlGenerator('div', '', 'columns', divTopicName);
        const div1 = htmlGenerator('div', '', '', divColumns);
        const p = htmlGenerator('p', 'Date: ', '', div1);
        htmlGenerator('time', post.date, '', p);

        const divNickname = htmlGenerator('div', '', 'nick-name', div1);
        const pUsername = htmlGenerator('p', 'Username: ', '', divNickname);
        htmlGenerator('span', post.username, '', pUsername);

        divTopicNameWrapper.addEventListener('click', () => showComments(post));
    });
}

const form = document.querySelector('form');
form.addEventListener('submit', getFormData);

function getFormData(e) {
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
        // getTopics();
        form.reset();

    } else if (e.submitter.textContent === 'Cancel') {
        form.reset();
    }
}