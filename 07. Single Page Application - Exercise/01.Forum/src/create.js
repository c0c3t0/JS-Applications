export async function createTopic(title, username, post) {
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
        throw new Error(response.message);
    }
    const data = await response.json();
}
