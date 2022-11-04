import { createTopicHTML, createTopicDetailsHTML } from './dom.js';
import { getComments } from './comments.js';

const topics = document.querySelector('.topic-container');

export async function getTopics() {
    try {
        const response = await fetch('http://localhost:3030/jsonstore/collections/myboard/posts');
        const data = await response.json();

        if (!response.ok) {
            throw new Error(response.message);
        }

        topics.replaceChildren();
        Object.values(data)
            .forEach(post => {
                const topic = createTopicHTML(post);
                topic.addEventListener('click', (e) => showSelectedTopic(e.currentTarget.id));
            });

    } catch (error) {
        alert(error.message);
    }
}

async function showSelectedTopic(id) {
    try {
        const response = await fetch(`http://localhost:3030/jsonstore/collections/myboard/posts/${id}`);
        const data = await response.json();

        if (!response.ok) {
            throw new Error(response.message);
        }

        const topic = createTopicDetailsHTML(data);
        getComments(topic.id);

    } catch (error) {
        alert(error.message);
    }
}
