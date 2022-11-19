import * as api from "./api.js";


const endpoint = {
    'catalog': 'data/catalog',
    'getById': 'data/catalog/',
    'getMyItems': 'data/catalog?where=_ownerId%3D%22',
}

export async function createItem(data){
    const result = await api.post(endpoint.catalog, data);
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

export async function getMyItems(){
    const user = JSON.parse(sessionStorage.getItem('user'));
    const userId = user && user._id;
    const id = `${userId}%22`;
    const result = await api.get(endpoint.getMyItems + id);
    return result;
}
