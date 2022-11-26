import * as api from "./api.js";

const endpoint = {
    'catalog': 'data/albums?sortBy=_createdOn%20desc&distinct=name',
    'create': 'data/albums',
    'getById': 'data/albums/',
    'search': (query) => `data/albums?where=name%20LIKE%20%22${query}%22`
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

export async function searchItem(query) {
    return await api.get(endpoint.search(query));
  }
