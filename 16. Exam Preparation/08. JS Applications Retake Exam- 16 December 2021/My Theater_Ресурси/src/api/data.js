import * as api from "./api.js";

const endpoint = {
    'catalog': 'data/theaters?sortBy=_createdOn%20desc&distinct=title',
    'create': 'data/theaters',
    'getById': 'data/theaters/',
    'getMyItems': (userId) => `data/theaters?where=_ownerId%3D%22${userId}%22&sortBy=_createdOn%20desc`,
    'likeIt': 'data/likes',
    'totalLikes': (theaterId) => `data/likes?where=theaterId%3D%22${theaterId}%22&distinct=_ownerId&count`,
    'likeByUser': (theaterId, userId) => `data/likes?where=theaterId%3D%22${theaterId}%22%20and%20_ownerId%3D%22${userId}%22&count`
}

export async function createItem(data){
    const result = await api.post(endpoint.create, data);
    return result;
}

export async function getAllItems(){
    const result = await api.get(endpoint.catalog);
    return result;
}

export async function getById(id){
    const result = await api.get(endpoint.getById + id);
    return result;
}

export async function updateById(id, data){
    const result = await api.put(endpoint.getById + id, data);
    return result;
}

export async function deleteById(id){
    const result = await api.del(endpoint.getById + id);
    return result;
}

export async function getMyItems(userId){
    const result = await api.get(endpoint.getMyItems(userId));
    return result;
}

export async function addLike(data){
    const result = await api.post(endpoint.likeIt, data);
    return result;
}

export async function getTotalCount(theaterId){
    const result = await api.get(endpoint.totalLikes(theaterId));
    return result;
}

export async function liked(theaterId, userId){
    const result = await api.get(endpoint.likeByUser(theaterId, userId));
    return result;
}
