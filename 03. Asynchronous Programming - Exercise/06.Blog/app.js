function attachEvents() {
    const baseUrl = 'http://localhost:3030/jsonstore/blog/';
    const posts = document.querySelector("#posts");
    const postTitle = document.querySelector("#post-title");
    const postBody = document.querySelector("#post-body");
    const comments = document.querySelector("#post-comments");

    document.querySelector("#btnLoadPosts").addEventListener('click', () => getPosts());
    document.querySelector("#btnViewPost").addEventListener('click', () => viewPostDetails());

    async function getPosts() {
        try {
            const response = await fetch(`${baseUrl}posts`);
            if (!response.ok) {
                throw new Error('Error');
            }
            const data = await response.json();

            posts.replaceChildren();
            Object.values(data).forEach(x => {
                htmlGenerator('option', x.title, posts, x.id);
            });
        } catch (error) {
            console.error(error.message);
        }
    }

    async function viewPostDetails() {
        try {
            const res = await fetch(`${baseUrl}posts`);
            if (!res.ok) {
                throw new Error('Error');
            }
            const allPosts = await res.json();

            const id = posts.value;
            const title = posts.options[posts.selectedIndex].text;
            const body = Object.values(allPosts).find(x => x.title === title);

            postTitle.textContent = title;
            postBody.textContent = body.body;

            const response = await fetch(`${baseUrl}comments`);
            if (!response.ok) {
                throw new Error('Error');
            }
            const info = await response.json();

            comments.replaceChildren();
            Object.values(info).forEach(x => {
                if (id === x.postId) {
                    const li = htmlGenerator('li', x.text, comments);
                    li.id = x.id;
                }
            });
        } catch (error) {
            console.error(error.message);
        }
    }

    function htmlGenerator(tagName, content, parent, value) {
        const el = document.createElement(tagName);
        el.textContent = content;

        if (parent) {
            parent.appendChild(el);
        }

        if (value) {
            el.setAttribute('value', value);
        }
        return el;
    }
}

attachEvents();
