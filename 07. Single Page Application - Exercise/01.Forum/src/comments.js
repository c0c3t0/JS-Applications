import { createUserCommentHTML } from "./dom.js";

const userComment = document.querySelector('#user-comment');

const form = document.querySelector('.answer-comment form');
form.addEventListener('submit', getCommentData);

let topicId;

export async function getComments(id) {
    topicId = id;
    try {
        const response = await fetch(`http://localhost:3030/jsonstore/collections/myboard/comments`);
        const allComments = await response.json();

        if (!response.ok) {
            throw new Error(response.message);
        }

        userComment.replaceChildren();
        Object.values(allComments)
            .filter(c => c.postId === topicId)
            .map(c => {
                createUserCommentHTML(c);
            });

    } catch (error) {
        alert(error.message);
    }
}


async function getCommentData(e) {
    e.preventDefault();

    const dataForm = new FormData(e.target);
    const content = dataForm.get('postText');
    const username = dataForm.get('username');

    if (!content || !username) {
        alert('All fields are required!');
        return;
    }
    createComment(content, username);
    form.reset();
}

async function createComment(content, username) {
    try {
        const response = await fetch('http://localhost:3030/jsonstore/collections/myboard/comments', {
            method: 'POST',
            headers: { 'Content-type': 'application/json' },
            body: JSON.stringify({
                content,
                username,
                postId: topicId,
                date: new Date
            })
        });

        if (!response.ok) {
            const data = await response.json();
            throw new Error(data.message);
        }
        getComments(topicId);

    } catch (error) {
        alert(error.message);
    }
}
