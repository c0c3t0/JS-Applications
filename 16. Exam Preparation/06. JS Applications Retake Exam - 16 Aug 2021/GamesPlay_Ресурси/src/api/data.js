import * as api from "./api.js";

const endpoint = {
    'catalog': 'data/games?sortBy=_createdOn%20desc',
    'newest': 'data/games?sortBy=_createdOn%20desc&distinct=category',
    'create': 'data/games',
    'getById': 'data/games/',

    'comments': (gameId) => `data/comments?where=gameId%3D%22${gameId}%22`,
    'createComment': 'data/comments'
}

export async function createItem(data) {
    const result = await api.post(endpoint.create, data);
    return result;
}

export async function getAllItems() {
    const result = await api.get(endpoint.catalog);
    return result;
}

export async function getNewest() {
    const result = await api.get(endpoint.newest);
    return result;
}

export async function getById(id) {
    const result = await api.get(endpoint.getById + id);
    return result;
}

export async function updateById(id, data) {
    const result = await api.put(endpoint.getById + id, data);
    return result;
}

export async function deleteById(id) {
    const result = await api.del(endpoint.getById + id);
    return result;
}

export async function getAllComments(gameId) {
    const result = await api.get(endpoint.comments(gameId));
    return result;
}

export async function addComment(gameId, comment) {
    const result = await api.post(endpoint.createComment, { gameId, comment });
    return result;
}
