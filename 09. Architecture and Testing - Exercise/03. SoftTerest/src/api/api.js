const host = 'http://localhost:3030/';

async function requester(method, url, data) {
    const user = JSON.parse(sessionStorage.getItem('user'));
    const option = {
        method,
        headers: {}
    }

    if (data) {
        option.headers["Content-type"] = "application/json";
        option.body = JSON.stringify(data);
    }

    if (user) {
        const token = user.accessToken;
        option.headers['X-Authorization'] = token;
    }

    try {
        const response = await fetch(host + url, option);
        if (!response.ok) {
            if(response.status === 403) {
                sessionStorage.removeItem('user');
            }
            const err = await response.json();
            throw new Error(err.message);
        }
        if(response.status === 204) {
            return response;
        } else {
            return response.json();
        }

    } catch (error) {
        alert(error.message);
        throw error;
    }
}

const get = requester.bind(null, 'get');
const post = requester.bind(null, 'post');
const put = requester.bind(null, 'put');
const del = requester.bind(null, 'delete');

export {
    get,
    post,
    put,
    del
}