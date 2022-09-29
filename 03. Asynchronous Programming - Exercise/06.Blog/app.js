let baseUrl = 'http://localhost:3030/jsonstore/blog';
let posts = document.querySelector("#posts");
let postTitle = document.querySelector("#post-title");
let postBody = document.querySelector("#post-body");
let comments = document.querySelector("#post-comments");

function attachEvents() {
    document.querySelector("#btnLoadPosts").addEventListener('click', () => getPosts());
    document.querySelector("#btnViewPost").addEventListener('click', () => viewPostInfo());
    document.querySelector("#btnViewPost").addEventListener('click', () => viewComments());
}

async function getPosts() {
    try {
        let response = await fetch(`${baseUrl}/posts`);
        if (!response.ok) {
            throw new Error('Error');
        }
        let data = await response.json();

        Object.values(data).forEach(x => {
            htmlGenerator('option', x.title, posts, x.id);
        });

    } catch (error) {
        console.error(error.message);
    }
}

async function viewPostInfo() {
    try {
        let id = posts.value;
        let res = await fetch(`${baseUrl}/posts/${id}`);
        if (!res.ok) {
            throw new Error('Error');
        }
        let data = await res.json();

        postTitle.textContent = data.title;
        postBody.textContent = data.body;

    } catch (error) {
        console.error(error.message);
    }
}

async function viewComments() {
    try {
        let id = posts.value;

        let response = await fetch(`${baseUrl}/comments`);
        if (!response.ok) {
            throw new Error('Error');
        }
        let info = await response.json();

        comments.replaceChildren();
        Object.values(info).forEach(x => {
            if (id == x.postId) {
                let li = htmlGenerator('li', x.text, comments);
                li.id = x.id;
            }
        });

    } catch (error) {
        console.error(error.message);
    }
}

function htmlGenerator(tagName, content, parent, value) {
    let el = document.createElement(tagName);
    el.textContent = content;

    if (parent) {
        parent.appendChild(el);
    }

    if (value) {
        el.value = value;
    }
    return el;
}

attachEvents();