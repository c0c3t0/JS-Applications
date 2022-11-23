import * as api from "./api.js";

const endpoint = {
    'catalog': 'data/memes?sortBy=_createdOn%20desc',
    'create': 'data/memes',
    'getById': 'data/memes/',
    'getMyItems': (userId) => `data/memes?where=_ownerId%3D%22${userId}%22&sortBy=_createdOn%20desc`
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
